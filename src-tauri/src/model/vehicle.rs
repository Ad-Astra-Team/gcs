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
    pub airspeed: f32,
    pub groundspeed: f32,
    pub heading: i16,
    pub packet_tick: u32,
}

impl Vehicle {
    pub fn new() -> Self {
        Vehicle {
            gyro: Gyro::default(),
            gps: GPS::default(),
            airspeed: 0.0,
            groundspeed: 0.0,
            heading: 0,
            packet_tick: 0,
        }
    }

    pub fn get(&self) -> Self {
        Vehicle {
            gyro: Gyro {
                pitch: self.gyro.pitch,
                roll: self.gyro.roll,
                yaw: self.gyro.yaw,
            },
            gps: GPS {
                lat: self.gps.lat,
                lon: self.gps.lon,
                alt: self.gps.alt,
            },
            airspeed: self.airspeed,
            groundspeed: self.groundspeed,
            heading: self.heading,
            packet_tick: self.packet_tick,
        }
    }

    pub fn deserialize(data: &str) -> Self {
        serde_json::from_str(data).unwrap()
    }

    pub fn serialize(&self) -> String {
        serde_json::to_string(&self).unwrap()
    }
}
