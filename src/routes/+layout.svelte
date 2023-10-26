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
		LightSwitch
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
		IconCircleDotFilled
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
		pingStatus
	} from '$lib/Utils/stores';
	import { handleIsTauri } from '$lib/Utils/helper';
	import { onMount } from 'svelte';
	import { invoke } from '@tauri-apps/api/tauri';

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

		let batteryLevel = 0.0;
		let armMode = false;
	});
</script>

<!-- App Shell -->

<AppShell scrollbarGutter="stable">
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
				<!-- Left section -->
				<div class="flex flex-row w-full place-items-center">
					<!-- Container for burger menu -->
					<div
						class="flex flex-row cursor-pointer h-14 w-14 hover:bg-primary-hover-token place-content-center place-items-center"
						on:click={() => {
							$leftNavActive = !$leftNavActive;
						}}
					>
						<IconMenu2 class="w-8 h-8" />
					</div>
				</div>

				<!-- status icon's div -->
				{#if $page.url.pathname !== '/' && $page.url.pathname !== '/about'}
					<div class="flex flex-row w-full place-content-center place-items-center gap-x-6">
						<!-- gps check -->
						<div>
							{#if $uav_gpsStatus === true}
								<IconSatellite class="w-7 h-7" />
							{:else}
								<IconSatellite color="red" class="w-7 h-7" />
							{/if}
						</div>
						<!-- communication check -->
						<div>
							{#if $uav_networkStatus === true}
								<IconAntenna class="w-7 h-7" />
							{:else}
								<IconAntennaOff color="red" class="w-7 h-7" />
							{/if}
						</div>
						<!-- battery status -->
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
								<IconBatteryOff class="w-7 h-7" />
							{/if}
						</div>
					</div>
				{/if}
			</svelte:fragment>

			<!-- Middle section -->
			<div class="flex flex-row p-0 m-0 place-content-center place-items-center">
				<p
					class="p-0 m-0 text-2xl text-center text-black border-8 border-none cursor-pointer dark:text-white"
					style="font-family: Nevan;"
				>
					Ad Astra
				</p>
			</div>

			<svelte:fragment slot="trail">
				{#if $page.url.pathname !== '/' && $page.url.pathname !== '/about'}
					<!-- Right section -->
					<div class="flex flex-row place-content-center place-items-center">
						<div class="flex flex-row p-0 mr-7">
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
									class="p-0 m-0 text-[#24ffe5] border-none text-md place-items-center"
								>
									{$pingStatus} <span class="font-sans text-xs font-bold">ms</span>
								</p>
							{/if}
						</div>

						<!-- Heartbeat -->
						<div class="flex flex-row mr-2 place-content-center place-items-centers">
							{#if $heartbeat}
								<IconCircleCheck color="#24ffe5" class="w-8 h-8" />
							{:else}
								<IconAlertHexagon color="#ff0000" class="w-8 h-8" />
							{/if}
						</div>
						<!-- Rightside bar -->
						<div
							class="flex flex-row h-12 cursor-pointer w-14 hover:bg-primary-hover-token place-items-center place-content-center"
							on:click={() => {
								$rightBarActive = !$rightBarActive;
							}}
						>
							<IconAlignBoxRightMiddle class="w-7 h-7" />
						</div>
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
				<AppRail
					width="w-14"
					border="border-r border-l border-b border-[#f1efef] dark:border-[#202736]"
				>
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

	<svelte:fragment slot="sidebarRight">
		{#if $rightBarActive}
			<div
				transition:slide={{ delay: 80, duration: 650, easing: quintOut, axis: 'x' }}
				class="h-full pl-2 pr-2 pt-3 pb-3 border-l border-[#f1efef] dark:border-[#202736] bg-surface-100-800-token"
			>
				<textarea
					class="h-2/6 textarea"
					rows="4"
					placeholder="Your data will be flow here. You can also expand this window as you wish."
				/>
			</div>
		{/if}
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>
