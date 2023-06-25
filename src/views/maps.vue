<template>
  <div class="overflow-auto">
    <WeddingProcession
      :direct-link="mapLinks.weddingProcession ?? ''"
      expanded
      :iframe-src="mapLinks.embedWeddingProcession ?? ''"
    ></WeddingProcession>

    <v-divider class="my-1"></v-divider>

    <v-card class="mx-auto" :title="t('maps.linksToMaps')" color="primary">
      <v-list bg-color="secondary">
        <v-list-item :href="mapLinks.weddingProcession" target="_blank"
          ><template v-slot:prepend> <v-icon icon="mdi-ring"></v-icon> </template
          >{{ t('maps.procession') }}</v-list-item
        >
        <v-list-item :href="mapLinks.ourLocation" target="_blank"
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

const { t } = useI18n<useI18nType>();

const { mapLinks } = useWeddingInfo();
</script>
