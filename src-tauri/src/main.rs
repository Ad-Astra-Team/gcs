// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// -- Re-Exports
pub use error::{Error, Result};

// -- Sub-modules
mod ctx;
mod error;
mod event;
mod ipc;
mod mavproxy;
mod prelude;

use mavproxy::*;
use serde_json::Value;

const MAVLINK_VERSION: u8 = 2;
const MAVLINK_SYSTEM_ID: u8 = 0;
const MAVLINK_COMPONENT_ID: u8 = 0;
const MAVLINK_CONNECTION_STRING: &str = "udpin:127.0.0.1:14550";
const IS_VERBOSE: bool = true;

async fn mavlink_loop() {
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

    let inner_vehicle = vehicle.mavlink_vehicle.clone();

    loop {
        std::thread::sleep(std::time::Duration::from_secs(1));

        while let Ok((header, message)) = vehicle.thread_rx_channel.recv() {
            // debug!("Received: {:#?} {:#?}", header, message);
            match message {
                mavlink::ardupilotmega::MavMessage::AHRS(_) => {
                    // debug!("[AHRS1]{:#?} ", header, message);
                }
                mavlink::ardupilotmega::MavMessage::AHRS2(ref packet) => {
                    debug!(
                        "[AHRS2]: lat:{} lon:{} alt:{} roll:{} pitch:{} yaw:{}",
                        packet.lat,
                        packet.lng,
                        packet.altitude,
                        packet.roll,
                        packet.pitch,
                        packet.yaw
                    );
                }
                mavlink::ardupilotmega::MavMessage::AHRS3(ref packet) => {
                    debug!(
                        "[AHRS3]: pitch: {}, roll: {}, yaw: {}",
                        packet.pitch, packet.roll, packet.yaw
                    );
                }

                _ => {}
            }

            update((header, message));
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

#[tokio::main]
async fn main() {
    let log_filter = if IS_VERBOSE { "debug" } else { "warn" };
    env_logger::Builder::from_env(env_logger::Env::default().default_filter_or(log_filter)).init();

    tokio::spawn(async move {
        mavlink_loop().await;
    });

    // inner_vehicle.lock().unwrap().send(header, message);

    tauri::async_runtime::set(tokio::runtime::Handle::current());
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_axes])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
