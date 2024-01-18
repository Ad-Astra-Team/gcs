<script>
	import Gauge from '$lib/Gauges/gauge.svelte';
	import Map from '$lib/Maps/Map.svelte';
	import {
		IconHomeDown,
		IconLock,
		IconLockOpen,
		IconRobot,
		IconRobotOff,
		IconSun,
		IconSunOff
	} from '@tabler/icons-svelte';
	import {
		armMode,
		controlMode,
		launchMode,
		selectedPort,
		connectionStatus,
		ledStatus
	} from '$lib/Utils/stores';
	import {
		popup,
		storePopup,
		initializeStores,
		Drawer,
		getDrawerStore
	} from '@skeletonlabs/skeleton';
	import 'video.js/dist/video';
	import 'video.js/dist/video-js.min.css';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import { map } from 'leaflet';

	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	/**
	 * @type {import('@skeletonlabs/skeleton').PopupSettings}
	 */
	const armTooltip = {
		event: 'hover',
		target: 'armTooltip',
		placement: 'bottom'
	};

	/**
	 * @type {import('@skeletonlabs/skeleton').PopupSettings}
	 */
	const disarmTooltip = {
		event: 'hover',
		target: 'disarmTooltip',
		placement: 'bottom'
	};

	/**
	 * @type {import('@skeletonlabs/skeleton').PopupSettings}
	 */
	const ledsOffTooltip = {
		event: 'hover',
		target: 'ledsOffTooltip',
		placement: 'bottom'
	};

	/**
	 * @type {import('@skeletonlabs/skeleton').PopupSettings}
	 */
	const ledsOnTooltip = {
		event: 'hover',
		target: 'ledsOnTooltip',
		placement: 'bottom'
	};

	/**
	 * @type {import('@skeletonlabs/skeleton').PopupSettings}
	 */
	const returnToLaunchTooltip = {
		event: 'hover',
		target: 'returnToLaunchTooltip',
		placement: 'bottom'
	};

	/**
	 * @type {import('@skeletonlabs/skeleton').PopupSettings}
	 */
	const autonomTooltip = {
		event: 'hover',
		target: 'autonomTooltip',
		placement: 'bottom'
	};

	/**
	 * @type {import('@skeletonlabs/skeleton').PopupSettings}
	 */
	const manualTooltip = {
		event: 'hover',
		target: 'manualTooltip',
		placement: 'bottom'
	};

	/**
	 * @type {import('@skeletonlabs/skeleton').DrawerSettings}
	 */
	const drawerLeft = {
		id: 'example-1',
		meta: { type: 'video', timestamp: 0 },
		position: 'left',
		rounded: 'rounded-r-2xl'
	};

	/**
	 * @type {import('@skeletonlabs/skeleton').DrawerSettings}
	 */
	const drawerRight = {
		id: 'example-2',
		meta: { type: 'map', lat: 0, lon: 0 },
		position: 'right',
		rounded: 'rounded-l-2xl'
	};

	initializeStores();
	const drawerStore = getDrawerStore();
</script>

