interface IconComposableItem {
  iconify: string;
  vuetify: string;
}

type AvailableIcons =
  | 'contactPhone'
  | 'weddingRing'
  | 'ourLocation'
  | 'botanicalGarden'
  | 'mhg'
  | 'etAgriMuseum'
  | 'kivimi'
  | 'shop'
  | 'lasita'
  | 'maps'
  | 'home';

export const useIcons: Record<AvailableIcons, IconComposableItem> = {
  contactPhone: { iconify: 'mdi:phone', vuetify: '' },
  weddingRing: { iconify: '', vuetify: 'mdi-ring' },
  ourLocation: { iconify: '', vuetify: 'mdi-clock' },
  botanicalGarden: { iconify: '', vuetify: 'mdi-flower' },
  mhg: { iconify: '', vuetify: 'mdi-school' },
  etAgriMuseum: { iconify: '', vuetify: 'mdi-horseshoe' },
  kivimi: { iconify: '', vuetify: 'mdi-grass' },
  shop: { iconify: '', vuetify: 'mdi-shopping' },
  lasita: { iconify: '', vuetify: 'mdi-glass-flute' },
  maps: { iconify: '', vuetify: 'mdi-map-outline' },
  home: { iconify: '', vuetify: 'mdi-home' },
};
