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

// Vehicle Properties
export const uav_batteryVoltage = writable(0.0);
export const uav_gpsStatus = writable(false);
export const uav_networkStatus = writable(false);
export const pingStatus = writable(0);
export const armMode = writable(false);
export const controlMode = writable(false);
export const launchMode = writable(false);
export const selectedPort = writable(["PORT", "UDP", "TCP", "COM1", "COM2", "COM3", "TTYUSB0", "TTYACM0"]);

// Settings Properties
export const speedUnit = writable(["Speed Unit", "MPS", "FPS", "KPH", "MPH", "Knots"]);
export const altitudeUnit = writable(["Altitude Unit", "Meters", "Feet"]);
export const distanceUnitSelection = writable(["Distance Unit", "Meters", "Feet"]);
export const trackLengthSelection = writable(["Track Length", 1, 2, 3, 4, 5, 6]);
export const speechSelection = writable(["Voice Assistant", "Man", "Woman"]);
export const languageSelection = writable(["Language", "Türkçe", "English"]);
export const taxiLed = writable(false);
export const cruiseLed = writable(false);
export const harassLed = writable(false);
export const customLed = writable(false);
export const singleMode = writable(false);
export const dualMode = writable(false);
export const primaryGPS = writable(false);
export const secondaryGPS = writable(false);
export const simpleGPS = writable(false);
export const RSSIGPS = writable(false);
export const bestHealthGPS = writable(false);
export const GPSOff = writable(false);


