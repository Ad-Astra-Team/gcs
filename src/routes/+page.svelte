<script>
	import { onMount, onDestroy } from 'svelte';
	import * as THREE from 'three';
	import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
	import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

	//Importing Icons From Svelte
	import {
		IconDrone,
		IconPlaneTilt,
		IconTank,
		IconSubmarine,
		IconHandMove
	} from '@tabler/icons-svelte';

	//Importing Variables From Stores
	import {
		underWaterVehicle,
		planeVehicle,
		droneVehicle,
		roverVehicle,
		selectedVehicle,
		homepageText
	} from '$lib/Utils/stores';

	//Importing Modal
	import { Modal, getModalStore, initializeStores } from '@skeletonlabs/skeleton';

	//Importing Transitions
	import { fade, slide } from 'svelte/transition';

	initializeStores();

	//Setting the Vehicle Alert Modal
	const modalStore = getModalStore();

	//Vehicle Alert Modal Configurations
	/**
	 * @type {import('@skeletonlabs/skeleton').ModalSettings}
	 */
	const vehicleSelectErrorModal = {
		type: 'alert',
		title: 'Construction Area !',
		body: 'Vehicle selection features are still in development.'
	};

	const scene = new THREE.Scene();
	let current_object;

	const light = new THREE.PointLight(0xffffff, 950);
	light.position.set(7.5, 7.5, 15);

	const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
	camera.position.z = 5;

	const rotationSpeed = 0.0009;
	const scaleValue = 0.006;

	scene.add(light);

	const renderer = new THREE.WebGLRenderer();
	const controls = new OrbitControls(camera, renderer.domElement);

	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setClearColor(0x101b2b);
	renderer.setClearAlpha(0.8);

	controls.enableDamping = true;
	const loader = new OBJLoader();

	function onWindowResize() {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(window.innerWidth, window.innerHeight);
		render();
	}

	function rotateObject() {
		if (!current_object) return;
		current_object.rotation.y += rotationSpeed;
		current_object.rotation.x += rotationSpeed;
	}

	function animate() {
		requestAnimationFrame(animate);
		controls.update();
		rotateObject();
		render();
	}

	function render() {
		renderer.render(scene, camera);
	}

	onMount(() => {
		document.getElementById('scene')?.appendChild(renderer.domElement);

		loader.load('assets/kf1500.obj', function (object) {
			current_object = object;
			current_object.scale.set(scaleValue, scaleValue, scaleValue);
			current_object.rotation.x = Math.PI / 10;
			current_object.rotation.y = Math.PI / 10;

			scene.add(current_object);

			object = null;
		});

		window.addEventListener('resize', onWindowResize, false);

		animate();
	});

	onDestroy(() => {
		window.removeEventListener('resize', onWindowResize, false);

		document.getElementById('scene')?.removeChild(renderer.domElement);
		scene.remove(light);
		scene.remove(camera);
		scene.remove(current_object);
		current_object = null;

		controls.dispose();
		renderer.dispose();
	});
</script>

<!-- Modal Tag -->
<Modal
	padding="p-7"
	rounded="rounded-2xl"
	shadow="shadow-xl"
	buttonNeutral="dark:border-white border-black border-2 font-semibold"
/>

