<template>
  <v-card class="mx-auto">
    <v-img :src="personInfo.avatar" height="200px" cover></v-img>

    <v-card-title> {{ personInfo.name }} </v-card-title>

    <v-card-subtitle> {{ personInfo.subtitle }} </v-card-subtitle>

    <v-card-actions>
      <v-btn color="primary" variant="text" :href="personInfo.to">
        {{ t('navigation.explore') }}
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'" @click="show = !show"></v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>
          <p v-html="personInfo.description"></p>
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { ref } from 'vue';
import type { useI18nType } from '@/plugins/i18n/vue-i18n';
import { useWeddingCouple } from '@/composables/people';

const { t } = useI18n<useI18nType>();
const weddingCouple = useWeddingCouple();

interface Properties {
  person: keyof typeof weddingCouple;
}
const properties = defineProps<Properties>();

const show = ref(false);

const personInfo = weddingCouple[properties.person];
</script>
