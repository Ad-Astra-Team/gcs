<script>
	import '../app.postcss';
	// Importing necessary components
	import { page } from '$app/stores';
	import { listen, TauriEvent } from '@tauri-apps/api/event';
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
	// Necessary importations for navbar transition
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	// Navbar activating with function
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
		pixhawkBoot
	} from '$lib/Utils/stores';
	import { handleIsTauri } from '$lib/Utils/helper';
	import { onMount } from 'svelte';
	import { invoke } from '@tauri-apps/api/tauri';

	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	/**
	 * @type {import('@skeletonlabs/skeleton').PopupSettings}
	 */
	const raspberryTooltip = {
		event: 'hover',
		target: 'raspberryTooltip',
		placement: 'top'
	};

	/**
	 * @type {import('@skeletonlabs/skeleton').PopupSettings}
	 */
	const pixhawkTooltip = {
		event: 'hover',
		target: 'pixhawkTooltip',
		placement: 'top'
	};

	initializeStores();

	onMount(() => {
		// listen backend-heartbeat event

		listen('backend-heartbeat', function (evt) {
			$heartbeat = true;
			$last_heartbeat = evt.payload;
			// if tauri loaded
			if (handleIsTauri()) {
				invoke('increase_packet_counter');
			}
		});

		// if backend-heartbeat event is not received in 5 seconds, set heartbeat to false
		setTimeout(() => {
			if (Date.now() - $last_heartbeat > 4900) $heartbeat = false;
		}, 5000);
	});

	const modalStore = getModalStore();

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
		response: (r) => console.log('response:', r)
	};

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
		response: (r) => console.log('response:', r)
	};
</script>

<Modal
	padding="p-6"
	rounded="rounded-2xl"
	shadow="shadow-xl"
	buttonPositive="bg-red-700 font-semibold text-white"
	buttonNeutral="dark:border-white border-black border-2 font-semibold"
