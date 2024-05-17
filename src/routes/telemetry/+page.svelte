<script>
	//Importing Transitions from Svelte
	import { fade, blur } from 'svelte/transition';

	/*Message Feed*/
	let messageFeed = [
		{
			id: 0,
			host: true,
			avatar: 48,
			name: 'Fatih',
			timestamp: 'Yesterday @ 2:30pm',
			message: "Hi, it's me. Fatih Özkurt",
			color: 'variant-soft-primary'
		},
		{
			id: 1,
			host: true,
			avatar: 48,
			name: 'Fatih Özkurt',
			timestamp: 'Yesterday @ 2:30pm',
			message: "Today we're trying the message feed.",
			color: 'variant-soft-primary'
		},
		{
			id: 2,
			host: true,
			avatar: 48,
			name: 'Fatih Özkurt',
			timestamp: 'Yesterday @ 2:30pm',
			message: 'Let me check real quick.',
			color: 'variant-soft-primary'
		},
		{
			id: 3,
			host: false,
			avatar: 48,
			name: 'Fatih Özkurt',
			timestamp: 'Yesterday @ 2:30pm',
			message: "I think it's working.",
			color: 'variant-soft-primary'
		},
		{
			id: 4,
			host: false,
			avatar: 14,
			name: 'Fatih Özkurt',
			timestamp: 'Yesterday @ 2:45pm',
			message: "So i guess we're done here. Till forever.",
			color: 'variant-soft-primary'
		},
		{
			id: 5,
			host: false,
			avatar: 14,
			name: 'Unknown',
			timestamp: 'Yesterday @ 2:45pm',
			message: '.',
			color: 'variant-soft-primary'
		},
		{
			id: 6,
			host: false,
			avatar: 14,
			name: 'Unknown',
			timestamp: 'Yesterday @ 2:45pm',
			message: '.',
			color: 'variant-soft-primary'
		},
		{
			id: 7,
			host: false,
			avatar: 14,
			name: 'Unknown',
			timestamp: 'Yesterday @ 2:45pm',
			message: '.',
			color: 'variant-soft-primary'
		}
	];
</script>

<!-- Outer Container -->
<div class="container flex flex-col w-full h-screen min-w-full min-h-screen bg-white dark:bg-black">
	<!-- Page Header -->
	<div
		class="z-0 grid grid-cols-3 shadow-xl rounded-b-3xl bg-slate-100 shadow-slate-300 dark:shadow-[#1f2937] dark:bg-[#050505]"
	>
		<!-- Ground Control Header -->
		<h3
			in:fade={{ delay: 350, duration: 450 }}
			class="px-6 py-3 text-center h3"
			style="font-family: Nevan;"
		>
			<span
				class="text-transparent bg-gradient-to-br from-blue-600 to-cyan-400 dark:from-blue-500 dark:to-cyan-300 bg-clip-text"
				>Ground Control</span
			>
		</h3>

		<!-- AI Computer Header -->
		<h3
			in:fade={{ delay: 550, duration: 650 }}
			class="px-6 py-3 text-center h3"
			style="font-family: Nevan;"
		>
			<span
				class="text-transparent bg-gradient-to-br from-blue-600 to-cyan-400 dark:from-blue-500 dark:to-cyan-300 bg-clip-text"
				>AI Computer</span
			>
		</h3>

		<!-- Mission Computer -->
		<h3
			in:fade={{ delay: 750, duration: 850 }}
			class="px-6 py-3 text-center h3"
			style="font-family: Nevan"
		>
			<span
				class="text-transparent bg-gradient-to-br from-blue-600 to-cyan-400 dark:from-blue-500 dark:to-cyan-300 bg-clip-text"
				>Mission Computer</span
			>
		</h3>
	</div>

	<!-- Body  -->
	<div class="grid w-full h-full grid-cols-3">
		<!-- First Column of Body -->
		<div
			in:blur={{ amount: 15 }}
			class="pt-4 pl-2 space-y-4 overflow-scroll bg-white select-text lg:text-base md:text-sm sm:text-sm pb-14 hide-scrollbar dark:bg-black"
		>
			{#each messageFeed as bubble, i}
				{#if bubble.host === true}
					<!-- Host Message Bubble -->
					<pre class="ml-2">host: {JSON.stringify(bubble, null, 2)}</pre>
				{:else}
					<!-- Guest Message Bubble -->
					<pre class="ml-2">guest: {JSON.stringify(bubble, null, 2)}</pre>
				{/if}
			{/each}
		</div>

		<!-- Second Column of Body -->
		<div
			in:blur={{ amount: 15 }}
			class="lg:text-base select-text md:text-sm pt-4 pl-2 pb-14 overflow-scroll hide-scrollbar sm:text-sm border-r-4 border-l-4 border-[#dce3e6] dark:border-[#172336] space-y-4 bg-white dark:bg-black rounded-lg"
		>
			{#each messageFeed as bubble, i}
				{#if bubble.host === true}
					<!-- Host Message Bubble -->
					<pre class="ml-2">host: {JSON.stringify(bubble, null, 2)}</pre>
				{:else}
					<!-- Guest Message Bubble -->
					<pre class="ml-2">guest: {JSON.stringify(bubble, null, 2)}</pre>
				{/if}
			{/each}
		</div>

		<!-- Third Column of Body -->
		<div
			in:blur={{ amount: 15 }}
			class="pt-4 pl-2 space-y-4 overflow-scroll bg-white select-text lg:text-base md:text-sm sm:text-sm pb-14 hide-scrollbar dark:bg-black"
		>
			{#each messageFeed as bubble, i}
				{#if bubble.host === true}
					<!-- Host Message Bubble -->
					<pre class="ml-2">host: {JSON.stringify(bubble, null, 2)}</pre>
				{:else}
					<!-- Guest Message Bubble -->
					<pre class="ml-2">guest: {JSON.stringify(bubble, null, 2)}</pre>
				{/if}
			{/each}
		</div>
	</div>
</div>
