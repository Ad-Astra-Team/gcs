<script>
	// @ts-nocheck

	//Importing Map
	import Map from '$lib/Maps/Map.svelte';

	//Importing Tabler Icon Pack
	import {
		IconHomeDown,
		IconLock,
		IconLockOpen,
		IconRobot,
		IconRobotOff,
		IconSun,
		IconSunOff
	} from '@tabler/icons-svelte';

	//Importing Variables From Stores
	import {
		armMode,
		controlMode,
		launchMode,
		selectedPort,
		portSelection,
		connectionStatus,
		ledStatus,
		mapRadioButton,
		selectedVoiceAssistant
	} from '$lib/Utils/stores';

	//Importing Skeleton's Properties
	import {
		popup,
		storePopup,
		initializeStores,
		Drawer,
		getDrawerStore,
		RadioGroup,
		RadioItem
	} from '@skeletonlabs/skeleton';

	import 'video.js/dist/video';
	import 'video.js/dist/video-js.min.css';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import { PLYLoader } from 'three/examples/jsm/Addons.js';
	import { get } from 'svelte/store';
	import { DomEvent } from 'leaflet';
	import { onMount } from 'svelte';
	//Importing Transitions From Svelte
	import { fade } from 'svelte/transition';

	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	//Left Drawer Configurations
	/**
	 * @type {import('@skeletonlabs/skeleton').DrawerSettings}
	 */
	const drawerLeft = {
		id: 'example-1',
		meta: { type: 'video', timestamp: 0 },
		position: 'left',
		rounded: 'rounded-r-2xl'
	};

	//Right Drawer Configurations
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

	//Drawer Function's Variable
	const drawerStore = getDrawerStore();

	// gallery.contrib('gaugeDiv');

	//Audio Variables
	var ArmMode = new Audio();
	ArmMode.src = 'buttonSounds/MArmMode.mp3';
	var AutonomMode = new Audio();
	AutonomMode.src = 'buttonSounds/MAutonomMode.mp3';
	var Connected = new Audio();
	Connected.src = 'buttonSounds/MConnected.mp3';
	var DisarmMode = new Audio();
	DisarmMode.src = 'buttonSounds/MDisarmMode.mp3';
	var Disconnected = new Audio();
	Disconnected.src = 'buttonSounds/MDisconnected.mp3';
	var LedsOff = new Audio();
	LedsOff.src = 'buttonSounds/MLedsOff.mp3';
	var LedsOn = new Audio();
	LedsOn.src = 'buttonSounds/MLedsOn.mp3';
	var ManualMode = new Audio();
	LedsOn.src = 'buttonSounds/MManualMode.mp3';
	var ReturnToLaunch = new Audio();
	ReturnToLaunch.src = 'buttonSounds/MReturnToLaunch.mp3';

	//Function For Playing an Audio
	function dashboardPlayButtonSound(source) {
		var sound = new Audio();
		sound.src = source;
		sound.play();
	}

	let mapWrapper;
	let mapOnDrawer;
	let mapOnPage;

	const goMapDrawer = () => {
		mapOnDrawer.appendChild(mapWrapper);
	};

	const goMapPage = () => {
		mapOnPage.appendChild(mapWrapper);
	};
	onMount(() => {
		goMapPage();
	});
</script>

<div class="container w-full h-full min-w-full min-h-full" bind:this={mapWrapper}>
	<Map />
</div>

<!-- Video and Map Drawer's Body -->
<Drawer
	on:backdrop={() => {
		goMapPage();
	}}
	on:drawer={() => {
		goMapDrawer();
	}}
