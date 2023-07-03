<template>
  <div>
    <WeddingProcession expanded></WeddingProcession>

    <v-divider class="my-1"></v-divider>

    <v-card class="mx-auto" :title="t('maps.linksToMaps')" color="primary">
      <v-list bg-color="secondary">
        <v-list-item :href="mapLinks.weddingProcession.LINK" target="_blank"
          ><template v-slot:prepend> <v-icon icon="mdi-ring"></v-icon> </template
          >{{ t('maps.procession') }}</v-list-item
        >
        <v-list-item :href="mapLinks.ourLocation.LINK" target="_blank"
          ><template v-slot:prepend> <v-icon icon="mdi-clock"></v-icon> </template
          >{{ t('maps.ourLocation') }}</v-list-item
        >
      </v-list>
    </v-card>
  </div>
</template>
<script setup lang="ts">
import type { useI18nType } from '../plugins/i18n/vue-i18n';
import { useI18n } from 'vue-i18n';
import WeddingProcession from '@/components/wedding-procession.vue';
import { useWeddingInfo } from '@/stores/wedding-info';
import { storeToRefs } from 'pinia';

const { t } = useI18n<useI18nType>();

const weddingInfoStore = await useWeddingInfo();
const { mapLinks } = storeToRefs(weddingInfoStore);
</script>
