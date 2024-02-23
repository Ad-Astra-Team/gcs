<script>
	import L from 'leaflet';
	import 'leaflet/dist/leaflet.css';
	import MapToolbar from './MapToolbar.svelte';
	import MarkerPopup from './MarkerPopup.svelte';
	import * as markerIcons from '$lib/Maps/marker';
	import { modeCurrent } from '@skeletonlabs/skeleton';
	import { GPS_Lat, GPS_Lon, followMe } from '$lib/Utils/stores';
	import { IconAirBalloon } from '@tabler/icons-svelte';
	// #region Globals
	/**
	 * @type {L.Map}
	 */
	export let map;

	var mapOptions = {
		zoom: 10,
		preferCanvas: true,
		zoomControl: false
	};

	/**
	 * @type {L.TileLayer}
	 */
	let layer;

	var layerOptions = {
		// attribution: `&copy;<a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>,
		// &copy;<a href="https://carto.com/attributions" target="_blank">CARTO</a>`,
		subdomains: 'abcd',
		maxZoom: 20,
		minZoom: 3
	};

	var zoomOptions = {
		zoomInText: '1',
		zoomOutText: '0'
	};

	const markerLocations = [
		[-35.157632, 149.16445],
		[-35.257632, 149.26445],
		[-35.357632, 149.36445],
		[-35.257632, 149.16445],
		[-35.157632, 149.26445],
		[-35.057632, 149.36445]
	];

	const initialView = [39.8283, -98.5795];

	let markerLayers;
	let lineLayers;

	let toolbar = L.control({ position: 'topright' });
	let toolbarComponent;

	let eye = true;
	let lines = true;

	let markers = new Map();
	// #endregion

	/**
	 * @param {HTMLElement} container
	 * @returns {L.Map}
	 */
	function createMap(container) {
		var m = L.map(container, mapOptions).setView(initialView, 5);

		if ($modeCurrent) {
			layer = L.tileLayer(
				'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
				layerOptions
			);
		} else {
			layer = L.tileLayer(
				'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
				layerOptions
			);
		}

		m.addLayer(layer);

		L.control.zoom(zoomOptions);

		return m;
	}

	toolbar.onAdd = (map) => {
		let div = L.DomUtil.create('div');
		toolbarComponent = new MapToolbar({
			target: div,
			props: {}
		});

		toolbarComponent.$on('click-eye', ({ detail }) => (eye = detail));
		toolbarComponent.$on('click-lines', ({ detail }) => (lines = detail));
		toolbarComponent.$on('click-reset', () => {
			map.setView(initialView, 5, { animate: true });
		});

		return div;
	};

	toolbar.onRemove = () => {
		if (toolbarComponent) {
			toolbarComponent.$destroy();
			toolbarComponent = null;
		}
	};

	// Create a popup with a Svelte component inside it and handle removal when the popup is torn down.
	// `createFn` will be called whenever the popup is being created, and should create and return the component.
	function bindPopup(marker, createFn) {
		let popupComponent;
		marker.bindPopup(() => {
			let container = L.DomUtil.create('div');
			popupComponent = createFn(container);
			return container;
		});

		marker.on('popupclose', () => {
			if (popupComponent) {
				let old = popupComponent;
				popupComponent = null;
				// Wait to destroy until after the fadeout completes.
				setTimeout(() => {
					old.$destroy();
				}, 500);
			}
		});
	}

	function markerIcon(count) {
		let html = `<div class="map-marker"><div>${markerIcons.library}</div><div class="marker-text">${count}</div></div>`;
		return L.divIcon({
			html,
			className: 'map-marker'
		});
	}

	function markerAircraftIcon() {
		let html = `<div class="map-marker"><div>${markerIcons.aircraft}</div></div>`;
		return L.divIcon({
			html,
			className: 'map-marker'
		});
	}

	function addMarker(e) {
		// Add marker to map at click location; add popup window
		var newMarker = new L.marker(e.latlng).addTo(map);
		console.log(e);
	}

	function createMarker(loc) {
		let count = Math.ceil(Math.random() * 25);
		let icon = markerIcon(count);
		let marker = L.marker(loc, { icon });
		bindPopup(marker, (m) => {
			let c = new MarkerPopup({
				target: m,
				props: {
					count
				}
			});

			c.$on('change', ({ detail }) => {
				count = detail;
				marker.setIcon(markerIcon(count));
			});

			return c;
		});

		return marker;
	}

	function createLines() {
		return L.polyline(markerLocations, { color: '#38bdf8', opacity: 0.6 });
	}

	function mapAction(container) {
		map = createMap(container);
		// get map zoom level
		toolbar.addTo(map);

		markerLayers = L.layerGroup();
		for (let location of markerLocations) {
			let m = createMarker(location);

			markerLayers.addLayer(m);
		}
		let icon = markerAircraftIcon();
		let airplane = L.marker([$GPS_Lat, $GPS_Lon], { icon });

		markerLayers.addLayer(airplane);

		lineLayers = createLines();

		markerLayers.addTo(map);
		lineLayers.addTo(map);

		GPS_Lat.subscribe((lat) => {
			airplane.setLatLng([lat, $GPS_Lon]);
			if (map && $followMe) {
				map.setView([lat, $GPS_Lon], map.getZoom(), { animate: true });
			}
		});

		GPS_Lon.subscribe((lon) => {
			airplane.setLatLng([$GPS_Lat, lon]);
			if (map && $followMe) {
				map.setView([$GPS_Lat, lon], map.getZoom(), { animate: true });
			}
		});

		return {
			destroy: () => {
				toolbar.remove();
				map.remove();
				map = null;
			}
		};
	}

	function destroyMap() {
		if (map) {
			toolbar.remove();
			map.remove();
			map = null;
		}
	}

	// We could do these in the toolbar's click handler but this is an example
	// of modifying the map with reactive syntax.
	$: if (markerLayers && map) {
		if (eye) {
			markerLayers.addTo(map);
		} else {
			markerLayers.remove();
		}
	}

	$: if (lineLayers && map) {
		if (lines) {
			lineLayers.addTo(map);
		} else {
			lineLayers.remove();
		}
	}

	function resizeMap() {
		if (map) {
			map.invalidateSize();
		}
	}

	// light/dark mode
	modeCurrent.subscribe((mode) => {
		var old_layer = layer;
		if (mode) {
			layer = L.tileLayer(
				'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
				layerOptions
			);
		} else {
			layer = L.tileLayer(
				'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
				layerOptions
			);
		}
		if (map) {
			map.removeLayer(old_layer);
			map.addLayer(layer);
		}
	});
</script>

<svelte:window on:resize={resizeMap} />

<div class="h-full rounded-2xl rounded-es-none map" use:mapAction />

<style>
	.map :global(.marker-text) {
		width: 100%;

		text-align: center;
		font-weight: 600;
		background-color: #38bdf8;
		color: #fff;
		border-radius: 0.5rem;
	}

	.map :global(.map-marker) {
		width: 30px;
		transform: translateX(-50%) translateY(-25%);
	}
</style>
