import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { weddingCeremonyDate } from '@/info/dates';
import type { useI18nType } from '@/plugins/i18n/vue-i18n';
import { useMainStore } from '@/stores/main';

interface PersonInfo {
  name: string;
  description: string;
  subtitle: string;
  href: string;
  avatar: string;
}

export const usePeople = () => {
  const store = useMainStore();
  const { t } = useI18n<useI18nType>();

  const ryan = computed<PersonInfo>(() => ({
    name: store.dateNow.isBefore(weddingCeremonyDate) ? 'Ryan Kruberg' : 'Ryan Murulo',
    description: t('ryan.description'),
    subtitle: t('ryan.profession'),
    href: '/ryan',
    avatar: 'https://avatars.githubusercontent.com/u/49920260?v=4',
  }));
  const marion = computed<PersonInfo>(() => ({
    name: 'Marion Murulo',
    description: t('marion.description'),
    subtitle: t('marion.profession'),
    href: '/marion',
    avatar:
      'https://media.licdn.com/dms/image/C4E03AQFTWNoK8uYYEw/profile-displayphoto-shrink_800_800/0/1627893179332?e=2147483647&v=beta&t=R1xpYiZE35TsgB2h9YSGzCzC4D8GCm3vWbiJCdrjnEM',
  }));
  return { ryan, marion };
};
