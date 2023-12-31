<script>
	let messageFeed = [
		{
			id: 0,
			host: true,
			avatar: 48,
			name: 'Jane',
			timestamp: 'Yesterday @ 2:30pm',
			message: 'Some message text.',
			color: 'variant-soft-primary'
		},
		{
			id: 0,
			host: true,
			avatar: 48,
			name: 'Jane',
			timestamp: 'Yesterday @ 2:30pm',
			message: 'Some message text.',
			color: 'variant-soft-primary'
		},
		{
			id: 0,
			host: true,
			avatar: 48,
			name: 'Jane',
			timestamp: 'Yesterday @ 2:30pm',
			message: 'Some message text.',
			color: 'variant-soft-primary'
		},
		{
			id: 0,
			host: true,
			avatar: 48,
			name: 'Jane',
			timestamp: 'Yesterday @ 2:30pm',
			message: 'Some message text.',
			color: 'variant-soft-primary'
		},
		{
			id: 1,
			host: false,
			avatar: 14,
			name: 'Michael',
			timestamp: 'Yesterday @ 2:45pm',
			message: 'Some message text.',
			color: 'variant-soft-primary'
		}
	];
</script>

<div class="container w-full h-full min-w-full min-h-full bg-white dark:bg-black">
	<div class="flex flex-col w-full h-screen overflow-scroll hide-scrollbar">
		<div
			class="z-0 grid grid-cols-3 shadow-xl rounded-b-3xl dark:border-none bg-slate-100 shadow-slate-300 dark:shadow-[#1f2937] dark:bg-[#050505] top-50"
		>
			<h3 class="pt-3 pb-3 pl-6 pr-6 text-center h3" style="font-family: Nevan;">
				<span
					class="self-center text-transparent bg-gradient-to-br from-blue-600 to-cyan-400 dark:from-blue-500 dark:to-cyan-300 bg-clip-text box-decoration-clone"
					>Ground Control</span
				>
			</h3>

			<h3 class="self-center pl-8 pr-8 text-center h3" style="font-family: Nevan;">
				<span
					class="text-transparent bg-gradient-to-br from-blue-600 to-cyan-400 dark:from-blue-500 dark:to-cyan-300 bg-clip-text box-decoration-clone"
					>AI Computer</span
				>
			</h3>

			<h3 class="self-center pl-6 pr-6 text-center h3" style="font-family: Nevan">
				<span
					class="text-transparent bg-gradient-to-br from-blue-600 to-cyan-400 dark:from-blue-500 dark:to-cyan-300 bg-clip-text box-decoration-clone"
					>Mission Computer</span
				>
			</h3>
		</div>

		<div class="grid w-full h-full grid-cols-3 overflow-hidden">
			<div
				class="w-full h-full pt-4 pl-2 space-y-4 overflow-scroll bg-white border-none lg:text-base md:text-sm pb-14 hide-scrollbar dark:bg-black"
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
			<div
				class="lg:text-base md:text-sm w-full pt-4 pl-2 pb-14 overflow-scroll hide-scrollbar h-full border-r-4 select-text border-l-4 border-[#dce3e6] dark:border-[#172336] space-y-4 bg-white dark:bg-black rounded-md"
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
			<div
				class="w-full h-full pt-4 pl-2 space-y-4 overflow-scroll bg-white border-none select-text lg:text-base md:text-sm pb-14 hide-scrollbar dark:bg-black"
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
</div>
