<template>
  <v-card class="mx-auto flex flex-col sm:flex-row" color="secondary">
    <div><v-img :src="personInfo.avatar" width="100%" class="rounded-md"></v-img></div>

    <div>
      <v-card-title> {{ personInfo.name }} </v-card-title>
      <v-card-subtitle> {{ personInfo.subtitle }} </v-card-subtitle>
      <v-card-text>
        {{ personInfo.description }}
      </v-card-text>
    </div>
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
