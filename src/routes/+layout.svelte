<script>
	import '../app.postcss';
	import { page } from '$app/stores';
	import { listen } from '@tauri-apps/api/event';

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

	initializeStores();

	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';

	//Importing Tabler's Icon Pack
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

	// Importing Transitions For Navbar
	import { fade, slide } from 'svelte/transition';
	import { quadInOut, quintIn, quintInOut, quintOut } from 'svelte/easing';

	// Importing Variables From Stores
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
		GPSCheck,
		lidarCheck,
		pitotCheck,
		cameraCheck,
		IMUCheck,
		engineCheck,
		notepadText
	} from '$lib/Utils/stores';

	import { handleIsTauri } from '$lib/Utils/helper';
	import { onMount } from 'svelte';
	import { invoke } from '@tauri-apps/api/tauri';
	import { tauri } from '@tauri-apps/api';
	import { autoModeWatcher } from '@skeletonlabs/skeleton';

	initializeStores();
	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	onMount(() => {
		autoModeWatcher();
	});

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

	//Modal Function's Variable
	const modalStore = getModalStore();

	//Configurations For Exit Modal
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

	//Configurations For Raspberry Pi Reboot Modal
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

	//Configurations For Pixhawk Reboot Modal
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

<!-- Modal's Body -->
<Modal
	padding="p-6"
	rounded="rounded-2xl"
	shadow="shadow-xl"
	buttonPositive="bg-red-700 text-white font-semibold"
	buttonNeutral="dark:border-white border-black border-2 font-semibold"
/>

<!-- Tooltip's Bodies -->
<div
	class="z-50 px-3 py-2.5 dark:text-white text-black text-sm rounded-xl dark:bg-[#1a2432] bg-[#f3f4f6] card"
	data-popup="raspberryTooltip"
>
	Raspberry PI Reboot
	<div class="dark:bg-[#1a2433] bg-[#d8dee1] arrow" />
</div>

<div
	class="z-50 px-3 py-2.5 dark:text-white text-black text-sm rounded-xl dark:bg-[#1a2432] bg-[#f3f4f6] card"
	data-popup="pixhawkTooltip"
>
	Pixhawk Reboot
	<div class="" />
</div>

<div
	class="z-50 px-3 py-2.5 dark:text-white text-black text-sm rounded-xl dark:bg-[#1a2432] bg-[#f3f4f6] card"
	data-popup="homePageTooltip"
>
	Home
	<div class="dark:bg-[#1a2433] bg-[#d8dee1] arrow" />
</div>

<div
	class="z-50 px-3 py-2.5 dark:text-white text-black text-sm rounded-xl dark:bg-[#1a2432] bg-[#f3f4f6] card"
	data-popup="dashboardPageTooltip"
>
	Dashboard
	<div class="dark:bg-[#1a2433] bg-[#d8dee1] arrow" />
</div>

<div
	class="z-50 px-3 py-2.5 dark:text-white text-black text-sm rounded-xl dark:bg-[#1a2432] bg-[#f3f4f6] card"
	data-popup="telemetryPageTooltip"
>
	Telemetry
	<div class="dark:bg-[#1a2433] bg-[#d8dee1] arrow" />
</div>

<div
	class="z-50 px-3 py-2.5 dark:text-white text-black text-sm rounded-xl dark:bg-[#1a2432] bg-[#f3f4f6] card"
	data-popup="testPageTooltip"
>
	Test
	<div class="dark:bg-[#1a2433] bg-[#d8dee1] arrow" />
</div>

<div
	class="z-50 px-3 py-2.5 dark:text-white text-black text-sm rounded-xl dark:bg-[#1a2432] bg-[#f3f4f6] card"
	data-popup="aboutPageTooltip"
>
	About
	<div class="dark:bg-[#1a2433] bg-[#d8dee1] arrow" />
</div>

