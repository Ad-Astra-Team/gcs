<script>
	// Importing Variables From Stores
	import {
		voiceAssistantSelection,
		selectedVoiceAssistant,
		tenPercentEngine,
		fiftyPercentEngine,
		ninetyPercentEngine,
		hundredPercentEngine,
		selectedEngineCapacity,
		backDirectionTest,
		leftDirectionTest,
		rightDirectionTest,
		forwardDirectionTest,
		selectedDirection,
		speedTest,
		speedTestUnit,
		latencyValue,
		jitterValue,
		xCoordinate,
		yCoordinate,
		zCoordinate,
		intensity
	} from '$lib/Utils/stores';

	// Importing Tabler's Icon Pack
	import {
		IconEngine,
		IconDirectionArrows,
		IconArrowDown,
		IconArrowForwardUp,
		IconArrowBackUp,
		IconArrowUp,
		IconBrandSpeedtest,
		IconRulerMeasure
	} from '@tabler/icons-svelte';

	// Importing Transitions
	import { fade } from 'svelte/transition';

	// Variables for countdown
	let second = 0;
	let interval = 0;
	let secondDirection = 0;
	let directionInterval = 0;

	// Function For Playing an Audio
	function testPlayButtonSound(source) {
		var sound = new Audio();
		sound.src = source;
		sound.play();
	}

	// Function for Countdown and True Statement While Doing That
	function runEngine(capacity) {
		$selectedEngineCapacity = capacity;

		second = 5;

		// Reset All Engine States to False
		$tenPercentEngine = false;
		$fiftyPercentEngine = false;
		$ninetyPercentEngine = false;
		$hundredPercentEngine = false;

		// Set the Engine State to True
		if (capacity === 10) {
			$tenPercentEngine = true;
		} else if (capacity === 50) {
			$fiftyPercentEngine = true;
		} else if (capacity === 90) {
			$ninetyPercentEngine = true;
		} else if (capacity === 100) {
			$hundredPercentEngine = true;
		}

		// Clear Any Existing Interval to Avoid Multiple Intervals
		if (interval) {
			clearInterval(interval);
		}

		// Set Variables to False If Countdown Over
		interval = setInterval(() => {
			second -= 1;
			if (second <= 0) {
				clearInterval(interval);
				if (capacity === 10) {
					$tenPercentEngine = false;
				} else if (capacity === 50) {
					$fiftyPercentEngine = false;
				} else if (capacity === 90) {
					$ninetyPercentEngine = false;
				} else if (capacity === 100) {
					$hundredPercentEngine = false;
				}
			}
		}, 1000);
	}

	// Function for Direction Countdown
	function runDirection(selectedDirection) {
		secondDirection = 5;

		// Reset All Direction States to False
		$backDirectionTest = false;
		$leftDirectionTest = false;
		$rightDirectionTest = false;
		$forwardDirectionTest = false;

		// Set the Direction State to True
		if (selectedDirection === 'forward') {
			$forwardDirectionTest = true;
		} else if (selectedDirection === 'back') {
			$backDirectionTest = true;
		} else if (selectedDirection === 'left') {
			$leftDirectionTest = true;
		} else if (selectedDirection === 'right') {
			$rightDirectionTest = true;
		}

		// Clear Any Existing Interval to Avoid Multiple Intervals
		if (directionInterval) {
			clearInterval(directionInterval);
		}

		// Set Variables to False If Countdown Over
		directionInterval = setInterval(() => {
			secondDirection -= 1;
			if (secondDirection <= 0) {
				clearInterval(directionInterval);
				if (selectedDirection === 'forward') {
					$forwardDirectionTest = false;
				} else if (selectedDirection === 'back') {
					$backDirectionTest = false;
				} else if (selectedDirection === 'left') {
					$leftDirectionTest = false;
				} else if (selectedDirection === 'right') {
					$rightDirectionTest = false;
				}
			}
		}, 1000);
	}
</script>

