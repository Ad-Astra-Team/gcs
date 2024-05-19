<script>
	//Importing Variables From Stores
	import {
		languageSelection,
		voiceAssistantSelection,
		trackLengthSelection,
		distanceUnitSelection,
		altitudeUnit,
		speedUnit,
		taxiLed,
		cruiseLed,
		harassLed,
		customLed,
		RSSIGPS,
		bestHealthGPS,
		dualMode,
		primaryGPS,
		singleMode,
		secondaryGPS,
		simpleGPS,
		GPSOff,
		domainValue,
		ipValue,
		portValue,
		ledFrequency,
		lidarMaxDistance,
		lidarMinDistance,
		streamAddress,
		streamChunks,
		applyButton,
		selectedAltitudeUnit,
		selectedDistanceUnit,
		selectedLanguage,
		selectedSpeedUnit,
		selectedTrackLength,
		selectedVoiceAssistant,
		selectedFormat,
		selectedGPSMode,
		selectedLed,
		selectedCodec
	} from '$lib/Utils/stores';

	//Importing Tabler's Icon Pack
	import {
		IconCheck,
		IconStack2,
		IconBox,
		IconSun,
		IconRuler3,
		IconGps,
		IconDeviceTv
	} from '@tabler/icons-svelte';

	//Importing Transitions
	import { fade, slide } from 'svelte/transition';

	//Function to Make GPSOff True and Anything Else False
	function turnOffGPS() {
		$singleMode = false;
		$dualMode = false;
		$primaryGPS = false;
		$secondaryGPS = false;
		$simpleGPS = false;
		$RSSIGPS = false;
		$bestHealthGPS = false;
	}

	//Function For Playing an Audio
	function settingsPlayButtonSound(source) {
		var sound = new Audio();
		sound.src = source;
		sound.play();
	}

	//Controlling GPSOff Exceptions
	$: {
		if (
			($singleMode === false && $dualMode === false) ||
			($singleMode === false && $dualMode === false && $GPSOff === false)
		) {
			$GPSOff = true;
			turnOffGPS();
		}
	}
</script>

