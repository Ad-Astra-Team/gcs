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

<div class="container w-full h-full min-w-full min-h-full">
	<div class="grid h-full grid-cols-3">
		<div
			class="relative flex flex-col w-full h-full p-3 space-y-4 overflow-y-auto bg-black text-red"
		>
			<div class="bg-black">
				<h1 style="font-family: Nevan;" class="mt-2 text-center text-red-700">Ground Control</h1>
			</div>
			<div class="flex flex-col text-white">
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
		<div
			class="w-full h-full p-3 space-y-4 overflow-y-auto bg-black border-l-2 border-r-2 border-white dark:border-[#1f2937]"
		>
			<div class="bg-black">
				<h1 style="font-family: Nevan;" class="mt-2 text-center text-red-700">AI Computer</h1>
			</div>
			<div class="flex flex-col text-white">
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
		<div class="w-full h-full p-3 space-y-4 overflow-y-auto bg-black">
			<div class="bg-black">
				<h1 style="font-family: Nevan;" class="mt-2 text-center text-red-700">Mission Computer</h1>
			</div>
			<div class="flex flex-col text-white">
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
