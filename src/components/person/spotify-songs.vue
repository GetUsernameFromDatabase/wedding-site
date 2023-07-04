<template>
  <v-card :title="t('message.songsTitle', { person: capitalize(person) })" color="primary">
    <v-expansion-panels
      multiple
      v-model="panels"
      variant="accordion"
      class="max-h-[calc(100vh-64px-40px-5rem)] overflow-auto"
    >
      <v-expansion-panel
        bg-color="primary"
        v-for="songCategory in personSongCategories"
        :key="songCategory"
      >
        <v-expansion-panel-title
          ><div class="flex justify-center w-full">
            {{
              songCategories[songCategory][
                `${$i18n.locale.toUpperCase()}-TRANSLATION` as keyof SongCategoryHeaders
              ] || songCategory
            }}
          </div></v-expansion-panel-title
        >
        <v-expansion-panel-text>
          <IframeSpotify
            v-for="song in personSongs[person][songCategory]"
            :key="song['SPOTIFY-LINK']"
            :src="song['SPOTIFY-LINK']"
            compact
          ></IframeSpotify>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-card>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { ref, computed, capitalize } from 'vue';
import { useI18n } from 'vue-i18n';
import IframeSpotify from '../iframes/spotify.vue';
import type { SongCategoryHeaders } from '@/_types/requests';
import type { SpecificPeopleSongs } from '@/_types/wedding-info';
import type { useI18nType } from '@/plugins/i18n/vue-i18n';
import { useWeddingInfo } from '@/stores/wedding-info';

interface Properties {
  person: keyof SpecificPeopleSongs;
}
const properties = defineProps<Properties>();

const weddingInfoStore = await useWeddingInfo();
const { t } = useI18n<useI18nType>();

const { songCategories, personSongs } = storeToRefs(weddingInfoStore);
const panels = ref<number[]>([]);

const personSongCategories = computed(() => Object.keys(personSongs.value[properties.person]));
</script>
