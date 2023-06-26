<template>
  <div>
    <WeddingProcession></WeddingProcession>

    <v-divider class="m-2"></v-divider>

    <v-card :title="t('agenda.title')" color="primary"
      ><v-card-text class="flex">
        <v-list density="compact" bg-color="secondary" class="w-fit" width="350">
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
        ><v-carousel cycle height="400" hide-delimiter-background show-arrows="hover">
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
import type { AgendaItem } from '@/_types/agenda';
import shortDescriptionVue from '@/components/person/short-description.vue';
import WeddingProcession from '@/components/wedding-procession.vue';
import type { useI18nType } from '@/plugins/i18n/vue-i18n';
import { useI18n } from 'vue-i18n';

const { t } = useI18n<useI18nType>();

const agenda: AgendaItem[] = [
  {
    text: 'agenda.ceremony',
    icon: 'mdi-ring',
    href: 'https://tartu.ee/et/abielu',
    slidePictures: ['https://tartu.ee/sites/default/files/field/image/Tiigi%2012%20maja.JPG'],
  },
  {
    text: 'agenda.botanicalGarnder',
    icon: 'mdi-flower',
    href: 'https://natmuseum.ut.ee/et',
  },
  {
    text: 'agenda.mhg',
    icon: 'mdi-school',
    href: 'https://miinaharma.ee/',
    slidePictures: ['https://s.err.ee/photo/crop/2021/10/15/1186128h68a9t72.jpg'],
  },
  {
    text: 'agenda.etAgriMuseum',
    icon: 'mdi-horseshoe',
    href: 'https://maaelumuuseumid.ee/eesti-pollumajandusmuuseum/',
    slidePictures: [
      'https://upload.wikimedia.org/wikipedia/commons/2/2e/Eesti_P%C3%B5llumajandusmuuseum%2C_%C3%B5pikoda.JPG',
    ],
  },
  {
    text: 'agenda.home',
    icon: 'mdi-grass',
    href: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  },
  {
    text: 'agenda.shop',
    icon: 'mdi-shopping',
    href: 'https://www.coop.ee/marja-konsum',
    slidePictures: ['https://cooppolva.ee/wp-content/uploads/2019/11/M%C3%A4rja-Coop-Konsum.png'],
  },
  {
    text: 'agenda.final',
    icon: 'mdi-glass-flute',
    href: 'https://www.facebook.com/people/Lasita-Puhkemaja-O%C3%9C/100063769771377/',
    slidePictures: [
      'https://visittartu.com/sites/default/files/vemedia/84220_ebf3147a22ac59b46c9288c6db78f82e.jpg',
    ],
  },
];
</script>
