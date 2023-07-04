<!-- eslint-disable @intlify/vue-i18n/no-raw-text -->
<template>
  <v-app>
    <v-layout>
      <v-app-bar :elevation="2" color="primary"
        ><template v-slot:prepend>
          <v-app-bar-nav-icon @click="showDrawer = !showDrawer"></v-app-bar-nav-icon> </template
        ><v-toolbar-title class="text-center">
          <v-img
            src="/wedding-site/marion-ryan-logo.png"
            max-height="56"
            aspect-ratio="16/9"
            :height="64"
          ></v-img> </v-toolbar-title
        ><template v-slot:append> <LanguageSelect></LanguageSelect></template
      ></v-app-bar>

      <v-navigation-drawer v-model="showDrawer" temporary>
        <v-list-item
          v-for="person in people"
          :key="person.value.href"
          :prepend-avatar="person.value.avatar"
          :title="person.value.name"
          :href="person.value.href"
        ></v-list-item>

        <v-divider class="border-opacity-75"></v-divider>

        <v-list density="compact" nav>
          <template v-for="route in routes" :key="route.route">
            <v-list-item
              v-if="route.type === 'nav'"
              :key="route.route"
              :prepend-icon="route.icon"
              :title="t(route.translateKey)"
              :href="`#${route.route}`"
            ></v-list-item>
            <v-divider v-if="route.type === 'divider'" class="border-opacity-75"></v-divider>
          </template>
        </v-list>
      </v-navigation-drawer>

      <v-main scrollable>
        <v-container fluid
          ><suspense><component :is="currentView.component" /></suspense
        ></v-container>
      </v-main>
    </v-layout>
    <v-footer color="primary" class="max-h-10">
      <v-row justify="center" no-gutters
        >{{ t('meta.footer', { person: 'Enn Tobre' }) }}
        <a href="tel:+37255599608" class="ml-2 flex items-center"
          ><Icon :icon="useIcons.contactPhone.iconify"></Icon>+372 555 99 608</a
        ></v-row
      >
    </v-footer>
  </v-app>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useTheme } from 'vuetify';
import { useTitle } from '@vueuse/core';
import { Icon } from '@iconify/vue';
import type { RouteList, SimpleRoute, ViewableRoute } from './_types/routes';
import type { useI18nType } from './plugins/i18n/vue-i18n';
import { View404, ViewIndex, ViewMaps, ViewMarion, ViewRyan } from './views';
import { marionTheme, myMainTheme, ryanTheme } from './plugins/vuetify/themes';
import { usePeople } from './composables/people';
import LanguageSelect from './components/language-select.vue';
import { useIcons } from './composables/icons';

const { t, locale } = useI18n<useI18nType>();
const theme = useTheme();

const people = usePeople();
// --- ROUTING
const routes: RouteList = [
  {
    type: 'nav',
    route: '/',
    component: ViewIndex,
    icon: useIcons.home.vuetify,
    translateKey: 'navigation.home',
  },
  {
    type: 'nav',
    route: '/maps',
    component: ViewMaps,
    icon: useIcons.maps.vuetify,
    translateKey: 'navigation.maps',
  },
  { type: 'simple', route: people.ryan.value.href.slice(1), component: ViewRyan },
  { type: 'simple', route: people.marion.value.href.slice(1), component: ViewMarion },
  { type: 'divider' },
];
const currentPath = ref(window.location.hash);

const currentView = computed(() => {
  const currentRoute = currentPath.value.slice(1) || '/';
  const routeIndex = routes.findIndex((value) => {
    if (value.type === 'divider') return false;
    return value.route === currentRoute;
  });
  if (routeIndex < 0) {
    const notFound: Pick<SimpleRoute, 'component'> = { component: View404 };
    return notFound;
  }
  return routes[routeIndex] as ViewableRoute;
});
// ---

const showDrawer = ref(false);
const vMainScroller = ref<Element | null>();

onMounted(() => {
  changeThemeAccordingToPath();
  window.addEventListener('hashchange', changeThemeAccordingToPath);
  vMainScroller.value = document.querySelector('div.v-main__scroller');
});

watch(currentPath, pathChanged);
watch(locale, localeChanged, { immediate: true });

function changeThemeAccordingToPath() {
  currentPath.value = window.location.hash;
  if (currentPath.value.includes('ryan')) {
    theme.global.name.value = ryanTheme.name;
  } else if (currentPath.value.includes('marion')) {
    theme.global.name.value = marionTheme.name;
  } else {
    theme.global.name.value = myMainTheme.name;
  }
}

function pathChanged() {
  if (vMainScroller.value) vMainScroller.value.scrollTop = 0;
  showDrawer.value = false;
}

function localeChanged() {
  useTitle(t('meta.title'));
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
