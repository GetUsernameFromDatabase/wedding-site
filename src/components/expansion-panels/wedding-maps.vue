<template>
  <v-expansion-panels multiple v-model="panels">
    <v-expansion-panel bg-color="primary" eager>
      <v-expansion-panel-title
        ><div class="flex justify-center w-full">
          {{ t('maps.procession') }}
        </div></v-expansion-panel-title
      >
      <v-expansion-panel-text eager><WeddingProcession></WeddingProcession></v-expansion-panel-text>
    </v-expansion-panel>
    <v-expansion-panel bg-color="primary" eager>
      <v-expansion-panel-title
        ><div class="flex justify-center w-full">
          {{ t('maps.lasita') }}
        </div></v-expansion-panel-title
      >
      <v-expansion-panel-text eager><Lasita></Lasita></v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { ref } from 'vue';
import WeddingProcession from '@/components/maps/wedding-procession.vue';
import type { useI18nType } from '@/plugins/i18n/vue-i18n';
import Lasita from '@/components/maps/lasita.vue';

const { t } = useI18n<useI18nType>();

interface Properties {
  initialPanels?: number[];
}
const properties = withDefaults(defineProps<Properties>(), {
  initialPanels() {
    return [];
  },
});
const panels = ref(properties.initialPanels);
</script>
