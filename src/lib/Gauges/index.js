import { onMount } from 'svelte';
import { invoke } from '@tauri-apps/api';
import { heartbeat, last_heartbeat } from '$lib/Utils/stores';
import { listen } from '@tauri-apps/api/event';
import TachometerAnalog from '$lib/Gauges/tachometer_analog';
import AirspeedAnalog from '$lib/Gauges/airspeed_analog';
import AttitudeIndicatorAnalog from '$lib/Gauges/attitude_indicator_analog';
import AltimeterAnalog from '$lib/Gauges/altimeter_analog';
import TurnCoordinatorAnalog from '$lib/Gauges/turn_coordinator_analog';
import HeadingIndicatorAnalog from '$lib/Gauges/heading_indicator_analog';
import VerticalSpeedAnalog from '$lib/Gauges/vertical_speed_analog';
import Airplane from '$lib/Gauges/airplane';
import './styles.css';

let DOM_airspeed;
let DOM_attitude;
let DOM_altimeter;
let DOM_turn_coordinator;
let DOM_heading;
let DOM_vertical_speed;
let DOM_tachometer;
let airplane;
let obj_airspeed;
let obj_attitude;
let obj_altimeter;
let obj_turn_coordinator;
let obj_heading;
let obj_vertical_speed;
let obj_tachometer;
let instruments;

export function initialize_gauges() {

    console.log('dashboard mounted');

    DOM_airspeed = document.getElementById('airspeed');
    DOM_attitude = document.getElementById('attitude');
    DOM_altimeter = document.getElementById('altimeter');
    DOM_turn_coordinator = document.getElementById('turn_coordinator');
    DOM_heading = document.getElementById('heading');
    DOM_vertical_speed = document.getElementById('vertical_speed');
    DOM_tachometer = document.getElementById('tachometer');

    airplane = new Airplane();

    obj_airspeed = new AirspeedAnalog({
        airplane: airplane,
        parentElement: DOM_airspeed,
    });

    obj_attitude = new AttitudeIndicatorAnalog({
        airplane,
        parentElement: DOM_attitude
    });

    obj_altimeter = new AltimeterAnalog({
        airplane,
        parentElement: DOM_altimeter
    });

    obj_turn_coordinator = new TurnCoordinatorAnalog({
        airplane,
        parentElement: DOM_turn_coordinator
    });

    obj_heading = new HeadingIndicatorAnalog({
        airplane,
        parentElement: DOM_heading
    });

    obj_vertical_speed = new VerticalSpeedAnalog({
        airplane,
        parentElement: DOM_vertical_speed
    });

    obj_tachometer = new TachometerAnalog({
        airplane,
        parentElement: DOM_tachometer
    });

    instruments = [
        obj_airspeed,
        obj_attitude,
        obj_altimeter,
        obj_turn_coordinator,
        obj_heading,
        obj_vertical_speed,
        obj_tachometer
    ];

    // listen('backend-mavmsg', function (evt) {
    //     let j = JSON.parse(evt.payload);

    //     airplane.setAirspeed(j.airspeed);
    //     airplane.setPitch(j.gyro.pitch * 20);
    //     airplane.setRoll(j.gyro.roll * 20);
    //     airplane.setYaw(j.gyro.yaw * 20);
    // });

    instruments.forEach((i) => i.demoStart());

}

export function destroy_gauges() {
    instruments.forEach((i) => i.demoStop());

    obj_airspeed = null;
    obj_attitude = null;
    obj_altimeter = null;
    obj_turn_coordinator = null;
    obj_heading = null;
    obj_vertical_speed = null;
    obj_tachometer = null;
    instruments = null;

    airplane = null;

    DOM_airspeed = null;
    DOM_attitude = null;
    DOM_altimeter = null;
    DOM_turn_coordinator = null;
    DOM_heading = null;
    DOM_vertical_speed = null;
    DOM_tachometer = null;

    console.log('dashboard destroyed');
}