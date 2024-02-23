<script>
	import {
		languageSelection,
		speechSelection,
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
		maxDistance,
		minDistance,
		streamAddress,
		streamChunks,
		formattedMP4Check,
		mp4Check,
		mkvCheck,
		movCheck,
		h264Check,
		h265Check,
		wp9Check,
		av1Check,
		applyButton
	} from '$lib/Utils/stores';
	import { CustomToneMapping } from 'three';
	import { IconCheck } from '@tabler/icons-svelte';
</script>

<!-- Outer Container -->
<div class="flex flex-col w-full h-full">
	<!-- Row 1 -->
	<div class="flex flex-row w-full h-full">
		<!-- Section 1 -->
		<div
			class="flex flex-col w-full h-full border-b-2 border-r-2 border-white border-opacity-60 rounded-ee-xl"
		>
			<!-- First row of section -->
			<div class="flex flex-row w-full h-full place-content-center place-items-center">
				<h3 class="h3" style="font-family: Nevan">
					<span class="text-black text-transparen dark:text-white">Backend Settings</span>
				</h3>
			</div>
			<!-- Second row of section -->
			<div class="flex flex-row w-full h-full place-items-start place-content-center">
				<div class="input-group w-3/5 bg-white input-group-divider grid-cols-[auto_1fr_auto]">
					<div class="font-semibold text-center text-sky-600 dark:text-sky-300 input-group-shim">
						Domain
					</div>
					<input type="url" placeholder="msakg.com" bind:value={$domainValue} />
				</div>
			</div>
			<!-- Third row of section -->
			<div class="flex flex-row w-full h-full place-items-start place-content-center">
				<div class="input-group w-3/5 bg-white input-group-divider grid-cols-[auto_1fr_auto]">
					<div class="font-semibold text-center text-sky-600 dark:text-sky-300 input-group-shim">
						IP
					</div>
					<input type="text" placeholder="85.117.239.161" bind:value={$ipValue} />
				</div>
			</div>
			<!-- Fourth row of section -->
			<div class="flex flex-row w-full h-full place-content-center place-items-start">
				<div class="input-group w-3/5 bg-white input-group-divider grid-cols-[auto_1fr_auto]">
					<div class="font-semibold text-center text-sky-600 dark:text-sky-300 input-group-shim">
						Port
					</div>
					<input type="number" placeholder="115200" min="0" bind:value={$portValue} />
				</div>
			</div>
		</div>

		<!-- Section 2 -->
		<div
			class="flex flex-col w-full h-full border-b-2 border-white border-opacity-60 rounded-es-2xl"
		>
			<!-- First row of section -->
			<div class="flex flex-row w-full h-full place-content-center place-items-center">
				<h3 class="h3" style="font-family: Nevan">
					<span class="text-transparent text-black dark:text-white">App Settings</span>
				</h3>
			</div>
			<!-- Second row of section -->
			<div class="flex flex-row w-full h-full place-content-center">
				<div
					class="flex h-full space-x-6 lg:w-1/2 md:w-3/4 sm:w-3/4 place-content-center place-items-start"
				>
					<select
						class="pt-2.5 variant-form-material pb-2.5 text-sm font-medium bg-white text-center shadow-lg text-sky-600 dark:text-sky-300 shadow-sky-500/50 dark:shadow-lg dark:shadow-sky-800/80 select"
						bind:value={$languageSelection}
					>
						{#each Object.entries($languageSelection) as [id, language]}
							<option value={language}>{language}</option>
						{/each}
					</select>
					<select
						class="pt-2.5 variant-form-material pb-2.5 text-sm font-medium bg-white text-center shadow-lg text-sky-600 dark:text-sky-300 shadow-sky-500/50 dark:shadow-lg dark:shadow-sky-800/80 select"
						bind:value={$speechSelection}
					>
						{#each Object.entries($speechSelection) as [id, speech]}
							<option value={speech}>{speech}</option>
						{/each}
					</select>
					<select
						class="pt-2.5 variant-form-material pb-2.5 text-sm font-medium bg-white text-center shadow-lg text-sky-600 dark:text-sky-300 shadow-sky-500/50 dark:shadow-lg dark:shadow-sky-800/80 select"
						bind:value={$trackLengthSelection}
					>
						{#each Object.entries($trackLengthSelection) as [id, length]}
							<option value={length}>{length}</option>
						{/each}
					</select>
				</div>
			</div>
			<!-- Third row of section -->
			<div class="flex flex-row w-full h-full place-content-center">
				<div
					class="flex h-full space-x-6 lg:w-1/2 md:w-3/4 sm:w-3/4 place-content-center place-items-start"
				>
					<select
						class="pt-2.5 variant-form-material pb-2.5 text-sm font-medium bg-white text-center shadow-lg text-sky-600 dark:text-sky-300 shadow-sky-500/50 dark:shadow-lg dark:shadow-sky-800/80 select"
						bind:value={$distanceUnitSelection}
					>
						{#each Object.entries($distanceUnitSelection) as [id, distance]}
							<option value={distance}>{distance}</option>
						{/each}
					</select>
					<select
						class="pt-2.5 variant-form-material pb-2.5 text-sm font-medium bg-white text-center shadow-lg text-sky-600 dark:text-sky-300 shadow-sky-500/50 dark:shadow-lg dark:shadow-sky-800/80 select"
						bind:value={$altitudeUnit}
					>
						{#each Object.entries($altitudeUnit) as [id, altitude]}
							<option value={altitude}>{altitude}</option>
						{/each}
					</select>
					<select
						class="pt-2.5 variant-form-material pb-2.5 text-sm font-medium bg-white text-center shadow-lg text-sky-600 dark:text-sky-300 shadow-sky-500/50 dark:shadow-lg dark:shadow-sky-800/80 select"
						bind:value={$speedUnit}
					>
						{#each Object.entries($speedUnit) as [id, speed]}
							<option value={speed}>{speed}</option>
						{/each}
					</select>
				</div>
			</div>
		</div>
	</div>
	<!-- Row 2 -->
	<div class="flex flex-row w-full h-full">
		<!-- Section 3 -->
		<div
			class="flex flex-col w-full h-full border-b-2 border-r-2 border-white border-opacity-60 rounded-r-2xl"
		>
			<!-- First row of section -->
			<div class="flex flex-row w-full h-full place-content-center place-items-center">
				<h3 class="h3" style="font-family: Nevan">
					<span class="text-black text-transparen dark:text-white">Led Settings</span>
				</h3>
			</div>
			<!-- Second row of section -->
			<div class="flex flex-row w-full h-full space-x-8 place-content-center place-items-start">
				<button
					on:click={() => {
						$taxiLed = !$taxiLed;
						$cruiseLed = false;
						$harassLed = false;
						$customLed = false;
					}}
					type="button"
					class={`py-2.5 px-5 lg:w-1/6 sm:w-1/4 md:w-1/4 text-sm active:ring-4 rounded-es-full dark:shadow-lg font-medium text-white rounded-r-full hover:bg-gradient-to-br focus:outline-none shadow-lg bg-gradient-to-r ${
						$taxiLed
							? ' from-red-500 via-red-600 to-red-700 focus:ring-red-400 dark:focus:ring-red-900 shadow-red-600/50 dark:shadow-red-900/80'
							: ' from-sky-500 via-sky-600 to-sky-700 focus:ring-sky-400 dark:focus:ring-sky-900 shadow-sky-600/50 dark:shadow-sky-900/80'
					}`}
				>
					Taxi <br /> Mode
				</button>
				<button
					on:click={() => {
						$cruiseLed = !$cruiseLed;
						$taxiLed = false;
						$harassLed = false;
						$customLed = false;
					}}
					type="button"
					class={`py-2.5 px-5 lg:w-1/6 sm:w-1/4 md:w-1/4 text-sm active:ring-4 rounded-ee-full dark:shadow-lg font-medium text-white rounded-l-full hover:bg-gradient-to-br focus:outline-none shadow-lg bg-gradient-to-r ${
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
				class="flex flex-row w-full h-full mb-2 space-x-8 place-content-center place-items-start"
			>
				<button
					on:click={() => {
						$harassLed = !$harassLed;
						$cruiseLed = false;
						$taxiLed = false;
						$customLed = false;
					}}
					type="button"
					class={`py-2.5 px-5 lg:w-1/6 sm:w-1/4 md:w-1/4 text-sm active:ring-4 rounded-ss-full dark:shadow-lg font-medium text-white rounded-r-full hover:bg-gradient-to-br focus:outline-none shadow-lg bg-gradient-to-r ${
						$harassLed
							? 'from-red-500 via-red-600 to-red-700 focus:ring-red-400 dark:focus:ring-red-900 shadow-red-600/50 dark:shadow-red-900/80'
							: ' from-sky-500 via-sky-600 to-sky-700 focus:ring-sky-400 dark:focus:ring-sky-900 shadow-sky-600/50 dark:shadow-sky-900/80'
					}`}
				>
					Harass <br /> Mode
				</button>
				<button
					on:click={() => {
						$customLed = !$customLed;
						$cruiseLed = false;
						$harassLed = false;
						$taxiLed = false;
					}}
					type="button"
					class={`py-2.5 px-5 lg:w-1/6 sm:w-1/4 md:w-1/4 text-sm active:ring-4 rounded-se-full dark:shadow-lg font-medium text-white rounded-l-full hover:bg-gradient-to-br focus:outline-none shadow-lg bg-gradient-to-r ${
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
				{#if $customLed === true}
					<div
						class="input-group lg:w-1/5 md:w-2/5 sm:2/5 bg-white input-group-divider grid-cols-[auto_1fr_auto]"
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
			class="flex flex-col w-full h-full border-b-2 border-white border-opacity-60 rounded-l-2xl"
		>
			<!-- First row of section -->
			<div class="flex flex-row w-full h-full place-content-center place-items-center">
				<h3 class="h3" style="font-family: Nevan">
					<span class="text-black text-transparen dark:text-white">Lidar Settings</span>
				</h3>
			</div>
			<!-- Second row of section -->
			<div class="flex flex-row w-full h-full place-content-center place-items-start">
				<div
					class="input-group lg:w-2/5 md:w-3/5 sm:w-3/5 bg-white input-group-divider grid-cols-[auto_1fr_auto]"
				>
					<div class="font-semibold text-center text-sky-600 dark:text-sky-300 input-group-shim">
						Max Dist.
					</div>
					<input
						type="number"
						placeholder="4000 (cm)"
						min="0"
						max="5000"
						bind:value={$maxDistance}
					/>
				</div>
			</div>
			<div class="flex flex-row w-full h-full place-content-center place-items-start">
				<div
					class="input-group lg:w-2/5 md:w-3/5 sm:w-3/5 bg-white input-group-divider grid-cols-[auto_1fr_auto]"
				>
					<div class="font-semibold text-center text-sky-600 dark:text-sky-300 input-group-shim">
						Min Dist.
					</div>
					<input type="number" placeholder="0 (cm)" min="0" max="5000" bind:value={$minDistance} />
				</div>
			</div>
		</div>
	</div>
	<!-- Row 3 -->
	<div class="flex flex-row w-full h-full mb-2">
		<!-- Section 5 -->
		<div
			class="flex flex-col w-full h-full border-r-2 border-white border-opacity-60 rounded-se-2xl"
		>
			<!-- First row of section -->
			<div class="flex flex-row w-full h-full place-content-center place-items-center">
				<h3 class="h3" style="font-family: Nevan">
					<span class="text-black text-transparen dark:text-white">GPS Settings</span>
				</h3>
			</div>
			<!-- Second row of section -->
			<div class="flex flex-row w-full h-full space-x-1 place-content-center place-items-start">
				<button
					on:click={() => {
						$singleMode = !$singleMode;
						$GPSOff = false;
						$dualMode = false;
						$RSSIGPS = false;
						$simpleGPS = false;
						$bestHealthGPS = false;
					}}
					type="button"
					class={`py-2.5 rounded-l-full px-5 lg:w-1/6 sm:w-1/4 md:w-1/4 lg:h-1/2 md:h-2/3 sm:h-2/3 text-sm active:ring-4 dark:shadow-lg font-medium text-white hover:bg-gradient-to-br focus:outline-none shadow-lg bg-gradient-to-r ${
						$singleMode
							? 'from-red-500 via-red-600 to-red-700 focus:ring-red-400 dark:focus:ring-red-900 shadow-red-600/50 dark:shadow-red-900/80'
							: ' from-sky-500 via-sky-600 to-sky-700 focus:ring-sky-400 dark:focus:ring-sky-900 shadow-sky-600/50 dark:shadow-sky-900/80'
					}`}
				>
					Single Mode
				</button>
				<button
					on:click={() => {
						$dualMode = !$dualMode;
						$GPSOff = false;
						$singleMode = false;
						$primaryGPS = false;
						$secondaryGPS = false;
					}}
					type="button"
					class={`py-2.5  px-5 lg:w-1/6 sm:w-1/4 md:w-1/4 lg:h-1/2 md:h-2/3 sm:h-2/3 text-sm active:ring-4  dark:shadow-lg font-medium text-white  hover:bg-gradient-to-br focus:outline-none shadow-lg bg-gradient-to-r ${
						$dualMode
							? 'from-red-500 via-red-600 to-red-700 focus:ring-red-400 dark:focus:ring-red-900 shadow-red-600/50 dark:shadow-red-900/80'
							: ' from-sky-500 via-sky-600 to-sky-700 focus:ring-sky-400 dark:focus:ring-sky-900 shadow-sky-600/50 dark:shadow-sky-900/80'
					}`}
				>
					Dual Mode
				</button>
				<button
					on:click={() => {
						$GPSOff = !$GPSOff;
						$singleMode = false;
						$dualMode = false;
						$primaryGPS = false;
						$secondaryGPS = false;
						$simpleGPS = false;
						$RSSIGPS = false;
						$bestHealthGPS = false;
					}}
					type="button"
					class={`py-2.5 rounded-r-full px-5 lg:w-1/6 sm:w-1/4 md:w-1/4 lg:h-1/2 md:h-2/3 sm:h-2/3 text-sm active:ring-4  dark:shadow-lg font-medium text-white  hover:bg-gradient-to-br focus:outline-none shadow-lg bg-gradient-to-r ${
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
				class="flex flex-row w-full h-full lg:space-x-5 md:space-x-3 sm:space-x-3 place-content-center place-items-start"
			>
				{#if $singleMode === true}
					<button
						on:click={() => {
							$primaryGPS = !$primaryGPS;
							$secondaryGPS = false;
						}}
						type="button"
						class={`py-2.5 rounded-full px-5 lg:h-1/2 md:h-2/3 sm:h-2/3 text-sm active:ring-4  dark:shadow-lg font-medium text-white  hover:bg-gradient-to-br focus:outline-none shadow-lg bg-gradient-to-r ${
							$primaryGPS
								? 'from-red-500 via-red-600 to-red-700 focus:ring-red-400 dark:focus:ring-red-900 shadow-red-600/50 dark:shadow-red-900/80'
								: ' from-sky-500 via-sky-600 to-sky-700 focus:ring-sky-400 dark:focus:ring-sky-900 shadow-sky-600/50 dark:shadow-sky-900/80'
						}`}
					>
						Primary GPS
					</button>
					<button
						on:click={() => {
							$secondaryGPS = !$secondaryGPS;
							$primaryGPS = false;
						}}
						type="button"
						class={`py-2.5 rounded-full px-5 lg:h-1/2 md:h-2/3 sm:h-2/3 text-sm active:ring-4  dark:shadow-lg font-medium text-white  hover:bg-gradient-to-br focus:outline-none shadow-lg bg-gradient-to-r ${
							$secondaryGPS
								? 'from-red-500 via-red-600 to-red-700 focus:ring-red-400 dark:focus:ring-red-900 shadow-red-600/50 dark:shadow-red-900/80'
								: ' from-sky-500 via-sky-600 to-sky-700 focus:ring-sky-400 dark:focus:ring-sky-900 shadow-sky-600/50 dark:shadow-sky-900/80'
						}`}
					>
						Secondary GPS
					</button>
				{:else if $dualMode === true}
					<button
						on:click={() => {
							$simpleGPS = !$simpleGPS;
							$RSSIGPS = false;
							$bestHealthGPS = false;
						}}
						type="button"
						class={`py-2.5 rounded-full px-5 lg:w-1/6 sm:w-1/4 md:w-1/4 lg:h-1/2 md:h-2/3 sm:h-2/3 text-sm active:ring-4  dark:shadow-lg font-medium text-white  hover:bg-gradient-to-br focus:outline-none shadow-lg bg-gradient-to-r ${
							$simpleGPS
								? 'from-red-500 via-red-600 to-red-700 focus:ring-red-400 dark:focus:ring-red-900 shadow-red-600/50 dark:shadow-red-900/80'
								: ' from-sky-500 via-sky-600 to-sky-700 focus:ring-sky-400 dark:focus:ring-sky-900 shadow-sky-600/50 dark:shadow-sky-900/80'
						}`}
					>
						Simple
					</button>
					<button
						on:click={() => {
							$RSSIGPS = !$RSSIGPS;
							$simpleGPS = false;
							$bestHealthGPS = false;
						}}
						type="button"
						class={`py-2.5 rounded-full px-5 lg:w-1/6 sm:w-1/4 md:w-1/4 lg:h-1/2 md:h-2/3 sm:h-2/3 text-sm active:ring-4  dark:shadow-lg font-medium text-white  hover:bg-gradient-to-br focus:outline-none shadow-lg bg-gradient-to-r ${
							$RSSIGPS
								? 'from-red-500 via-red-600 to-red-700 focus:ring-red-400 dark:focus:ring-red-900 shadow-red-600/50 dark:shadow-red-900/80'
								: ' from-sky-500 via-sky-600 to-sky-700 focus:ring-sky-400 dark:focus:ring-sky-900 shadow-sky-600/50 dark:shadow-sky-900/80'
						}`}
					>
						RSSI
					</button>
					<button
						on:click={() => {
							$bestHealthGPS = !$bestHealthGPS;
							$RSSIGPS = false;
							$simpleGPS = false;
						}}
						type="button"
						class={`py-2.5 rounded-full px-5 lg:w-1/6 sm:w-1/4 md:w-1/4 lg:h-1/2 md:h-2/3 sm:h-2/3 text-sm active:ring-4  dark:shadow-lg font-medium text-white  hover:bg-gradient-to-br focus:outline-none shadow-lg bg-gradient-to-r ${
							$bestHealthGPS
								? 'from-red-500 via-red-600 to-red-700 focus:ring-red-400 dark:focus:ring-red-900 shadow-red-600/50 dark:shadow-red-900/80'
								: ' from-sky-500 via-sky-600 to-sky-700 focus:ring-sky-400 dark:focus:ring-sky-900 shadow-sky-600/50 dark:shadow-sky-900/80'
						}`}
					>
						Best Health
					</button>
				{:else if $GPSOff === true}
					<h3>GPS Turned Off</h3>
				{/if}
			</div>
		</div>
		<!-- Section 6 -->
		<div class="flex flex-col w-full h-full -2 -white rounded-ss-2xl">
			<div class="flex flex-row w-full h-full place-content-center place-items-center">
				<!-- Başlık satır 1 -->
				<h3 class="h3" style="font-family: Nevan">
					<span class="text-black text-transparen dark:text-white">Stream Settings</span>
				</h3>
			</div>
			<div class="flex flex-row w-full h-full space-x-4 place-content-center place-items-center">
				<!-- Chunk/Adress satır 2	 -->
				<div class="flex flex-col w-2/5 h-full place-content-center place-items-center">
					<!-- Adress Sütunu -->
					<div
						class="input-group bg-white input-group-divider lg:grid-cols-[auto_1fr_auto] md: sm:"
					>
						<div class="font-semibold text-center text-sky-600 dark:text-sky-300 input-group-shim">
							Address
						</div>
						<input type="text" placeholder="192.168.1.1" bind:value={$streamAddress} />
					</div>
				</div>
				<div class="flex flex-col w-2/5 h-full place-content-center place-items-center">
					<!-- Chunk sütunu -->
					<div
						class="input-group bg-white input-group-divider lg:grid-cols-[auto_1fr_auto] md: sm:"
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
			<div class="flex flex-row w-full h-full place-content-center place-items-center">
				<!-- Radio buton satır 3 -->
				<div class="flex flex-col w-full h-full space-y-2 place-content-center place-items-center">
					<!-- Radio buton sütunu 2 -->
					<div class="flex flex-row w-full h-full place-content-center place-items-center">
						<!-- Radio buton başlık satırı 1 -->
						<h2>Format:</h2>
					</div>
					<div
						class="flex flex-row w-full h-full lg:space-x-20 md:space-x-8 sm:space-x-8 place-content-center place-items-center"
					>
						<!-- Radio butonların satırı 2 -->
						<div class="flex flex-col space-y-2">
							<!-- Radio buton grubu sütunu 1 -->
							<label class="flex items-center space-x-2">
<<<<<<< HEAD
								<input class="radio" type="radio" checked name="radio-format" value="1" />
								<!-- <p class="whitespace-nowrap">Form. MP4</p> -->
								&nbsp; Form. MP4
=======
								<input
									class="radio"
									type="radio"
									name="radio-format"
									value="1"
									bind:group={$formattedMP4Check}
								/>
								<b class="whitespace-nowrap">Form. MP4</b>
>>>>>>> dev
							</label>
							<label class="flex items-center space-x-2">
								<input
									class="radio"
									type="radio"
									name="radio-format"
									value="2"
									bind:group={$mp4Check}
								/>
								<b>MP4</b>
							</label>
						</div>
						<div class="flex flex-col space-y-2">
							<label class="flex items-center space-x-2">
								<input
									class="radio"
									type="radio"
									name="radio-format"
									value="3"
									bind:group={$mkvCheck}
								/>
								<b>MKV</b>
							</label>
							<label class="flex items-center space-x-2">
								<input
									class="radio"
									type="radio"
									name="radio-format"
									value="3"
									bind:group={$movCheck}
								/>
								<b>MOV</b>
							</label>
							<!-- Radio buton grubu sütunu 2 -->
						</div>
					</div>
				</div>
				<div class="flex flex-col w-full h-full space-y-2 place-content-center place-items-center">
					<!-- Radio buton sütunu 2 -->
					<div class="flex flex-row w-full h-full place-content-center place-items-center">
						<!-- Radio buton başlık satırı 1 -->
						<h2>Codec:</h2>
					</div>
					<div
						class="flex flex-row w-full h-full lg:space-x-20 md:space-x-8 sm:space-x-8 place-content-center place-items-center"
					>
						<!-- Radio butonların satırı 2 -->
						<div class="flex flex-col space-y-2">
							<!-- Radio buton grubu sütunu 1 -->
							<label class="flex items-center space-x-2">
								<input
									class="radio"
									type="radio"
									checked
									name="radio-codec"
									value="1"
									bind:group={$h264Check}
								/>
								<i>H264</i>
							</label>
							<label class="flex items-center space-x-2">
								<input
									class="radio"
									type="radio"
									name="radio-codec"
									value="2"
									bind:group={$h265Check}
								/>
								<i>H265</i>
							</label>
						</div>
						<div class="flex flex-col space-y-2">
							<label class="flex items-center space-x-2">
								<input
									class="radio"
									type="radio"
									name="radio-codec"
									value="3"
									bind:group={$wp9Check}
								/>
								<i>WP9</i>
							</label>
							<label class="flex items-center space-x-2">
								<input
									class="radio"
									type="radio"
									name="radio-codec"
									value="3"
									bind:group={$av1Check}
								/>
								<i>AV1</i>
							</label>
							<!-- Radio buton grubu sütunu 2 -->
						</div>
					</div>
				</div>
			</div>
			<div class="flex flex-row w-full place-content-end place-items-center">
				<!-- Apply butonu satır 4 -->
				<button
					on:click={() => {
						$applyButton = true;
					}}
					type="button"
					class="mb-2 mr-2 font-medium text-white rounded-full shadow-lg from-sky-500 via-sky-600 to-sky-700 focus:ring-sky-400 dark:focus:ring-sky-900 shadow-sky-600/50 dark:shadow-sky-900/80 active:ring-4 dark:shadow-lg hover:bg-gradient-to-br focus:outline-none bg-gradient-to-r"
				>
					<IconCheck class="w-12 h-12 p-2" />
				</button>
			</div>
		</div>
	</div>
	<!-- Row 4 -->
</div>
