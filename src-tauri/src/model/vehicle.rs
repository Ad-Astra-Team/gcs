use serde_derive::{Deserialize, Serialize};

#[derive(Default, Serialize, Deserialize)]
pub struct Gyro {
    pub pitch: f32,
    pub roll: f32,
    pub yaw: f32,
}

#[derive(Default, Serialize, Deserialize)]
pub struct GPS {
    pub lat: f32,
    pub lon: f32,
    pub alt: f32,
}

#[derive(Default, Serialize, Deserialize)]
pub struct Vehicle {
    pub gyro: Gyro,
    pub gps: GPS,
    pub airspeeed: f32,
    pub groundspeeed: f32,
    pub packet_tick: u32,
}

impl Vehicle {
    pub fn new() -> Self {
        Vehicle {
            gyro: Gyro::default(),
            gps: GPS::default(),
            airspeeed: 0.0,
            groundspeeed: 0.0,
            packet_tick: 0,
        }
    }

    pub fn serialize(&self) -> String {
        serde_json::to_string(&self).unwrap()
    }
}