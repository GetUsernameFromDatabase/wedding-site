import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { weddingCeremonyDate } from '@/info/dates';
import type { useI18nType } from '@/plugins/i18n/vue-i18n';
import { useMainStore } from '@/stores/main';
import { basePath } from '@/config';

interface PersonInfo {
  name: string;
  description: string;
  subtitle: string;
  to: string;
  avatar: string;
}

export const weddingCoupleRoutePaths = { ryan: '/ryan', marion: '/marion' };

export const useWeddingCouple = () => {
  const store = useMainStore();
  const { t } = useI18n<useI18nType>();

  const ryan = computed<PersonInfo>(() => ({
    name: store.dateNow.isBefore(weddingCeremonyDate) ? 'Ryan Kruberg' : 'Ryan Murulo',
    description: t('ryan.description'),
    subtitle: t('ryan.profession'),
    to: weddingCoupleRoutePaths.ryan,
    avatar: `${basePath}/ryan.png`,
  }));
  const marion = computed<PersonInfo>(() => ({
    name: 'Marion Murulo',
    description: t('marion.description'),
    subtitle: t('marion.profession'),
    to: weddingCoupleRoutePaths.marion,
    avatar: `${basePath}/marion.jpg`,
  }));
  return { ryan, marion };
};