<div
	class="z-50 px-3 py-2.5 dark:text-white text-black text-sm rounded-xl dark:bg-[#1a2432] bg-[#f3f4f6] card"
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
			slotLead="place-content-start"
			slotTrail="place-content-end"
			shadow="shadow-2xl drop-shadow-2xl"
		>
			<!-- Left Section of Header -->
			<svelte:fragment slot="lead">
				<!-- Left Section's Outer Container -->
				<div class="flex flex-row justify-between w-full lg:mr-20 md:mr-0 sm:mr-0">
					<!-- (1) Navbar Button -->
					<button
						class="flex flex-row w-14 h-14 hover:bg-primary-hover-token place-content-center place-items-center"
						on:click={() => {
							$leftNavActive = !$leftNavActive;
						}}
					>
						<IconMenu2 class="w-8 h-8" />
					</button>

					<!-- Don't show the Status Section at Home or About Pages -->
					{#if $page.url.pathname !== '/' && $page.url.pathname !== '/about'}
						<!-- (2) Status Section's Row -->
						<div
							transition:fade={{ delay: 250, duration: 350 }}
							class="flex flex-row space-x-6 place-content-center place-items-center"
						>
							<!-- GPS Status -->
							<div>
								<IconSatellite class={`w-7 h-7 ${$uav_gpsStatus ? '' : 'text-[#ff0000]'}`} />
							</div>

							<!-- Communication Status -->
							<div>
								{#if $uav_networkStatus === true}
									<IconAntenna class="w-7 h-7" />
								{:else}
									<IconAntennaOff class="w-7 h-7 text-[#ff0000]" />
								{/if}
							</div>

							<!-- Battery Status -->
							<!-- Adjusting the Battery view depending on the voltage of the battery -->
							<div>
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
			<!-- Middle Section's Outer Div -->
			<div class="flex flex-row w-full">
				<!-- Ad Astra Logo -->
				<h1
					data-tauri-drag-region
					class="mt-2 text-3xl h1 active:cursor-grab hover:cursor-grab"
					style="font-family: Nevan"
				>
					S . A . F . İ . R
				</h1>
			</div>

			<!-- Right Section of Header -->
			<svelte:fragment slot="trail">
				<!-- Right Section's Outer Container -->
				<div class="flex flex-row justify-between w-full lg:ml-20 md:ml-0 sm:ml-0">
					<!-- Status Section -->
					{#if $page.url.pathname !== '/' && $page.url.pathname !== '/about'}
						<div
							transition:fade={{ delay: 250, duration: 350 }}
							class="flex flex-row space-x-6 place-content-center place-items-center"
						>
							<!-- Latency -->
							<div>
								<p
									style="font-family: Nevan;"
									class={`text-lg ${
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
										> 9999 <span class="font-sans text-xs font-bold">ms</span>
									{:else}
										{$pingStatus} <span class="font-sans text-xs font-bold">ms</span>
									{/if}
								</p>
							</div>

							<!-- Hearbeat -->
							<div>
								{#if $heartbeat}
									<IconCircleCheck class="w-8 h-8 text-blue-500 dark:text-sky-500" />
								{:else}
									<IconAlertHexagon class="w-8 h-8 text-red-700" />
								{/if}
							</div>
						</div>
					{/if}

					<!-- Empty Div For Placing Exit Button to the End With Using justify-between  -->
					<div class=""></div>

					<!-- Databar and Exit Section -->
					<div class="flex flex-row">
						<!-- Databar Button (Don't Show Databar Button at Home and About Pages) -->
						{#if $page.url.pathname !== '/' && $page.url.pathname !== '/about'}
							<button
								transition:fade={{ delay: 250, duration: 350 }}
								class="flex flex-row w-14 h-14 hover:bg-primary-hover-token place-content-center place-items-center"
								on:click={() => {
									$rightBarActive = !$rightBarActive;
								}}
							>
								<IconAlignBoxRightMiddle class="w-8 h-8" />
							</button>
						{/if}

						<!-- Exit Button -->
						<button
							class="flex flex-row w-14 h-14 hover:bg-red-700 dark:hover:bg-red-900 place-content-center place-items-center"
							on:click={() => {
								modalStore.trigger(exitModal);
							}}
						>
							<IconX class="w-8 h-8" />
						</button>
					</div>
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
				class="flex flex-col h-full"
			>
				<!-- AppRail Component that let us make a Navbar -->
				<AppRail width="w-14">
					<!-- Top Section of Navbar -->
					<svelte:fragment slot="lead">
						<!-- Home Page Button -->
						<button
							class="w-full"
							use:popup={{ event: 'hover', target: 'homePageTooltip', placement: 'right' }}
						>
							<AppRailAnchor
								href="/"
								selected={$page.url.pathname === '/'}
								active="bg-[#e0e8f6] dark:bg-[#22324a] "
							>
								<svelte:fragment slot="lead">
									<IconHome class="w-6 h-6" />
								</svelte:fragment>
							</AppRailAnchor>
						</button>

						<!-- Dashboard Page Button -->
						<button
							class="w-full"
							use:popup={{ event: 'hover', target: 'dashboardPageTooltip', placement: 'right' }}
						>
							<AppRailAnchor
								href="/dashboard"
								selected={$page.url.pathname === '/dashboard'}
								active="bg-[#e0e8f6] dark:bg-[#22324a]"
							>
								<svelte:fragment slot="lead">
									<IconLayout class="w-6 h-6" />
								</svelte:fragment>
							</AppRailAnchor>
						</button>

						<!-- Telemetry Page Button -->
						<button
							class="w-full"
							use:popup={{ event: 'hover', target: 'telemetryPageTooltip', placement: 'right' }}
						>
							<AppRailAnchor
								href="/telemetry"
								active="bg-[#e0e8f6] dark:bg-[#22324a]"
								selected={$page.url.pathname === '/telemetry'}
							>
								<svelte:fragment slot="lead">
									<IconTerminal2 class="w-6 h-6" />
								</svelte:fragment>
							</AppRailAnchor>
						</button>

						<!-- Test Page Button -->
						<button
							class="w-full"
							use:popup={{ event: 'hover', target: 'testPageTooltip', placement: 'right' }}
						>
							<AppRailAnchor
								href="/test"
								active="bg-[#e0e8f6] dark:bg-[#22324a]"
								selected={$page.url.pathname === '/test'}
							>
								<svelte:fragment slot="lead">
									<IconChecklist class="w-6 h-6" />
								</svelte:fragment>
							</AppRailAnchor>
						</button>
					</svelte:fragment>

					<!-- Bottom Section of Navbar -->
					<svelte:fragment slot="trail">
						<!-- About Page Button -->
						<button
							class="w-full"
							use:popup={{ event: 'hover', target: 'aboutPageTooltip', placement: 'right' }}
						>
							<AppRailAnchor
								href="/about"
								active="bg-[#e0e8f6] dark:bg-[#22324a]"
								selected={$page.url.pathname === '/about'}
							>
								<svelte:fragment slot="lead">
									<IconInfoOctagon class="w-6 h-6" />
								</svelte:fragment>
							</AppRailAnchor>
						</button>

						<!-- Settings Page Button -->
						<button
							class="w-full"
							use:popup={{ event: 'hover', target: 'settingsPageTooltip', placement: 'right' }}
						>
							<AppRailAnchor
								href="/settings"
								active="bg-[#e0e8f6] dark:bg-[#22324a]"
								selected={$page.url.pathname === '/settings'}
							>
								<svelte:fragment slot="lead">
									<IconSettings class="w-6 h-6" />
								</svelte:fragment>
							</AppRailAnchor>
						</button>

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
				class="h-full flex space-y-2.5 flex-col p-2 bg-surface-100-800-token"
			>
				<!-- Pre-flight Checklist -->
				<div
					class="h-full flex flex-col border-2 p-2.5 border-white border-opacity-20 rounded-lg bg-surface-200-700-token space-y-4"
				>
					<h2 class="mt-2 text-center h4" style="font-family: Nevan">Pre-flight</h2>
					<div class="flex flex-col space-y-4">
						<label class="flex items-center space-x-2">
							<input class="checkbox" type="checkbox" bind:checked={$engineCheck} />
							<i>Engine Test</i>
						</label>
						<label class="flex items-center space-x-2">
							<input class="checkbox" type="checkbox" bind:checked={$lidarCheck} />
							<i>Lidar Test</i>
						</label>
						<label class="flex items-center space-x-2">
							<input class="checkbox" type="checkbox" bind:checked={$GPSCheck} />
							<i>GPS Test</i>
						</label>
						<label class="flex items-center space-x-2">
							<input class="checkbox" type="checkbox" bind:checked={$IMUCheck} />
							<i>IMU Health Check</i>
						</label>
						<label class="flex items-center space-x-2">
							<input class="checkbox" type="checkbox" bind:checked={$pitotCheck} />
							<i>Pitot Test</i>
						</label>
						<label class="flex items-center space-x-2">
							<input class="checkbox" type="checkbox" bind:checked={$cameraCheck} />
							<i>Camera Test</i>
						</label>
					</div>
				</div>

				<!-- Textarea as Notepad -->
				<textarea
					class="h-full overflow-y-scroll border-2 border-white rounded-lg shadow-xl resize-x border-opacity-20 bg-surface-200-700-token"
					placeholder="You can take your notes to here as you wish."
					bind:value={$notepadText}
				/>

				<!-- Reboot Section -->
				<div
					class="flex flex-row w-full px-0.5 mt-4 space-x-1 place-items-center place-content-center"
				>
					<!-- Raspberry Pi Reboot Button -->
					<button
						on:click={() => {
							$raspberryBoot = !$raspberryBoot;
							modalStore.trigger(raspberryModal);
						}}
						class="[&>*]:pointer-events-none rounded-se-xl flex flex-row w-full relative text-white place-content-center bg-gradient-to-r active:ring-4 from-sky-500 via-sky-600 to-sky-700 hover:bg-gradient-to-br focus:outline-none focus:ring-sky-400 dark:focus:ring-sky-900 shadow-lg shadow-sky-600/50 dark:shadow-lg dark:shadow-sky-900/80 font-medium rounded-l-lg px-5 py-2.5"
						use:popup={{ event: 'hover', target: 'raspberryTooltip', placement: 'top' }}
					>
						<IconRotate2 />
						<i class="absolute text-white top-1.5 left-5" style="font-family:Nevan;">R</i>
					</button>

					<!-- Pixhawk Reboot Button -->
					<button
						on:click={() => {
							$pixhawkBoot = !$pixhawkBoot;
							modalStore.trigger(pixhawkModal);
						}}
						class="[&>*]:pointer-events-none flex flex-row rounded-es-xl w-full relative text-white place-content-center bg-gradient-to-l active:ring-4 from-sky-500 via-sky-600 to-sky-700 hover:bg-gradient-to-bl focus:outline-none focus:ring-sky-400 dark:focus:ring-sky-900 shadow-lg shadow-sky-600/50 dark:shadow-lg dark:shadow-sky-900/80 font-medium rounded-r-lg px-5 py-2.5"
						use:popup={{ event: 'hover', target: 'pixhawkTooltip', placement: 'top' }}
					>
						<IconRotateClockwise2 />

						<i class="absolute text-white top-1.5 left-5" style="font-family:Nevan;">P</i>
					</button>
				</div>
			</div>
		{/if}
	</svelte:fragment>
	<slot />
</AppShell>
