<template>
  <suspense>
    <v-expansion-panels multiple v-model="panels">
      <v-expansion-panel bg-color="primary">
        <v-expansion-panel-title
          ><div class="flex justify-center w-full">
            {{ t('maps.procession') }}
          </div></v-expansion-panel-title
        >
        <v-expansion-panel-text
          ><v-btn
            ripple
            variant="tonal"
            :href="mapLinks.weddingProcession"
            target="_blank"
            class="mb-2"
            >{{ t('message.directLink') }}</v-btn
          >
          <google-maps :src="mapLinks.embedWeddingProcession" class="w-full h-[60vh]"></google-maps
        ></v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </suspense>
</template>

<script setup lang="ts">
import type { useI18nType } from '@/plugins/i18n/vue-i18n';
import { useI18n } from 'vue-i18n';
import { ref } from 'vue';
import GoogleMaps from './iframes/google-maps.vue';
import { useWeddingInfo } from '@/stores/wedding-info';
import { storeToRefs } from 'pinia';

const { t } = useI18n<useI18nType>();
const { mapLinks } = storeToRefs(useWeddingInfo());

interface Properties {
  expanded: boolean;
}
const properties = withDefaults(defineProps<Properties>(), { expanded: false });

const panels = ref<number[]>(properties.expanded ? [0] : []);
</script>
