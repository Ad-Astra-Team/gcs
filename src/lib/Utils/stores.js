import { writable } from 'svelte/store';

// communication 
export const leftNavActive = writable(false);
export const rightBarActive = writable(false);
export const heartbeat = writable(false);
export const last_heartbeat = writable(0);
export const connectionStatus = writable(false);
export const raspberryBoot = writable(false);
export const pixhawkBoot = writable(false);
export const ledStatus = writable(false);

// vehicle properties
export const uav_batteryVoltage = writable(0.0);
export const uav_gpsStatus = writable(false);
export const uav_networkStatus = writable(false);
export const pingStatus = writable(0);
export const armMode = writable(false);
export const controlMode = writable(false);
export const launchMode = writable(false);
export const selectedPort = writable(["COM1", "COM2", "COM3", "UDP", "TCP", "TTYUSB0", "TTYACM0"]);