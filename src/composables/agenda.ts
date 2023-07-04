import { useIcons } from './icons';
import type { AgendaItem } from '@/_types/agenda';

export const useAgenda: AgendaItem[] = [
  {
    text: 'agenda.ceremony',
    icon: useIcons.weddingRing.vuetify,
    href: 'https://tartu.ee/et/abielu',
    slidePictures: ['https://tartu.ee/sites/default/files/field/image/Tiigi%2012%20maja.JPG'],
  },
  // {
  //   text: 'agenda.botanicalGarden',
  //   icon: useIcons.botanicalGarden.vuetify,
  //   href: 'https://natmuseum.ut.ee/et',
  // },
  {
    text: 'agenda.mhg',
    icon: useIcons.mhg.vuetify,
    href: 'https://miinaharma.ee/',
    slidePictures: ['https://s.err.ee/photo/crop/2021/10/15/1186128h68a9t72.jpg'],
  },
  {
    text: 'agenda.etAgriMuseum',
    icon: useIcons.etAgriMuseum.vuetify,
    href: 'https://maaelumuuseumid.ee/eesti-pollumajandusmuuseum/',
    slidePictures: [
      'https://upload.wikimedia.org/wikipedia/commons/2/2e/Eesti_P%C3%B5llumajandusmuuseum%2C_%C3%B5pikoda.JPG',
    ],
  },
  {
    text: 'agenda.home',
    icon: useIcons.kivimi.vuetify,
    href: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  },
  {
    text: 'agenda.shop',
    icon: useIcons.shop.vuetify,
    href: 'https://www.coop.ee/marja-konsum',
    slidePictures: ['https://cooppolva.ee/wp-content/uploads/2019/11/M%C3%A4rja-Coop-Konsum.png'],
  },
  {
    text: 'agenda.lasita',
    icon: useIcons.lasita.vuetify,
    href: 'https://www.facebook.com/people/Lasita-Puhkemaja-O%C3%9C/100063769771377/',
    slidePictures: [
      'https://visittartu.com/sites/default/files/vemedia/84220_ebf3147a22ac59b46c9288c6db78f82e.jpg',
    ],
  },
];