<!-- Outer Container -->
<div class="container grid w-full h-full min-w-full min-h-full grid-rows-2">
	<!-- Row 1 -->
	<div class="grid w-full h-full grid-cols-2">
		<!-- Section 1 -->
		<div
			in:fade={{ delay: 200, duration: 300 }}
			class="flex flex-col w-full h-full pb-3 border-b-2 border-r-2 border-white border-opacity-60 rounded-r-2xl"
		>
			<!-- First Row of Section -->
			<!-- Header -->
			<div
				class="flex flex-row w-full h-full space-x-2 text-black dark:text-white place-content-center place-items-center h3"
			>
				<!-- Icon -->
				<IconBrandSpeedtest class="flex flex-col w-9 h-9" />

				<!-- Header -->
				<h3 class="flex flex-col" style="font-family: Nevan">Communication Test</h3>
			</div>

			<!-- Second Row of Section -->
			<!-- Speed Test Row -->
			<div class="flex flex-row w-full h-full space-x-2 place-content-center place-items-center">
				<!-- Speed Test Value -->
				<i class="font-bold text-9xl">
					{$speedTest}
				</i>

				<!-- Speed Test Unit -->
				<i class="text-5xl font-bold place-content-end">{$speedTestUnit[1]}</i>
			</div>

			<!-- Third Row of Section -->
			<!-- Latency and Jitter Row -->
			<div class="flex flex-row w-full h-full space-x-20 place-content-center place-items-start">
				<!-- Latency Col -->
				<div class="flex flex-col text-2xl">
					<!-- Latency Header -->
					<i class="font-semibold">Latency</i>

					<!-- Latency Value -->
					<p class="mt-1 text-xl text-center border-t-2 border-black dark:border-white">
						{$latencyValue}
					</p>
				</div>

				<!-- Jitter Col -->
				<div class="flex flex-col text-2xl">
					<!-- Jitter Heder -->
					<i class="font-semibold">Jitter</i>

					<!-- Jitter Value -->
					<p class="mt-1 text-xl text-center border-t-2 border-black dark:border-white">
						{$jitterValue}
					</p>
				</div>
			</div>
		</div>

		<!-- Section 2 -->
		<div
			in:fade={{ delay: 250, duration: 350 }}
			class="flex flex-col w-full h-full border-b-2 border-white border-opacity-60 rounded-l-2xl"
		>
			<!-- First Row of Section -->
			<!-- Header -->
			<div
				class="flex flex-row w-full h-full space-x-2 text-black dark:text-white place-content-center place-items-center h3"
			>
				<!-- Icon -->
				<IconRulerMeasure class="flex flex-col w-9 h-9" />

				<!-- Header -->
				<h3 class="flex flex-col" style="font-family: Nevan">Lidar Test</h3>
			</div>

			<!-- Second Row of Section -->
			<!-- Coordinates -->
			<div class="flex flex-row w-full h-full lg:space-x-12 md: sm:">
				<!-- X Coordinate -->
				<div class="flex flex-col w-full h-full">
					<!-- X Coordinate Text -->
					<i
						class="flex flex-row w-full h-full text-6xl font-bold place-content-center place-items-center"
					>
						X
					</i>

					<!-- X Coordinate Value -->
					<p class="flex flex-row w-full h-full text-xl place-content-center place-items-center">
						{$xCoordinate}
					</p>
				</div>

				<!-- Y Coordinate -->
				<div class="flex flex-col w-full h-full border-l-2 border-r-2">
					<!-- Y Coordinate Text -->
					<i
						class="flex flex-row w-full h-full text-6xl font-bold place-content-center place-items-center"
					>
						Y
					</i>

					<!-- Y Coordinate Value -->
					<p class="flex flex-row w-full h-full text-xl place-content-center place-items-center">
						{$yCoordinate}
					</p>
				</div>

				<!-- Z Coordinate -->
				<div class="flex flex-col w-full h-full">
					<!-- Z Coordinate Text -->
					<i
						class="flex flex-row w-full h-full text-6xl font-bold place-content-center place-items-center"
					>
						Z
					</i>

					<!-- Z Coordinate Value -->
					<p class="flex flex-row w-full h-full text-xl place-content-center place-items-center">
						{$zCoordinate}
					</p>
				</div>
			</div>

			<!-- Third Row of Section -->
			<!-- Intensity Row -->
			<div class="flex flex-row w-full h-full mt-2">
				<div class="flex flex-col w-full h-full">
					<!-- Intensity Text -->
					<i
						class="flex flex-row w-full h-full px-3 pb-1 text-4xl font-bold b place-content-center place-items-center"
					>
						Intensity
					</i>

					<!-- Intensity Value -->
					<p class="flex flex-row w-full h-full text-xl place-content-center place-items-start">
						{$intensity}
					</p>
				</div>
			</div>
		</div>
	</div>

	<!-- Row 2 -->
	<div class="grid w-full h-full grid-cols-2">
		<!-- Section 3 -->
		<div
			in:fade={{ delay: 300, duration: 400 }}
			class="flex flex-col w-full h-full border-b-2 border-r-2 border-white border-opacity-60 rounded-ee-xl"
		>
			<!-- First Row of Section -->
			<!-- Header -->
			<div
				class="flex flex-row w-full h-full space-x-2 text-black dark:text-white place-content-center place-items-center h3"
			>
				<!-- Icon -->
				<IconEngine class="flex flex-col w-9 h-9" />

				<!-- Header -->
				<h3 class="flex flex-col" style="font-family: Nevan">Engine Test</h3>
			</div>

			<!-- Second Row of Section -->
			<div
				class="flex flex-row w-full h-full lg:space-x-2 md:space-x-1 sm:space-x-1 place-items-center place-content-center"
			>
				<!-- %10 Button -->
				<button
					on:click={() => {
						runEngine(10);

						if ($tenPercentEngine === true && $selectedVoiceAssistant === 'Man') {
							testPlayButtonSound('buttonSounds/MTenPercent.mp3');
							console.log('Connect button sound played.');
						} else if ($tenPercentEngine === true && $selectedVoiceAssistant === 'Woman') {
							testPlayButtonSound('buttonSounds/FTenPercent.mp3');
							console.log('Disconnect button sound played.');
						}
					}}
					class={`py-2.5  rounded-l-full drop-shadow-2xl px-4 lg:w-1/6 sm:w-1/4 md:w-2/4 lg:h-2/5 md:h-1/2 sm:h-1/2  active:ring-4 dark:shadow-lg font-medium text-white hover:bg-gradient-to-br focus:outline-none shadow-lg bg-gradient-to-r ${
						$tenPercentEngine
							? 'from-red-500 via-red-600 to-red-700 focus:ring-red-400 dark:focus:ring-red-900 shadow-red-600/50 dark:shadow-red-900/80'
							: ' from-sky-500 via-sky-600 to-sky-700 focus:ring-sky-400 dark:focus:ring-sky-900 shadow-sky-600/50 dark:shadow-sky-900/80'
					}`}
				>
					Run at %10
				</button>

				<!-- %50 Button -->
				<button
					on:click={() => {
						runEngine(50);
						if ($fiftyPercentEngine === true && $selectedVoiceAssistant === 'Man') {
							testPlayButtonSound('buttonSounds/MFiftyPercent.mp3');
							console.log('Connect button sound played.');
						} else if ($fiftyPercentEngine === true && $selectedVoiceAssistant === 'Woman') {
							testPlayButtonSound('buttonSounds/FFiftyPercent.mp3');
							console.log('Disconnect button sound played.');
						}
					}}
					class={`py-2.5  drop-shadow-2xl px-4 lg:w-1/6 sm:w-1/4 md:w-2/4 lg:h-2/5 md:h-1/2 sm:h-1/2  active:ring-4 dark:shadow-lg font-medium text-white hover:bg-gradient-to-br focus:outline-none shadow-lg bg-gradient-to-r ${
						$fiftyPercentEngine
							? 'from-red-500 via-red-600 to-red-700 focus:ring-red-400 dark:focus:ring-red-900 shadow-red-600/50 dark:shadow-red-900/80'
							: ' from-sky-500 via-sky-600 to-sky-700 focus:ring-sky-400 dark:focus:ring-sky-900 shadow-sky-600/50 dark:shadow-sky-900/80'
					}`}
				>
					Run at %50
				</button>

				<!-- %90 Button -->
				<button
					on:click={() => {
						runEngine(90);

						if ($ninetyPercentEngine === true && $selectedVoiceAssistant === 'Man') {
							testPlayButtonSound('buttonSounds/MNinetyPercent.mp3');
							console.log('Connect button sound played.');
						} else if ($ninetyPercentEngine === true && $selectedVoiceAssistant === 'Woman') {
							testPlayButtonSound('buttonSounds/FNinetyPercent.mp3');
							console.log('Disconnect button sound played.');
						}
					}}
					class={`py-2.5  drop-shadow-2xl px-4 lg:w-1/6 sm:w-1/4 md:w-2/4 lg:h-2/5 md:h-1/2 sm:h-1/2  active:ring-4 dark:shadow-lg font-medium text-white hover:bg-gradient-to-br focus:outline-none shadow-lg bg-gradient-to-r ${
						$ninetyPercentEngine
							? 'from-red-500 via-red-600 to-red-700 focus:ring-red-400 dark:focus:ring-red-900 shadow-red-600/50 dark:shadow-red-900/80'
							: ' from-sky-500 via-sky-600 to-sky-700 focus:ring-sky-400 dark:focus:ring-sky-900 shadow-sky-600/50 dark:shadow-sky-900/80'
					}`}
				>
					Run at %90
				</button>

				<!-- %100 Button -->
				<button
					on:click={() => {
						runEngine(100);
						if ($hundredPercentEngine === true && $selectedVoiceAssistant === 'Man') {
							testPlayButtonSound('buttonSounds/MHundredPercent.mp3');
							console.log('Connect button sound played.');
						} else if ($hundredPercentEngine === true && $selectedVoiceAssistant === 'Woman') {
							testPlayButtonSound('buttonSounds/FHundredPercent.mp3');
							console.log('Disconnect button sound played.');
						}
					}}
					class={`py-2.5  rounded-r-full drop-shadow-2xl px-4 lg:w-1/6 sm:w-1/4 md:w-2/4 lg:h-2/5 md:h-1/2 sm:h-1/2  active:ring-4 dark:shadow-lg font-medium text-white hover:bg-gradient-to-br focus:outline-none shadow-lg bg-gradient-to-r ${
						$hundredPercentEngine
							? 'from-red-500 via-red-600 to-red-700 focus:ring-red-400 dark:focus:ring-red-900 shadow-red-600/50 dark:shadow-red-900/80'
							: ' from-sky-500 via-sky-600 to-sky-700 focus:ring-sky-400 dark:focus:ring-sky-900 shadow-sky-600/50 dark:shadow-sky-900/80'
					}`}
				>
					Run at %100
				</button>
			</div>

			<!-- Third Row of Section -->
			<div class="flex flex-row w-full h-full place-items-start place-content-center">
				<!-- Countdown Condition -->
				{#if $tenPercentEngine === true || $fiftyPercentEngine === true || $ninetyPercentEngine === true || $hundredPercentEngine === true}
					<!-- Countdown Test -->
					<b class="flex flex-row text-lg" in:fade={{ delay: 100, duration: 400 }}
						>Engine running at %{$selectedEngineCapacity} capacity. ({second} second)
					</b>
				{/if}
			</div>
		</div>

		<!-- Section 4 -->
		<div
			in:fade={{ delay: 350, duration: 450 }}
			class="flex flex-col w-full h-full pb-3 border-b-2 border-white place-items-center border-opacity-60 rounded-es-2xl"
		>
			<!-- First Row of Section -->
			<div
				class="flex flex-row w-full h-full pb-5 space-x-2 text-black dark:text-white place-content-center place-items-end h3"
			>
				<IconDirectionArrows class="w-9 h-9" />
				<h3 class="flex flex-col" style="font-family: Nevan">Direction Test</h3>
			</div>

			<!-- Second Row of Section -->
			<div class="flex flex-row w-full h-full place-items-end place-content-center">
				<!-- Forward Direction Button -->
				<button
					on:click={() => {
						runDirection('forward');

						if ($forwardDirectionTest === true && $selectedVoiceAssistant === 'Man') {
							testPlayButtonSound('buttonSounds/MForwardDirection.mp3');
							console.log('Connect button sound played.');
						} else if ($forwardDirectionTest === true && $selectedVoiceAssistant === 'Woman') {
							testPlayButtonSound('buttonSounds/FForwardDirection.mp3');
							console.log('Disconnect button sound played.');
						}
					}}
					class={`py-4 drop-shadow-2xl px-8 text-sm active:ring-4 dark:shadow-lg font-medium text-white hover:bg-gradient-to-br rounded-full focus:outline-none shadow-lg bg-gradient-to-r ${
						$forwardDirectionTest
							? 'from-red-500 via-red-600 to-red-700 focus:ring-red-400 dark:focus:ring-red-900 shadow-red-600/50 dark:shadow-red-900/80'
							: ' from-sky-500 via-sky-600 to-sky-700 focus:ring-sky-400 dark:focus:ring-sky-900 shadow-sky-600/50 dark:shadow-sky-900/80'
					}`}
				>
					<IconArrowUp class="w-9 h-9" />
				</button>
			</div>

			<!-- Third Row of Section -->
			<div class="flex flex-row w-full h-full space-x-8 place-items-center place-content-center">
				<!-- Left Direction Button -->
				<button
					on:click={() => {
						runDirection('left');
						if ($leftDirectionTest === true && $selectedVoiceAssistant === 'Man') {
							testPlayButtonSound('buttonSounds/MLeftDirection.mp3');
							console.log('Connect button sound played.');
						} else if ($leftDirectionTest === true && $selectedVoiceAssistant === 'Woman') {
							testPlayButtonSound('buttonSounds/FLeftDirection.mp3');
							console.log('Disconnect button sound played.');
						}
					}}
					class={`py-4 rounded-full drop-shadow-2xl px-8 text-sm active:ring-4 dark:shadow-lg font-medium text-white hover:bg-gradient-to-br focus:outline-none shadow-lg bg-gradient-to-r ${
						$leftDirectionTest
							? 'from-red-500 via-red-600 to-red-700 focus:ring-red-400 dark:focus:ring-red-900 shadow-red-600/50 dark:shadow-red-900/80'
							: ' from-sky-500 via-sky-600 to-sky-700 focus:ring-sky-400 dark:focus:ring-sky-900 shadow-sky-600/50 dark:shadow-sky-900/80'
					}`}
				>
					<IconArrowBackUp class="w-9 h-9" />
				</button>

				<!-- Direction Countdown -->
				{#if $leftDirectionTest === true || $rightDirectionTest === true || $forwardDirectionTest === true || $backDirectionTest === true}
					<b
						in:fade={{ delay: 300, duration: 350 }}
						class="px-4 text-2xl border-2 border-black rounded-full dark:border-white"
					>
						{secondDirection}
					</b>
				{:else}
					<b
						in:fade={{ delay: 300, duration: 350 }}
						class="px-4 border-2 border-black dark:border-white"
					/>
				{/if}

				<!-- Right Direction Button -->
				<button
					on:click={() => {
						runDirection('right');
						if ($rightDirectionTest === true && $selectedVoiceAssistant === 'Man') {
							testPlayButtonSound('buttonSounds/MRightDirection.mp3');
							console.log('Connect button sound played.');
						} else if ($rightDirectionTest === true && $selectedVoiceAssistant === 'Woman') {
							testPlayButtonSound('buttonSounds/FRightDirection.mp3');
							console.log('Disconnect button sound played.');
						}
					}}
					class={`py-4 rounded-full drop-shadow-2xl px-8 text-sm active:ring-4 dark:shadow-lg font-medium text-white hover:bg-gradient-to-br focus:outline-none shadow-lg bg-gradient-to-r ${
						$rightDirectionTest
							? 'from-red-500 via-red-600 to-red-700 focus:ring-red-400 dark:focus:ring-red-900 shadow-red-600/50 dark:shadow-red-900/80'
							: ' from-sky-500 via-sky-600 to-sky-700 focus:ring-sky-400 dark:focus:ring-sky-900 shadow-sky-600/50 dark:shadow-sky-900/80'
					}`}
				>
					<IconArrowForwardUp class="w-9 h-9" />
				</button>
			</div>

			<!-- Fourth Row of Section -->
			<div class="flex flex-row w-full h-full place-items-start place-content-center">
				<!-- Back Direction Button -->
				<button
					on:click={() => {
						runDirection('back');
						if ($backDirectionTest === true && $selectedVoiceAssistant === 'Man') {
							testPlayButtonSound('buttonSounds/MBackDirection.mp3');
							console.log('Connect button sound played.');
						} else if ($backDirectionTest === true && $selectedVoiceAssistant === 'Woman') {
							testPlayButtonSound('buttonSounds/FBackDirection.mp3');
							console.log('Disconnect button sound played.');
						}
					}}
					class={`py-4 rounded-full drop-shadow-2xl px-8 text-sm active:ring-4 dark:shadow-lg font-medium text-white hover:bg-gradient-to-br focus:outline-none shadow-lg bg-gradient-to-r ${
						$backDirectionTest
							? 'from-red-500 via-red-600 to-red-700 focus:ring-red-400 dark:focus:ring-red-900 shadow-red-600/50 dark:shadow-red-900/80'
							: ' from-sky-500 via-sky-600 to-sky-700 focus:ring-sky-400 dark:focus:ring-sky-900 shadow-sky-600/50 dark:shadow-sky-900/80'
					}`}
				>
					<IconArrowDown class="w-9 h-9" />
				</button>
			</div>
		</div>
	</div>
</div>
