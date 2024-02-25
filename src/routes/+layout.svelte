<script>
	import '../app.postcss';
	import { page } from '$app/stores';
	import { listen, TauriEvent } from '@tauri-apps/api/event';
	import { exit } from '@tauri-apps/api/process';

	//Importing Skeleton's components
	import {
		AppShell,
		AppBar,
		AppRail,
		AppRailAnchor,
		LightSwitch,
		initializeStores,
		FileButton,
		Modal,
		getModalStore,
		popup,
		storePopup
	} from '@skeletonlabs/skeleton';

	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	//Importing Tabler's icon pack
	import {
		IconLayout,
		IconHome,
		IconSettings,
		IconMenu2,
		IconTerminal2,
		IconChecklist,
		IconInfoOctagon,
		IconAlignBoxRightMiddle,
		IconBattery4,
		IconBattery3,
		IconBattery2,
		IconBattery1,
		IconBatteryOff,
		IconSatellite,
		IconAntenna,
		IconAntennaOff,
		IconCircleCheck,
		IconAlertHexagon,
		IconX,
		IconRotate2,
		IconRotateClockwise2
	} from '@tabler/icons-svelte';

	// Necessary importations for navbar's transition
	import { slide } from 'svelte/transition';
	import { quadInOut, quintIn, quintInOut, quintOut } from 'svelte/easing';

	// Importing variables from stores.js
	import {
		leftNavActive,
		rightBarActive,
		heartbeat,
		last_heartbeat,
		uav_batteryVoltage,
		uav_gpsStatus,
		uav_networkStatus,
		pingStatus,
		raspberryBoot,
		pixhawkBoot,
		GPSTest,
		lidarTest,
		pitotTest,
		cameraTest,
		IMUTest,
		motorTest,
		notepadText
	} from '$lib/Utils/stores';

	import { handleIsTauri } from '$lib/Utils/helper';
	import { onMount } from 'svelte';
	import { invoke } from '@tauri-apps/api/tauri';
	import { tauri } from '@tauri-apps/api';

	//Tooltip features
	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	//Configurations for raspberry pi reboot button's tooltip

	/**
	 * @type {import('@skeletonlabs/skeleton').PopupSettings}
	 */
	const raspberryTooltip = {
		event: 'hover',
		target: 'raspberryTooltip',
		placement: 'top'
	};

	//Configurations for pixhawk reboot button's tooltip

	/**
	 * @type {import('@skeletonlabs/skeleton').PopupSettings}
	 */
	const pixhawkTooltip = {
		event: 'hover',
		target: 'pixhawkTooltip',
		placement: 'top'
	};

	/**
	 * @type {import('@skeletonlabs/skeleton').PopupSettings}
	 */
	const homePageTooltip = {
		event: 'hover',
		target: 'homePageTooltip',
		placement: 'right'
	};

	/**
	 * @type {import('@skeletonlabs/skeleton').PopupSettings}
	 */
	const dashboardPageTooltip = {
		event: 'hover',
		target: 'dashboardPageTooltip',
		placement: 'right'
	};

	/**
	 * @type {import('@skeletonlabs/skeleton').PopupSettings}
	 */
	const telemetryPageTooltip = {
		event: 'hover',
		target: 'telemetryPageTooltip',
		placement: 'right'
	};

	/**
	 * @type {import('@skeletonlabs/skeleton').PopupSettings}
	 */
	const testPageTooltip = {
		event: 'hover',
		target: 'testPageTooltip',
		placement: 'right'
	};

	/**
	 * @type {import('@skeletonlabs/skeleton').PopupSettings}
	 */
	const aboutPageTooltip = {
		event: 'hover',
		target: 'aboutPageTooltip',
		placement: 'right'
	};

	/**
	 * @type {import('@skeletonlabs/skeleton').PopupSettings}
	 */
	const settingsPageTooltip = {
		event: 'hover',
		target: 'settingsPageTooltip',
		placement: 'right'
	};

	initializeStores();

	onMount(() => {
		// Listen backend-heartbeat event

		listen('backend-heartbeat', function (evt) {
			$heartbeat = true;
			$last_heartbeat = evt.payload;
			// If tauri loaded
			if (handleIsTauri()) {
				invoke('increase_packet_counter');
			}
		});

		// If backend-heartbeat event is not received in 5 seconds, set heartbeat to false
		setTimeout(() => {
			if (Date.now() - $last_heartbeat > 4900) $heartbeat = false;
		}, 5000);
	});

	//Assigning getModalStore function to modalStore variable
	const modalStore = getModalStore();

	//Configurations for Exit Modal
	/**
	 * @type {import('@skeletonlabs/skeleton').ModalSettings}
	 */
	const exitModal = {
		type: 'confirm',
		// Data
		title: 'Confirm Exit',
		body: 'Are you sure you want to exit?',
		// TRUE if confirm pressed, FALSE if cancel pressed
		/**
		 * @param {boolean} r
		 */
		response: (r) => {
			if (r) invoke('exit_app');
		}
	};

	//Configurations for Raspberry Pi Reboot Modal
	/**
	 * @type {import('@skeletonlabs/skeleton').ModalSettings}
	 */
	const raspberryModal = {
		type: 'confirm',
		// Data
		title: 'Confirm Reboot',
		body: 'Are you sure you want to reboot Raspberry Pi?',
		// TRUE if confirm pressed, FALSE if cancel pressed
		/**
		 * @param {boolean} r
		 */
		response: (r) => console.log('response:', r)
	};

	//Configurations for Pixhawk Reboot Modal
	/**
	 * @type {import('@skeletonlabs/skeleton').ModalSettings}
	 */
	const pixhawkModal = {
		type: 'confirm',
		// Data
		title: 'Confirm Reboot',
		body: 'Are you sure you want to reboot Pixhawk?',
		// TRUE if confirm pressed, FALSE if cancel pressed
		/**
		 * @param {boolean} r
		 */
		response: (r) => tauri
	};
