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

<div class="flex flex-row justify-between ml-4 overflow-scroll gap-x-3" id="gauges">
	<div class="w-[230px] h-[230px]" id="airspeed" />
	<div class="w-[230px] h-[230px]" id="attitude" />
	<div class="w-[230px] h-[230px]" id="altimeter" />
	<div class="w-[230px] h-[230px]" id="turn_coordinator" />
	<div class="w-[230px] h-[230px]" id="heading" />
	<div class="w-[230px] h-[230px]" id="vertical_speed" />
	<div class="w-[230px] h-[230px]" id="tachometer" />
</div>
