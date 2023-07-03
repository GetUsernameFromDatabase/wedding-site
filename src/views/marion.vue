<template>
  <div>
    <longDescription person="marion"></longDescription>
    <v-spacer class="mt-5"></v-spacer>
    <v-card title="Marion Songs" color="primary">
      <v-expansion-panels
        multiple
        v-model="panels"
        variant="accordion"
        class="h-[calc(100vh-64px-40px-5rem)] overflow-auto"
      >
        <v-expansion-panel
          bg-color="primary"
          v-for="marionSongCategory in marionSongCategories"
          :key="marionSongCategory"
        >
          <v-expansion-panel-title
            ><div class="flex justify-center w-full">
              {{
                songCategories[marionSongCategory][
                  `${$i18n.locale.toUpperCase()}-TRANSLATION` as keyof SongCategoryHeaders
                ] || songCategories[marionSongCategory]['SONG-CATEGORY']
              }}
            </div></v-expansion-panel-title
          >
          <v-expansion-panel-text>
            <spotifyVue
              v-for="marionSong in personSongs.marion[marionSongCategory]"
              :key="marionSong['SPOTIFY-LINK']"
              :src="marionSong['SPOTIFY-LINK']"
              compact
            ></spotifyVue>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card>
  </div>
</template>
<script setup lang="ts">
import type { SongCategoryHeaders } from '@/_types/requests';
import spotifyVue from '@/components/iframes/spotify.vue';
import longDescription from '@/components/person/long-description.vue';
import { useWeddingInfo } from '@/stores/wedding-info';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { computed } from 'vue';

const weddingInfoStore = await useWeddingInfo();
const { songCategories, personSongs } = storeToRefs(weddingInfoStore);

// TODO: this should stay here
const panels = ref<number[]>([]);
const marionSongCategories = computed(() => Object.keys(personSongs.value.marion));
</script>
