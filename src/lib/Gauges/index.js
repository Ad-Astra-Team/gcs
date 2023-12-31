import TachometerAnalog from '$lib/Gauges/tachometer_analog';
import AirspeedAnalog from '$lib/Gauges/airspeed_analog';
import AttitudeIndicatorAnalog from '$lib/Gauges/attitude_indicator_analog';
import AltimeterAnalog from '$lib/Gauges/altimeter_analog';
import TurnCoordinatorAnalog from '$lib/Gauges/turn_coordinator_analog';
import HeadingIndicatorAnalog from '$lib/Gauges/heading_indicator_analog';
import VerticalSpeedAnalog from '$lib/Gauges/vertical_speed_analog';
import Airplane from '$lib/Gauges/airplane';
import './styles.css';
import { listen } from '@tauri-apps/api/event';

/** @type {Airplane?} */
export let airplane;
/** @type {AirspeedAnalog?} */
let obj_airspeed;
/** @type {AttitudeIndicatorAnalog?} */
let obj_attitude;
/** @type {AltimeterAnalog?} */
let obj_altimeter;
/** @type {TurnCoordinatorAnalog?} */
let obj_turn_coordinator;
/** @type {HeadingIndicatorAnalog?} */
let obj_heading;
/** @type {VerticalSpeedAnalog?} */
let obj_vertical_speed;
/** @type {TachometerAnalog?} */
let obj_tachometer;

export function initialize_gauges() {

    console.log('dashboard mounted');
    airplane = new Airplane();

    obj_airspeed = new AirspeedAnalog({
        airplane: airplane,
        parentElement: document.getElementById('airspeed'),
    });

    obj_attitude = new AttitudeIndicatorAnalog({
        airplane,
        parentElement: document.getElementById('attitude')
    });

    obj_altimeter = new AltimeterAnalog({
        airplane,
        parentElement: document.getElementById('altimeter')
    });

    obj_turn_coordinator = new TurnCoordinatorAnalog({
        airplane,
        parentElement: document.getElementById('turn_coordinator')
    });

    obj_heading = new HeadingIndicatorAnalog({
        airplane,
        parentElement: document.getElementById('heading')
    });

    obj_vertical_speed = new VerticalSpeedAnalog({
        airplane,
        parentElement: document.getElementById('vertical_speed')
    });

    obj_tachometer = new TachometerAnalog({
        airplane,
        parentElement: document.getElementById('tachometer')
    });

    listen('backend-mavmsg', function (evt) {
        let j = JSON.parse(evt.payload);

        airplane?.setAltitude(j.gps.alt);
        airplane?.setHeading(j.heading);
        airplane?.setRPM(3000);
        airplane?.setBarometer(j.gps.alt);
        airplane?.setAirspeed(j.airspeed);
        airplane?.setPitch(j.gyro.pitch * 20);
        airplane?.setRoll(j.gyro.roll * 20);
        airplane?.setRollRate(j.gyro.roll);
        airplane?.setAltitudeRate(1000);
        airplane?.setYaw(j.gyro.yaw * 20);
    });

    //obj_airspeed.demoStart();
    //obj_attitude.demoStart();
    //obj_altimeter.demoStart();
    //obj_turn_coordinator.demoStart();
    //obj_heading.demoStart();
    //obj_vertical_speed.demoStart();
    //obj_tachometer.demoStart();
}

export function destroy_gauges() {

    if (obj_airspeed != null)
        obj_airspeed.demoStop();
    if (obj_attitude != null)
        obj_attitude.demoStop();
    if (obj_altimeter != null)
        obj_altimeter.demoStop();
    if (obj_turn_coordinator != null)
        obj_turn_coordinator.demoStop();
    if (obj_heading != null)
        obj_heading.demoStop();
    if (obj_vertical_speed != null)
        obj_vertical_speed.demoStop();
    if (obj_tachometer != null)
        obj_tachometer.demoStop();

    obj_airspeed = null;
    obj_attitude = null;
    obj_altimeter = null;
    obj_turn_coordinator = null;
    obj_heading = null;
    obj_vertical_speed = null;
    obj_tachometer = null;

    airplane = null;

    console.log('dashboard destroyed');
}