<!-- Outer Container -->
<div class="container relative w-full h-full min-w-full min-h-full bg-black">
	<!-- 3D Scene -->
	<div id="scene" />

	<!-- Hand Icon -->
	<div
		in:fade={{ duration: 800, delay: 800 }}
		class="absolute lg:top-1/2 lg:right-52 md:top-10 md:right-10 sm:top-5 sm:right-5"
	>
		<IconHandMove class="w-10 h-10 text-white opacity-70" />
	</div>

	<!-- Header and Description of S.A.F.İ.R -->
	<div
		in:fade={{ duration: 400, delay: 400 }}
		class="absolute flex flex-col lg:top-16 lg:left-16 md:bottom-40 md:left-5 sm:-bottom-36 sm:left-5"
	>
		<!-- Header -->
		<div class="flex flex-row">
			<h1
				style="font-family: Nevan; "
				class=" text-sky-600 lg:opacity-90 md:opacity-95 sm:opacity-95 lg:text-9xl md:text-7xl sm:text-7xl"
			>
				Welcome to <br /> S.A.F.İ.R
			</h1>
		</div>

		<!-- Description -->
		<div class="flex flex-row pl-3 mt-2">
			<b
				class="font-sans text-white lg:opacity-90 md:opacity-95 sm:opacity-95 h4 lg:w-1/2 md:5/6 sm:w-5/6"
			>
				{$homepageText}
			</b>
		</div>
	</div>

	<!-- Vehicle Selection Cards -->
	<div class="absolute left-0 flex flex-row w-full px-4 space-x-2 drop-shadow-2xl bottom-14">
		<!-- Plane Card -->
		<button
			in:slide={{ delay: 50, duration: 500, axis: 'y' }}
			on:click={() => {
				$planeVehicle = !$planeVehicle;
				$droneVehicle = false;
				$roverVehicle = false;
				$underWaterVehicle = false;

				$selectedVehicle = 'Plane';
			}}
			class={`flex flex-row shadow-inner w-full rounded-t-2xl py-5 border border-[#f1efef] dark:border-[#202736] place-content-center place-items-center hover:bg-[#c3d6f4] dark:hover:bg-[#22324a] ${
				$planeVehicle ? 'bg-[#c3d6f4] dark:bg-[#22324a]' : 'bg-[#e9ebed] dark:bg-[#1c2632]'
			}`}
		>
			<IconPlaneTilt class="lg:w-14 lg:h-14 md:w-12 md:h-12 sm:w-12 sm:h-12" />
		</button>

		<!-- Drone Card -->
		<button
			in:slide={{ delay: 50, duration: 500, axis: 'y' }}
			on:click={() => {
				$droneVehicle = !$droneVehicle;
				$planeVehicle = false;
				$roverVehicle = false;
				$underWaterVehicle = false;

				$selectedVehicle = 'Drone';
				modalStore.trigger(vehicleSelectErrorModal);
			}}
			class={`flex w-full shadow-inner flex-row rounded-t-2xl py-5 border border-[#f1efef] dark:border-[#202736] place-content-center  place-items-center hover:bg-[#c3d6f4] dark:hover:bg-[#22324a] ${
				$droneVehicle ? 'bg-[#c3d6f4] dark:bg-[#22324a]' : 'bg-[#e9ebed] dark:bg-[#1c2632]'
			}`}
		>
			<IconDrone class="lg:w-14 lg:h-14 md:w-12 md:h-12 sm:w-12 sm:h-12" />
		</button>

		<!-- Rover Card -->
		<button
			in:slide={{ delay: 50, duration: 500, axis: 'y' }}
			on:click={() => {
				$roverVehicle = !$roverVehicle;
				$planeVehicle = false;
				$droneVehicle = false;
				$underWaterVehicle = false;

				$selectedVehicle = 'Rover';
				modalStore.trigger(vehicleSelectErrorModal);
			}}
			class={`flex flex-row shadow-inner w-full rounded-t-2xl py-5 border border-[#f1efef] dark:border-[#202736] place-content-center hover:bg-[#c3d6f4]  place-items-center dark:hover:bg-[#22324a] ${
				$roverVehicle ? 'bg-[#c3d6f4] dark:bg-[#22324a]' : 'bg-[#e9ebed] dark:bg-[#1c2632]'
			}`}
		>
			<IconTank class="lg:w-14 lg:h-14 md:w-12 md:h-12 sm:w-12 sm:h-12" />
		</button>

		<!-- Underwater Card -->
		<button
			in:slide={{ delay: 50, duration: 500, axis: 'y' }}
			class={`flex flex-row  shadow-2xl w-full rounded-t-2xl border border-[#f1efef]  place-items-center dark:border-[#202736] py-5 place-content-center hover:bg-[#c3d6f4] dark:hover:bg-[#22324a] ${
				$underWaterVehicle ? 'bg-[#c3d6f4] dark:bg-[#22324a]' : 'bg-[#e9ebed] dark:bg-[#1c2632]'
			}`}
			on:click={() => {
				$underWaterVehicle = !$underWaterVehicle;
				$planeVehicle = false;
				$droneVehicle = false;
				$roverVehicle = false;

				$selectedVehicle = 'Underwater';
				modalStore.trigger(vehicleSelectErrorModal);
			}}
		>
			<IconSubmarine class="lg:w-14 lg:h-14 md:w-12 md:h-12 sm:w-12 sm:h-12" />
		</button>
	</div>
</div>
