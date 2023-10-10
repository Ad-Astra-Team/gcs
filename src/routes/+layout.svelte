<script>
	import '../app.postcss';
	// Importing necessary components
	import { page } from '$app/stores';

	import { AppShell, AppBar, AppRail, AppRailAnchor, storePopup } from '@skeletonlabs/skeleton';
	import {
		IconLayout,
		IconHome,
		IconSettings,
		IconMenu2,
		IconTerminal2,
		IconChecklist,
		IconInfoOctagon
	} from '@tabler/icons-svelte';
	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	// Necessary importations for navbar transition
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	// Navbar activating with function
	import { navActive } from '$lib/Utils/stores';

	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
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
			shadow="shadow-xl"
		>
			<svelte:fragment slot="lead">
				<!-- Container for burger menu -->
				<div
					class="relative flex cursor-pointer w-14 h-14 hover:bg-primary-hover-token place-items-center place-content-center"
					on:click={() => {
						$navActive = !$navActive;
					}}
				>
					<IconMenu2 />
				</div>
			</svelte:fragment>
			<img src="" alt="" />
			<svelte:fragment slot="trail">(actions)</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<!-- App Bar -->
	<svelte:fragment slot="sidebarLeft">
		{#if $navActive}
			<div
				transition:slide={{ delay: 50, duration: 250, easing: quintOut, axis: 'x' }}
				class="h-full"
			>
				<AppRail width="w-14" shadow=" shadow-inner">
					<svelte:fragment slot="lead">
						<AppRailAnchor
							href="/home"
							active="bg-[#22324a]"
							selected={$page.url.pathname === '/home'}
						>
							<svelte:fragment slot="lead">
								<IconHome />
							</svelte:fragment>
						</AppRailAnchor>
						<AppRailAnchor
							href="/dashboard"
							active="bg-[#22324a]"
							selected={$page.url.pathname === '/dashboard'}
						>
							<svelte:fragment slot="lead">
								<IconLayout />
							</svelte:fragment>
						</AppRailAnchor>
						<AppRailAnchor
							href="/telemetry"
							active="bg-[#22324a]"
							selected={$page.url.pathname === '/telemetry'}
						>
							<svelte:fragment slot="lead">
								<IconTerminal2 />
							</svelte:fragment>
						</AppRailAnchor>
						<AppRailAnchor
							href="/test"
							active="bg-[#22324a]"
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
							active="bg-[#22324a]"
							selected={$page.url.pathname === '/about'}
						>
							<svelte:fragment slot="lead">
								<IconInfoOctagon />
							</svelte:fragment>
						</AppRailAnchor>
						<AppRailAnchor
							href="/settings"
							active="bg-[#22324a]"
							selected={$page.url.pathname === '/settings'}
						>
							<svelte:fragment slot="lead">
								<IconSettings />
							</svelte:fragment></AppRailAnchor
						>
					</svelte:fragment>
				</AppRail>
			</div>
		{/if}
	</svelte:fragment>

	<!-- Page Route Content -->
	<slot />
</AppShell>
