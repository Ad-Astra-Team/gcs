import { writeText } from '@tauri-apps/api/clipboard';
import { readable, writable } from 'svelte/store';

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
export const portSelection = writable(['UDP', 'TCP', 'COM1', 'COM2', 'COM3', 'TTYUSB0', 'TTYACM0']);
export const selectedPort = writable("UDP");

// Tests Properties
export const tenPercentEngine = writable(false);
export const fiftyPercentEngine = writable(false);
export const ninetyPercentEngine = writable(false);
export const hundredPercentEngine = writable(false);
export const selectedEngineCapacity = writable();

export const leftDirectionTest = writable(false);
export const rightDirectionTest = writable(false);
export const forwardDirectionTest = writable(false);
export const backDirectionTest = writable(false);
export const selectedDirection = writable();

export const speedTest = writable(0);
export const speedTestUnit = writable(["Kbps", "Mbps", "Gbps"]);
export const latencyValue = writable(0);
export const jitterValue = writable(0);

export const xCoordinate = writable(0.000000)
export const yCoordinate = writable(0.000000)
export const zCoordinate = writable(0.00000)
export const intensity = writable(75)

// Settings Properties
export const speedUnit = writable(['MPS', 'FPS', 'KPH', 'MPH', 'Knots']);
export const selectedSpeedUnit = writable('MPS');
export const altitudeUnit = writable(['Meters', 'Feet']);
export const selectedAltitudeUnit = writable('Meters');
export const distanceUnitSelection = writable(['Meters', 'Feet']);
export const selectedDistanceUnit = writable('Meters');
export const trackLengthSelection = writable([1, 2, 3, 4, 5, 6]);
export const selectedTrackLength = writable(1);
export const voiceAssistantSelection = writable(['None', 'Man', 'Woman']);
export const selectedVoiceAssistant = writable('Man');
export const languageSelection = writable(['Türkçe', 'English']);
export const selectedLanguage = writable('Türkçe');

export const taxiLed = writable(false);
export const cruiseLed = writable(false);
export const harassLed = writable(false);
export const customLed = writable(false);
export const selectedLed = writable();

export const singleMode = writable(false);
export const dualMode = writable(false);
export const primaryGPS = writable(false);
export const secondaryGPS = writable(false);
export const simpleGPS = writable(false);
export const RSSIGPS = writable(false);
export const bestHealthGPS = writable(false);
export const GPSOff = writable(true);
export const selectedGPSMode = writable();

export const GPS_Lat = writable(0.0);
export const GPS_Lon = writable(0.0);
export const followMe = writable(false);
export const domainValue = writable();
export const ipValue = writable();
export const portValue = writable();
export const ledFrequency = writable();
export const lidarMaxDistance = writable();
export const lidarMinDistance = writable();
export const streamAddress = writable();
export const streamChunks = writable();

export const selectedCodec = writable();
export const selectedFormat = writable();
export const applyButton = writable(false);

//Checklist Properties
export const engineCheck = writable(false);
export const lidarCheck = writable(false);
export const IMUCheck = writable(false);
export const GPSCheck = writable(false);
export const pitotCheck = writable(false);
export const cameraCheck = writable(false);

//Notepad Properties
export const notepadText = writable();

//Vehicle Choice Properties
export const planeVehicle = writable(true);
export const droneVehicle = writable(false);
export const roverVehicle = writable(false);
export const underWaterVehicle = writable(false);
export const selectedVehicle = writable("mp4");

//Map Properties
export const mapRadioButton = writable(true);

//About Properties
export const whoWeAre = readable(
	'Ad Astra is a Teknofest team founded in 2021. As of 2024, it is still developing in the fields of armed unmanned aerial vehicles and unmanned aerial vehicles.'
);
export const teamMembers = readable([
	'Mert Sefa Akgün',
	'Cengizhan Yıldız',
	'Tuğrulhan Terzi',
	'Emre Uzun'
]);
export const teamRoles = readable(['Team Captain', 'Team Member', 'Team Member', 'Team Member']);
export const teamName = readable('AD ASTRA');
export const gcsName = readable('S . A . F . İ . R');

//Homepage Properties
export const homepageText = readable(
	'S.A.F.İ.R is a UAV purposed Ground Control System. You can control your UAV with the help of S.A.F.İ.R as you wish.'
);
