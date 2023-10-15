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


export function initialize_gauges() {

    console.log('dashboard mounted');

    const DOM_airspeed = document.getElementById('airspeed');
    const DOM_attitude = document.getElementById('attitude');
    const DOM_altimeter = document.getElementById('altimeter');
    const DOM_turn_coordinator = document.getElementById('turn_coordinator');
    const DOM_heading = document.getElementById('heading');
    const DOM_vertical_speed = document.getElementById('vertical_speed');
    const DOM_tachometer = document.getElementById('tachometer');

    const airplane = new Airplane();

    const obj_airspeed = new AirspeedAnalog({
        airplane: airplane,
        parentElement: DOM_airspeed,
    });

    const obj_attitude = new AttitudeIndicatorAnalog({
        airplane,
        parentElement: DOM_attitude
    });

    const obj_altimeter = new AltimeterAnalog({
        airplane,
        parentElement: DOM_altimeter
    });

    const obj_turn_coordinator = new TurnCoordinatorAnalog({
        airplane,
        parentElement: DOM_turn_coordinator
    });

    const obj_heading = new HeadingIndicatorAnalog({
        airplane,
        parentElement: DOM_heading
    });

    const obj_vertical_speed = new VerticalSpeedAnalog({
        airplane,
        parentElement: DOM_vertical_speed
    });

    const obj_tachometer = new TachometerAnalog({
        airplane,
        parentElement: DOM_tachometer
    });

    const instruments = [
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
