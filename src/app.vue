<template>
  <v-app>
    <v-card class="w-full h-full">
      <v-layout class="w-full h-full">
        <v-app-bar :elevation="2" color="primary"
          ><template v-slot:prepend>
            <v-app-bar-nav-icon @click="showDrawer = !showDrawer"></v-app-bar-nav-icon> </template
          ><v-toolbar-title class="text-center">
            <v-img src="/marion-ryan-logo.png" max-height="58"></v-img> </v-toolbar-title
          ><template v-slot:append>
            <div class="flex flex-row">
              <v-select
                v-model="$i18n.locale"
                :items="$i18n.availableLocales"
                variant="solo"
                hide-details="auto"
                density="compact"
                bg-color="secondary"
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
            </div></template
          ></v-app-bar
        >

        <v-navigation-drawer v-model="showDrawer" temporary>
          <v-list-item
            prepend-avatar="https://avatars.githubusercontent.com/u/49920260?v=4"
            :title="store.dateNow.isBefore(weddingCeremonyDate) ? 'Ryan Kruberg' : 'Ryan Murulo'"
            href="#/ryan"
          ></v-list-item>
          <v-list-item
            prepend-avatar="https://media.licdn.com/dms/image/C4E03AQFTWNoK8uYYEw/profile-displayphoto-shrink_800_800/0/1627893179332?e=2147483647&v=beta&t=R1xpYiZE35TsgB2h9YSGzCzC4D8GCm3vWbiJCdrjnEM"
            title="Marion Murulo"
            href="#/marion"
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

        <v-main
          ><component class="w-full h-full overflow-auto py-4 px-6" :is="currentView.component"
        /></v-main>
      </v-layout>
    </v-card>

    <!-- Honestly, I don't see the point in a footer -->
    <!-- <v-footer class="bg-grey-lighten-1">
      <v-row justify="center" no-gutters>
        {{ store.dateNow.toDate().toLocaleTimeString() }}
      </v-row>
    </v-footer> -->
  </v-app>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { onMounted } from 'vue';
import { localeMetaInfo, type SupportedLocale } from './plugins/i18n/locales';
import { Icon } from '@iconify/vue';
import { useI18n } from 'vue-i18n';
import type { RouteList, SimpleRoute, ViewableRoute } from './_types/routes';
import type { useI18nType } from './plugins/i18n/vue-i18n';
import { View404, ViewIndex, ViewMaps, ViewMarion, ViewRyan } from './views';
import { useMainStore } from './stores/main';
import { weddingCeremonyDate } from './info/dates';

const { t } = useI18n<useI18nType>();
const store = useMainStore();

// --- ROUTING
const routes: RouteList = [
  {
    type: 'nav',
    route: '/',
    component: ViewIndex,
    icon: 'mdi-home',
    translateKey: 'navigation.home',
  },
  {
    type: 'nav',
    route: '/maps',
    component: ViewMaps,
    icon: 'mdi-map-outline',
    translateKey: 'navigation.maps',
  },
  { type: 'simple', route: '/ryan', component: ViewRyan },
  { type: 'simple', route: '/marion', component: ViewMarion },
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
