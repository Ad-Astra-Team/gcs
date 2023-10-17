<script>
	import { onMount, onDestroy } from 'svelte';
	import { invoke } from '@tauri-apps/api';
	import { heartbeat, last_heartbeat } from '$lib/Utils/stores';
	import { destroy_gauges, initialize_gauges } from '.';
	import '$lib/Gauges/index';

	onMount(() => {
		initialize_gauges();
	});

	onDestroy(() => {
		destroy_gauges();
	});
</script>

<div class="container w-full">
	<div class="grid grid-rows-3">
		<div class="grid grid-cols-3">
			<div id="airspeed" />
			<div id="attitude" />
			<div id="altimeter" />
		</div>

		<div class="grid grid-cols-3">
			<div id="turn_coordinator" />
			<div id="heading" />
			<div id="vertical_speed" />
		</div>

		<div class="grid grid-cols-3">
			<div />
			<div id="tachometer" />
			<div />
		</div>
	</div>
</div>
