<script>
	import { onMount } from 'svelte';
	import { invoke } from '@tauri-apps/api';

	onMount(async () => {
		console.log('dashboard mounted');
		const TachometerAnalog = (await import('./tachometer_analog')).default;
		const AirspeedAnalog = (await import('./airspeed_analog')).default;
		const AttitudeIndicatorAnalog = (await import('./attitude_indicator_analog')).default;
		const AltimeterAnalog = (await import('./altimeter_analog')).default;
		const TurnCoordinatorAnalog = (await import('./turn_coordinator_analog')).default;
		const HeadingIndicatorAnalog = (await import('./heading_indicator_analog')).default;
		const VerticalSpeedAnalog = (await import('./vertical_speed_analog')).default;

		const Airplane = (await import('./airplane')).default;

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
			parentElement: DOM_airspeed
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

		async function get_axes() {
			try {
				const axes = await invoke('get_axes');

				// Update your objects here based on axes data
				obj_attitude.setRollAndPitch(axes.roll * 50, axes.pitch * 50);
				obj_turn_coordinator.setRollRate(axes.yaw * 50);
				obj_heading.setHeading(axes.yaw * 50);
				obj_airspeed.setNeedle(50);
			} catch (error) {
				console.error('Error in get_axes:', error);
			} finally {
				// Schedule the next call to get_axes after a delay
				setTimeout(get_axes, 100);
			}
		}
		await get_axes();

		// instruments.forEach((i) => i.demoStart());
	});

	import './styles.css';
</script>

<div class="container">
	<div class="grid items-center justify-center grid-cols-7 space-x-2" id="gauges">
		<div class="row-span-1" id="airspeed" />
		<div class="row-span-1" id="attitude" />

		<div class="row-span-1" id="altimeter" />
		<div class="row-span-1" id="turn_coordinator" />

		<div class="row-span-1" id="heading" />
		<div class="row-span-1" id="vertical_speed" />

		<div class="row-span-1" id="tachometer" />
	</div>
</div>
