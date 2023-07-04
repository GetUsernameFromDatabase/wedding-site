<template>
  <!-- TODO: use i18n -->
  <v-card title="LASITA" color="primary">
    <v-container fluid>
      <div ref="mapElement" class="map h-[500px] relative" @wheel="mapWheelEvent"></div>

      <v-overlay
        v-model="showOverlay"
        contained
        class="align-center justify-center"
        :attach="mapElement"
      >
        <p class="text-2xl text-white">Use ctrl+scroll to zoom the map</p></v-overlay
      >
    </v-container>
  </v-card>
</template>
<script setup lang="ts">
import { useGeographic } from 'ol/proj.js';
import GeoJSON from 'ol/format/GeoJSON.js';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import { OSM, Vector as VectorSource } from 'ol/source.js';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer.js';
import { onMounted, ref } from 'vue';
import type BaseLayer from 'ol/layer/Base';
import type LayerGroup from 'ol/layer/Group';
import type Collection from 'ol/Collection';
import { defaults as interactionDefaults, MouseWheelZoom } from 'ol/interaction';
import { platformModifierKeyOnly, altKeyOnly } from 'ol/events/condition';
import { useTimeoutFn } from '@vueuse/core';
import lasitaGeoJson from '@/json/lasita-geojson.json';
// TODO: redirect to house view on house click
// TODO: geolocation
// TODO: text/tooltip on houses

const mapElement = ref<HTMLDivElement>();
const showOverlay = ref(false);

const { start: timeoutOverlayStart } = useTimeoutFn(() => {
  showOverlay.value = false;
}, 3000);

// --- VUE LIFECYCLE ---
onMounted(() => {
  initiateOpenLayer();
});

// --- FUNCTIONS ---
function initiateOpenLayer() {
  useGeographic();

  const view = new View({ center: [26.3709, 58.3304], zoom: 18 });
  const map = new Map({
    layers: makeLayers(),
    target: mapElement.value,
    view,
    interactions: interactionDefaults({
      mouseWheelZoom: false,
    }).extend([
      new MouseWheelZoom({
        condition: function (event) {
          return platformModifierKeyOnly(event) || altKeyOnly(event);
        },
      }),
    ]),
  });
  registerMapEvents(map);
}

function makeLayers(): BaseLayer[] | Collection<BaseLayer> | LayerGroup | undefined {
  const vectorSource = new VectorSource({
    features: new GeoJSON().readFeatures(lasitaGeoJson),
  });

  const tileLayer = new TileLayer({
    source: new OSM(),
  });
  const vectorLayer = new VectorLayer({
    source: vectorSource,
  });

  return [tileLayer, vectorLayer];
}
// --- EVENTS ---
function mapWheelEvent(event: WheelEvent) {
  if (event.ctrlKey || event.altKey) return;
  showOverlay.value = true;
  timeoutOverlayStart();
}

function registerMapEvents(map: Map) {
  map.on('click', function (event) {
    map.forEachFeatureAtPixel(event.pixel, function (feature) {
      console.log(feature);
    });
  });
}
</script>
<style>
@import 'ol/ol.css';
</style>
