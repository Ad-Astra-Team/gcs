<script>
	import { createEventDispatcher } from 'svelte';
	import { IconRoute, IconEye, IconFocusCentered } from '@tabler/icons-svelte';
	const dispatch = createEventDispatcher();
	let eye = true;
	function clickEye() {
		eye = !eye;
		dispatch('click-eye', eye);
	}

	let lines = true;
	function clickLines() {
		lines = !lines;
		dispatch('click-lines', lines);
	}
</script>

<!-- Map Icons -->
<button
	type="button"
	class="single-click"
	on:click={() => dispatch('click-reset')}
	title="Reset View"
>
	<IconFocusCentered class="text-dark dark:text-white" />
</button>

<button type="button" on:click={clickEye} class:selected={eye} title="Show Markers">
	<IconEye class="text-dark dark:text-white" />
</button>

<button type="button" on:click={clickLines} class:selected={lines} title="Show Lines">
	<IconRoute class="text-dark dark:text-white" />
</button>

<style>
	.selected {
		background-color: rgb(12, 148, 211);
	}

	button {
		width: 2rem;
		height: 2rem;
		border: 0;
		background-color: transparent;
		transition-duration: 250ms;
		border-radius: 0.375rem;
		display: flex;
		margin-top: 3px;
		justify-content: center;
		align-items: center;
	}

	.single-click:active {
		background-color: rgb(12, 148, 211);
	}
</style>
