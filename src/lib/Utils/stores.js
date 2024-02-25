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
export const uav_batteryVoltage = writable(15.0);
export const uav_gpsStatus = writable(true);
export const uav_networkStatus = writable(true);
export const pingStatus = writable(21);
export const armMode = writable(false);
export const controlMode = writable(false);
export const launchMode = writable(false);
export const selectedPort = writable(["UDP", "TCP", "COM1", "COM2", "COM3", "TTYUSB0", "TTYACM0"]);

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
export const GPS_Lat = writable(0.0);
export const GPS_Lon = writable(0.0);
export const followMe = writable(false);
export const domainValue = writable();
export const ipValue = writable();
export const portValue = writable();
export const ledFrequency = writable();
export const maxDistance = writable();
export const minDistance = writable();
export const streamAddress = writable();
export const streamChunks = writable();
export const formattedMP4Check = writable();
export const mp4Check = writable();
export const mkvCheck = writable();
export const movCheck = writable();
export const h264Check = writable();
export const h265Check = writable()
export const wp9Check = writable();
export const av1Check = writable();
export const applyButton = writable(false);

//Checklist Properties
export const motorTest = writable(false);
export const lidarTest = writable(false);
export const IMUTest = writable(false);
export const GPSTest = writable(false);
export const pitotTest = writable(false);
export const cameraTest = writable(false);

//Notepad Properties
export const notepadText = writable();

//Vehicle Choice Properties
export const planeVehicle = writable(true);
export const droneVehicle = writable(false);
export const roverVehicle = writable(false);
export const underWaterVehicle = writable(false);

//Map Properties
export const mapRadioButton = writable(true);