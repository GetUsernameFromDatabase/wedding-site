/**
 * As a .ts file so I could use `Messages Functions`
 * {@link https://vue-i18n.intlify.dev/guide/advanced/function.html#messages-functions}
 */

import type { DeepKeyOf } from '@/_types/typescript-utils';
import { et, en } from 'vuetify/locale';

export type SupportedLocale = 'et' | 'en';
export interface LocaleMetaInfo {
  short: string;
  label: string;
  icon: string;
}
export type LocaleMetaInfos = Record<SupportedLocale, LocaleMetaInfo>;
export type MessageSchema = typeof estonianLocale;
export type AllMessageSchemaKeys = DeepKeyOf<MessageSchema>;
export type AvailableLocales = Record<SupportedLocale, MessageSchema>;

export const localeMetaInfo: LocaleMetaInfos = {
  en: { label: 'English', icon: 'twemoji:flag-united-kingdom', short: 'EN' },
  et: { label: 'Eesti', icon: 'twemoji:flag-estonia', short: 'ET' },
};

const estonianLocale = {
  $vuetify: et,
  meta: { title: 'Pulm -- Marion & Ryan' },
  message: {
    devTestMessage: 'testimine',
    directLink: 'otselink',
  },
  navigation: {
    maps: 'Kaardid',
    home: 'Koduleht',
    explore: 'Uuri Rohkem',
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
  ryan: {
    description: 'Endast rääkida ei meeldi. Lihtsalt teen asju.',
    profession: 'Programmeerija',
  },
  marion: {
    description: 'WIP',
    profession: 'Graafiline Disainer',
  },
};
export const availableLocales: AvailableLocales = {
  et: estonianLocale,
  en: {
    $vuetify: en,
    meta: { title: 'Wedding -- Marion & Ryan' },
    message: {
      devTestMessage: 'testing',
      directLink: 'direct link',
    },
    navigation: {
      maps: 'Maps',
      home: 'Home',
      explore: 'Learn More',
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
    ryan: {
      description: "Don't like to talk about myself much. I just do stuff.",
      profession: 'Programmer',
    },
    marion: {
      description: 'WIP',
      profession: 'Graphical Designer',
    },
  },
};
