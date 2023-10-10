<script>
	import { onMount } from 'svelte';

	onMount(async () => {
		const TachometerAnalog = await import('./tachometer_analog');
		const AirspeedAnalog = await import('./airspeed_analog');
		const AttitudeIndicatorAnalog = await import('./attitude_indicator_analog');
		const AltimeterAnalog = await import('./altimeter_analog');
		const TurnCoordinatorAnalog = await import('./turn_coordinator_analog');
		const HeadingIndicatorAnalog = await import('./heading_indicator_analog');
		const VerticalSpeedAnalog = await import('./vertical_speed_analog');
		const Airplane = await import('./airplane');

		const DOM_airspeed = document.getElementById('airspeed');
		const DOM_attitude = document.getElementById('attitude');
		const DOM_altimeter = document.getElementById('altimeter');
		const DOM_turn_coordinator = document.getElementById('turn_coordinator');
		const DOM_heading = document.getElementById('heading');
		const DOM_vertical_speed = document.getElementById('vertical_speed');
		const DOM_tachometer = document.getElementById('tachometer');

		const airplane = new Airplane.default();

		const instruments = [
			new AirspeedAnalog.default({
				airplane: airplane,
				width: 200,
				height: 200,
				parentElement: DOM_airspeed
			}),
			new AttitudeIndicatorAnalog.default({
				airplane,
				parentElement: DOM_attitude
			}),
			new AltimeterAnalog.default({
				airplane,
				parentElement: DOM_altimeter
			}),
			new TurnCoordinatorAnalog.default({
				airplane,
				parentElement: DOM_turn_coordinator
			}),
			new HeadingIndicatorAnalog.default({
				airplane,
				parentElement: DOM_heading
			}),
			new VerticalSpeedAnalog.default({
				airplane,
				parentElement: DOM_vertical_speed
			}),
			new TachometerAnalog.default({
				airplane,
				parentElement: DOM_tachometer
			})
		];

		instruments.forEach((i) => i.demoStart());
	});

	import './styles.css';
</script>

<div class="container">
	<div class="grid items-center justify-center grid-rows-3 space-x-2" id="gauges">
		<div class="grid grid-cols-2">
			<div class="row-span-1" id="airspeed" />
			<div class="row-span-1" id="attitude" />
		</div>

		<div class="grid grid-cols-2">
			<div class="row-span-1" id="altimeter" />
			<div class="row-span-1" id="turn_coordinator" />
		</div>

		<div class="grid grid-cols-2">
			<div class="row-span-1" id="heading" />
			<div class="row-span-1" id="vertical_speed" />
		</div>

		<!-- 
		
		
		<div class="row-span-1" id="tachometer" />
		 -->
	</div>
</div>
