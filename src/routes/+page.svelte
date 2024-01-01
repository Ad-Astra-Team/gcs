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
		scene.add(new THREE.AxesHelper(5));

		const light = new THREE.PointLight(0xffffff, 1000);
		light.position.set(2.5, 7.5, 15);
		scene.add(light);

		const camera = new THREE.PerspectiveCamera(
			75,
			window.innerWidth / window.innerHeight,
			0.1,
			1000
		);
		camera.position.z = 3;

		const renderer = new THREE.WebGLRenderer();
		renderer.setSize(window.innerWidth, window.innerHeight);
		document.getElementById('scene').appendChild(renderer.domElement);

		const controls = new OrbitControls(camera, renderer.domElement);
		controls.enableDamping = true;

		// instantiate a loader
		const loader = new OBJLoader();

		// load a resource
		loader.load(
			// resource URL
			'assets/Airbus_A310.obj',
			// called when resource is loaded
			function (object) {
				scene.add(object);
			},
			// called when loading is in progresses
			function (xhr) {
				console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
			},
			// called when loading has errors
			function (error) {
				console.log('An error happened');
			}
		);

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
</script>

<div id="scene" class="top-0 bottom-0 left-0 right-0" />
