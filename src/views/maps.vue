<template>
  <div class="overflow-auto px-6">
    <v-expansion-panels multiple v-model="panels">
      <v-expansion-panel>
        <v-expansion-panel-title
          ><div class="flex justify-center w-full">
            {{ t('maps.procession') }}
          </div></v-expansion-panel-title
        >
        <v-expansion-panel-text
          ><v-btn
            ripple
            variant="tonal"
            :href="weddingInfo?.weddingProcession"
            target="_blank"
            class="mb-2"
            >{{ t('message.directLink') }}</v-btn
          >
          <iframe
            ref="weddingProcession"
            class="w-full h-[60vh]"
            :src="weddingInfo?.embedWeddingProcession"
            style="border: 0"
            allowfullscreen
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe
        ></v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>

    <v-divider class="my-1"></v-divider>

    <v-card class="mx-auto" :title="t('maps.linksToMaps')">
      <v-list>
        <v-list-item :href="weddingInfo?.ourLocation" target="_blank"
          ><template v-slot:prepend> <v-icon icon="mdi-clock"></v-icon> </template
          >{{ t('maps.ourLocation') }}</v-list-item
        >
      </v-list>
    </v-card>
  </div>
</template>
<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';
import type { useI18nType } from '../plugins/i18n/vue-i18n';
import { useI18n } from 'vue-i18n';
import { onMounted } from 'vue';
import type { CsvWeddingInfoRow, ParsedWeddingInfo } from '@/_types/requests';

const { t } = useI18n<useI18nType>();

const panels = ref<number[]>([0]);
const weddingInfo = ref<ParsedWeddingInfo>();

async function fetchWeddingInfo() {
  const sourceUrl =
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vT2TZnFzaS96BT8muIZT3zM5CCQqZ3iQk3tzfqtUsobPYDG4QvM74N42tAQcYY2dgG7IF6V8WKUFPCL/pub?gid=0&single=true&output=csv';
  const weddingInfoRequest = await axios.get<string>(sourceUrl);

  const result: { [header: string]: string } = {};
  const infoRows = weddingInfoRequest.data.split(/\r\n|\r|\n/);
  for (const row of infoRows) {
    const rowSplit = row.split(',') as CsvWeddingInfoRow;
    const key = rowSplit[0];
    const value = rowSplit[1];
    result[key] = value;
  }
  return result as unknown as ParsedWeddingInfo;
}

onMounted(async () => {
  weddingInfo.value = await fetchWeddingInfo();
});
</script>
