<script>
	import { onMount, onDestroy } from 'svelte';
	import { destroy_gauges, initialize_gauges } from '.';
	import '$lib/Gauges/index';

	onMount(() => {
		initialize_gauges();
	});

	onDestroy(() => {
		destroy_gauges();
	});
</script>

<div class="flex flex-row justify-between w-full space-x-4 overflow-scroll" id="gauges">
	<div class="w-[230px] h-[230px] flex" id="airspeed" />
	<div class="w-[230px] h-[230px] flex" id="attitude" />
	<div class="w-[230px] h-[230px] flex" id="altimeter" />
	<div class="w-[230px] h-[230px] flex" id="turn_coordinator" />
	<div class="w-[230px] h-[230px] flex" id="heading" />
	<div class="w-[230px] h-[230px] flex" id="vertical_speed" />
	<div class="w-[230px] h-[230px] flex" id="tachometer" />
</div>
