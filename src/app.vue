<template>
  <v-card class="w-full h-full">
    <v-layout class="w-full h-full">
      <v-app-bar :elevation="2"
        ><template v-slot:prepend>
          <v-app-bar-nav-icon @click="showDrawer = !showDrawer"></v-app-bar-nav-icon> </template
        ><template v-slot:append
          ><div class="flex flex-row">
            <v-select
              v-model="$i18n.locale"
              :items="$i18n.availableLocales"
              variant="solo"
              hide-details="auto"
              density="compact"
              ><template v-slot:selection="{ item }">
                <div class="flex items-center">
                  <Icon :icon="getLocaleMetaInfo(item.value).icon" class="mr-1"></Icon>
                  <span>{{ getLocaleMetaInfo(item.value).label }}</span>
                </div>
              </template>
              <template v-slot:item="{ item }">
                <v-list-item @click="$i18n.locale = item.value">
                  <v-list-item-title class="flex items-center"
                    ><Icon :icon="getLocaleMetaInfo(item.value).icon" class="mr-1"></Icon
                    >{{ getLocaleMetaInfo(item.value).label }}</v-list-item-title
                  >
                </v-list-item>
              </template></v-select
            >
          </div></template
        ></v-app-bar
      >

      <v-navigation-drawer v-model="showDrawer" temporary>
        <v-list-item
          prepend-avatar="https://randomuser.me/api/portraits/men/78.jpg"
          title="John Leider"
        ></v-list-item>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item prepend-icon="mdi-view-dashboard" title="Home" value="home"></v-list-item>
          <v-list-item prepend-icon="mdi-forum" title="About" value="about"></v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main><component :is="currentView" /></v-main>
    </v-layout>
  </v-card>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import ViewNotFound from './views/404.vue';
import ViewIndex from './views/index.vue';
import ViewMap from './views/map.vue';
import { onMounted } from 'vue';
import type { Component } from 'vue';
import { localeMetaInfo, type SupportedLocale } from './plugins/i18n/locales';
import { Icon } from '@iconify/vue';

const routes: { [key: string]: Component } = {
  '/': ViewIndex,
  '/map': ViewMap,
};
const showDrawer = ref(false);
const currentPath = ref(window.location.hash);

const currentView = computed(() => routes[currentPath.value.slice(1) || '/'] || ViewNotFound);

onMounted(() => {
  window.addEventListener('hashchange', () => {
    currentPath.value = window.location.hash;
  });
});

function getLocaleMetaInfo(locale: SupportedLocale & (string & {})) {
  return localeMetaInfo[locale];
}
</script>

<style>
html {
  overflow: auto !important;
}

body {
  width: 100vw;
  height: 100vh;
}

#app {
  width: 100%;
  height: 100%;
}
</style>
