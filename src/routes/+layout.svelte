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
		storePopup,
		LightSwitch,
		popup,
		initializeStores
	} from '@skeletonlabs/skeleton';
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
	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
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
	import { appWindow } from '@tauri-apps/api/window';

	initializeStores();
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

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

	/**
	 * @type {import('@skeletonlabs/skeleton').PopupSettings}
	 */
	const popupCloseQuery = {
		event: 'click',
		target: 'popupCloseQuery',
		placement: 'left',
		closeQuery: '#wont-close'
	};
</script>

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
			border="border-b border-[#f1efef] dark:border-[#202736]"
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

			<div class="z-50 max-w-xs p-2 card" data-popup="popupCloseQuery">
				<div class="grid grid-cols-1 space-y-1">
					<button id="wont-close" class="btn bg-sky-600">Cancel</button>
					<button
						on:click={() => {
							const appw = import('@tauri-apps/api/window').then(() => {
								appWindow.close();
							});
						}}
						id="will-close"
						class="bg-red-600 btn">Exit</button
					>
				</div>
				<div class="arrow bg-surface-100-800-token" />
			</div>

			<svelte:fragment slot="trail">
				{#if $page.url.pathname !== '/' && $page.url.pathname !== '/about'}
					<!-- Right section -->
					<div class="flex flex-row justify-between w-full place-content-center">
						<div
							class="flex flex-row w-full ml-20 space-x-4 place-content-start place-items-center"
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
							<button
								class="flex flex-row transition-colors cursor-pointer h-14 w-14 hover:bg-red-700 place-content-center place-items-center"
								use:popup={popupCloseQuery}
							>
								<IconX class="w-8 h-8" />
							</button>
							<div
								class="flex flex-row cursor-pointer w-14 h-14 hover:bg-primary-hover-token place-content-center place-items-center"
								on:click={() => {
									$rightBarActive = !$rightBarActive;
								}}
							>
								<IconAlignBoxRightMiddle class="w-8 h-8" />
							</div>
						</div>
					</div>
				{:else}
					<button
						class="flex flex-row cursor-pointer h-14 w-14 hover:bg-red-700 place-content-center place-items-center"
						use:popup={popupCloseQuery}
						on:click={() => {
							const appw = import('@tauri-apps/api/window').then(() => {
								// appWindow.close();
							});
						}}
					>
						<IconX class="w-8 h-8" />
					</button>
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
				class="h-full justify-between flex flex-col pl-2 pr-2 pt-3 pb-3 border-l border-[#f1efef] dark:border-[#202736] bg-surface-100-800-token"
			>
				<textarea
					class="h-2/6 textarea"
					rows="4"
					placeholder="Your data will be flow here. You can also expand this window as you wish."
				/>

				<div class="flex mb-3 space-x-2 flex-nowrap place-content-center">
					<button
						on:click={() => {
							$raspberryBoot = !$raspberryBoot;
						}}
						type="button"
						class="bottom-0 px-8 text-sm font-medium text-white rounded-lg shadow-lg bg-gradient-to-r active:ring-4 from-gray-400 via-gray-500 to-gray-600 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-gray-300 dark:focus:ring-gray-800 shadow-gray-500/50 dark:shadow-lg dark:shadow-gray-800/80"
					>
						<IconRotate2 />
						<p style="font-family:Nevan;" class="p-0 m-0 text-white border-none">RPI</p>
					</button>
					<button
						on:click={() => {
							$pixhawkBoot = !$pixhawkBoot;
						}}
						type="button"
						class="px-8 text-sm font-medium text-white rounded-lg shadow-lg bg-gradient-to-r active:ring-4 from-gray-400 via-gray-500 to-gray-600 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-gray-300 dark:focus:ring-gray-800 shadow-gray-500/50 dark:shadow-lg dark:shadow-gray-800/80"
					>
						<IconRotateClockwise2 />
						<p class="p-0 m-0 text-white border-none" style="font-family:Nevan;">PIX</p>
					</button>
				</div>
			</div>
		{/if}
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>
