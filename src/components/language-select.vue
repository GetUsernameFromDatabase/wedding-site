<template>
  <v-select
    v-model="$i18n.locale"
    :items="$i18n.availableLocales"
    variant="plain"
    hide-details="auto"
    density="compact"
    flat
    ><template v-slot:selection="{ item }">
      <div class="flex items-center">
        <Icon :icon="getLocaleMetaInfo(item.value).icon" class="mr-1"></Icon>
        <span>{{ getLocaleMetaInfo(item.value).short }}</span>
      </div>
    </template>
    <template v-slot:item="{ item }">
      <v-list-item @click="$i18n.locale = item.value">
        <v-list-item-title class="flex items-center"
          ><Icon
            :icon="getLocaleMetaInfo(item.value).icon"
            class="mr-1"
            :title="getLocaleMetaInfo(item.value).label"
          ></Icon
          >{{ getLocaleMetaInfo(item.value).label }}</v-list-item-title
        >
      </v-list-item>
    </template></v-select
  >
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { localeMetaInfo, type SupportedLocale } from '@/plugins/i18n/locales';

function getLocaleMetaInfo(locale: SupportedLocale & (string & {})) {
  return localeMetaInfo[locale];
}
</script>

<style scoped>
:deep(.v-field.v-field--appended) {
  --v-field-padding-end: 0;
}
:deep(.v-field--variant-plain.v-field, .v-field--variant-underlined.v-field) {
  --v-field-padding-top: 0;
}
</style>
