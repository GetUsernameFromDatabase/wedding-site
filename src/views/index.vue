<template>
  <div>
    <WeddingProcession
      :direct-link="weddingInfo?.weddingProcession ?? ''"
      :iframe-src="weddingInfo?.embedWeddingProcession ?? ''"
    ></WeddingProcession>

    <v-divider class="m-2"></v-divider>

    <v-card :title="t('agenda.title')" color="primary"
      ><v-list density="compact" bg-color="secondary">
        <v-list-item
          v-for="(item, i) in agenda"
          :key="i"
          :value="item"
          :title="t(item.text)"
          :href="item.href"
          target="_blank"
        >
          <template v-slot:prepend>
            <v-icon :icon="item.icon"></v-icon>
          </template>
        </v-list-item> </v-list
    ></v-card>
  </div>
</template>
<script setup lang="ts">
import type { AgendaItem } from '@/_types/agenda';
import WeddingProcession from '@/components/wedding-procession.vue';
import { useWeddingInfo } from '@/composables/wedding-info';
import type { useI18nType } from '@/plugins/i18n/vue-i18n';
import { useI18n } from 'vue-i18n';

const { t } = useI18n<useI18nType>();
const { info: weddingInfo } = useWeddingInfo();

const agenda: AgendaItem[] = [
  {
    text: 'agenda.ceremony',
    icon: 'mdi-ring',
    href: 'https://tartu.ee/et/abielu',
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
  },
  {
    text: 'agenda.etAgriMuseum',
    icon: 'mdi-horseshoe',
    href: 'https://maaelumuuseumid.ee/eesti-pollumajandusmuuseum/',
  },
  {
    text: 'agenda.home',
    icon: 'mdi-grass',
  },
  {
    text: 'agenda.shop',
    icon: 'mdi-shopping',
    href: 'https://www.coop.ee/marja-konsum',
  },
  {
    text: 'agenda.final',
    icon: 'mdi-glass-flute',
    href: 'https://www.facebook.com/people/Lasita-Puhkemaja-O%C3%9C/100063769771377/',
  },
];
</script>
