// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::time::Duration;

// -- Re-Exports
pub use error::{Error, Result};

// -- Sub-modules
mod ctx;
mod error;
mod event;
mod ipc;
mod mavproxy;
mod model;
mod prelude;

use mavproxy::*;
use model::Vehicle;
use serde::{Deserialize, Serialize};
use serde_json::Value;
use tauri::{AppHandle, Manager, State, StateManager};
use tokio::time::sleep;

const MAVLINK_VERSION: u8 = 2;
const MAVLINK_SYSTEM_ID: u8 = 0;
const MAVLINK_COMPONENT_ID: u8 = 0;
const MAVLINK_CONNECTION_STRING: &str = "udpin:0.0.0.0:14550";
const IS_VERBOSE: bool = false;

#[derive(Default)]
pub struct AppState(Arc<Mutex<Vehicle>>);

impl AppState {
    pub fn new() -> Self {
        Self::default()
    }

    pub fn get(&self) -> Arc<Mutex<Vehicle>> {
        self.0.clone()
    }
}

async fn mavlink_loop(app_handle: Arc<Mutex<AppHandle>>, app_state: Arc<Mutex<AppState>>) {
    let mavlink_version = match MAVLINK_VERSION {
        1 => mavlink::MavlinkVersion::V1,
        2 => mavlink::MavlinkVersion::V2,
        _ => panic!("Invalid mavlink version."),
    };

    let (system_id, component_id) = (MAVLINK_SYSTEM_ID, MAVLINK_COMPONENT_ID);
    let vehicle = mavlink_vehicle::MAVLinkVehicleHandle::<mavlink::ardupilotmega::MavMessage>::new(
        MAVLINK_CONNECTION_STRING,
        mavlink_version,
        system_id,
        component_id,
    );

    let _inner_vehicle = vehicle.mavlink_vehicle.clone();

    type MsgArdupilot = mavlink::ardupilotmega::MavMessage;
    type MsgCommon = mavlink::common::MavMessage;
    loop {
        let _ = sleep(std::time::Duration::from_secs(10));
        let mut t1 = std::time::Instant::now();
        while let Ok((header, message)) = vehicle.thread_rx_channel.recv() {
            // debug!("Received: {:#?} {:#?}", header, message);
            let state = app_state.lock().unwrap();
            let mut state = state.0.lock().unwrap();

            match message {
                MsgArdupilot::AHRS2(ref packet) => {
                    debug!(
                        "[AHRS2]: lat:{} lon:{} alt:{} roll:{} pitch:{} yaw:{}",
                        packet.lat,
                        packet.lng,
                        packet.altitude,
                        packet.roll,
                        packet.pitch,
                        packet.yaw
                    );
                    state.gps.alt = packet.altitude;
                    state.gyro.pitch = packet.pitch;
                    state.gyro.roll = packet.roll;
                    state.gyro.yaw = packet.yaw;
                }
                MsgArdupilot::AHRS3(ref packet) => {
                    debug!(
                        "[AHRS3]: pitch: {}, roll: {}, yaw: {}",
                        packet.pitch, packet.roll, packet.yaw
                    );
                    state.gyro.pitch = packet.pitch;
                    state.gyro.roll = packet.roll;
                    state.gyro.yaw = packet.yaw;
                }

                MsgArdupilot::WIND(ref packet) => {
                    debug!(
                        "[WIND]: direction: {}, speed: {}",
                        packet.direction, packet.speed
                    );
                }

                MsgArdupilot::AIRSPEED_AUTOCAL(ref packet) => {
                    debug!(
                        "[AIRSPEED_AUTOCAL]: vx: {}, vy: {}, vz: {}",
                        packet.vx, packet.vy, packet.vz
                    );
                }

                MsgArdupilot::common(ref packet) => match packet {
                    MsgCommon::VFR_HUD(ref packet) => {
                        debug!("[VFR_HUD]:  {:#?} ", packet);
                        state.airspeed = packet.airspeed;
                        state.groundspeed = packet.groundspeed;
                        state.heading = packet.heading;
                    }
                    _ => {}
                },

                _ => {}
            }
            update((header, message));
            if (std::time::Instant::now() - t1).as_millis() > 100 {
                let _ = app_handle
                    .lock()
                    .unwrap()
                    .emit_all("backend-mavmsg", state.serialize());

                t1 = std::time::Instant::now();
            }
        }

        error!("Failed to receive message");
    }
}

#[tauri::command]
async fn get_axes() -> Value {
    serde_json::from_str::<Value>(
        messages()
            .pointer("vehicles/1/components/1/messages/AHRS2/message")
            .as_str(),
    )
    .unwrap()
}

#[tauri::command]
fn increase_packet_counter(app_state: State<Arc<Mutex<AppState>>>) {
    let state = app_state.lock().unwrap();
    let mut vehicle = state.0.lock().unwrap();

    vehicle.packet_tick += 1;
}

#[tokio::main]
async fn main() {
    let log_filter = if IS_VERBOSE { "debug" } else { "warn" };
    env_logger::Builder::from_env(env_logger::Env::default().default_filter_or(log_filter)).init();

    // inner_vehicle.lock().unwrap().send(header, message);

    let app_state = Arc::new(Mutex::new(AppState::new()));

    tauri::async_runtime::set(tokio::runtime::Handle::current());
    tauri::Builder::default()
        .manage(app_state.clone())
        .setup(|app| {
            let app_handle = Arc::new(Mutex::new(app.app_handle()));
            let app_handle_mav_loop = Arc::new(Mutex::new(app.app_handle()));

            tauri::async_runtime::spawn(async move {
                mavlink_loop(app_handle_mav_loop, app_state.clone()).await;
            });

            tauri::async_runtime::spawn(async move {
                loop {
                    sleep(Duration::from_millis(1000)).await;

                    let timestamp = chrono::Utc::now().timestamp_millis();
                    app_handle
                        .clone()
                        .lock()
                        .unwrap()
                        .emit_all("backend-heartbeat", timestamp)
                        .unwrap();
                }
            });

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![get_axes, increase_packet_counter])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
