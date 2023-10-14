//! Tauri IPC commands to bridge Task Frontend Model Controller to Backend Model Controller
//!

use crate::ctx::Ctx;
use crate::ipc::{CreateParams, DeleteParams, GetParams, IpcResponse, ListParams, UpdateParams};
use crate::Error;
use serde_json::Value;
use tauri::{command, AppHandle, Wry};
