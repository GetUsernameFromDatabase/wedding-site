<template>
  <v-card color="primary">
    <v-card-title
      ><div class="flex justify-center w-full">
        {{ t('maps.lasita') }}
      </div></v-card-title
    >
    <v-card-text
      ><p class="text-error" v-if="geolocationErrorMessage">
        {{ geolocationErrorMessageDisplay }}
      </p></v-card-text
    >
    <v-container fluid>
      <div ref="mapElement" class="map h-[500px] relative" @wheel="mapWheelEvent"></div>

      <v-overlay
        v-model="showOverlay"
        contained
        class="align-center justify-center"
        :attach="mapElement"
      >
        <p class="text-2xl text-white">{{ t('message.ctrlzoom') }}</p></v-overlay
      >
    </v-container>
  </v-card>
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
import { Point } from 'ol/geom';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style.js';
import Feature from 'ol/Feature';
import { useI18n } from 'vue-i18n';
import lasitaGeoJson from '@/json/lasita-geojson.json';
import type { useI18nType } from '@/plugins/i18n/vue-i18n';
import type { AllMessageSchemaKeys } from '@/plugins/i18n/locales';
// TODO: redirect to house view on house click
// TODO: text/tooltip on houses

const { t } = useI18n<useI18nType>();

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

  const view = new View({ center: [26.3709, 58.3304], zoom: 18 });
  // `EPSG:4326` due to useGeographic();
  const geolocation = makeGeolocation('EPSG:4326');

  const map = new Map({
    layers: [...makeLayers(), geolocation.layer],
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
  const geolocation = new Geolocation({
    trackingOptions: {
      enableHighAccuracy: true,
    },
    projection,
    tracking: true,
  });

  // FEATURES
  const accuracyFeature = new Feature();
  const positionFeature = new Feature();
  positionFeature.setStyle(
    new Style({
      image: new CircleStyle({
        radius: 6,
        fill: new Fill({
          color: '#3399CC',
        }),
        stroke: new Stroke({
          color: '#fff',
          width: 2,
        }),
      }),
    }),
  );

  // EVENTS
  geolocation.on('error', function (error) {
    console.error(error);
    geolocationErrorMessage.value = error.message;
  });
  geolocation.on('change:accuracyGeometry', function () {
    const accuracyGeometry = geolocation.getAccuracyGeometry();
    if (!accuracyGeometry) return;
    accuracyFeature.setGeometry(accuracyGeometry);
  });

  geolocation.on('change:position', function () {
    const coordinates = geolocation.getPosition();
    if (!coordinates) return;
    positionFeature.setGeometry(new Point(coordinates));
  });

  const layer = new VectorLayer({
    source: new VectorSource({
      features: [accuracyFeature, positionFeature],
    }),
  });
  return { layer };
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
</script>
<style>
@import 'ol/ol.css';
</style>
