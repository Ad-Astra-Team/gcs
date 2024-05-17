<script>
	//Importing Accordions
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';

	//Importing Tabler's Icon Pack
	import { IconCpu, IconWorldWww, IconDrone, IconApple } from '@tabler/icons-svelte';

	//Importing Variables From Stores
	import { whoWeAre, teamMembers, teamName, teamRoles } from '$lib/Utils/stores';

	//Importing Transitions
	import { fade } from 'svelte/transition';
</script>

<!-- Outer Container -->
<div
	class="container flex flex-col w-full h-full min-w-full min-h-full place-content-center place-items-center"
>
	<!-- Team Members Outer Div -->
	<div class="grid max-w-7xl gap-x-8 gap-y-20 lg:px-8 xl:grid-cols-3">
		<!-- Header and Description -->
		<div in:fade={{ delay: 350, duration: 450 }} class="flex flex-col max-w-2xl space-y-3">
			<!-- Team Header -->
			<h1 class="h1" style="font-family: Nevan">{$teamName}</h1>

			<!-- Description -->
			<i class="text-lg font-semibold opacity-75">
				{$whoWeAre}
			</i>
		</div>
		<div class="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
			<!-- Person 1 -->
			<div in:fade={{ delay: 450, duration: 450 }} class="flex items-center space-x-6">
				<!-- Icon -->
				<IconCpu class="w-20 h-20 rounded-full" />

				<!-- Name and Role -->
				<div>
					<!-- Name -->
					<b class="text-lg">{$teamMembers[0]}</b>
					<!-- Role -->
					<p class="font-semibold text-indigo-500 text-md">{$teamRoles[0]}</p>
				</div>
			</div>

			<!-- Person 2 -->
			<div in:fade={{ delay: 550, duration: 550 }} class="flex items-center space-x-6">
				<!-- Icon -->
				<IconWorldWww class="w-20 h-20 rounded-full" />

				<!-- Name and Role -->
				<div>
					<!-- Name -->
					<b class="text-lg">{$teamMembers[1]}</b>
					<!-- Role -->
					<p class="font-semibold text-indigo-500 text-md">{$teamRoles[1]}</p>
				</div>
			</div>

			<!-- Person 3 -->
			<div in:fade={{ delay: 650, duration: 650 }} class="flex items-center space-x-6">
				<!-- Icon -->
				<IconApple class="w-20 h-20 rounded-full" />

				<!-- Name and Role -->
				<div>
					<!-- Name -->
					<b class="text-lg">{$teamMembers[2]}</b>
					<!-- Role -->
					<p class="font-semibold text-indigo-500 text-md">{$teamRoles[2]}</p>
				</div>
			</div>

			<!-- Person 2 -->
			<div in:fade={{ delay: 750, duration: 750 }} class="flex items-center space-x-6">
				<!-- Icon -->
				<IconDrone class="w-20 h-20 rounded-full" />

				<!-- Name and Role -->
				<div>
					<!-- Name -->
					<b class="text-lg">{$teamMembers[3]}</b>
					<!-- Role -->
					<p class="font-semibold text-indigo-500 text-md">{$teamRoles[3]}</p>
				</div>
			</div>
		</div>
	</div>
</div>
