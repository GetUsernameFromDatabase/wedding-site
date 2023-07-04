<template>
  <div>
    <WeddingMaps></WeddingMaps>

    <v-divider class="m-2"></v-divider>

    <v-card :title="t('agenda.title')" color="primary"
      ><v-card-text class="flex flex-col md:flex-row">
        <v-list density="compact" bg-color="secondary" class="min-w-[300px]">
          <v-list-item
            v-for="item in agenda"
            :key="item.text"
            :value="item"
            :href="item.href"
            target="_blank"
          >
            <template v-slot:prepend>
              <v-icon :icon="item.icon"></v-icon>
            </template>
            <v-list-item-title class="whitespace-pre-wrap">{{ t(item.text) }}</v-list-item-title>
          </v-list-item> </v-list
        ><v-carousel
          cycle
          :height="mdOrGreater ? 480 : 320"
          hide-delimiter-background
          show-arrows="hover"
          color="primary"
        >
          <template v-for="item in agenda" :key="item.text"
            ><v-carousel-item v-for="slidePicture in item.slidePictures" :key="slidePicture">
              <v-card class="w-full h-full">
                <v-card-title class="text-h6 flex w-full justify-center">
                  {{ t(item.text) }}
                </v-card-title>
                <v-img :src="slidePicture" height="100%" :alt="t(item.text)"
                  ><template v-slot:placeholder>
                    <div class="d-flex align-center justify-center fill-height">
                      <v-progress-circular
                        color="grey-lighten-4"
                        indeterminate
                      ></v-progress-circular>
                    </div> </template></v-img
              ></v-card> </v-carousel-item
          ></template> </v-carousel></v-card-text
    ></v-card>

    <v-divider class="m-2"></v-divider>

    <IframeSpotify
      src="https://open.spotify.com/playlist/0fFxFSfDk77eACERrOEXSs?si=1719f7e0e19147f2"
    ></IframeSpotify>

    <v-divider class="m-2"></v-divider>

    <v-container fluid>
      <v-row>
        <v-col class="pa-2 ma-2">
          <v-theme-provider theme="marion">
            <shortDescriptionVue person="marion"></shortDescriptionVue>
          </v-theme-provider>
        </v-col>
        <v-col class="pa-2 ma-2">
          <v-theme-provider theme="ryan">
            <shortDescriptionVue person="ryan"></shortDescriptionVue>
          </v-theme-provider>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';
import { useI18n } from 'vue-i18n';
import IframeSpotify from '@/components/iframes/spotify.vue';
import shortDescriptionVue from '@/components/person/short-description.vue';
import { useAgenda as agenda } from '@/composables/agenda';
import type { useI18nType } from '@/plugins/i18n/vue-i18n';
import WeddingMaps from '@/components/expansion-panels/wedding-maps.vue';

const { t } = useI18n<useI18nType>();
const breakpoints = useBreakpoints(breakpointsTailwind);

const mdOrGreater = breakpoints.greaterOrEqual('md');
</script>