<!-- Outer Container -->
<div class="container grid w-full h-full min-w-full min-h-full grid-rows-3 pb-1">
	<!-- Row 1 -->
	<div class="grid w-full h-full grid-cols-2">
		<!-- Section 1 -->
		<div
			in:fade={{ delay: 200, duration: 300 }}
			class="flex flex-col w-full h-full border-b-2 border-r-2 border-white border-opacity-60 rounded-ee-xl"
		>
			<!-- First row of section -->
			<!-- Header -->
			<div
				class="flex flex-row w-full h-full space-x-2 text-black dark:text-white place-content-center place-items-center h3"
			>
				<IconStack2 class="flex flex-col w-9 h-9" />
				<h3 class="flex flex-col" style="font-family: Nevan">Backend Settings</h3>
			</div>

			<!-- Second row of section -->
			<div class="flex flex-row w-full h-full place-items-start place-content-center">
				<!-- Domain Input -->
				<div
					class="input-group shadow-2xl drop-shadow-2xl w-3/5 input-group-divider grid-cols-[auto_1fr_auto]"
				>
					<div class="font-semibold text-center text-sky-600 dark:text-sky-300 input-group-shim">
						Domain
					</div>

					<input type="url" placeholder="msakg.com" bind:value={$domainValue} />
				</div>
			</div>

			<!-- Third row of section -->
			<div class="flex flex-row w-full h-full place-items-start place-content-center">
				<!-- IP Input -->
				<div
					class="input-group shadow-lg drop-shadow-2xl w-3/5 input-group-divider grid-cols-[auto_1fr_auto]"
				>
					<div class="font-semibold text-center text-sky-600 dark:text-sky-300 input-group-shim">
						IP
					</div>

					<input type="text" placeholder="85.117.239.161" bind:value={$ipValue} />
				</div>
			</div>

			<!-- Fourth row of section -->
			<div class="flex flex-row w-full h-full place-content-center place-items-start">
				<!-- Port Input -->
				<div
					class="input-group shadow-lg drop-shadow-2xl w-3/5 input-group-divider grid-cols-[auto_1fr_auto]"
				>
					<div class="font-semibold text-center text-sky-600 dark:text-sky-300 input-group-shim">
						Port
					</div>

					<input type="number" placeholder="115200" min="0" bind:value={$portValue} />
				</div>
			</div>
		</div>

		<!-- Section 2 -->
		<div
			in:fade={{ delay: 250, duration: 350 }}
			class="flex flex-col w-full h-full border-b-2 border-white place-items-center border-opacity-60 rounded-es-2xl"
		>
			<!-- First row of section -->
			<!-- Header -->
			<div
				class="flex flex-row w-full h-full space-x-2 text-black dark:text-white place-content-center place-items-center h3"
			>
				<IconBox class="flex flex-col w-9 h-9" />
				<h3 class="flex flex-col" style="font-family: Nevan">App Settings</h3>
			</div>

			<!-- Second row of section -->
			<div class="flex flex-row w-full h-full space-x-5 lg:w-1/2 md:w-3/4 sm:w-3/4">
				<!-- Language Selection -->
				<div class="flex flex-col w-full h-full">
					<i class="text-sm opacity-80">Language</i>

					<select
						bind:value={$selectedLanguage}
						class="pt-3 drop-shadow-2xl variant-form-material pb-2.5 text-sm font-medium bg-white text-center shadow-lg text-sky-600 dark:text-sky-300 shadow-sky-500/50 dark:shadow-lg dark:shadow-sky-800/80 select"
					>
						{#each $languageSelection as language}
							<option value={language}>{language}</option>
						{/each}
					</select>
				</div>

				<!-- Voice Assistans Selection -->
				<div class="flex flex-col w-full h-full">
					<i class="text-sm opacity-80">Voice Assistant</i>

					<select
						class="pt-3 drop-shadow-2xl variant-form-material pb-2.5 text-sm font-medium bg-white text-center shadow-lg text-sky-600 dark:text-sky-300 shadow-sky-500/50 dark:shadow-lg dark:shadow-sky-800/80 select"
						bind:value={$selectedVoiceAssistant}
					>
						{#each $voiceAssistantSelection as speech}
							<option value={speech}>{speech}</option>
						{/each}
					</select>
				</div>

				<!-- Track Length Selection -->
				<div class="flex flex-col w-full h-full">
					<i class="text-sm opacity-80">Track Length</i>

					<select
						class="pt-3 drop-shadow-2xl variant-form-material pb-2.5 text-sm font-medium bg-white text-center shadow-lg text-sky-600 dark:text-sky-300 shadow-sky-500/50 dark:shadow-lg dark:shadow-sky-800/80 select"
						bind:value={$selectedTrackLength}
					>
						{#each $trackLengthSelection as length}
							<option value={length}>{length}</option>
						{/each}
					</select>
				</div>
			</div>

			<!-- Third row of section -->
			<div class="flex flex-row w-full h-full space-x-5 lg:w-1/2 md:w-3/4 sm:w-3/4">
				<!-- Distance Unit Selection -->
				<div class="flex flex-col w-full h-full">
					<i class="text-sm opacity-80">Distance Unit</i>

					<select
						class="pt-3 drop-shadow-2xl variant-form-material pb-2.5 text-sm font-medium bg-white text-center shadow-lg text-sky-600 dark:text-sky-300 shadow-sky-500/50 dark:shadow-lg dark:shadow-sky-800/80 select"
						bind:value={$selectedDistanceUnit}
					>
						{#each $distanceUnitSelection as distance}
							<option value={distance}>{distance}</option>
						{/each}
					</select>
				</div>

				<!-- Altitude Unit Selection -->
				<div class="flex flex-col w-full h-full">
					<i class="text-sm opacity-80">Altitude Unit</i>

					<select
						class="pt-3 drop-shadow-2xl variant-form-material pb-2.5 text-sm font-medium bg-white text-center shadow-lg text-sky-600 dark:text-sky-300 shadow-sky-500/50 dark:shadow-lg dark:shadow-sky-800/80 select"
						bind:value={$selectedAltitudeUnit}
					>
						{#each $altitudeUnit as altitude}
							<option value={altitude}>{altitude}</option>
						{/each}
					</select>
				</div>

				<!-- Speed Unit Selection -->
				<div class="flex flex-col w-full h-full">
					<i class="text-sm opacity-80">Speed Unit</i>

					<select
						class="pt-3 drop-shadow-2xl variant-form-material pb-2.5 text-sm font-medium bg-white text-center shadow-lg text-sky-600 dark:text-sky-300 shadow-sky-500/50 dark:shadow-lg dark:shadow-sky-800/80 select"
						bind:value={$selectedSpeedUnit}
					>
						{#each $speedUnit as speed}
							<option value={speed}>{speed}</option>
						{/each}
					</select>
				</div>
			</div>
		</div>
	</div>

	<!-- Row 2 -->
	<div class="grid w-full h-full grid-cols-2">
		<!-- Section 3 -->
		<div
			in:fade={{ delay: 300, duration: 400 }}
			class="flex flex-col w-full h-full border-b-2 border-r-2 border-white border-opacity-60 rounded-r-2xl"
		>
			<!-- First row of section -->
			<!-- Header -->
			<div
				class="flex flex-row w-full h-full space-x-2 text-black dark:text-white place-content-center place-items-center h3"
			>
				<IconSun class="flex flex-col w-9 h-9" />
				<h3 class="flex flex-col" style="font-family: Nevan">Led Settings</h3>
			</div>

			<!-- Second row of section -->
			<div class="flex flex-row w-full h-full space-x-8 place-content-center place-items-start">
				<!-- Taxi Led Button -->
				<button
					on:click={() => {
						$taxiLed = !$taxiLed;
						$cruiseLed = false;
						$harassLed = false;
						$customLed = false;

						$selectedLed = 'Taxi Led';

						if ($taxiLed === true && $selectedVoiceAssistant === 'Man') {
							settingsPlayButtonSound('buttonSounds/MTaxiMode.mp3');
						} else if ($taxiLed === true && $selectedVoiceAssistant === 'Woman') {
							settingsPlayButtonSound('buttonSounds/FTaxiMode.mp3');
						}
					}}
					class={`py-2.5 drop-shadow-2xl px-5 lg:w-1/6 sm:w-1/4 md:w-1/4 text-sm active:ring-4 rounded-es-full dark:shadow-lg font-medium text-white rounded-r-full hover:bg-gradient-to-br focus:outline-none shadow-lg bg-gradient-to-r ${
						$taxiLed
							? ' from-red-500 via-red-600 to-red-700 focus:ring-red-400 dark:focus:ring-red-900 shadow-red-600/50 dark:shadow-red-900/80'
							: ' from-sky-500 via-sky-600 to-sky-700 focus:ring-sky-400 dark:focus:ring-sky-900 shadow-sky-600/50 dark:shadow-sky-900/80'
					}`}
				>
					Taxi <br /> Mode
				</button>

				<!-- Cruise Led Button -->
				<button
					on:click={() => {
						$cruiseLed = !$cruiseLed;
						$taxiLed = false;
						$harassLed = false;
						$customLed = false;

						$selectedLed = 'Cruise Led';

						if ($cruiseLed === true && $selectedVoiceAssistant === 'Man') {
							settingsPlayButtonSound('buttonSounds/MCruiseMode.mp3');
						} else if ($cruiseLed === true && $selectedVoiceAssistant === 'Woman') {
							settingsPlayButtonSound('buttonSounds/FCruiseMode.mp3');
						}
					}}
					class={`py-2.5 drop-shadow-2xl px-5 lg:w-1/6 sm:w-1/4 md:w-1/4 text-sm active:ring-4 rounded-ee-full dark:shadow-lg font-medium text-white rounded-l-full hover:bg-gradient-to-br focus:outline-none shadow-lg bg-gradient-to-r ${
						$cruiseLed
							? 'from-red-500 via-red-600 to-red-700 focus:ring-red-400 dark:focus:ring-red-900 shadow-red-600/50 dark:shadow-red-900/80'
							: ' from-sky-500 via-sky-600 to-sky-700 focus:ring-sky-400 dark:focus:ring-sky-900 shadow-sky-600/50 dark:shadow-sky-900/80'
					}`}
				>
					Cruise <br /> Mode
				</button>
			</div>

			<!-- Third row of section -->
			<div
				class="flex flex-row w-full h-full mb-1 space-x-8 place-content-center place-items-start"
			>
				<!-- Harass Led Button -->
				<button
					on:click={() => {
						$harassLed = !$harassLed;
						$cruiseLed = false;
						$taxiLed = false;
						$customLed = false;

						$selectedLed = 'Harass Led';

						if ($harassLed === true && $selectedVoiceAssistant === 'Man') {
							settingsPlayButtonSound('buttonSounds/MHarassMode.mp3');
						} else if ($harassLed === true && $selectedVoiceAssistant === 'Woman') {
							settingsPlayButtonSound('buttonSounds/FHarassMode.mp3');
						}
					}}
					class={`py-2.5 drop-shadow-xl px-5 lg:w-1/6 sm:w-1/4 md:w-1/4 text-sm active:ring-4 rounded-ss-full dark:shadow-lg font-medium text-white rounded-r-full hover:bg-gradient-to-br focus:outline-none shadow-lg bg-gradient-to-r ${
						$harassLed
							? 'from-red-500 via-red-600 to-red-700 focus:ring-red-400 dark:focus:ring-red-900 shadow-red-600/50 dark:shadow-red-900/80'
							: ' from-sky-500 via-sky-600 to-sky-700 focus:ring-sky-400 dark:focus:ring-sky-900 shadow-sky-600/50 dark:shadow-sky-900/80'
					}`}
				>
					Harass <br /> Mode
				</button>

				<!-- Custom Led Button -->
				<button
					on:click={() => {
						$customLed = !$customLed;
						$cruiseLed = false;
						$harassLed = false;
						$taxiLed = false;

						$selectedLed = 'Custom Led';

						if ($customLed === true && $selectedVoiceAssistant === 'Man') {
							settingsPlayButtonSound('buttonSounds/MCustomMode.mp3');
						} else if ($customLed === true && $selectedVoiceAssistant === 'Woman') {
							settingsPlayButtonSound('buttonSounds/FCustomMode.mp3');
						}
					}}
					class={`py-2.5 drop-shadow-xl px-5 lg:w-1/6 sm:w-1/4 md:w-1/4 text-sm active:ring-4 rounded-se-full dark:shadow-lg font-medium text-white rounded-l-full hover:bg-gradient-to-br focus:outline-none shadow-lg bg-gradient-to-r ${
						$customLed
							? ' from-red-500 via-red-600 to-red-700 focus:ring-red-400 dark:focus:ring-red-900 shadow-red-600/50 dark:shadow-red-900/80'
							: ' from-sky-500 via-sky-600 to-sky-700 focus:ring-sky-400 dark:focus:ring-sky-900 shadow-sky-600/50 dark:shadow-sky-900/80'
					}`}
				>
					Custom <br /> Mode
				</button>
			</div>

			<!-- Fourth row of section -->
			<div class="flex flex-row w-full h-full place-content-center place-items-start">
				<!-- Custom Led Frequency Input Condition -->
				{#if $customLed === true}
					<!-- Frequency Input -->
					<div
						transition:slide={{ axis: 'x' }}
						class="input-group lg:w-1/5 md:w-2/5 sm:2/5 input-group-divider grid-cols-[auto_1fr_auto]"
					>
						<div class="font-semibold text-center text-sky-600 dark:text-sky-300 input-group-shim">
							hz
						</div>

						<input type="text" placeholder="220" bind:value={$ledFrequency} />
					</div>
				{/if}
			</div>
		</div>

		<!-- Section 4 -->
		<div
			in:fade={{ delay: 350, duration: 450 }}
			class="flex flex-col w-full h-full border-b-2 border-white border-opacity-60 rounded-l-2xl"
		>
			<!-- First row of section -->
			<!-- Header -->
			<div
				class="flex flex-row w-full h-full space-x-2 text-black dark:text-white place-content-center place-items-center h3"
			>
				<IconRuler3 class="flex flex-col w-9 h-9" />
				<h3 class="flex flex-col" style="font-family: Nevan">Lidar Settings</h3>
			</div>
			<!-- Second row of section -->
			<div class="flex flex-row w-full h-full place-content-center place-items-start">
				<!-- Maximum Distance Input -->
				<div
					class="input-group drop-shadow-2xl shadow-2xl lg:w-2/5 md:w-3/5 sm:w-3/5 input-group-divider grid-cols-[auto_1fr_auto]"
				>
					<div class="font-semibold text-center text-sky-600 dark:text-sky-300 input-group-shim">
						Max Dist.
					</div>

					<input
						type="number"
						placeholder="4000 (cm)"
						min="0"
						max="5000"
						bind:value={$lidarMaxDistance}
					/>
				</div>
			</div>

			<!-- Minimum Distance Input -->
			<div class="flex flex-row w-full h-full place-content-center place-items-start">
				<div
					class="input-group drop-shadow-2xl shadow-2xl lg:w-2/5 md:w-3/5 sm:w-3/5 input-group-divider grid-cols-[auto_1fr_auto]"
				>
					<div class="font-semibold text-center text-sky-600 dark:text-sky-300 input-group-shim">
						Min Dist.
					</div>

					<input
						type="number"
						placeholder="0 (cm)"
						min="0"
						max="5000"
						bind:value={$lidarMinDistance}
					/>
				</div>
			</div>
		</div>
	</div>

	<!-- Row 3 -->
	<div class="grid w-full h-full grid-cols-2">
		<!-- Section 5 -->
		<div
			in:fade={{ delay: 400, duration: 500 }}
			class="flex flex-col w-full h-full border-r-2 border-white border-opacity-60 rounded-se-2xl"
		>
			<!-- First row of section -->
			<!-- Header -->
			<div
				class="flex flex-row w-full h-full space-x-2 text-black dark:text-white place-content-center place-items-center h3"
			>
				<IconGps class="flex flex-col w-9 h-9" />
				<h3 class="flex flex-col" style="font-family: Nevan">Backend Settings</h3>
			</div>

			<!-- Second row of section -->
			<div class="flex flex-row w-full h-full space-x-1 place-content-center place-items-start">
				<!-- Single Mode Button -->
				<button
					on:click={() => {
						$singleMode = !$singleMode;
						$GPSOff = false;
						$dualMode = false;
						$RSSIGPS = false;
						$simpleGPS = false;
						$bestHealthGPS = false;
					}}
					class={`py-2.5 drop-shadow-2xl rounded-l-full px-5 lg:w-1/6 sm:w-1/4 md:w-1/4 lg:h-1/2 md:h-2/3 sm:h-2/3 text-sm active:ring-4 dark:shadow-lg font-medium text-white hover:bg-gradient-to-br focus:outline-none shadow-lg bg-gradient-to-r ${
						$singleMode
							? 'from-red-500 via-red-600 to-red-700 focus:ring-red-400 dark:focus:ring-red-900 shadow-red-600/50 dark:shadow-red-900/80'
							: ' from-sky-500 via-sky-600 to-sky-700 focus:ring-sky-400 dark:focus:ring-sky-900 shadow-sky-600/50 dark:shadow-sky-900/80'
					}`}
				>
					Single Mode
				</button>

				<!-- Dual Mode Button -->
				<button
					on:click={() => {
						$dualMode = !$dualMode;
						$GPSOff = false;
						$singleMode = false;
						$primaryGPS = false;
						$secondaryGPS = false;
					}}
					class={`py-2.5 drop-shadow-2xl px-5 lg:w-1/6 sm:w-1/4 md:w-1/4 lg:h-1/2 md:h-2/3 sm:h-2/3 text-sm active:ring-4  dark:shadow-lg font-medium text-white  hover:bg-gradient-to-br focus:outline-none shadow-lg bg-gradient-to-r ${
						$dualMode
							? 'from-red-500 via-red-600 to-red-700 focus:ring-red-400 dark:focus:ring-red-900 shadow-red-600/50 dark:shadow-red-900/80'
							: ' from-sky-500 via-sky-600 to-sky-700 focus:ring-sky-400 dark:focus:ring-sky-900 shadow-sky-600/50 dark:shadow-sky-900/80'
					}`}
				>
					Dual Mode
				</button>

				<!-- GPSOff Button -->
				<button
					on:click={() => {
						$GPSOff = !$GPSOff;
						turnOffGPS();

						if ($GPSOff === true && $selectedVoiceAssistant === 'Man') {
							settingsPlayButtonSound('buttonSounds/MGPSOff.mp3');
						} else if ($GPSOff === true && $selectedVoiceAssistant === 'Woman') {
							settingsPlayButtonSound('buttonSounds/FGPSOff.mp3');
						}
					}}
					class={`py-2.5 drop-shadow-2xl rounded-r-full px-5 lg:w-1/6 sm:w-1/4 md:w-1/4 lg:h-1/2 md:h-2/3 sm:h-2/3 text-sm active:ring-4  dark:shadow-lg font-medium text-white  hover:bg-gradient-to-br focus:outline-none shadow-lg bg-gradient-to-r ${
						$GPSOff
							? 'from-red-500 via-red-600 to-red-700 focus:ring-red-400 dark:focus:ring-red-900 shadow-red-600/50 dark:shadow-red-900/80'
							: ' from-sky-500 via-sky-600 to-sky-700 focus:ring-sky-400 dark:focus:ring-sky-900 shadow-sky-600/50 dark:shadow-sky-900/80'
					}`}
				>
					GPS Off
				</button>
			</div>

			<!-- Third row of section -->
			<div
				class={`flex flex-row w-full h-full place-content-center place-items-start ${
					$GPSOff ? '' : 'lg:space-x-5 md:space-x-3 sm:space-x-3'
				}`}
			>
				<!-- Child Button's Condition -->
				{#if $singleMode === true}
					<!-- Primary GPS Button -->
					<button
						in:fade={{ delay: 100, duration: 400 }}
						on:click={() => {
							$primaryGPS = !$primaryGPS;
							$secondaryGPS = false;

							$selectedGPSMode = 'Primary GPS';

							if ($primaryGPS === true && $selectedVoiceAssistant === 'Man') {
								settingsPlayButtonSound('buttonSounds/MPrimaryGPS.mp3');
							} else if ($primaryGPS === true && $selectedVoiceAssistant === 'Woman') {
								settingsPlayButtonSound('buttonSounds/FPrimaryGPS.mp3');
							}
						}}
						class={`py-2.5 drop-shadow-2xl rounded-full px-5 lg:h-1/2 md:h-2/3 sm:h-2/3 text-sm active:ring-4  dark:shadow-lg font-medium text-white  hover:bg-gradient-to-br focus:outline-none shadow-lg bg-gradient-to-r ${
							$primaryGPS
								? 'from-red-500 via-red-600 to-red-700 focus:ring-red-400 dark:focus:ring-red-900 shadow-red-600/50 dark:shadow-red-900/80'
								: ' from-sky-500 via-sky-600 to-sky-700 focus:ring-sky-400 dark:focus:ring-sky-900 shadow-sky-600/50 dark:shadow-sky-900/80'
						}`}
					>
						Primary GPS
					</button>

					<!-- Secondary GPS Button -->
					<button
						in:fade={{ delay: 100, duration: 400 }}
						on:click={() => {
							$secondaryGPS = !$secondaryGPS;
							$primaryGPS = false;

							$selectedGPSMode = 'Secondary GPS';

							if ($secondaryGPS === true && $selectedVoiceAssistant === 'Man') {
								settingsPlayButtonSound('buttonSounds/MSecondaryGPS.mp3');
							} else if ($secondaryGPS === true && $selectedVoiceAssistant === 'Woman') {
								settingsPlayButtonSound('buttonSounds/FSecondaryGPS.mp3');
							}
						}}
						class={`py-2.5 drop-shadow-2xl rounded-full px-5 lg:h-1/2 md:h-2/3 sm:h-2/3 text-sm active:ring-4  dark:shadow-lg font-medium text-white  hover:bg-gradient-to-br focus:outline-none shadow-lg bg-gradient-to-r ${
							$secondaryGPS
								? 'from-red-500 via-red-600 to-red-700 focus:ring-red-400 dark:focus:ring-red-900 shadow-red-600/50 dark:shadow-red-900/80'
								: ' from-sky-500 via-sky-600 to-sky-700 focus:ring-sky-400 dark:focus:ring-sky-900 shadow-sky-600/50 dark:shadow-sky-900/80'
						}`}
					>
						Secondary GPS
					</button>
				{:else if $dualMode === true}
					<!-- Simple GPS Button -->
					<button
						in:fade={{ delay: 100, duration: 400 }}
						on:click={() => {
							$simpleGPS = !$simpleGPS;
							$RSSIGPS = false;
							$bestHealthGPS = false;

							$selectedGPSMode = 'Simple GPS';

							if ($simpleGPS === true && $selectedVoiceAssistant === 'Man') {
								settingsPlayButtonSound('buttonSounds/MSimple.mp3');
							} else if ($simpleGPS === true && $selectedVoiceAssistant === 'Woman') {
								settingsPlayButtonSound('buttonSounds/FSimple.mp3');
							}
						}}
						class={`py-2.5 drop-shadow-2xl rounded-full px-5 lg:w-1/6 sm:w-1/4 md:w-1/4 lg:h-1/2 md:h-2/3 sm:h-2/3 text-sm active:ring-4  dark:shadow-lg font-medium text-white  hover:bg-gradient-to-br focus:outline-none shadow-lg bg-gradient-to-r ${
							$simpleGPS
								? 'from-red-500 via-red-600 to-red-700 focus:ring-red-400 dark:focus:ring-red-900 shadow-red-600/50 dark:shadow-red-900/80'
								: ' from-sky-500 via-sky-600 to-sky-700 focus:ring-sky-400 dark:focus:ring-sky-900 shadow-sky-600/50 dark:shadow-sky-900/80'
						}`}
					>
						Simple
					</button>

					<!-- RSSI GPS Button -->
					<button
						in:fade={{ delay: 100, duration: 400 }}
						on:click={() => {
							$RSSIGPS = !$RSSIGPS;
							$simpleGPS = false;
							$bestHealthGPS = false;

							$selectedGPSMode = 'RSSI GPS';

							if ($RSSIGPS === true && $selectedVoiceAssistant === 'Man') {
								settingsPlayButtonSound('buttonSounds/MRSSI.mp3');
							} else if ($RSSIGPS === true && $selectedVoiceAssistant === 'Woman') {
								settingsPlayButtonSound('buttonSounds/FRSSI.mp3');
							}
						}}
						class={`py-2.5 drop-shadow-2xl rounded-full px-5 lg:w-1/6 sm:w-1/4 md:w-1/4 lg:h-1/2 md:h-2/3 sm:h-2/3 text-sm active:ring-4  dark:shadow-lg font-medium text-white  hover:bg-gradient-to-br focus:outline-none shadow-lg bg-gradient-to-r ${
							$RSSIGPS
								? 'from-red-500 via-red-600 to-red-700 focus:ring-red-400 dark:focus:ring-red-900 shadow-red-600/50 dark:shadow-red-900/80'
								: ' from-sky-500 via-sky-600 to-sky-700 focus:ring-sky-400 dark:focus:ring-sky-900 shadow-sky-600/50 dark:shadow-sky-900/80'
						}`}
					>
						RSSI
					</button>

					<!-- Best Health GPS Button -->
					<button
						in:fade={{ delay: 100, duration: 400 }}
						on:click={() => {
							$bestHealthGPS = !$bestHealthGPS;
							$RSSIGPS = false;
							$simpleGPS = false;

							$selectedGPSMode = 'Best Health GPS';

							if ($bestHealthGPS === true && $selectedVoiceAssistant === 'Man') {
								settingsPlayButtonSound('buttonSounds/MBestHealth.mp3');
							} else if ($bestHealthGPS === true && $selectedVoiceAssistant === 'Woman') {
								settingsPlayButtonSound('buttonSounds/FBestHealth.mp3');
							}
						}}
						class={`py-2.5 drop-shadow-2xl rounded-full px-5 lg:w-1/6 sm:w-1/4 md:w-1/4 lg:h-1/2 md:h-2/3 sm:h-2/3 text-sm active:ring-4  dark:shadow-lg font-medium text-white  hover:bg-gradient-to-br focus:outline-none shadow-lg bg-gradient-to-r ${
							$bestHealthGPS
								? 'from-red-500 via-red-600 to-red-700 focus:ring-red-400 dark:focus:ring-red-900 shadow-red-600/50 dark:shadow-red-900/80'
								: ' from-sky-500 via-sky-600 to-sky-700 focus:ring-sky-400 dark:focus:ring-sky-900 shadow-sky-600/50 dark:shadow-sky-900/80'
						}`}
					>
						Best Health
					</button>
				{:else if $GPSOff === true}
					<!-- GPS Turned Off Text -->
					<b in:fade={{ delay: 100, duration: 400 }}>GPS Turned Off</b>
				{/if}
			</div>
		</div>

		<!-- Section 6 -->
		<div in:fade={{ delay: 450, duration: 550 }} class="flex flex-col w-full h-full">
			<!-- First Row-->
			<!-- Header -->
			<div
				class="flex flex-row w-full h-full space-x-2 text-black dark:text-white place-content-center place-items-center h3"
			>
				<IconDeviceTv class="flex flex-col w-9 h-9" />
				<h3 class="flex flex-col" style="font-family: Nevan">Backend Settings</h3>
			</div>

			<!-- Second Row -->
			<div class="flex flex-row w-full h-full space-x-4 place-content-center place-items-center">
				<!-- Address Input -->
				<div class="flex flex-col w-2/5 h-full place-content-center place-items-center">
					<div
						class="input-group drop-shadow-xl shadow-2xl input-group-divider lg:grid-cols-[auto_1fr_auto]"
					>
						<div class="font-semibold text-center text-sky-600 dark:text-sky-300 input-group-shim">
							Address
						</div>

						<input type="text" placeholder="192.168.1.1" bind:value={$streamAddress} />
					</div>
				</div>

				<!-- Chunk Input -->
				<div class="flex flex-col w-2/5 h-full place-content-center place-items-center">
					<div
						class="input-group drop-shadow-xl shadow-2xl input-group-divider lg:grid-cols-[auto_1fr_auto]"
					>
						<div class="font-semibold text-center text-sky-600 dark:text-sky-300 input-group-shim">
							Chunks
						</div>

						<input
							type="number"
							placeholder="17755"
							min="128"
							max="65535"
							bind:value={$streamChunks}
						/>
					</div>
				</div>
			</div>

			<!-- Third Row -->
			<div class="flex flex-row w-full h-full place-content-center place-items-center">
				<!-- Radio Button First Col -->
				<div class="flex flex-col w-full h-full space-y-2 place-content-center place-items-center">
					<!-- Header -->
					<div class="flex flex-row w-full h-full place-content-center place-items-center">
						<!-- Radio buton başlık satırı 1 -->
						<h2>Format:</h2>
					</div>

					<!-- First Radio Button Group -->
					<div
						class="flex flex-row w-full h-full lg:space-x-14 md:space-x-6 sm:space-x-6 place-content-center place-items-center"
					>
						<!-- Form. MP4/MP4 Radio Col -->
						<div class="flex flex-col space-y-2">
							<!-- Form. MP4 -->
							<label class="flex items-center space-x-2">
								<input
									class="lg:radio lg:select md:radio sm:radio"
									type="radio"
									name="radio-format"
									value="1"
									bind:group={$selectedFormat}
								/>

								<i class="whitespace-nowrap">Form. MP4</i>
							</label>

							<!-- MP4 -->
							<label class="flex items-center space-x-2">
								<input
									class="lg:radio lg:select md:radio sm:radio"
									type="radio"
									name="radio-format"
									value="2"
									bind:group={$selectedFormat}
								/>

								<i>MP4</i>
							</label>
						</div>

						<!-- MKV/MOV Radio Col -->
						<div class="flex flex-col space-y-2">
							<!-- MKV -->
							<label class="flex items-center space-x-2">
								<input
									class="lg:radio lg:select md:radio sm:radio"
									type="radio"
									name="radio-format"
									value="3"
									bind:group={$selectedFormat}
								/>

								<i>MKV</i>
							</label>

							<!-- MOV -->
							<label class="flex items-center space-x-2">
								<input
									class="lg:radio lg:select md:radio sm:radio"
									type="radio"
									name="radio-format"
									value="3"
									bind:group={$selectedFormat}
								/>

								<i>MOV</i>
							</label>
						</div>
					</div>
				</div>

				<!-- Radio Button Second Col -->
				<div class="flex flex-col w-full h-full space-y-2 place-content-center place-items-center">
					<!-- Header -->
					<div class="flex flex-row w-full h-full place-content-center place-items-center">
						<h2>Codec:</h2>
					</div>

					<!-- Second Radio Button Group -->
					<div
						class="flex flex-row w-full h-full lg:space-x-14 md:space-x-6 sm:space-x-6 place-content-center place-items-center"
					>
						<!-- H264/H265 Radio Col -->
						<div class="flex flex-col space-y-2">
							<!-- H264-->
							<label class="flex items-center space-x-2">
								<input
									class="lg:radio lg:select md:radio sm:radio"
									type="radio"
									checked
									name="radio-codec"
									value="1"
									bind:group={$selectedCodec}
								/>

								<i>H264</i>
							</label>

							<!-- H265 -->
							<label class="flex items-center space-x-2">
								<input
									class="lg:radio lg:select md:radio sm:radio"
									type="radio"
									name="radio-codec"
									value="2"
									bind:group={$selectedCodec}
								/>

								<i>H265</i>
							</label>
						</div>

						<!-- WP9/AV1 Radio Col -->
						<div class="flex flex-col space-y-2">
							<!-- WP9 -->
							<label class="flex items-center space-x-2">
								<input
									class="lg:radio lg:select md:radio sm:radio"
									type="radio"
									name="radio-codec"
									value="3"
									bind:group={$selectedCodec}
								/>

								<i>WP9</i>
							</label>

							<!-- AV1 -->
							<label class="flex items-center space-x-2">
								<input
									class="lg:radio lg:select md:radio sm:radio"
									type="radio"
									name="radio-codec"
									value="3"
									bind:group={$selectedCodec}
								/>

								<i>AV1</i>
							</label>
							<!-- Radio buton grubu sütunu 2 -->
						</div>
					</div>
				</div>
			</div>

			<!-- Fourth Row -->
			<div class="flex flex-row w-full place-content-end place-items-center">
				<!-- Apply Button -->
				<button
					on:click={() => {
						$applyButton = true;
					}}
					class="mb-2 mr-2 font-medium text-white rounded-full shadow-lg drop-shadow-2xl from-sky-500 via-sky-600 to-sky-700 focus:ring-sky-400 dark:focus:ring-sky-900 shadow-sky-600/50 dark:shadow-sky-900/80 active:ring-4 dark:shadow-lg hover:bg-gradient-to-br focus:outline-none bg-gradient-to-r"
				>
					<IconCheck class="w-12 h-12 p-2" />
				</button>
			</div>
		</div>
	</div>
</div>
