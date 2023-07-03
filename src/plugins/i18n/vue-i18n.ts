import { createI18n } from 'vue-i18n';
import { availableLocales, type MessageSchema } from './locales';

export type useI18nType = { message: MessageSchema };

export default createI18n({
  legacy: false, // Vuetify does not support the legacy mode of vue-i18n
  locale: 'et',
  fallbackLocale: 'et',
  globalInjection: true,
  messages: availableLocales,
  warnHtmlMessage: false,
});
