<template>
  <v-card class="rounded-md" color="secondary">
    <v-row no-gutters>
      <v-col class="grow-0 mx-auto">
        <v-img
          :src="personInfo.avatar"
          class="rounded-md"
          max-height="384"
          width="384"
        ></v-img> </v-col
      ><v-col>
        <v-card-title> {{ personInfo.name }} </v-card-title>
        <v-card-subtitle> {{ personInfo.subtitle }} </v-card-subtitle>
        <v-card-text> <p v-html="personInfo.description"></p> </v-card-text> </v-col
    ></v-row>
  </v-card>
</template>

<script setup lang="ts">
import { useWeddingCouple } from '@/composables/people';

const weddingCouple = useWeddingCouple();

interface Properties {
  person: keyof typeof weddingCouple;
}
const properties = defineProps<Properties>();

const personInfo = weddingCouple[properties.person];
</script>
