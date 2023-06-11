import { useIntervalFn } from '@vueuse/core';
import dayjs from 'dayjs';
import { defineStore } from 'pinia';

export const useMainStore = () => {
  const store = defineStore('main', {
    state: () => ({
      dateNow: dayjs(),
    }),
    actions: {
      initiate() {
        useIntervalFn(() => (this.dateNow = dayjs()), 100);
      },
    },
  })();
  store.initiate();
  return store;
};
