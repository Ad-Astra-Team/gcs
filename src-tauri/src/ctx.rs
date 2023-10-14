//! Ctx is the context object passed through any IPC calls.
//! It can be queried to get the necessary states/services to perform any steps of a request.
//!
//! Notes:
//!     - Simple implementation for now.
//!     - For cloud applications, this will be used for authorization.
//!     - Eventually, this will also be used for "full context" logging/tracing or even performance tracing.
//!     - For a single user, desktop application, this object is much simpler as authorization and logging requirements are much reduced.

use crate::event::HubEvent;
use crate::mavproxy::mavlink_vehicle;
use crate::Result;
use crate::*;
use serde::Serialize;
use std::sync::Arc;
use tauri::{AppHandle, Manager, Wry};

type MavMessage = mavlink::ardupilotmega::MavMessage;
pub struct Ctx {
    model_manager: Arc<mavlink_vehicle::MAVLinkVehicleHandle<MavMessage>>,
    app_handle: AppHandle<Wry>,
}

impl Ctx {
    pub fn from_app(app: AppHandle<Wry>) -> Result<Arc<Ctx>> {
        Ok(Arc::new(Ctx::new(app)))
    }
}

impl Ctx {
    fn new(app: AppHandle<Wry>) -> Self {
        let mavlink_version = match MAVLINK_VERSION {
            1 => mavlink::MavlinkVersion::V1,
            2 => mavlink::MavlinkVersion::V2,
            _ => panic!("Invalid mavlink version."),
        };

        let (system_id, component_id) = (MAVLINK_SYSTEM_ID, MAVLINK_COMPONENT_ID);
        let model_manager = mavlink_vehicle::MAVLinkVehicleHandle::<MavMessage>::new(
            MAVLINK_CONNECTION_STRING,
            mavlink_version,
            system_id,
            component_id,
        );

        let inner_model_manager = model_manager.mavlink_vehicle.clone();

        let ctx = Self {
            model_manager: Arc::new(model_manager),
            app_handle: app,
        };

        ctx
    }

    pub fn model_manager(&self) -> Arc<mavlink_vehicle::MAVLinkVehicleHandle<MavMessage>> {
        self.model_manager.clone()
    }

    pub fn app_handle(&self) -> &AppHandle<Wry> {
        &self.app_handle
    }
}