<Drawer>
	{#if $drawerStore.meta.type === 'video'}
		<div class="flex flex-col w-full h-full p-4 bg-[#1c2531]">
			<video
				class="w-full h-full video-js vjs-theme-city rounded-r-2xl"
				preload="false"
				controls
				muted
				playsinline
				id="drawerStream"
			>
				<!-- <source src="MY_VIDEO.mp4" type="video/mp4" /> -->
				<source src="assets/patrick.webm" type="video/webm" />
				<p class="vjs-no-js">
					To view this video please enable JavaScript, and consider upgrading to a web browser that
					<a href="https://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a
					>
				</p>
			</video>
		</div>
		<!-- <iframe src="http://192.168.99.138:8889/mystream" scrolling="no" /> -->
	{:else if $drawerStore.meta.type === 'map'}
		<div class="flex flex-col w-full h-full p-4 bg-[#1a2331]">
			<Map />
		</div>
	{/if}
</Drawer>

<div
	class="z-50 pl-3 pr-3 pb-2.5 pt-2.5 dark:text-white text-black text-sm rounded-xl dark:bg-[#1a2432] bg-[#f3f4f6] card"
	data-popup="autonomTooltip"
>
	Autonom Mode
	<div class="dark:bg-[#1a2433] bg-[#d8dee1] arrow" />
</div>

<div
	class="z-50 pl-3 pr-3 pb-2.5 pt-2.5 dark:text-white text-black text-sm rounded-xl dark:bg-[#1a2432] bg-[#f3f4f6] card"
	data-popup="manualTooltip"
>
	Manual Mode
	<div class="dark:bg-[#1a2433] bg-[#d8dee1] arrow" />
</div>

<div
	class="z-50 pl-3 pr-3 pb-2.5 pt-2.5 dark:text-white text-black text-sm rounded-xl dark:bg-[#1a2432] bg-[#f3f4f6] card"
	data-popup="returnToLaunchTooltip"
>
	Return to Launch
	<div class="dark:bg-[#1a2433] bg-[#d8dee1] arrow" />
</div>

<div
	class="z-50 pl-3 pr-3 pb-2.5 pt-2.5 dark:text-white text-black text-sm rounded-xl dark:bg-[#1a2432] bg-[#f3f4f6] card"
	data-popup="armTooltip"
>
	Arm
	<div class="dark:bg-[#1a2433] bg-[#d8dee1] arrow" />
</div>

<div
	class="z-50 pl-3 pr-3 pb-2.5 pt-2.5 dark:text-white text-black text-sm rounded-xl dark:bg-[#1a2432] bg-[#f3f4f6] card"
	data-popup="disarmTooltip"
>
	Disarm
	<div class="dark:bg-[#1a2433] bg-[#d8dee1] arrow" />
</div>

<div
	class="z-50 pl-3 pr-3 pb-2.5 pt-2.5 dark:text-white text-black text-sm rounded-xl dark:bg-[#1a2432] bg-[#f3f4f6] card"
	data-popup="ledsOnTooltip"
>
	Leds On
	<div class="dark:bg-[#1a2433] bg-[#d8dee1] arrow" />
</div>

<div
	class="z-50 pl-3 pr-3 pb-2.5 pt-2.5 dark:text-white text-black text-sm rounded-xl dark:bg-[#1a2432] bg-[#f3f4f6] card"
	data-popup="ledsOffTooltip"
>
	Leds Off
	<div class="dark:bg-[#1a2433] bg-[#d8dee1] arrow" />
</div>

<!-- Page Container -->
<div class="container w-full h-full min-w-full min-h-full">
	<!-- Page Body -->
	<div class="flex flex-col justify-between w-full h-full min-w-full min-h-full">
		<!-- Page Header Row -->
		<div class="flex flex-row flex-wrap sm:wrap, place-content-center">
			<div
				class="place-content-center transition-opacity opacity-70 hover:opacity-90 pt-2 pb-3 pl-3 pr-3 place-items-center whitespace-nowrap justify-between rounded-b-2xl flex flex-row bg-[#f6f7f8] dark:bg-[#1e2836] space-x-5 m-0 shadow-lg"
			>
				<div class="flex flex-row">
					<button
						on:click={() => {
							$connectionStatus = !$connectionStatus;
						}}
						type="button"
						class={`py-2.5 text-sm active:ring-4 rounded-ee-full dark:shadow-lg font-medium text-white rounded-l-full hover:bg-gradient-to-br focus:outline-none shadow-lg bg-gradient-to-r ${
							$connectionStatus
								? 'px-5 from-red-500 via-red-600 to-red-700 focus:ring-red-400 dark:focus:ring-red-900 shadow-red-600/50 dark:shadow-red-900/80'
								: 'px-7 from-sky-500 via-sky-600 to-sky-700 focus:ring-sky-400 dark:focus:ring-sky-900 shadow-sky-600/50 dark:shadow-sky-900/80'
						}`}
					>
						{#if $connectionStatus === false}
							Connect
						{:else}
							Disconnects
						{/if}
					</button>
				</div>

				<div class="flex flex-row space-x-2 place-content-center place-items-center">
					<button
						use:popup={$controlMode ? autonomTooltip : manualTooltip}
						on:click={() => {
							$controlMode = !$controlMode;
						}}
						type="button"
						class={`text-white [&>*]:pointer-events-none bg-gradient-to-r active:ring-4 hover:bg-gradient-to-br focus:outline-none shadow-lg dark:shadow-lg font-medium rounded-lg text-sm px-5 py-2.5 ${
							$controlMode
								? 'from-red-500 via-red-600 to-red-700 focus:ring-red-400 dark:focus:ring-red-900 shadow-red-600/50 dark:shadow-red-900/80'
								: 'from-sky-500 via-sky-600 to-sky-700 focus:ring-sky-400 dark:focus:ring-sky-900 shadow-sky-600/50 dark:shadow-sky-900/80'
						}`}
					>
						{#if $controlMode === false}
							<IconRobotOff />
							<!-- use:popup={autonomTooltip} -->
						{:else}
							<IconRobot />
							<!-- use:popup={manualTooltip} -->
						{/if}
					</button>

					<button
						use:popup={$launchMode ? returnToLaunchTooltip : returnToLaunchTooltip}
						on:click={() => {
							$launchMode = !$launchMode;
						}}
						type="button"
						class={`text-white [&>*]:pointer-events-none bg-gradient-to-r active:ring-4 hover:bg-gradient-to-br focus:outline-none shadow-lg dark:shadow-lg font-medium rounded-lg text-sm px-5 py-2.5 ${
							$launchMode
								? 'from-red-500 via-red-600 to-red-700 focus:ring-red-400 dark:focus:ring-red-900 shadow-red-600/50 dark:shadow-red-900/80'
								: 'from-sky-500 via-sky-600 to-sky-700 focus:ring-sky-400 dark:focus:ring-sky-900 shadow-sky-600/50 dark:shadow-sky-900/80'
						}`}
					>
						<IconHomeDown />
					</button>

					<button
						use:popup={$armMode ? disarmTooltip : armTooltip}
						on:click={() => {
							$armMode = !$armMode;
						}}
						type="button"
						class={`text-white [&>*]:pointer-events-none bg-gradient-to-r active:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 hover:bg-gradient-to-br focus:outline-none shadow-lg dark:shadow-lg ${
							$armMode
								? 'from-red-500 via-red-600 to-red-700 focus:ring-red-400 dark:focus:ring-red-900 shadow-red-600/50 dark:shadow-red-900/80'
								: 'from-sky-500 via-sky-600 to-sky-700 focus:ring-sky-400 dark:focus:ring-sky-900 shadow-sky-600/50 dark:shadow-sky-900/80'
						}`}
					>
						{#if $armMode === false}
							<IconLockOpen />
						{:else}
							<IconLock />
						{/if}
					</button>

					<button
						use:popup={$ledStatus ? ledsOnTooltip : ledsOffTooltip}
						on:click={() => {
							$ledStatus = !$ledStatus;
						}}
						type="button"
						class={`text-white [&>*]:pointer-events-none bg-gradient-to-r active:ring-4 hover:bg-gradient-to-br focus:outline-none shadow-lg dark:shadow-lg font-medium rounded-lg text-sm px-5 py-2.5 ${
							$ledStatus
								? 'from-red-500 via-red-600 to-red-700 focus:ring-red-400 dark:focus:ring-red-900 shadow-red-600/50 dark:shadow-red-900/80'
								: 'from-sky-500 via-sky-600 to-sky-700 focus:ring-sky-400 dark:focus:ring-sky-900 shadow-sky-600/50 dark:shadow-sky-900/80'
						}`}
					>
						{#if $ledStatus === false}
							<IconSunOff />
						{:else}
							<IconSun />
						{/if}
					</button>

					<button
						class="bg-black rounded-lg"
						on:click={() => {
							drawerStore.open(drawerLeft);
						}}
					>
						ODL
					</button>

					<button
						class="bg-black rounded-lg"
						on:click={() => {
							drawerStore.open(drawerRight);
						}}
					>
						ODR
					</button>
				</div>

				<div class="flex flex-row">
					<select
						class="pt-2.5 pb-2.5 text-sm font-medium rounded-r-full rounded-es-full text-center active:ring-4 shadow-lg text-sky-700 dark:text-sky-400 shadow-sky-600/50 dark:shadow-lg dark:shadow-sky-900/80 select"
					>
						{#each Object.entries($selectedPort) as [id, port]}
							<option value={port}>{port}</option>
						{/each}
					</select>
				</div>
			</div>
		</div>
		<!-- Videostream and Map Row -->

		<div class="grid w-full grid-cols-2 pl-4 pr-4 space-x-2 h-3/5">
			<!-- Video Stream -->
			<div class="grid grid-cols-1">
				<video
					class="w-full h-full rounded-xl video-js vjs-theme-city"
					preload="false"
					controls
					muted
					playsinline
					id="stream"
				>
					<!-- <source src="MY_VIDEO.mp4" type="video/mp4" /> -->
					<source src="assets/patrick.webm" type="video/webm" />
					<p class="vjs-no-js">
						To view this video please enable JavaScript, and consider upgrading to a web browser
						that
						<a href="https://videojs.com/html5-video-support/" target="_blank"
							>supports HTML5 video</a
						>
					</p>
				</video>
				<!-- <iframe src="http://192.168.99.138:8889/mystream" scrolling="no" /> -->
			</div>

			<!-- Map -->
			<div class="z-0 grid grid-cols-1 border-none select-none">
				<Map />
			</div>
		</div>

		<!-- Gauge Row -->
		<div
			class="self-center justify-center w-full overflow-hidden overflow-x-scroll hide-scrollbar place-content-center scroll-auto"
		>
			<Gauge />
		</div>
	</div>
</div>
<slot />
