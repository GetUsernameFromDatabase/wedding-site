import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import '@mdi/font/css/materialdesignicons.css';
import { createVueI18nAdapter } from 'vuetify/locale/adapters/vue-i18n';
import { useI18n } from 'vue-i18n';
import vueI18n from './i18n/vue-i18n';

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
});
