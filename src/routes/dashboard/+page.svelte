<script>
	import Gauge from '$lib/Gauges/gauge.svelte';
	import Map from '$lib/Maps/Map.svelte';
	import {
		IconHomeDown,
		IconLock,
		IconLockOpen,
		IconRobot,
		IconRobotOff
	} from '@tabler/icons-svelte';
	import {
		armMode,
		controlMode,
		launchMode,
		selectedPort,
		connectionStatus
	} from '$lib/Utils/stores';
	import { Drawer, getDrawerStore, RadioGroup, RadioItem } from '@skeletonlabs/skeleton';

	const drawerStore = getDrawerStore();
</script>

<!-- Page Container -->
<div class="container w-full h-full min-w-full min-h-full">
	<!-- Page Body -->
	<div class="flex flex-col justify-between w-full h-full min-w-full min-h-full">
		<!-- Page Header Row -->
		<div class="flex flex-row place-content-center">
			<div
				class="place-content-center transition-opacity opacity-60 hover:opacity-90 pt-2 pb-3 pl-3 pr-3 place-items-center whitespace-nowrap justify-between rounded-b-2xl flex flex-row bg-[#f6f7f8] dark:bg-[#222d3d] space-x-20 m-0 shadow-lg"
			>
				<div class="flex flex-row">
					{#if $connectionStatus === false}
						<button
							on:click={() => {
								$connectionStatus = !$connectionStatus;
							}}
							type="button"
							class="px-7 py-2.5 text-sm active:ring-4 font-medium text-center text-black dark:text-white rounded-lg shadow-lg bg-gradient-to-r from-sky-400 via-sky-500 to-sky-600 hover:bg-gradient-to-br focus:outline-none focus:ring-sky-300 dark:focus:ring-sky-800 shadow-sky-500/50 dark:shadow-lg dark:shadow-sky-800/80"
						>
							Connect
						</button>
					{:else}
						<button
							on:click={() => {
								$connectionStatus = !$connectionStatus;
							}}
							type="button"
							class="px-5 py-2.5 text-sm active:ring-4 font-medium text-black dark:text-white rounded-lg shadow-lg bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80"
						>
							Disconnect
						</button>
					{/if}
				</div>

				<div class="flex flex-row gap-x-2 place-content-center place-items-center">
					{#if $controlMode === false}
						<button
							on:click={() => {
								$controlMode = !$controlMode;
							}}
							type="button"
							class="text-white bg-gradient-to-r active:ring-4 from-sky-400 via-sky-500 to-sky-600 hover:bg-gradient-to-br focus:outline-none focus:ring-sky-300 dark:focus:ring-sky-800 shadow-lg shadow-sky-500/50 dark:shadow-lg dark:shadow-sky-800/80 font-medium rounded-lg text-sm px-5 py-2.5"
						>
							<IconRobot class="text-black dark:text-white" />
						</button>
					{:else}
						<button
							on:click={() => {
								$controlMode = !$controlMode;
							}}
							class="text-white bg-gradient-to-r active:ring-4 from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5"
							type="button"
						>
							<IconRobotOff class="text-black dark:text-white" />
						</button>
					{/if}

					{#if $launchMode === false}
						<button
							on:click={() => {
								$launchMode = !$launchMode;
							}}
							type="button"
							class="text-white bg-gradient-to-r active:ring-4 from-sky-400 via-sky-500 to-sky-600 hover:bg-gradient-to-br focus:outline-none focus:ring-sky-300 dark:focus:ring-sky-800 shadow-lg shadow-sky-500/50 dark:shadow-lg dark:shadow-sky-800/80 font-medium rounded-lg text-sm px-5 py-2.5"
							><IconHomeDown class="text-black dark:text-white" /></button
						>
					{:else}
						<button
							on:click={() => {
								$launchMode = !$launchMode;
							}}
							type="button"
							class="text-white bg-gradient-to-r active:ring-4 from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5"
							><IconHomeDown class="text-black dark:text-white" /></button
						>
					{/if}

					{#if $armMode === false}
						<button
							on:click={() => {
								$armMode = !$armMode;
							}}
							type="button"
							class="text-white bg-gradient-to-r active:ring-4 from-sky-400 via-sky-500 to-sky-600 hover:bg-gradient-to-br focus:outline-none focus:ring-sky-300 dark:focus:ring-sky-800 shadow-lg shadow-sky-500/50 dark:shadow-lg dark:shadow-sky-800/80 font-medium rounded-lg text-sm px-5 py-2.5"
							><IconLock class="text-black dark:text-white" /></button
						>
					{:else}
						<button
							on:click={() => {
								$armMode = !$armMode;
							}}
							type="button"
							class="text-white bg-gradient-to-r from-red-400 active:ring-4 via-red-500 to-red-600 hover:bg-gradient-to-br focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5"
							><IconLockOpen class="text-black dark:text-white" /></button
						>
					{/if}
				</div>

				<div class="flex flex-row">
					<select class="py-2 font-sans font-semibold active:ring-4 dark:text-sky-400 select">
						{#each Object.entries($selectedPort) as [id, port]}
							<option value={port}>{port}</option>
						{/each}
					</select>
				</div>
			</div>
		</div>
		<!-- Videostream and Map Row -->

		<div class="grid w-full grid-cols-2 pl-2 pr-4 space-x-2 h-3/5">
			<!-- Video Stream -->
			<div class="relative grid w-full h-full grid-cols-1 border-none">
				<video
					preload="false"
					controls
					class="w-full h-full video-js rounded-xl"
					autoplay
					muted
					playsinline
					id="stream"
				>
					<source src="stream.mp4?" type="video/mp4" />
					<source src="stream.m3u8" type="application/x-mpegURL" />
				</video>
				<!-- <iframe src="http://192.168.99.138:8889/mystream" scrolling="no" /> -->
			</div>

			<!-- Map -->
			<div class="grid w-full h-full border-none grid-col-1">
				<Map />
			</div>
		</div>

		<!-- Gauge Row -->
		<div
			class="self-center justify-center w-full overflow-scroll hide-scrollbar place-content-center scroll-auto"
		>
			<Gauge />
		</div>
	</div>
</div>
<slot />
