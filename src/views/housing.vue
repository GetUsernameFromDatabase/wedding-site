<template>
  <v-row justify="center" no-gutters>
    <v-col cols="auto" class="max-sm:w-full w-72">
      <v-list v-model:opened="open" bg-color="primary" class="h-full w-full">
        <v-list-item :prepend-icon="useIcons.searchPerson.vuetify">
          <v-autocomplete
            v-model="selectedPerson"
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
              <!-- TODO: find a way to get first non-disabled person with auto-select-first -->
              <v-tooltip>
                <template v-slot:activator="{ props }">
                  <div v-bind="props">
                    <v-list-item
                      v-bind="hasRoom(data.item.value) ? data.props : {}"
                      :value="data.item.value"
                      :title="data.item.title"
                      :disabled="!hasRoom(data.item.value)"
                    >
                    </v-list-item>
                  </div>
                </template>
                <span>{{ getSearchPersonTooltip(data.item.value) }}</span>
              </v-tooltip>
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
  <v-row>
    <v-col>
      <v-card color="primary">
        <v-card-title class="text-h6 flex w-full justify-center">
          {{ t('maps.lasita') }}
        </v-card-title>
        <v-card-item><map-lasita></map-lasita></v-card-item>
      </v-card>
    </v-col>
  </v-row>
</template>
<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useHouses, type AvailableHouses } from '@/composables/housing';
import type { useI18nType } from '@/plugins/i18n/vue-i18n';
import { useIcons } from '@/composables/icons';
import { useWeddingInfo } from '@/stores/wedding-info';
import { useDynamicTranslator } from '@/composables/translate';
import MapLasita from '@/components/maps/lasita.vue';

const { t } = useI18n<useI18nType>();
const dynamicTranslator = useDynamicTranslator();
const { houses, findHouseAndFloorByRoom } = useHouses();
const route = useRoute();
const router = useRouter();
const weddingInfoStore = await useWeddingInfo();

const availableHouses = Object.keys(houses) as AvailableHouses[];

// --- VUE REFS ---
const open = ref([]);
const selectedPerson = ref<string>();
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

// --- VUE WATCH ---
watch(selectedPerson, (value) => {
  if (!value) return;

  const room = getPersonRoom(value);
  const foundInfo = findHouseAndFloorByRoom(room);

  if (!foundInfo) return;
  changeActiveFloor(foundInfo.houseKey, foundInfo.floorIndex);
});

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

function getPersonRoom(person: string) {
  const personInfo = peopleInfo.value[person];
  const roomID = personInfo['ROOM-ID'];
  return `tuba-${[roomID]}`;
}

function getSearchPersonTooltip(person: string) {
  if (!hasRoom(person)) return t('message.goesHome');

  const personRoom = getPersonRoom(person);
  const houseAndRoomInfo = findHouseAndFloorByRoom(personRoom);

  if (!houseAndRoomInfo) return '???';
  return getHouseTranslation(houseAndRoomInfo.houseKey);
}
</script>
<style scoped>
:deep(svg) {
  max-height: calc(100vh - 64px - 40px - 4rem);
  margin: auto;
}
</style>
