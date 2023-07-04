<template>
  <div>
    <v-btn
      ripple
      variant="tonal"
      :href="mapLinks.weddingProcession.LINK"
      target="_blank"
      class="mb-2"
      >{{ t('message.directLink') }}</v-btn
    >
    <google-maps :src="mapLinks.embedWeddingProcession.LINK" class="w-full h-[60vh]"></google-maps>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { storeToRefs } from 'pinia';
import GoogleMaps from '@/components/iframes/google-maps.vue';
import { useWeddingInfo } from '@/stores/wedding-info';
import type { useI18nType } from '@/plugins/i18n/vue-i18n';

const { t } = useI18n<useI18nType>();
const weddingInfoStore = await useWeddingInfo();
const { mapLinks } = storeToRefs(weddingInfoStore);
</script>
