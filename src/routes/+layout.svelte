<script>
	import '../app.postcss';
	// Importing necessary components
	import { AppShell, AppBar, AppRail, AppRailAnchor, storePopup } from '@skeletonlabs/skeleton';
	import { IconLayout, IconHome, IconSettings, IconMenu2 } from '@tabler/icons-svelte';
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

<AppShell>
	<!-- Header -->
	<svelte:fragment slot="header">
		<AppBar
			gridColumns="grid-cols-3"
			slotDefault="place-self-center h-14"
			gap="gap-0"
			padding="p-0"
			spacing="space-y-0"
			slotTrail="place-content-end"
		>
			<svelte:fragment slot="lead">
				<div
					class="relative flex cursor-pointer w-14 h-14 hover:bg-primary-hover-token place-items-center place-content-center"
					on:click={() => {
						$navActive = !$navActive;
					}}
				>
					<IconMenu2 />
				</div>
			</svelte:fragment>
			Ad Astra
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
				<AppRail width="w-14">
					<svelte:fragment slot="lead">
						<AppRailAnchor href="/">
							<svelte:fragment slot="lead">
								<IconHome />
							</svelte:fragment>
						</AppRailAnchor>
						<AppRailAnchor href="/dashboard" title="Account">
							<svelte:fragment slot="lead">
								<IconLayout />
							</svelte:fragment>
						</AppRailAnchor>
					</svelte:fragment>
					<!-- --- -->

					<!-- --- -->
					<svelte:fragment slot="trail">
						<AppRailAnchor href="/settings" title="Account">
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