/>

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
			shadow="shadow-2xl"
		>
			<svelte:fragment slot="lead">
				<!-- Left Section -->
				<div class="flex flex-row justify-between w-full place-content-center">
					<!-- Container for burger menu -->
					<div
						class="flex flex-row cursor-pointer w-14 h-14 hover:bg-primary-hover-token place-content-center place-items-center"
						on:click={() => {
							$leftNavActive = !$leftNavActive;
						}}
					>
						<IconMenu2 class="w-8 h-8" />
					</div>

					<div class="flex flex-row mr-20 space-x-6 w-14 h-14 place-content-end place-items-center">
						<!-- status icon's div -->
						{#if $page.url.pathname !== '/' && $page.url.pathname !== '/about'}
							<!-- gps check -->
							<div class="flex flex-row">
								{#if $uav_gpsStatus === true}
									<IconSatellite class="w-7 h-7" />
								{:else}
									<IconSatellite color="red" class="w-7 h-7" />
								{/if}
							</div>
							<!-- communication check -->
							<div class="flex flex-row">
								{#if $uav_networkStatus === true}
									<IconAntenna class="w-7 h-7" />
								{:else}
									<IconAntennaOff color="red" class="w-7 h-7" />
								{/if}
							</div>
							<!-- battery status -->
							<div class="flex flex-row">
								{#if $uav_batteryVoltage >= 15.93}
									<IconBattery4 class="w-7 h-7" />
								{:else if $uav_batteryVoltage >= 15.34}
									<IconBattery3 class="w-7 h-7" />
								{:else if $uav_batteryVoltage >= 14.99}
									<IconBattery2 class="w-7 h-7" />
								{:else if $uav_batteryVoltage >= 13.09}
									<IconBattery1 class="w-7 h-7" />
								{:else if $uav_batteryVoltage < 13.09}
									<IconBatteryOff class="w-7 h-7" />
								{/if}
							</div>
						{/if}
					</div>
				</div>
			</svelte:fragment>

			<!-- Middle section -->
			<div class="flex flex-row items-center p-0 m-0 place-content-center checked:">
				<p
					data-tauri-drag-region
					class="p-0 m-0 text-2xl text-center text-black border-8 border-none cursor-default active:cursor-grab hover:cursor-grab focus dark:text-white"
					style="font-family: Nevan;"
				>
					Ad Astra
				</p>
			</div>

			<svelte:fragment slot="trail">
				{#if $page.url.pathname !== '/' && $page.url.pathname !== '/about'}
					<!-- Right section -->
					<div class="flex flex-row justify-between w-full place-content-center">
						<div
							class="flex w-full ml-20 space-x-4 fwlex-row place-content-start place-items-center"
						>
							<div class="flex flex-row">
								<!-- Ping Status -->
								{#if $pingStatus >= 9999}
									<p
										style="font-family: Nevan;"
										class="p-0 m-0 text-[#ff0000] border-none text-md place-items-center"
									>
										> 9999 <span class="font-sans text-xs font-bold text-w">ms</span>
									</p>
								{:else if $pingStatus >= 900}
									<p
										style="font-family: Nevan;"
										class="p-0 m-0 text-[#ff0000] border-none text-md place-items-center"
									>
										* {$pingStatus} <span class="font-sans text-xs font-bold">ms</span>
									</p>
								{:else if $pingStatus >= 100}
									<p
										style="font-family: Nevan;"
										class="p-0 m-0 text-yellow-400 border-none text-md place-items-center"
									>
										{$pingStatus} <span class="font-sans text-xs font-bold">ms</span>
									</p>
								{:else if $pingStatus >= 0}
									<p
										style="font-family: Nevan;"
										class="p-0 m-0 border-none text-sky-400 text-md place-items-center"
									>
										{$pingStatus} <span class="font-sans text-xs font-bold">ms</span>
									</p>
								{/if}
							</div>

							<!-- Heartbeat -->
							<div class="flex flex-row">
								{#if $heartbeat}
									<IconCircleCheck class="w-8 h-8 text-sky-400" />
								{:else}
									<IconAlertHexagon class="w-8 h-8 text-red-700" />
								{/if}
							</div>
						</div>

						<div class="flex flex-row">
							<div
								class="flex flex-row cursor-pointer w-14 h-14 hover:bg-primary-hover-token place-content-center place-items-center"
								on:click={() => {
									$rightBarActive = !$rightBarActive;
								}}
							>
								<IconAlignBoxRightMiddle class="w-8 h-8" />
							</div>

							<div
								class="flex flex-row cursor-pointer w-14 h-14 hover:bg-primary-hover-token place-content-center place-items-center"
							>
								<button
									class="flex w-full h-full cursor-pointer hover:bg-red-800 place-content-center place-items-center"
									on:click={() => {
										modalStore.trigger(exitModal);
									}}
								>
									<IconX class="w-8 h-8" />
								</button>
							</div>
						</div>
					</div>
				{:else}
					<div
						class="flex flex-row cursor-pointer w-14 h-14 hover:bg-primary-hover-token place-content-center place-items-center"
					>
						<button
							class="flex w-full h-full cursor-pointer hover:bg-red-800 place-content-center place-items-center"
							on:click={() => {
								modalStore.trigger(exitModal);
							}}
						>
							<IconX class="w-8 h-8" />
						</button>
					</div>
				{/if}
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<!-- App Rail -->
	<svelte:fragment slot="sidebarLeft">
		{#if $leftNavActive}
			<div
				transition:slide={{ delay: 80, duration: 650, easing: quintOut, axis: 'x' }}
				class="h-full"
			>
				<AppRail width="w-14">
					<svelte:fragment slot="lead">
						<AppRailAnchor
							href="/"
							selected={$page.url.pathname === '/'}
							active="bg-[#e0e8f6] dark:bg-[#22324a]"
						>
							<svelte:fragment slot="lead">
								<IconHome />
							</svelte:fragment>
						</AppRailAnchor>
						<AppRailAnchor
							href="/dashboard"
							active="bg-[#e0e8f6] dark:bg-[#22324a]"
							selected={$page.url.pathname === '/dashboard'}
						>
							<svelte:fragment slot="lead">
								<IconLayout />
							</svelte:fragment>
						</AppRailAnchor>
						<AppRailAnchor
							href="/telemetry"
							active="bg-[#e0e8f6] dark:bg-[#22324a]"
							selected={$page.url.pathname === '/telemetry'}
						>
							<svelte:fragment slot="lead">
								<IconTerminal2 />
							</svelte:fragment>
						</AppRailAnchor>
						<AppRailAnchor
							href="/test"
							active="bg-[#e0e8f6] dark:bg-[#22324a]"
							selected={$page.url.pathname === '/test'}
						>
							<svelte:fragment slot="lead">
								<IconChecklist />
							</svelte:fragment>
						</AppRailAnchor>
					</svelte:fragment>
					<!-- --- -->

					<!-- --- -->
					<svelte:fragment slot="trail">
						<AppRailAnchor
							href="/about"
							active="bg-[#e0e8f6] dark:bg-[#22324a]"
							selected={$page.url.pathname === '/about'}
						>
							<svelte:fragment slot="lead">
								<IconInfoOctagon />
							</svelte:fragment>
						</AppRailAnchor>
						<AppRailAnchor
							href="/settings"
							active="bg-[#e0e8f6] dark:bg-[#22324a]"
							selected={$page.url.pathname === '/settings'}
						>
							<svelte:fragment slot="lead">
								<IconSettings />
							</svelte:fragment>
						</AppRailAnchor>

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

	<!-- Right sidebar -->
	<svelte:fragment slot="sidebarRight">
		{#if $rightBarActive}
			<div
				transition:slide={{ delay: 80, duration: 650, easing: quintOut, axis: 'x' }}
				class="h-full justify-between flex flex-col pl-2 pr-2 pt-2.5 border-l border-[#f1efef] dark:border-[#202736] bg-surface-100-800-token"
			>
				<textarea
					class="h-full overflow-hidden textarea"
					rows="4"
					placeholder="Your data will be flow here. You can also expand this window as you wish."
				/>

				<div class="flex flex-row mt-2.5 mb-2.5 space-x-3 place-content-center">
					{#if $raspberryBoot === false}
						<button
							title="Raspberry Boot"
							on:click={() => {
								$raspberryBoot = !$raspberryBoot;
								modalStore.trigger(raspberryModal);
							}}
							use:popup={raspberryTooltip}
							type="button"
							class="[&>*]:pointer-events-none relative text-white place-content-center bg-gradient-to-r active:ring-4 from-sky-400 via-sky-500 to-sky-600 hover:bg-gradient-to-br focus:outline-none focus:ring-sky-300 dark:focus:ring-sky-800 shadow-lg shadow-sky-500/50 dark:shadow-lg dark:shadow-sky-800/80 font-medium rounded-lg text-sm px-5 py-2.5"
						>
							<IconRotate2 />
							<p
								style="font-family:Nevan;"
								class="absolute p-0 m-0 text-white border-none top-1.5 left-2.5"
							>
								R
							</p>
						</button>
					{:else}
						<button
							on:click={() => {
								$raspberryBoot = !$raspberryBoot;
							}}
							type="button"
							class="[&>*]:pointer-events-none relative text-white place-content-center bg-gradient-to-r active:ring-4 from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5"
							use:popup={raspberryTooltip}
						>
							<IconRotate2 />
							<p
								style="font-family:Nevan;"
								class="absolute p-0 m-0 text-white border-none top-1.5 left-2.5"
							>
								R
							</p>
						</button>
					{/if}

					{#if $pixhawkBoot === false}
						<button
							on:click={() => {
								$pixhawkBoot = !$pixhawkBoot;
								modalStore.trigger(pixhawkModal);
							}}
							type="button"
							class="[&>*]:pointer-events-none relative text-white place-content-center bg-gradient-to-r active:ring-4 from-sky-400 via-sky-500 to-sky-600 hover:bg-gradient-to-br focus:outline-none focus:ring-sky-300 dark:focus:ring-sky-800 shadow-lg shadow-sky-500/50 dark:shadow-lg dark:shadow-sky-800/80 font-medium rounded-lg text-sm px-5 py-2.5"
							use:popup={pixhawkTooltip}
						>
							<IconRotateClockwise2 />

							<p
								class="absolute p-0 m-0 text-white border-none top-1.5 left-2.5"
								style="font-family:Nevan;"
							>
								P
							</p>
						</button>
					{:else}
						<button
							on:click={() => {
								$pixhawkBoot = !$pixhawkBoot;
							}}
							type="button"
							class="[&>*]:pointer-events-none relative text-white place-content-center bg-gradient-to-r active:ring-4 from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5"
							use:popup={pixhawkTooltip}
						>
							<IconRotateClockwise2 />
							<p
								class="absolute p-0 m-0 text-white border-none top-1.5 left-2.5"
								style="font-family:Nevan;"
							>
								P
							</p>
						</button>
					{/if}
				</div>
			</div>
		{/if}
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>
