import 'vuetify/styles';
import { createVuetify, type ThemeDefinition } from 'vuetify';
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import '@mdi/font/css/materialdesignicons.css';
import { createVueI18nAdapter } from 'vuetify/locale/adapters/vue-i18n';
import { useI18n } from 'vue-i18n';
import vueI18n from '../i18n/vue-i18n';
import { myMainTheme, myThemes } from './themes';

const themes: { [themeName: string]: ThemeDefinition } = {};
for (const theme of myThemes) {
  themes[theme.name] = theme.theme;
}

export default createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  locale: {
    adapter: createVueI18nAdapter({ i18n: vueI18n, useI18n }),
  },
  theme: {
    defaultTheme: myMainTheme.name,
    variations: {
      colors: ['primary', 'secondary'],
      lighten: 1,
      darken: 2,
    },
    themes,
  },
});
