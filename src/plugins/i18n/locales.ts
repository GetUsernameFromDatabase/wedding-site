/**
 * As a .ts file so I could use `Messages Functions`
 * {@link https://vue-i18n.intlify.dev/guide/advanced/function.html#messages-functions}
 */

import type { DeepKeyOf } from '@/_types/typescript-utils';
import { et, en } from 'vuetify/locale';

export type SupportedLocale = 'et' | 'en';
export interface LocaleMetaInfo {
  label: string;
  icon: string;
}
export type LocaleMetaInfos = Record<SupportedLocale, LocaleMetaInfo>;
export type MessageSchema = typeof estonianLocale;
export type AllMessageSchemaKeys = DeepKeyOf<MessageSchema>;
export type AvailableLocales = Record<SupportedLocale, MessageSchema>;

export const localeMetaInfo: LocaleMetaInfos = {
  en: { label: 'English', icon: 'twemoji:flag-united-kingdom' },
  et: { label: 'Eesti', icon: 'twemoji:flag-estonia' },
};

const estonianLocale = {
  $vuetify: et,
  message: {
    devTestMessage: 'testimine',
    directLink: 'otselink',
  },
  navigation: {
    maps: 'Kaardid',
    home: 'Koduleht',
  },
  c404: {
    ohno: 'Oh, issand',
    notfound: 'Siit küll ei leia midagi -- nii pime',
  },
  maps: {
    linksToMaps: 'Lingid kaartidele',
    procession: 'Pulma Rongkäik',
    ourLocation: 'Meie Asukoht',
  },
  agenda: {
    title: 'Päevakord',
    ceremony: 'Pulma tseremoonia',
    botanicalGarnder: 'Botaanika Aed',
    mhg: 'Miina Härma Gümnaasium',
    etAgriMuseum: 'Eesti Põllumajandusmuuseum',
    home: 'Kivimi',
    shop: 'Märja Konsum',
    final: 'Lasita Puhkemaja',
  },
};
export const availableLocales: AvailableLocales = {
  et: estonianLocale,
  en: {
    $vuetify: en,
    message: {
      devTestMessage: 'testing',
      directLink: 'direct link',
    },
    navigation: {
      maps: 'Maps',
      home: 'Home',
    },
    c404: {
      ohno: 'Uh, Ohh',
      notfound: "Sorry we cant find what you are looking for 'cuz its so dark in here",
    },
    maps: {
      linksToMaps: 'Links to maps',
      procession: 'Wedding Procession',
      ourLocation: 'Our Location',
    },
    agenda: {
      title: 'Agenda',
      ceremony: 'Wedding ceremony',
      botanicalGarnder: 'Botanical Garden',
      mhg: 'Miina Härma Gymnasium',
      etAgriMuseum: 'Estonian Agricultural Museum',
      home: 'Kivimi',
      shop: 'Märja Konsum',
      final: 'Lasita Vacation House',
    },
  },
};
