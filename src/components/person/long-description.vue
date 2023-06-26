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
        <v-card-text>
          {{ personInfo.description }}
        </v-card-text>
      </v-col></v-row
    >
  </v-card>
</template>

<script setup lang="ts">
import { usePeople } from '@/composables/people';

const people = usePeople();

interface Properties {
  person: keyof typeof people;
}
const properties = defineProps<Properties>();

const personInfo = people[properties.person];
</script>