</script>

<!-- Modal component's call -->
<Modal
	padding="p-6"
	rounded="rounded-2xl"
	shadow="shadow-xl"
	buttonPositive="bg-red-700 font-semibold text-white"
	buttonNeutral="dark:border-white border-black border-2 font-semibold"
/>

<div
	class="z-50 pl-3 pr-3 pb-2.5 pt-2.5 dark:text-white text-black text-sm rounded-xl dark:bg-[#1a2432] bg-[#f3f4f6] card"
	data-popup="raspberryTooltip"
>
	Raspberry PI Reboot
	<div class="dark:bg-[#1a2433] bg-[#d8dee1] arrow" />
</div>

<div
	class="z-50 pl-3 pr-3 pb-2.5 pt-2.5 dark:text-white text-black text-sm rounded-xl dark:bg-[#1a2432] bg-[#f3f4f6] card"
	data-popup="pixhawkTooltip"
>
	Pixhawk Reboot
	<div class="" />
</div>

<div
	class="z-50 pl-3 pr-3 pb-2.5 pt-2.5 dark:text-white text-black text-sm rounded-xl dark:bg-[#1a2432] bg-[#f3f4f6] card"
	data-popup="homePageTooltip"
>
	Home
	<div class="dark:bg-[#1a2433] bg-[#d8dee1] arrow" />
</div>

<div
	class="z-50 pl-3 pr-3 pb-2.5 pt-2.5 dark:text-white text-black text-sm rounded-xl dark:bg-[#1a2432] bg-[#f3f4f6] card"
	data-popup="dashboardPageTooltip"
>
	Dashboard
	<div class="dark:bg-[#1a2433] bg-[#d8dee1] arrow" />
</div>

<div
	class="z-50 pl-3 pr-3 pb-2.5 pt-2.5 dark:text-white text-black text-sm rounded-xl dark:bg-[#1a2432] bg-[#f3f4f6] card"
	data-popup="telemetryPageTooltip"
