// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod mavproxy;

use mavproxy::*;

const MAVLINK_VERSION: u8 = 2;

#[tokio::main]
async fn main() {
    tokio::spawn(async move {});

    let mavlink_version = match MAVLINK_VERSION {
        1 => mavlink::MavlinkVersion::V1,
        2 => mavlink::MavlinkVersion::V2,
        _ => panic!("Invalid mavlink version."),
    };

    // let (system_id, component_id) = cli::mavlink_system_and_component_id();
    // let vehicle = mavlink_vehicle::MAVLinkVehicleHandle::<mavlink::ardupilotmega::MavMessage>::new(
    //     cli::mavlink_connection_string(),
    //     mavlink_version,
    //     system_id,
    //     component_id,
    // );

    // let inner_vehicle = vehicle.mavlink_vehicle.clone();
    // server::run(cli::server_address(), &inner_vehicle);

    tauri::async_runtime::set(tokio::runtime::Handle::current());
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
