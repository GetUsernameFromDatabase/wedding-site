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
          :to="person.value.href"
        ></v-list-item>

        <v-divider class="border-opacity-75"></v-divider>

        <v-list density="compact" nav>
          <template v-for="route in routes" :key="route.route">
            <v-list-item
              v-if="route.type === 'nav'"
              :key="route.route"
              :prepend-icon="route.icon"
              :title="t(route.translateKey)"
              :to="route.route"
            ></v-list-item>
            <v-divider v-if="route.type === 'divider'" class="border-opacity-75"></v-divider>
          </template>
        </v-list>
      </v-navigation-drawer>

      <v-main scrollable>
        <v-container fluid class="w-full h-full"
          ><suspense><RouterView></RouterView></suspense
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
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useTheme } from 'vuetify';
import { useTitle } from '@vueuse/core';
import { Icon } from '@iconify/vue';
import { useRouter } from 'vue-router';
import type { useI18nType } from './plugins/i18n/vue-i18n';
import { marionTheme, myMainTheme, ryanTheme } from './plugins/vuetify/themes';
import { usePeople } from './composables/people';
import LanguageSelect from './components/language-select.vue';
import { useIcons } from './composables/icons';
import { routesForNav as routes } from './plugins/router';

const { t, locale } = useI18n<useI18nType>();
const theme = useTheme();
const people = usePeople();

const showDrawer = ref(false);
const vMainScroller = ref<Element | null>();

// --- VUE WATCHERS ---
watch(locale, localeChanged, { immediate: true });

const router = useRouter();
router.beforeResolve((to) => {
  const path = to.path;
  changeThemeAccordingToPath(path);
  resetMainScroll();
});

// --- FUNCTIONS ---
function changeThemeAccordingToPath(path: string) {
  if (path.startsWith('/ryan')) {
    theme.global.name.value = ryanTheme.name;
  } else if (path.startsWith('/marion')) {
    theme.global.name.value = marionTheme.name;
  } else {
    theme.global.name.value = myMainTheme.name;
  }
}

function resetMainScroll() {
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
