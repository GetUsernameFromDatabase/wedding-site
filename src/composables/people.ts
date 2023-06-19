import { weddingCeremonyDate } from '@/info/dates';
import { useMainStore } from '@/stores/main';
import { computed } from 'vue';

export const usePeople = () => {
  const store = useMainStore();

  const ryan = {
    name: computed(() =>
      store.dateNow.isBefore(weddingCeremonyDate) ? 'Ryan Kruberg' : 'Ryan Murulo',
    ),
  };
  const marion = { name: 'Marion Murulo' };
  return { ryan, marion };
};
