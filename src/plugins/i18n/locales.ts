/**
 * As a .ts file so I could use `Messages Functions`
 * {@link https://vue-i18n.intlify.dev/guide/advanced/function.html#messages-functions}
 */

import { et, en } from 'vuetify/locale';

export type SupportedLocale = 'et' | 'en';
export interface LocaleMetaInfo {
  label: string;
  icon: string;
}
export type LocaleMetaInfos = Record<SupportedLocale, LocaleMetaInfo>;

export const localeMetaInfo: LocaleMetaInfos = {
  en: { label: 'English', icon: 'twemoji:flag-united-kingdom' },
  et: { label: 'Eesti', icon: 'twemoji:flag-estonia' },
};

const estonianLocale = {
  $vuetify: et,
  message: {
    devTestMessage: 'testimine',
  },
  titles: {
    map: 'kaart',
  },
  c404: {
    ohno: 'Oh, issand',
    notfound: 'Siit küll ei leia midagi -- nii pime',
  },
};

export type MessageSchema = typeof estonianLocale;
export type AvailableLocales = Record<SupportedLocale, MessageSchema>;

export const availableLocales: AvailableLocales = {
  et: estonianLocale,
  en: {
    $vuetify: en,
    message: {
      devTestMessage: 'testing',
    },
    titles: {
      map: 'map',
    },
    c404: {
      ohno: 'Uh, Ohh',
      notfound: "Sorry we cant find what you are looking for 'cuz its so dark in here",
    },
  },
};
