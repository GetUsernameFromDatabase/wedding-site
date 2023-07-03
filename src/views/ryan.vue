<template>
  <div>
    <longDescription :person="person"></longDescription>
    <v-spacer class="mt-5"></v-spacer>
    <SpotifySongs :person="person"></SpotifySongs>
  </div>
</template>
<script setup lang="ts">
import longDescription from '@/components/person/long-description.vue';
import SpotifySongs from '@/components/person/spotify-songs.vue';

const person = 'ryan';
</script>
