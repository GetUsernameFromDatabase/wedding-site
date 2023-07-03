<template>
  <div>
    <longDescription person="marion"></longDescription>
    <v-spacer class="mt-5"></v-spacer>
    <v-card title="Marion Songs" color="primary">
      <v-expansion-panels multiple v-model="panels" variant="accordion">
        <v-expansion-panel
          bg-color="primary"
          v-for="marionSongCategory in marionSongCategories"
          :key="marionSongCategory"
        >
          <v-expansion-panel-title
            ><div class="flex justify-center w-full">
              {{
                songCategories.find((value) => value['SONG-CATEGORY'] === marionSongCategory)?.[
                  'EN-TRANSLATION' // TODO: MAKE WORK WITH TRANSLATION MODULE
                ]
              }}
            </div></v-expansion-panel-title
          >
          <v-expansion-panel-text>
            <spotifyVue
              v-for="marionSong in peopleSongs.marion[marionSongCategory]"
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
import type { SongHeaders } from '@/_types/requests';
import spotifyVue from '@/components/iframes/spotify.vue';
import longDescription from '@/components/person/long-description.vue';
import { useWeddingInfo } from '@/stores/wedding-info';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { computed } from 'vue';

const weddingInfoStore = await useWeddingInfo();
const { songCategories, songs } = storeToRefs(weddingInfoStore);

// TODO: move to wedding-info getters
const peopleSongs = computed(() => {
  const separatedSongs: Record<string, Record<string, SongHeaders[]>> = {};

  for (const song of songs.value) {
    const { WHOSE, CATEGORY } = song;
    if (!separatedSongs[WHOSE]) {
      separatedSongs[WHOSE] = {};
    }
    if (!separatedSongs[WHOSE][CATEGORY]) {
      separatedSongs[WHOSE][CATEGORY] = [];
    }
    separatedSongs[WHOSE][CATEGORY].push(song);
  }
  return separatedSongs;
});

// TODO: this should stay here
const panels = ref<number[]>([]);
const marionSongCategories = computed(() => Object.keys(peopleSongs.value['marion']));
</script>
