<script>
	import Gauge from '$lib/Gauges/gauge.svelte';
	import Map from '$lib/Maps/Map.svelte';
	import {
		IconDeviceGamepad2,
		IconRotateClockwise2,
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
</script>

<div class="container relative w-full h-full min-w-full min-h-full pb-20 space-y-5 overflow-hidden">
	<!-- Page Header -->
	<div class="z-50 flex flex-row opacity-20 hover:opacity-90 place-content-center">
		<div
			class="place-content-center pt-2 pb-3 pl-3 pr-3 place-items-center whitespace-nowrap justify-between rounded-b-3xl flex flex-row bg-[#f6f7f8] dark:bg-[#1f2937] space-x-20 m-0 shadow-lg"
		>
			<div class="flex flex-row">
				{#if $connectionStatus === false}
					<button
						on:click={() => {
							$connectionStatus = !$connectionStatus;
						}}
						type="button"
						class="px-7 py-2.5 text-sm font-medium text-center text-black dark:text-white rounded-lg shadow-lg bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80"
					>
						Connect
					</button>
				{:else}
					<button
						on:click={() => {
							$connectionStatus = !$connectionStatus;
						}}
						type="button"
						class="px-5 py-2.5 text-sm font-medium text-black dark:text-white rounded-lg shadow-lg bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80"
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
						class="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-sm px-5 py-2.5"
					>
						<IconRobot class="text-black dark:text-white" />
					</button>
				{:else}
					<button
						on:click={() => {
							$controlMode = !$controlMode;
						}}
						class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5"
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
						class="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-sm px-5 py-2.5"
						><IconRotateClockwise2 class="text-black dark:text-white" /></button
					>
				{:else}
					<button
						on:click={() => {
							$launchMode = !$launchMode;
						}}
						type="button"
						class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5"
						><IconRotateClockwise2 class="text-black dark:text-white" /></button
					>
				{/if}

				{#if $armMode === false}
					<button
						on:click={() => {
							$armMode = !$armMode;
						}}
						type="button"
						class="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-sm px-5 py-2.5"
						><IconLockOpen class="text-black dark:text-white" /></button
					>
				{:else}
					<button
						on:click={() => {
							$armMode = !$armMode;
						}}
						type="button"
						class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5"
						><IconLock class="text-black dark:text-white" /></button
					>
				{/if}
			</div>

			<div class="flex flex-row">
				<select class="py-2 font-sans font-semibold dark:text-teal-400 select">
					{#each Object.entries($selectedPort) as [id, port]}
						<option value={port}>{port}</option>
					{/each}
				</select>
			</div>
		</div>
	</div>
	<!-- Page Body -->
	<div class="grid h-full grid-flow-row space-y-5">
		<!-- 2-side area -->
		<div class="z-20 grid grid-cols-2 space-x-4">
			<!-- Video Stream -->
			<div class="grid grid-cols-1 ml-5">
				<video
					preload="false"
					controls
					class="w-full h-full rounded-xl"
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
			<div class="border-none">
				<Map />
			</div>
		</div>

		<!-- Gauges -->
		<div
			class="self-end justify-end w-screen overflow-scroll align-bottom place-content-end scroll-auto"
		>
			<Gauge />
		</div>
	</div>
</div>
<slot />
