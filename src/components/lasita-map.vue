<template>
  <!-- TODO: use i18n -->
  <v-card title="LASITA" color="primary">
    <div ref="mapElement" class="map h-[500px]"></div>
  </v-card>
</template>
<script setup lang="ts">
import { useGeographic } from 'ol/proj.js';
import GeoJSON from 'ol/format/GeoJSON.js';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import { OSM, Vector as VectorSource } from 'ol/source.js';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer.js';
import { onMounted } from 'vue';
import lasitaGeoJson from '@/json/lasita-geojson.json';
import type BaseLayer from 'ol/layer/Base';
import type LayerGroup from 'ol/layer/Group';
import type Collection from 'ol/Collection';
import { ref } from 'vue';
// TODO: disable zoom like google iframe does
// TODO: redirect to house view on house click
// TODO: geolocation
// TODO: text/tooltip on houses

const vectorSource = new VectorSource({
  features: new GeoJSON().readFeatures(lasitaGeoJson),
});

const mapElement = ref<HTMLDivElement>();

onMounted(() => {
  useGeographic();

  const view = new View({ center: [26.3709, 58.3304], zoom: 18 });
  const map = new Map({
    layers: getLayers(),
    target: mapElement.value,
    view,
  });
  registerMapEvents(map);
});

function getLayers(): BaseLayer[] | Collection<BaseLayer> | LayerGroup | undefined {
  const tileLayer = new TileLayer({
    source: new OSM(),
  });
  const vectorLayer = new VectorLayer({
    source: vectorSource,
  });

  return [tileLayer, vectorLayer];
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
