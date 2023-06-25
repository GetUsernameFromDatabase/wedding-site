import type { MapLinksCSV, MapLinksParsed } from '@/_types/requests';
import axios from 'axios';
import { defineStore } from 'pinia';

const infoSourceURLs = {
  mapLinks:
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vT2TZnFzaS96BT8muIZT3zM5CCQqZ3iQk3tzfqtUsobPYDG4QvM74N42tAQcYY2dgG7IF6V8WKUFPCL/pub?gid=0&single=true&output=csv',
  songCategories:
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vT2TZnFzaS96BT8muIZT3zM5CCQqZ3iQk3tzfqtUsobPYDG4QvM74N42tAQcYY2dgG7IF6V8WKUFPCL/pub?gid=1913930644&single=true&output=csv',
  songs:
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vT2TZnFzaS96BT8muIZT3zM5CCQqZ3iQk3tzfqtUsobPYDG4QvM74N42tAQcYY2dgG7IF6V8WKUFPCL/pub?gid=1679195903&single=true&output=csv',
};

export const useWeddingInfo = () => {
  const store = defineStore('wedding-info', {
    state: () => ({
      mapLinks: {} as MapLinksParsed,
      isInitiated: false,
    }),
    actions: {
      async updateMapLinks() {
        const response = await axios.get<string>(infoSourceURLs.mapLinks);

        const result: { [header: string]: string } = {};
        const infoRows = response.data.split(/\r\n|\r|\n/);
        for (const row of infoRows) {
          const rowSplit = row.split(',') as MapLinksCSV;
          const key = rowSplit[0];
          const value = rowSplit[1];
          result[key] = value;
        }

        console.info('Updated wedding info', result);
        const mapLinks = result as unknown as MapLinksParsed;
        this.mapLinks = mapLinks;
      },
      initiate() {
        if (this.isInitiated) return Promise.resolve();
        const promises = [this.updateMapLinks()];
        return Promise.all(promises);
      },
    },
  })();

  store.initiate();
  return store;
};
