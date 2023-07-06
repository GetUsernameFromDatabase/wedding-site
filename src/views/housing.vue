<template>
  <v-row class="h-full m-0">
    <!-- TODO: Make mobile friendly -->
    <v-card class="h-[calc(100vh-64px-40px)] -my-4 -ml-4 w-72" rounded="0">
      <v-list v-model:opened="open">
        <!-- TODO: search person functionality -->
        <v-list-item prepend-icon="mdi-account" title="SEARCH-PERSON"></v-list-item>

        <!-- TODO: icons to icon composable -->
        <v-list-group
          v-for="house in availableHouses"
          :key="house"
          :value="house"
          prepend-icon="mdi-home"
        >
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props" :title="getHouseTranslation(house)"></v-list-item>
          </template>

          <!-- TODO: icons to useIcon -->
          <!-- TODO: `floor` with translation before index -->
          <v-list-item
            v-for="(floor, index) in houses[house].floors"
            :key="index"
            :title="`Korrus ${index}`"
            prepend-icon="mdi-floor-plan"
            :value="house + index"
            @click="changeActiveFloor(house, index)"
          ></v-list-item>
        </v-list-group>
      </v-list>
    </v-card>
    <v-col class="my-auto">
      <component :is="activeFloorSvg" v-if="activeFloorSvg"></component>
    </v-col>
  </v-row>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { useHouses, type AvailableHouses } from '@/composables/housing';
import type { useI18nType } from '@/plugins/i18n/vue-i18n';
import type { AllMessageSchemaKeys } from '@/plugins/i18n/locales';

const { t } = useI18n<useI18nType>();
const houses = useHouses();
const route = useRoute();
const router = useRouter();

const availableHouses = Object.keys(houses) as AvailableHouses[];

// --- VUE REFS ---
const open = ref([]);
const activeHouseKey = ref<AvailableHouses>(
  (route.query['house'] as AvailableHouses) ?? 'main_house',
);
const activeFloorIndex = ref(Number.parseInt(String(route.query['floor'])) || 0);

// --- VUE COMPUTED ---
const activeFloorSvg = computed(() => {
  // TODO: error system
  let house = houses[activeHouseKey.value];
  if (!house) house = houses.main_house;

  let floor = house.floors[activeFloorIndex.value];
  if (!floor) floor = house.floors[0];
  return floor.svg;
});

// --- FUNCTIONS ---
function getHouseTranslation(house: AvailableHouses) {
  const translateRoot: AllMessageSchemaKeys = 'lasita';
  return t(`${translateRoot}.${house}`);
}

function changeActiveFloor(house: AvailableHouses, floor = 0) {
  const newFloor = houses[house].floors.at(floor);
  if (!newFloor) throw new Error(`Floor ${floor} does not exist on ${house}`);

  activeHouseKey.value = house;
  activeFloorIndex.value = floor;
  router.replace({ path: route.path, query: { house, floor } });
}
</script>
<style scoped>
:deep(svg) {
  max-height: calc(100vh - 64px - 40px - 4rem);
  margin: auto;
}
</style>
