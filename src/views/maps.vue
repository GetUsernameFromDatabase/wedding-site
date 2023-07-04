<template>
  <div>
    <WeddingProcession expanded></WeddingProcession>
    <LasitaMap></LasitaMap>

    <v-divider class="my-1"></v-divider>

    <v-card class="mx-auto" :title="t('maps.linksToMaps')" color="primary">
      <v-list bg-color="secondary">
        <v-list-item :href="mapLinks.weddingProcession.LINK" target="_blank"
          ><template v-slot:prepend>
            <v-icon :icon="useIcons.weddingRing.vuetify"></v-icon> </template
          >{{ t('maps.procession') }}</v-list-item
        >
        <v-list-item :href="mapLinks.ourLocation.LINK" target="_blank"
          ><template v-slot:prepend>
            <v-icon :icon="useIcons.ourLocation.vuetify"></v-icon> </template
          >{{ t('maps.ourLocation') }}</v-list-item
        >
      </v-list>
    </v-card>
  </div>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { storeToRefs } from 'pinia';
import type { useI18nType } from '../plugins/i18n/vue-i18n';
import WeddingProcession from '@/components/wedding-procession.vue';
import { useWeddingInfo } from '@/stores/wedding-info';
import { useIcons } from '@/composables/icons';
import LasitaMap from '@/components/lasita-map.vue';

const { t } = useI18n<useI18nType>();

const weddingInfoStore = await useWeddingInfo();
const { mapLinks } = storeToRefs(weddingInfoStore);
</script>
