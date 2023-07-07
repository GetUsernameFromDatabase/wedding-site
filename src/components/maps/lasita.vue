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
      <p class="text-2xl text-white text-center">{{ t(overlayMessage) }}</p></v-overlay
    >
    <v-container>
      <v-row justify="center" align="center"
        ><v-col cols="auto">
          <v-btn variant="tonal" @click="resetView"> {{ t('maps.resetView') }} </v-btn></v-col
        >
        <v-col cols="auto">
          <v-btn variant="tonal" @click="toUserLocation">
            <Icon icon="mdi:map-marker-radius"></Icon>{{ t('maps.toMyLocation') }}
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
import { onMounted, ref, computed, watch } from 'vue';
import { defaults as interactionDefaults, MouseWheelZoom } from 'ol/interaction';
import { platformModifierKeyOnly, altKeyOnly } from 'ol/events/condition';
import { useTimeoutFn } from '@vueuse/core';
import Geolocation from 'ol/Geolocation.js';
import { useI18n } from 'vue-i18n';
import { Fill, Stroke, Style, Circle, Text } from 'ol/style';
import { Icon } from '@iconify/vue';
import lasitaGeoJson from '@/assets/lasita-geojson.json';
import type { useI18nType } from '@/plugins/i18n/vue-i18n';
import type { AllMessageSchemaKeys } from '@/plugins/i18n/locales';
import { useGeolocation } from '@/composables/openlayers';
import { useDynamicTranslator } from '@/composables/translate';
// TODO: show people in house with overlay

const { t, locale } = useI18n<useI18nType>();
const dynamicTranslator = useDynamicTranslator();

const originalCenter = [26.3709, 58.3304];
const originalZoom = 18;

let view: View | undefined;
let map: Map | undefined;
let geolocation: Geolocation | undefined;

const mapElement = ref<HTMLDivElement>();
const showOverlay = ref(false);
const geolocationErrorMessage = ref('');
const overlayMessage = ref<AllMessageSchemaKeys>('message.ctrlzoom');

const geolocationErrorMessageDisplay = computed(() => {
  return dynamicTranslator('errors.geolocation', geolocationErrorMessage.value);
});

const { start: timeoutOverlayStart } = useTimeoutFn(() => {
  showOverlay.value = false;
}, 2000);

watch(locale, () => {
  map?.redrawText();
});
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
    layers: [makeMainLayer(), makeGeoJsonLayer(), createdGeolocation.layer],
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

function makeMainLayer() {
  return new TileLayer({
    source: new OSM(),
  });
}

function makeGeoJsonLayer() {
  // STYLES
  const defaultStyle = new Style({
    fill: new Fill({ color: 'rgba(255, 255, 255, 0.2)' }),
    stroke: new Stroke({ color: '#3399CC', width: 1.25 }),
    image: new Circle({
      fill: new Fill({ color: 'rgba(255, 255, 255, 0.2)' }),
      stroke: new Stroke({ color: '#3399CC', width: 1.25 }),
      radius: 5,
    }),
  });
  const labelStyle = new Style({
    text: new Text({
      text: '',
      fill: new Fill({ color: '#000' }),
      stroke: new Stroke({ color: '#fff', width: 2 }),
      overflow: true,
    }),
  });
  // VECTOR LAYER, SOURCE
  const geoJson = new GeoJSON();
  const vectorSource = new VectorSource({
    features: geoJson.readFeatures(lasitaGeoJson),
  });

  const vectorLayer = new VectorLayer({
    source: vectorSource,
    style: function (feature) {
      const featureName = feature.get('name');
      if (!featureName) return defaultStyle;

      const translatedName = dynamicTranslator('lasita', featureName);
      labelStyle.getText().setText(translatedName);

      return [defaultStyle, labelStyle];
    },
  });
  return vectorLayer;
}

function makeGeolocation(projection: ProjectionLike) {
  const geolocation = useGeolocation(projection);
  geolocation.geolocation.on('error', function (error) {
    geolocationErrorMessage.value = error.message;
  });
  return geolocation;
}

function setShowOverlayTrue() {
  showOverlay.value = true;
  timeoutOverlayStart();
}

function setShowOverlayFalse(event: Event) {
  event.preventDefault();
  showOverlay.value = false;
}
// --- EVENTS ---
function mapWheelEvent(event: WheelEvent) {
  overlayMessage.value = 'message.ctrlzoom';
  if (event.ctrlKey || event.altKey) setShowOverlayFalse(event);
  else setShowOverlayTrue();
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function mapTouchEvent(event: PointerEvent) {
  // TODO: preventing mobile touch properly
  overlayMessage.value = 'message.use2fingers';
  console.log(event);
  if (event.isPrimary) setShowOverlayTrue();
  else setShowOverlayFalse(event);
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
