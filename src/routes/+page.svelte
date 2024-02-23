<script>
	import { Renderer } from 'leaflet';
	import { onMount } from 'svelte';
	import { scale } from 'svelte/transition';
	import * as THREE from 'three';
	import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
	import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
	import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
	import { IconDrone, IconPlaneTilt, IconTank, IconSubmarine } from '@tabler/icons-svelte';
	import { underWaterVehicle, planeVehicle, droneVehicle, roverVehicle } from '$lib/Utils/stores';

	onMount(() => {
		const scene = new THREE.Scene();
		const light = new THREE.PointLight(0xffffff, 1000);
		light.position.set(7.5, 7.5, 15);
		scene.add(light);

		const camera = new THREE.PerspectiveCamera(
			75,
			window.innerWidth / window.innerHeight,
			0.1,
			1000
		);

		camera.position.z = 5;

		const renderer = new THREE.WebGLRenderer();
		const controls = new OrbitControls(camera, renderer.domElement);
		renderer.setSize(window.innerWidth, window.innerHeight);
		document.getElementById('scene').appendChild(renderer.domElement);
		renderer.setClearColor(0x101b2b); // Beyaz arkaplan rengi

		controls.enableDamping = true;

		// instantiate a loader
		const loader = new OBJLoader();

		// load a resource
		loader.load('assets/kf1500.obj', function (object) {
			const rotationSpeed = 0.0009;
			const scaleValue = 0.006;
			object.scale.set(scaleValue, scaleValue, scaleValue);
			object.rotation.x = Math.PI / 10;
			object.rotation.y = Math.PI / 10;

			scene.add(object);

			function rotateObject() {
				object.rotation.y += rotationSpeed;
				object.rotation.x += rotationSpeed;
			}

			function animate() {
				requestAnimationFrame(animate);

				controls.update();
				rotateObject(); // Objeyi döndür

				render();
			}
			animate();
		});

		// const geometry = new THREE.BoxGeometry(1, 1, 1);
		// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
		// const cube = new THREE.Mesh(geometry, material);
		// scene.add(cube);
		// camera.position.z = 5;

		// function animate() {
		// 	requestAnimationFrame(animate);

		// 	cube.rotation.x += 0.01;
		// 	cube.rotation.y += 0.01;

		// 	renderer.render(scene, camera);
		// }

		// animate();

		window.addEventListener('resize', onWindowResize, false);
		function onWindowResize() {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(window.innerWidth, window.innerHeight);
			render();
		}

		// const stats = new Stats();
		// document.body.appendChild(stats.dom);

		function animate() {
			requestAnimationFrame(animate);

			controls.update();

			render();

			// stats.update();
		}

		function render() {
			renderer.render(scene, camera);
		}

		animate();
	});

	// ...
</script>

<div class="relative flex w-full h-full bg-black">
	<div id="scene" class="w-full h-full" />
	<div
		class="absolute flex flex-col lg:top-16 lg:left-16 md:bottom-40 md:left-10 sm:-bottom-36 sm:left-10"
	>
		<div class="flex flex-row">
			<h1
				style="font-family: Nevan; "
				class="flex text-red-600 h1 lg:opacity-90 md:opacity-95 sm:opacity-95 lg:text-9xl md:text-7xl sm:text-7xl"
			>
				Welcome to <br /> S.A.F.İ.R
			</h1>
		</div>
		<div class="flex flex-row pl-3 mt-2">
			<h4
				class="flex font-sans text-white lg:opacity-90 md:opacity-95 sm:opacity-95 h4 lg:w-3/12 md:5/6 sm:w-5/6"
			>
				S.A.F.İ.R is a Ground Control System for UAV purposed. It stands as "Savaş Alanı Fonksiyonlu
				İnsansız Rehber" and it developed by Ad Astra Team. You can control your UAV with the help
				of this multifunctional Ground Control System as you wish. All rights reserved.
			</h4>
		</div>
	</div>
	<div
		class="absolute left-0 flex flex-row w-full pl-4 pr-4 space-x-2 rounded-full bottom-14 bottom place-content-center place-items-center"
	>
		<div
			on:click={() => {
				$planeVehicle = !$planeVehicle;
				$droneVehicle = false;
				$roverVehicle = false;
				$underWaterVehicle = false;
			}}
			class={`flex flex-col w-full rounded-t-2xl h-full pt-6 pb-6 border border-[#f1efef] dark:border-[#202736] cursor-pointer place-content-center place-items-center hover:bg-[#c3d6f4] dark:hover:hover:bg-[#22324a] ${
				$planeVehicle ? 'bg-[#c3d6f4] dark:bg-[#22324a]' : 'bg-[#e9ebed] dark:bg-[#1c2632]'
			}`}
		>
			<IconPlaneTilt class="lg:w-12 lg:h-12 md:w-10 md:h-10 sm:w-10 sm:h-10" />
		</div>
		<div
			on:click={() => {
				$droneVehicle = !$droneVehicle;
				$planeVehicle = false;
				$roverVehicle = false;
				$underWaterVehicle = false;
			}}
			class={`flex w-full flex-col h-full rounded-t-2xl pt-6 pb-6 border border-[#f1efef] dark:border-[#202736] cursor-pointer place-content-center  place-items-center hover:bg-[#c3d6f4] dark:hover:hover:bg-[#22324a] ${
				$droneVehicle ? 'bg-[#c3d6f4] dark:bg-[#22324a]' : 'bg-[#e9ebed] dark:bg-[#1c2632]'
			}`}
		>
			<IconDrone class="lg:w-12 lg:h-12 md:w-10 md:h-10 sm:w-10 sm:h-10" />
		</div>
		<div
			on:click={() => {
				$roverVehicle = !$roverVehicle;
				$planeVehicle = false;
				$droneVehicle = false;
				$underWaterVehicle = false;
			}}
			class={`flex flex-col w-full h-full rounded-t-2xl pt-6 pb-6 border border-[#f1efef] dark:border-[#202736] pb-4 cursor-pointer place-content-center hover:bg-[#c3d6f4]  place-items-center dark:hover:hover:bg-[#22324a] ${
				$roverVehicle ? 'bg-[#c3d6f4] dark:bg-[#22324a]' : 'bg-[#e9ebed] dark:bg-[#1c2632]'
			}`}
		>
			<IconTank class="lg:w-12 lg:h-12 md:w-10 md:h-10 sm:w-10 sm:h-10" />
		</div>
		<div
			class={`flex flex-col shadow-2xl w-full h-full rounded-t-2xl border border-[#f1efef]  place-items-center dark:border-[#202736] pt-6 pb-6 cursor-pointer place-content-center hover:bg-[#c3d6f4] dark:hover:hover:bg-[#22324a] ${
				$underWaterVehicle ? 'bg-[#c3d6f4] dark:bg-[#22324a]' : 'bg-[#e9ebed] dark:bg-[#1c2632]'
			}`}
			on:click={() => {
				$underWaterVehicle = !$underWaterVehicle;
				$planeVehicle = false;
				$droneVehicle = false;
				$roverVehicle = false;
			}}
		>
			<IconSubmarine class="lg:w-12 lg:h-12 md:w-10 md:h-10 sm:w-10 sm:h-10" />
		</div>
	</div>
</div>
