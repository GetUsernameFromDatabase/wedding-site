<template>
  <div>
    <p class="text-error" v-if="geolocationErrorMessage">
      {{ geolocationErrorMessageDisplay }}
    </p>
    <div ref="mapElement" class="map h-[500px] relative" @wheel="mapWheelEvent"></div>

    <v-overlay
      v-model="showOverlay"
      contained
      class="align-center justify-center"
      :attach="mapElement"
    >
      <p class="text-2xl text-white">{{ t('message.ctrlzoom') }}</p></v-overlay
    >
    <v-container>
      <v-row justify="center" align="center"
        ><v-col cols="auto">
          <v-btn variant="tonal" @click="resetView"> {{ t('maps.resetView') }} </v-btn></v-col
        >
        <v-col cols="auto">
          <v-btn variant="tonal" @click="toUserLocation">
            {{ t('maps.toMyLocation') }}
          </v-btn></v-col
        ></v-row
      ></v-container
    >
  </div>
</template>
<script setup lang="ts">
import { useGeographic, type ProjectionLike } from 'ol/proj.js';
import GeoJSON from 'ol/format/GeoJSON.js';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import { OSM, Vector as VectorSource } from 'ol/source.js';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer.js';
import { onMounted, ref, computed } from 'vue';
import type BaseLayer from 'ol/layer/Base';
import { defaults as interactionDefaults, MouseWheelZoom } from 'ol/interaction';
import { platformModifierKeyOnly, altKeyOnly } from 'ol/events/condition';
import { useTimeoutFn } from '@vueuse/core';
import Geolocation from 'ol/Geolocation.js';
import { useI18n } from 'vue-i18n';
import lasitaGeoJson from '@/json/lasita-geojson.json';
import type { useI18nType } from '@/plugins/i18n/vue-i18n';
import type { AllMessageSchemaKeys } from '@/plugins/i18n/locales';
import { useGeolocation } from '@/composables/openlayers';
// TODO: show people in house with overlay
// TODO: require two fingers to move (MOBILE)
// TODO: _icons for buttons?_/_replace text with icon, add tooltips_?
// TODO: text/tooltip on houses (LOW-PRIO -- not worth the effort)

const { t } = useI18n<useI18nType>();

const originalCenter = [26.3709, 58.3304];
const originalZoom = 18;

let view: View | undefined;
let map: Map | undefined;
let geolocation: Geolocation | undefined;

const mapElement = ref<HTMLDivElement>();
const showOverlay = ref(false);
const geolocationErrorMessage = ref('');

const geolocationErrorMessageDisplay = computed(() => {
  const translateRoot: AllMessageSchemaKeys = 'errors.geolocation';
  const translatedMessage = t(`${translateRoot}.${geolocationErrorMessage.value}`);

  if (translatedMessage.startsWith(translateRoot)) return geolocationErrorMessage.value;
  return translatedMessage;
});

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

  view = new View({ center: originalCenter, zoom: originalZoom });
  // `EPSG:4326` due to useGeographic();
  const createdGeolocation = makeGeolocation('EPSG:4326');
  geolocation = createdGeolocation.geolocation;

  map = new Map({
    layers: [...makeLayers(), createdGeolocation.layer],
    target: mapElement.value,
    view: view,
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

function makeLayers(): BaseLayer[] {
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
function makeGeolocation(projection: ProjectionLike) {
  const geolocation = useGeolocation(projection);
  geolocation.geolocation.on('error', function (error) {
    geolocationErrorMessage.value = error.message;
  });
  return geolocation;
}
// --- EVENTS ---
function mapWheelEvent(event: WheelEvent) {
  if (event.ctrlKey || event.altKey) {
    event.preventDefault();
    showOverlay.value = false;
    return;
  }
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

function toUserLocation() {
  if (!view || !geolocation) return;
  const currentPosition = geolocation.getPosition();
  if (currentPosition) {
    geolocationErrorMessage.value = '';
  } else {
    geolocationErrorMessage.value = 'LocationNotFound';
    return;
  }
  view.setCenter(geolocation.getPosition());
}

function resetView() {
  if (!view) return;
  view.setCenter(originalCenter);
  view.setZoom(originalZoom);
}
</script>
<style>
@import 'ol/ol.css';
</style>