>
	Telemetry
	<div class="dark:bg-[#1a2433] bg-[#d8dee1] arrow" />
</div>

<div
	class="z-50 pl-3 pr-3 pb-2.5 pt-2.5 dark:text-white text-black text-sm rounded-xl dark:bg-[#1a2432] bg-[#f3f4f6] card"
	data-popup="testPageTooltip"
>
	Test
	<div class="dark:bg-[#1a2433] bg-[#d8dee1] arrow" />
</div>

<div
	class="z-50 pl-3 pr-3 pb-2.5 pt-2.5 dark:text-white text-black text-sm rounded-xl dark:bg-[#1a2432] bg-[#f3f4f6] card"
	data-popup="aboutPageTooltip"
>
	About
	<div class="dark:bg-[#1a2433] bg-[#d8dee1] arrow" />
</div>

<div
	class="z-50 pl-3 pr-3 pb-2.5 pt-2.5 dark:text-white text-black text-sm rounded-xl dark:bg-[#1a2432] bg-[#f3f4f6] card"
	data-popup="settingsPageTooltip"
>
	Settings
	<div class="dark:bg-[#1a2433] bg-[#d8dee1] arrow" />
</div>

<!-- App Shell -->
<AppShell scrollbarGutter="stable" regionPage="overflow-hidden hide-scrollbar">
	<!-- Header -->
	<svelte:fragment slot="header">
		<AppBar
			gridColumns="grid-cols-3"
			slotDefault="place-self-center"
			padding="p-0"
			spacing="space-y-0"
			slotTrail="place-content-end"
			shadow="shadow-2xl drop-shadow-2xl"
		>
			<!-- Left Section of Header -->
			<svelte:fragment slot="lead">
				<!-- Left Section's Outer Container -->
				<div class="flex flex-row justify-between w-full place-content-center place-items-center">
					<!-- (1) Container for Navbar Button -->
					<div
						class="flex flex-row cursor-pointer w-14 h-14 hover:bg-primary-hover-token place-content-center place-items-center"
						on:click={() => {
							$leftNavActive = !$leftNavActive;
						}}
					>
						<IconMenu2 class="w-8 h-8" />
					</div>

					<!-- Don't show the Status Section at Home or About Pages -->
					{#if $page.url.pathname !== '/' && $page.url.pathname !== '/about'}
						<!-- (2) Status Section's Container -->
						<div
							class="flex flex-row space-x-6 w-14 h-14 lg:mr-20 md:m-0 sm:m-0 place-content-end place-items-center"
						>
							<!-- GPS Status -->
							<div class="flex flex-row">
								<IconSatellite class={`w-7 h-7 ${$uav_gpsStatus ? '' : 'text-[#ff0000]'}`} />
							</div>

							<!-- Communication Status -->
							<div class="flex flex-row">
								{#if $uav_networkStatus === true}
									<IconAntenna class="w-7 h-7" />
								{:else}
									<IconAntennaOff class="w-7 h-7 text-[#ff0000]" />
								{/if}
							</div>

							<!-- Battery Status -->
							<div class="flex flex-row">
								<!-- Adjusting the Battery view depending on the voltage of the battery -->
								{#if $uav_batteryVoltage >= 15.93}
									<IconBattery4 class="w-7 h-7" />
								{:else if $uav_batteryVoltage >= 15.34}
									<IconBattery3 class="w-7 h-7" />
								{:else if $uav_batteryVoltage >= 14.99}
									<IconBattery2 class="w-7 h-7" />
								{:else if $uav_batteryVoltage >= 13.09}
									<IconBattery1 class="w-7 h-7" />
								{:else if $uav_batteryVoltage < 13.09}
									<IconBatteryOff class="w-7 h-7 text-[#ff0000]" />
								{/if}
							</div>
						</div>
					{/if}
				</div>
			</svelte:fragment>

			<!-- Middle Section of Header -->
			<!-- Middle Section's Outer Container -->
			<div class="flex flex-row items-center p-0 m-0 place-content-center checked:">
				<!-- Ad Astra Logo -->
				<p
					data-tauri-drag-region
					class="pt-1 pb-0 pl-0 pr-0 m-0 text-2xl text-center text-black border-8 border-none cursor-default active:cursor-grab hover:cursor-grab focus dark:text-white"
					style="font-family: Nevan;"
				>
					S . A . F . İ . R
				</p>
			</div>

			<!-- Right Section of Header -->
			<svelte:fragment slot="trail">
				<!-- Right Section's Outer Container (Don't show the Status Section and Databar Button, show only Exit Button if you're in Home or About Page) -->
				<div
					class={`flex flex-row place-content-center place-items-center ${
						$page.url.pathname !== '/' && $page.url.pathname !== '/about'
							? 'justify-between w-full h-full'
							: 'cursor-pointer w-14 h-14 hover:bg-primary-token'
					}`}
				>
					{#if $page.url.pathname !== '/' && $page.url.pathname !== '/about'}
						<!-- (1) Status Section -->
						<div
							class="flex flex-row w-full h-full space-x-6 lg:ml-20 md:m-0 sm:m-0 place-content-start place-items-center"
						>
							<!-- Latency Status -->
							<div class="flex flex-row">
								<!-- Adjusting the Latency view depending on the latency value with conditional rendering and styling -->
								<p
									style="font-family: Nevan;"
									class={`p-0 m-0 border-none text-md place-items-center ${
										$pingStatus >= 9999 || $pingStatus >= 900
											? 'text-[#ff0000]'
											: $pingStatus >= 100
											? 'text-yellow-400'
											: $pingStatus >= 0
											? 'text-blue-500 dark:text-sky-500'
											: ''
									}`}
								>
									{#if $pingStatus >= 9999}
										> 9999 <span class="font-sans text-xs font-bold text-w">ms</span>
									{:else}
										{$pingStatus} <span class="font-sans text-xs font-bold">ms</span>
									{/if}
								</p>
							</div>

							<!-- Heartbeat Status -->
							<div class="flex flex-row">
								<!-- Adjusting the Hearbeat view depending on the Heartbeat's boolean value -->
								{#if $heartbeat}
									<IconCircleCheck class="w-8 h-8 text-blue-500 dark:text-sky-500" />
								{:else}
									<IconAlertHexagon class="w-8 h-8 text-red-700" />
								{/if}
							</div>
						</div>

						<!-- (2) Exit and Databar Buttons -->
						<div class="flex flex-row">
							<!-- Databar Button -->
							<div
								class="flex flex-row cursor-pointer w-14 h-14 hover:bg-primary-hover-token place-content-center place-items-center"
								on:click={() => {
									$rightBarActive = !$rightBarActive;
								}}
							>
								<IconAlignBoxRightMiddle class="w-8 h-8" />
							</div>

							<!-- Exit Button -->
							<div
								class="flex flex-row cursor-pointer w-14 h-14 place-content-center place-items-center"
							>
								<button
									on:click={() => {
										modalStore.trigger(exitModal);
									}}
									class="flex w-full h-full cursor-pointer hover:bg-red-700 dark:hover:bg-red-900 place-content-center place-items-center"
								>
									<IconX class="w-8 h-8" />
								</button>
							</div>
						</div>
					{:else}
						<!-- Exit Button -->
						<button
							class="flex w-full h-full cursor-pointer hover:bg-red-800 place-content-center place-items-center"
							on:click={() => {
								modalStore.trigger(exitModal);
							}}
						>
							<IconX class="w-8 h-8" />
						</button>
					{/if}
				</div>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<!-- App Rail -->
	<!-- Navbar -->
	<svelte:fragment slot="sidebarLeft">
		<!-- Activate the Navbar if Navbar Button pressed -->
		{#if $leftNavActive}
			<!-- Navbar's Outer Container -->
			<div
				transition:slide={{ delay: 20, duration: 300, easing: quintOut, axis: 'x' }}
				class="h-full"
			>
				<!-- AppRail Component that let us make a Navbar -->
				<AppRail width="w-14">
					<!-- Top Section of Navbar -->
					<svelte:fragment slot="lead">
						<!-- Home Page Button -->
						<div use:popup={homePageTooltip}>
							<AppRailAnchor
								href="/"
								selected={$page.url.pathname === '/'}
								active="bg-[#e0e8f6] dark:bg-[#22324a] "
							>
								<svelte:fragment slot="lead">
									<IconHome />
								</svelte:fragment>
							</AppRailAnchor>
						</div>

						<!-- Dashboard Page Button -->
						<div use:popup={dashboardPageTooltip}>
							<AppRailAnchor
								href="/dashboard"
								active="bg-[#e0e8f6] dark:bg-[#22324a]"
								selected={$page.url.pathname === '/dashboard'}
							>
								<svelte:fragment slot="lead">
									<IconLayout />
								</svelte:fragment>
							</AppRailAnchor>
						</div>

						<!-- Telemetry Page Button -->
						<div use:popup={telemetryPageTooltip}>
							<AppRailAnchor
								href="/telemetry"
								active="bg-[#e0e8f6] dark:bg-[#22324a]"
								selected={$page.url.pathname === '/telemetry'}
							>
								<svelte:fragment slot="lead">
									<IconTerminal2 />
								</svelte:fragment>
							</AppRailAnchor>
						</div>

						<!-- Test Page Button -->
						<div use:popup={testPageTooltip}>
							<AppRailAnchor
								href="/test"
								active="bg-[#e0e8f6] dark:bg-[#22324a]"
								selected={$page.url.pathname === '/test'}
							>
								<svelte:fragment slot="lead">
									<IconChecklist />
								</svelte:fragment>
							</AppRailAnchor>
						</div>
					</svelte:fragment>

					<!-- Bottom Section of Navbar -->
					<svelte:fragment slot="trail">
						<!-- About Page Button -->
						<div use:popup={aboutPageTooltip}>
							<AppRailAnchor
								href="/about"
								active="bg-[#e0e8f6] dark:bg-[#22324a]"
								selected={$page.url.pathname === '/about'}
							>
								<svelte:fragment slot="lead">
									<IconInfoOctagon />
								</svelte:fragment>
							</AppRailAnchor>
						</div>

						<!-- Settings Page Button -->
						<div use:popup={settingsPageTooltip}>
							<AppRailAnchor
								href="/settings"
								active="bg-[#e0e8f6] dark:bg-[#22324a]"
								selected={$page.url.pathname === '/settings'}
							>
								<svelte:fragment slot="lead">
									<IconSettings />
								</svelte:fragment>
							</AppRailAnchor>
						</div>

						<!-- Light Switch -->
						<AppRailAnchor hover="none">
							<svelte:fragment slot="lead">
								<LightSwitch width="w-10" height="h-5" />
							</svelte:fragment>
						</AppRailAnchor>
					</svelte:fragment>
				</AppRail>
			</div>
		{/if}
	</svelte:fragment>

	<!-- Databar -->
	<svelte:fragment slot="sidebarRight">
		<!-- Activate the Databar if Databar Button pressed -->
		{#if $rightBarActive && $page.url.pathname !== '/' && $page.url.pathname !== '/about'}
			<!-- Databar's Outer Container -->
			<div
				transition:slide={{ delay: 20, duration: 300, easing: quintInOut, axis: 'x' }}
				class="h-full flex ml-0.5 flex-col p-2 border-l border-[#f1efef] dark:border-[#202736] bg-surface-100-800-token"
			>
				<div class="grid h-full grid-rows-2 space-y-2">
					<!-- Text Area for Dataflow -->
					<div
						class="h-full border-2 p-2.5 border-white shadow-xl border-opacity-20 rounded-lg bg-[#fffefe] dark:bg-[#374151] space-y-4"
					>
						<div class="flex flex-row mt-2 place-content-center">
							<h2 class="h4" style="font-family: Nevan">Pre-flight</h2>
						</div>
						<div class="flex flex-col space-y-4 place-content-center place-items-start">
							<label class="flex items-center space-x-2">
								<input class="checkbox" type="checkbox" bind:checked={$motorTest} />
								<i>Motor Test</i>
							</label>
							<label class="flex items-center space-x-2">
								<input class="checkbox" type="checkbox" bind:checked={$lidarTest} />
								<i>Lidar Test</i>
							</label>
							<label class="flex items-center space-x-2">
								<input class="checkbox" type="checkbox" bind:checked={$GPSTest} />
								<i>GPS Test</i>
							</label>
							<label class="flex items-center space-x-2">
								<input class="checkbox" type="checkbox" bind:checked={$IMUTest} />
								<i>IMU Health Check</i>
							</label>
							<label class="flex items-center space-x-2">
								<input class="checkbox" type="checkbox" bind:checked={$pitotTest} />
								<i>Pitot Test</i>
							</label>
							<label class="flex items-center space-x-2">
								<input class="checkbox" type="checkbox" bind:checked={$cameraTest} />
								<i>Camera Test</i>
							</label>
						</div>
					</div>
					<textarea
						class="h-full shadow-xl overflow-y-auto border-2 border-white border-opacity-20 text-gray-800 dark:text-gray-200 hide-scrollbar rounded-lg bg-[#fffefe] p-3 dark:bg-[#374151]"
						placeholder="You can take your notes to here as you wish."
						bind:value={$notepadText}
					/>
				</div>

				<!-- Reboot Section -->
				<div class="flex flex-row w-full mt-4 place-items-center place-content-center">
					<!-- Raspberry Pi Reboot Button -->
					<button
						on:click={() => {
							$raspberryBoot = !$raspberryBoot;
							modalStore.trigger(raspberryModal);
						}}
						type="button"
						class="[&>*]:pointer-events-none flex w-full relative text-white place-content-center bg-gradient-to-r active:ring-4 from-sky-500 via-sky-600 to-sky-700 hover:bg-gradient-to-br focus:outline-none focus:ring-sky-400 dark:focus:ring-sky-900 shadow-lg shadow-sky-600/50 dark:shadow-lg dark:shadow-sky-900/80 font-medium rounded-l-lg text-sm px-5 py-2.5"
						use:popup={raspberryTooltip}
					>
						<IconRotate2 />
						<p
							style="font-family:Nevan;"
							class="absolute p-0 m-0 text-white border-none top-1.5 left-5"
						>
							R
						</p>
					</button>

					<!-- Pixhawk Reboot Button -->
					<button
						on:click={() => {
							$pixhawkBoot = !$pixhawkBoot;
							modalStore.trigger(pixhawkModal);
						}}
						type="button"
						class="[&>*]:pointer-events-none flex w-full relative text-white place-content-center bg-gradient-to-l active:ring-4 from-sky-500 via-sky-600 to-sky-700 hover:bg-gradient-to-bl focus:outline-none focus:ring-sky-400 dark:focus:ring-sky-900 shadow-lg shadow-sky-600/50 dark:shadow-lg dark:shadow-sky-900/80 font-medium rounded-r-lg text-sm px-5 py-2.5"
						use:popup={pixhawkTooltip}
					>
						<IconRotateClockwise2 />

						<p
							class="absolute p-0 m-0 text-white border-none top-1.5 left-5"
							style="font-family:Nevan;"
						>
							P
						</p>
					</button>
				</div>
			</div>
		{/if}
	</svelte:fragment>
	<slot />
</AppShell>
