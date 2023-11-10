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
			class="z-20 grid grid-cols-3 shadow-xl rounded-b-3xl dark:border-none bg-slate-100 shadow-slate-300 dark:shadow-[#1f2937] dark:bg-[#050505] top-50"
		>
			<div
				style="font-family: Nevan;"
				class="pt-3 pb-3 text-lg text-center text-red-800 border-none"
			>
				Ground Control
			</div>
			<div
				style="font-family: Nevan;"
				class="text-lg text-center text-red-800 pt-3 pb-3 border-r-4 border-l-4 rounded-t-xl border-[#e0e8f6] dark:border-[#1f2937]"
			>
				AI Computer
			</div>
			<div
				style="font-family: Nevan;"
				class="pt-3 pb-3 text-lg text-center text-red-800 border-none"
			>
				Mission Computer
			</div>
		</div>

		<div class="grid w-full h-full grid-cols-3 overflow-hidden">
			<div
				class="w-full h-full pt-4 pl-2 space-y-4 overflow-scroll bg-white border-none pb-14 hide-scrollbar dark:bg-black"
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
				class="w-full pt-4 pl-2 pb-14 overflow-scroll hide-scrollbar h-full border-r-4 select-text border-l-4 border-[#e0e8f6] dark:border-[#1f2937] space-y-4 bg-white dark:bg-black rounded-md"
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
				class="w-full h-full pt-4 pl-2 space-y-4 overflow-scroll bg-white border-none select-text pb-14 hide-scrollbar dark:bg-black"
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
