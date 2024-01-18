<script>
	import { Renderer } from 'leaflet';
	import { onMount } from 'svelte';
	import { scale } from 'svelte/transition';
	import * as THREE from 'three';
	import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
	import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
	import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';

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

<div class="relative flex w-screen h-screen bg-black">
	<div id="scene" class="top-0 bottom-0 left-0 right-0" />
	<div
		class="absolute flex flex-col lg:top-16 lg:left-16 md:bottom-28 md:left-10 sm:bottom-28 sm:left-10"
	>
		<div class="flex flex-row">
			<h1
				style="font-family: Nevan; "
				class="relative flex text-red-600 h1 lg:opacity-90 md:opacity-95 sm:opacity-95 lg:text-9xl md:text-7xl sm:text-7xl"
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
</div>
