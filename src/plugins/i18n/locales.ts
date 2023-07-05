/**
 * As a .ts file so I could use `Messages Functions`
 * {@link https://vue-i18n.intlify.dev/guide/advanced/function.html#messages-functions}
 */

import { et, en } from 'vuetify/locale';
import type { DeepKeyOf } from '@/_types/typescript-utils';

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
  meta: { title: 'Pulm -- Marion & Ryan', footer: 'Pulmaisa {person}' },
  message: {
    devTestMessage: 'testimine',
    directLink: 'otselink',
    songsTitle: '{person}i Laulud',
    ctrlzoom: 'Kasuta ctrl+kerijat, et kaardil suumida',
    use2fingers: 'Kasuta kahte sõrme, et kaarti liigutada',
  },
  navigation: {
    maps: 'Kaardid',
    home: 'Koduleht',
    explore: 'Uuri Rohkem',
    housing: 'Majutus',
  },
  c404: {
    ohno: 'Oh, issand',
    notfound: 'Siit küll ei leia midagi -- nii pime',
  },
  maps: {
    linksToMaps: 'Lingid kaartidele',
    procession: 'Pulma Rongkäik',
    ourLocation: 'Meie Asukoht',
    lasita: '@:agenda.lasita Kaart',
    resetView: 'Lähtesta Vaade',
    toMyLocation: 'Praegune Asukoht',
  },
  agenda: {
    title: 'Päevakord',
    ceremony: 'Pulma tseremoonia',
    botanicalGarden: 'Botaanika Aed',
    mhg: 'Miina Härma Gümnaasium',
    etAgriMuseum: 'Eesti Põllumajandusmuuseum',
    home: 'Kivimi',
    shop: 'Märja Konsum',
    lasita: 'Lasita Puhkemaja',
  },
  ryan: {
    description: 'Endast rääkida ei meeldi. Lihtsalt teen asju.',
    profession: 'Programmeerija',
  },
  marion: {
    description:
      'Olen Graafiline disainer kelle lemmik meediumid on markerid ja vesivärv.' +
      '<br>Aastaaid kunsti tehes pole leidnud stiili, mis mulle külge jäeks.' +
      '<br><br>Mulle on muusika alati meeldinud ja ainult vähesed zanrad ei meeldi mulle.' +
      '<br>Mu lemmik muusika zanrad on hardcore, speedcore, electro, 80-ndad ja chill.' +
      '<br>Aastatega on minu muusika maitse veelgi laienenud tänu Ryan-ile.',
    profession: 'Graafiline Disainer',
  },
  errors: {
    geolocation: {
      'User denied Geolocation': 'Palun lubage geolokatsioon, et enda asukohta kaardil näha',
      LocationNotFound: 'Teie asukoht pole teada',
    },
  },
  lasita: {
    shed: 'Maja',
    forest_house: 'Metsamaja',
    forest_house_wc: 'WC',
    pond_house: 'Tiigimaja',
    sauna: 'Saun',
    sinitaevas: 'Sinitaevas',
    main_house: 'Peomaja',
    parking_space: 'Parkla',
  },
};
export const availableLocales: AvailableLocales = {
  et: estonianLocale,
  en: {
    $vuetify: en,
    meta: { title: 'Wedding -- Marion & Ryan', footer: 'Wedding Father {person}' },
    message: {
      devTestMessage: 'testing',
      directLink: 'direct link',
      songsTitle: "{person}'s Songs",
      ctrlzoom: 'Use ctrl+scroll to zoom the map',
      use2fingers: 'Use two fingers to move the map',
    },
    navigation: {
      maps: 'Maps',
      home: 'Home',
      explore: 'Learn More',
      housing: 'Housing',
    },
    c404: {
      ohno: 'Uh, Ohh',
      notfound: "Sorry we cant find what you are looking for 'cuz its so dark in here",
    },
    maps: {
      linksToMaps: 'Links to maps',
      procession: 'Wedding Procession',
      ourLocation: 'Our Location',
      lasita: '@:agenda.lasita Map',
      resetView: 'Reset View',
      toMyLocation: 'Current Location',
    },
    agenda: {
      title: 'Agenda',
      ceremony: 'Wedding ceremony',
      botanicalGarden: 'Botanical Garden',
      mhg: 'Miina Härma Gymnasium',
      etAgriMuseum: 'Estonian Agricultural Museum',
      home: 'Kivimi',
      shop: 'Märja Konsum',
      lasita: 'Lasita Vacation House',
    },
    ryan: {
      description: "Don't like to talk about myself much. I just do stuff.",
      profession: 'Programmer',
    },
    marion: {
      description:
        "I'm a graphical designer whose favourite mediums to use are markers and watercolour." +
        '<br>With years of practicing art, no style has stuck to me.' +
        "<br><br>I have always liked music and there are only very few genres that I don't like to listen to." +
        '<br>My favourite music genres are hardcore, speedcore, electro, 80s and chill.' +
        '<br>With years my music taste has expanded thanks to Ryan.',
      profession: 'Graphical Designer',
    },
    errors: {
      geolocation: {
        'User denied Geolocation': 'Please allow Geolocation to view your location',
        LocationNotFound: 'Could not find your location',
      },
    },
    lasita: {
      shed: 'Building',
      forest_house: 'Forest House',
      forest_house_wc: 'WC',
      pond_house: 'Pond House',
      sauna: 'Sauna',
      sinitaevas: 'Sinitaevas',
      main_house: 'Main House',
      parking_space: 'Parking Space',
    },
  },
};
