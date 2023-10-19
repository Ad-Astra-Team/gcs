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
		IconCircleCheck,
		IconAlertCircle
	} from '@tabler/icons-svelte';
	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	// Necessary importations for navbar transition
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	// Navbar activating with function
	import { leftNavActive, rightleftNavActive, heartbeat, last_heartbeat } from '$lib/Utils/stores';
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
			shadow="shadow-2xl"
			border="border-b border-[#f1efef] dark:border-[#202736]"
		>
			<svelte:fragment slot="lead">
				<!-- Container for burger menu -->
				<div
					class="relative flex cursor-pointer w-14 h-14 hover:bg-primary-hover-token place-items-center place-content-center"
					on:click={() => {
						$leftNavActive = !$leftNavActive;
					}}
				>
					<IconMenu2 class="w-7 h-7" />
				</div>
			</svelte:fragment>

			<h1 class="cursor-pointer" style="font-family: Nevan RUS;">Ad Astra</h1>

			<svelte:fragment slot="trail">
				<div>
					{#if $heartbeat}
						<IconCircleCheck color="#00ff00" class="w-7 h-7" />
					{:else}
						<IconAlertCircle color="#ff0000" class="w-7 h-7" />
					{/if}
				</div>
				<div
					class="relative flex cursor-pointer w-14 h-14 hover:bg-primary-hover-token place-items-center place-content-center"
					on:click={() => {
						$rightleftNavActive = !$rightleftNavActive;
					}}
				>
					<IconAlignBoxRightMiddle class="w-7 h-7" />
				</div>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<!-- App Bar -->
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
							href="/home"
							selected={$page.url.pathname === '/home'}
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
		{#if $rightleftNavActive}
			<div
				transition:slide={{ delay: 80, duration: 650, easing: quintOut, axis: 'x' }}
				class="h-full p-2 pt-3 pb-3 border-l border-[#f1efef] dark:border-[#202736] bg-surface-100-800-token"
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
