<template>
  <!-- TODO: notify where person might be -->
  <!-- TODO: navigate to searched person -->
  <v-row justify="center" no-gutters>
    <v-col cols="auto" class="max-sm:w-full w-72">
      <v-list v-model:opened="open" bg-color="primary" class="h-full w-full">
        <v-list-item :prepend-icon="useIcons.searchPerson.vuetify">
          <v-autocomplete
            :items="peopleInfoKeys"
            :label="t('message.searchPerson')"
            class="m-1"
            variant="solo-filled"
            bg-color="primary"
            density="compact"
            hide-details="auto"
            clearable
            auto-select-first
            ><template v-slot:item="data">
              <v-list-item
                :value="data.item.value"
                :title="data.item.title"
                @click="data.props.onClick"
                :disabled="!hasRoom(data.item.value)"
              >
                <!-- TODO: tooltip on where person might be -->
              </v-list-item>
            </template></v-autocomplete
          ></v-list-item
        >

        <v-list-group
          v-for="house in availableHouses"
          :key="house"
          :value="house"
          :prepend-icon="useIcons.housePlan.vuetify"
        >
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              :title="getHouseTranslation(house)"
              :active="house === activeHouseKey"
            ></v-list-item>
          </template>

          <v-list-item
            v-for="(floor, index) in houses[house].floors"
            :key="index"
            :title="t('message.floor', { n: index + 1 })"
            :prepend-icon="useIcons.floorPlan.vuetify"
            :value="house + index"
            @click="changeActiveFloor(house, index)"
            :active="house === activeHouseKey && index === activeFloorIndex"
          ></v-list-item>
        </v-list-group>
      </v-list>
    </v-col>
    <v-col>
      <v-sheet color="secondary" class="w-full h-full flex p-4">
        <component :is="activeFloorSvg" v-if="activeFloorSvg"></component>
      </v-sheet>
    </v-col>
  </v-row>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useHouses, type AvailableHouses } from '@/composables/housing';
import type { useI18nType } from '@/plugins/i18n/vue-i18n';
import { useIcons } from '@/composables/icons';
import { useWeddingInfo } from '@/stores/wedding-info';
import { useDynamicTranslator } from '@/composables/translate';

const { t } = useI18n<useI18nType>();
const dynamicTranslator = useDynamicTranslator();
const houses = useHouses();
const route = useRoute();
const router = useRouter();
const weddingInfoStore = await useWeddingInfo();

const availableHouses = Object.keys(houses) as AvailableHouses[];

// --- VUE REFS ---
const open = ref([]);
const activeHouseKey = ref<AvailableHouses>(
  (route.query['house'] as AvailableHouses) ?? 'main_house',
);
const activeFloorIndex = ref(Number.parseInt(String(route.query['floor'])) || 0);
const { peopleInfo } = storeToRefs(weddingInfoStore);

// --- VUE COMPUTED ---
const activeFloorSvg = computed(() => {
  // TODO: error system
  let house = houses[activeHouseKey.value];
  if (!house) house = houses.main_house;

  let floor = house.floors[activeFloorIndex.value];
  if (!floor) floor = house.floors[0];
  return floor.svg;
});
const peopleInfoKeys = computed(() => Object.keys(peopleInfo.value));

// --- FUNCTIONS ---
function getHouseTranslation(house: AvailableHouses) {
  return dynamicTranslator('lasita', house);
}

function changeActiveFloor(house: AvailableHouses, floor = 0) {
  const newFloor = houses[house].floors.at(floor);
  if (!newFloor) throw new Error(`Floor ${floor} does not exist on ${house}`);

  activeHouseKey.value = house;
  activeFloorIndex.value = floor;
  router.replace({ path: route.path, query: { house, floor } });
}

function hasRoom(person: keyof typeof peopleInfo.value) {
  const personInfo = peopleInfo.value[person];
  if (personInfo['ROOM-ID'] && personInfo['ROOM-ID'] !== '0') return true;
  return false;
}
</script>
<style scoped>
:deep(svg) {
  max-height: calc(100vh - 64px - 40px - 4rem);
  margin: auto;
}
</style>
