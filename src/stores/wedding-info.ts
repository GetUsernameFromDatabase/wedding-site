import type { MapLinksParsed } from '@/_types/requests';
import axios from 'axios';
import { defineStore } from 'pinia';
import { parse } from 'csv-parse/browser/esm/sync';

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
        const parsedResponse: MapLinksParsed = parse(response.data, {
          columns: true,
          objname: 'NAME',
        });

        console.log('Map Links', parsedResponse);
        this.mapLinks = parsedResponse;
      },
      async initiate() {
        if (this.isInitiated) return;
        const promises = [this.updateMapLinks()];
        const resolvedPromises = await Promise.all(promises);
        this.isInitiated = true;
        return resolvedPromises;
      },
    },
  })();

  store.initiate();
  return store;
};