>
	<!-- Video' Drawer -->
	{#if $drawerStore.meta.type === 'video'}
		<!-- <iframe src="http://192.168.99.138:8889/mystream" scrolling="no" /> -->

		<!-- Video's Outer Div -->
		<div class="flex flex-row rounded-3xl w-full h-full p-3 bg-[#f3f4f6] dark:bg-[#1f2836]">
			<!-- <iframe
				src="http://localhost:8888/cam/"
				scrolling="no"
				class="w-full h-full video-js vjs-theme-city rounded-2xl"
			/> -->

			<!-- Video -->
			<video
				class="w-full h-full video-js vjs-theme-city rounded-2xl"
				preload="false"
				controls
				muted
				playsinline
				id="drawerStream"
			>
				<source src="assets/patrick.webm" type="video/webm" />
				<p class="vjs-no-js">
					To view this video please enable JavaScript, and consider upgrading to a web browser that
					<a href="https://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a
					>
				</p>
			</video>
		</div>
		<!-- Map's Drawer -->
	{:else if $drawerStore.meta.type === 'map'}
		<!-- Map's Outer Div -->
		<div class="flex flex-row rounded-3xl w-full h-full p-3 bg-[#f3f4f6] dark:bg-[#1f2836]">
			<!-- Map/Slam Radio Buttons -->
			<div class="absolute z-50 flex top-3 left-49">
				<RadioGroup
					background="bg-gray-800"
					display="flex"
					border="border-none"
					padding="px-5 py-0.5"
					rounded="rounded-ss-2xl rounded-ee-2xl"
					active="bg-sky-500 dark:bg-sky-600"
				>
					<RadioItem bind:group={$mapRadioButton} name="justify" value={true}>
						<i style="font-family: Nevan;" class="text-white">MAP</i></RadioItem
					>
					<RadioItem bind:group={$mapRadioButton} name="justify" value={false}
						><i style="font-family: Nevan;" class="text-white">SLAM</i></RadioItem
					>
				</RadioGroup>
			</div>

			<!-- Map or Slam Map Condition -->
			{#if $mapRadioButton === true}
				<div class="w-full h-full min-w-full min-h-full" bind:this={mapOnDrawer} />
			{:else if $mapRadioButton === false}
				<canvas class="w-full h-full" />
			{/if}
		</div>
	{/if}
</Drawer>

<!-- Tooltip's Bodies -->
<div
	class="z-50 px-3 py-2.5 dark:text-white text-black text-sm rounded-xl dark:bg-[#1a2432] bg-[#f3f4f6] card"
	data-popup="autonomTooltip"
>
	Autonom Mode
	<div class="dark:bg-[#1a2433] bg-[#d8dee1] arrow" />
</div>

<div
	class="z-50 px-3 py-2.5 dark:text-white text-black text-sm rounded-xl dark:bg-[#1a2432] bg-[#f3f4f6] card"
	data-popup="manualTooltip"
>
	Manual Mode
	<div class="dark:bg-[#1a2433] bg-[#d8dee1] arrow" />
</div>

<div
	class="z-50 px-3 py-2.5 dark:text-white text-black text-sm rounded-xl dark:bg-[#1a2432] bg-[#f3f4f6] card"
	data-popup="returnToLaunchTooltip"
>
	Return to Launch
	<div class="dark:bg-[#1a2433] bg-[#d8dee1] arrow" />
</div>

<div
	class="z-50 px-3 py-2.5 dark:text-white text-black text-sm rounded-xl dark:bg-[#1a2432] bg-[#f3f4f6] card"
	data-popup="armTooltip"
>
	Arm Mode
	<div class="dark:bg-[#1a2433] bg-[#d8dee1] arrow" />
</div>

<div
	class="z-50 px-3 py-2.5 dark:text-white text-black text-sm rounded-xl dark:bg-[#1a2432] bg-[#f3f4f6] card"
	data-popup="disarmTooltip"
>
	Disarm Mode
	<div class="dark:bg-[#1a2433] bg-[#d8dee1] arrow" />
</div>

<div
	class="z-50 px-3 py-2.5 dark:text-white text-black text-sm rounded-xl dark:bg-[#1a2432] bg-[#f3f4f6] card"
	data-popup="ledsOnTooltip"
>
	Leds On
	<div class="dark:bg-[#1a2433] bg-[#d8dee1] arrow" />
</div>

<div
	class="z-50 px-3 py-2.5 dark:text-white text-black text-sm rounded-xl dark:bg-[#1a2432] bg-[#f3f4f6] card"
	data-popup="ledsOffTooltip"
>
	Leds Off
	<div class="dark:bg-[#1a2433] bg-[#d8dee1] arrow" />
</div>

<!-- Page Container -->
<div class="container flex flex-col w-full h-full min-w-full min-h-full">
	<!-- Page Body -->
	<div class="flex flex-col justify-between w-full h-full">
		<!-- Page Header Row -->
		<div class="flex flex-row place-content-center drop-shadow-2xl">
			<!-- Page Header -->
			<div
				in:fade={{ delay: 200, duration: 250 }}
				class=" drop-shadow-2xl transition-opacity opacity-60 hover:opacity-90 py-3.5 px-3 rounded-b-3xl flex flex-row bg-surface-100-800-token space-x-6 shadow-lg"
			>
				<!-- Left Section of Page Header -->
				<div class="flex flex-row shadow-2xl drop-shadow-2xl">
					<!-- Connectiion Button -->
					<button
						on:click={() => {
							$connectionStatus = !$connectionStatus;

							if ($connectionStatus === true && $selectedVoiceAssistant === 'Man') {
								dashboardPlayButtonSound('buttonSounds/MConnected.mp3');
								console.log('Connect button sound played.');
							} else if ($connectionStatus === true && $selectedVoiceAssistant === 'Woman') {
								dashboardPlayButtonSound('buttonSounds/FConnected.mp3');
								console.log('Disconnect button sound played.');
							} else if ($connectionStatus === false && $selectedVoiceAssistant === 'Man') {
								dashboardPlayButtonSound('buttonSounds/MDisconnected.mp3');
							} else if ($connectionStatus === false && $selectedVoiceAssistant === 'Woman') {
								dashboardPlayButtonSound('buttonSounds/FDisconnected.mp3');
							}
						}}
						class={`py-2.5 text-sm active:ring-4 rounded-ee-full text-white rounded-l-full hover:bg-gradient-to-br focus:outline-none shadow-lg bg-gradient-to-r ${
							$connectionStatus
								? 'px-5 from-red-500 via-red-600 to-red-700 focus:ring-red-400 dark:focus:ring-red-900 shadow-red-600/50 dark:shadow-red-900/80'
								: 'px-7 from-sky-500 via-sky-600 to-sky-700 focus:ring-sky-400 dark:focus:ring-sky-900 shadow-sky-600/50 dark:shadow-sky-900/80'
						}`}
					>
						{#if $connectionStatus === false}
							Connect
						{:else}
							Disconnect
						{/if}
					</button>
				</div>

				<!-- Middle Section of Page Header -->
				<div class="flex flex-row space-x-2 shadow-2xl drop-shadow-2xl">
					<!-- Control Mode Button -->
					<button
						use:popup={$controlMode
							? { event: 'hover', target: 'autonomTooltip', placement: 'bottom' }
							: { event: 'hover', target: 'manualTooltip', placement: 'bottom' }}
						on:click={() => {
							$controlMode = !$controlMode;

							if ($controlMode === true && $selectedVoiceAssistant === 'Man') {
								dashboardPlayButtonSound('buttonSounds/MManualMode.mp3');
								console.log('Connect button sound played.');
							} else if ($controlMode === true && $selectedVoiceAssistant === 'Woman') {
								dashboardPlayButtonSound('buttonSounds/FManualMode.mp3');
								console.log('Disconnect button sound played.');
							} else if ($controlMode === false && $selectedVoiceAssistant === 'Man') {
								dashboardPlayButtonSound('buttonSounds/MAutonomMode.mp3');
							} else if ($controlMode === false && $selectedVoiceAssistant === 'Woman') {
								dashboardPlayButtonSound('buttonSounds/FAutonomMode.mp3');
							}
						}}
						class={`text-white drop-shadow-2xl [&>*]:pointer-events-none bg-gradient-to-r active:ring-4 hover:bg-gradient-to-br focus:outline-none shadow-lg rounded-lg px-6 py-2.5 ${
							$controlMode
								? 'from-red-500 via-red-600 to-red-700 focus:ring-red-400 dark:focus:ring-red-900 shadow-red-600/50 dark:shadow-red-900/80'
								: 'from-sky-500 via-sky-600 to-sky-700 focus:ring-sky-400 dark:focus:ring-sky-900 shadow-sky-600/50 dark:shadow-sky-900/80'
						}`}
					>
						{#if $controlMode === false}
							<IconRobotOff />
						{:else}
							<IconRobot />
						{/if}
					</button>

					<!-- Return to Launch Button -->
					<button
						use:popup={$launchMode
							? { event: 'hover', target: 'returnToLaunchTooltip', placement: 'bottom' }
							: { event: 'hover', target: 'returnToLaunchTooltip', placement: 'bottom' }}
						on:click={() => {
							$launchMode = !$launchMode;

							if ($launchMode === true && $selectedVoiceAssistant === 'Man') {
								dashboardPlayButtonSound('buttonSounds/MReturnToLaunch.mp3');
								console.log('Connect button sound played.');
							} else if ($launchMode === true && $selectedVoiceAssistant === 'Woman') {
								dashboardPlayButtonSound('buttonSounds/FReturnToLaunch.mp3');
								console.log('Disconnect button sound played.');
							}
						}}
						class={`text-white drop-shadow-2xl [&>*]:pointer-events-none bg-gradient-to-r active:ring-4 hover:bg-gradient-to-br focus:outline-none shadow-lg rounded-lg px-6 py-2.5 ${
							$launchMode
								? 'from-red-500 via-red-600 to-red-700 focus:ring-red-400 dark:focus:ring-red-900 shadow-red-600/50 dark:shadow-red-900/80'
								: 'from-sky-500 via-sky-600 to-sky-700 focus:ring-sky-400 dark:focus:ring-sky-900 shadow-sky-600/50 dark:shadow-sky-900/80'
						}`}
					>
						<IconHomeDown />
					</button>

					<!-- Arm-Disarm Mode Button -->
					<button
						use:popup={$armMode
							? { event: 'hover', target: 'disarmTooltip', placement: 'bottom' }
							: { event: 'hover', target: 'armTooltip', placement: 'bottom' }}
						on:click={() => {
							$armMode = !$armMode;

							if ($armMode === true && $selectedVoiceAssistant === 'Man') {
								dashboardPlayButtonSound('buttonSounds/MArmMode.mp3');
								console.log('Connect button sound played.');
							} else if ($armMode === true && $selectedVoiceAssistant === 'Woman') {
								dashboardPlayButtonSound('buttonSounds/FArmMode.mp3');
								console.log('Disconnect button sound played.');
							} else if ($armMode === false && $selectedVoiceAssistant === 'Man') {
								dashboardPlayButtonSound('buttonSounds/MDisarmMode.mp3');
							} else if ($armMode === false && $selectedVoiceAssistant === 'Woman') {
								dashboardPlayButtonSound('buttonSounds/FDisarmMode.mp3');
							}
						}}
						class={`text-white drop-shadow-2xl  [&>*]:pointer-events-none bg-gradient-to-r active:ring-4 rounded-lg px-6 py-2.5 hover:bg-gradient-to-br focus:outline-none shadow-lg ${
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
					<!-- Led Controller Button -->
					<button
						use:popup={$ledStatus
							? { event: 'hover', target: 'ledsOnTooltip', placement: 'bottom' }
							: { event: 'hover', target: 'ledsOffTooltip', placement: 'bottom' }}
						on:click={() => {
							$ledStatus = !$ledStatus;

							if ($ledStatus === true && $selectedVoiceAssistant === 'Man') {
								dashboardPlayButtonSound('buttonSounds/MLedsOff.mp3');
								console.log('Connect button sound played.');
							} else if ($ledStatus === true && $selectedVoiceAssistant === 'Woman') {
								dashboardPlayButtonSound('buttonSounds/FLedsOff.mp3');
								console.log('Disconnect button sound played.');
							} else if ($ledStatus === false && $selectedVoiceAssistant === 'Man') {
								dashboardPlayButtonSound('buttonSounds/MLedsOn.mp3');
							} else if ($ledStatus === false && $selectedVoiceAssistant === 'Woman') {
								dashboardPlayButtonSound('buttonSounds/FLedsOn.mp3');
							}
						}}
						class={`text-white drop-shadow-2xl [&>*]:pointer-events-none bg-gradient-to-r active:ring-4 hover:bg-gradient-to-br focus:outline-none shadow-lg rounded-lg  px-6 py-2.5 ${
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

					<!-- Left Drawer Button -->
					<button
						on:click={() => {
							drawerStore.open(drawerLeft);
						}}
					>
						ODL
					</button>

					<!-- Right Drawer Button -->
					<button
						on:click={() => {
							drawerStore.open(drawerRight);
						}}
					>
						ODR
					</button>
				</div>

				<!-- Right Section of Page Header -->
				<div class="flex flex-row shadow-2xl drop-shadow-2xl">
					<!-- Port Selection -->
					<select
						bind:value={$selectedPort}
						class="py-2.5 text-sm rounded-r-full rounded-es-full text-center active:ring-4 shadow-lg text-sky-700 dark:text-sky-400 shadow-sky-600/50 dark:shadow-lg dark:shadow-sky-900/80 select"
					>
						{#each $portSelection as port}
							<option value={port}>{port}</option>
						{/each}
					</select>
				</div>
			</div>
		</div>

		<!-- Videostream and Map Row -->
		<div
			in:fade={{ delay: 300, duration: 500 }}
			class="grid w-full grid-cols-2 px-4 space-x-2 drop-shadow-2xl h-3/5"
		>
			<!-- Video Stream Div-->
			<div class="border-8 border-gray-800 shadow-2xl rounded-3xl">
				<!-- Video Stream -->
				<video
					class="w-full h-full shadow-2xl drop-shadow-2xl video-js vjs-theme-city rounded-2xl"
					preload="false"
					controls
					muted
					playsinline
					id="stream"
				>
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
			<div class="relative z-0 border-8 border-gray-800 shadow-2xl drop-shadow-2xl rounded-3xl">
				<div class="absolute -top-0.5 -left-0.5 z-50">
					<RadioGroup
						background="bg-gray-800"
						display="flex"
						border="border-none"
						padding="px-5 py-0.5"
						rounded="rounded-ss-2xl rounded-ee-2xl"
						active="bg-sky-500 dark:bg-sky-600"
					>
						<RadioItem bind:group={$mapRadioButton} name="justify" value={true}>
							<i style="font-family: Nevan;" class="text-white">MAP</i></RadioItem
						>
						<RadioItem bind:group={$mapRadioButton} name="justify" value={false}
							><i style="font-family: Nevan;" class="text-white">SLAM</i></RadioItem
						>
					</RadioGroup>
				</div>

				{#if $mapRadioButton === true}
					<div class="w-full h-full min-w-full min-h-full" bind:this={mapOnPage} />
				{:else if $mapRadioButton === false}
					<canvas class="w-full h-full"></canvas>
				{/if}
			</div>
		</div>

		<!-- Gauge Row -->
		<div class="w-full overflow-hidden overflow-x-scroll hide-scrollbar scroll-auto" id="gaugeDiv">
			<!-- <Gauge /> -->
		</div>
	</div>
</div>
<slot />
