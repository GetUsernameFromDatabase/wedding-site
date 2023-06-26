import type { MapLinksParsed, SongCategoryHeaders, SongHeaders } from '@/_types/requests';
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
      songCategories: [] as SongCategoryHeaders[],
      songs: [] as SongHeaders[],
      isInitiated: false,
    }),
    actions: {
      async updateMapLinks() {
        const response = await axios.get<string>(infoSourceURLs.mapLinks);
        const parsedResponse: MapLinksParsed = parse(response.data, {
          columns: true,
          objname: 'NAME',
        });

        console.info(`[${this.$id}] mapLinks:`, parsedResponse);
        this.mapLinks = parsedResponse;
      },
      async updateSongCategories() {
        const response = await axios.get<string>(infoSourceURLs.songCategories);
        const parsedResponse: SongCategoryHeaders[] = parse(response.data, {
          columns: true,
        });

        console.info(`[${this.$id}] songCategories:`, parsedResponse);
        this.songCategories = parsedResponse;
      },
      async updateSongs() {
        const response = await axios.get<string>(infoSourceURLs.songs);
        const parsedResponse: SongHeaders[] = parse(response.data, {
          columns: true,
        });

        console.info(`[${this.$id}] songs:`, parsedResponse);
        this.songs = parsedResponse;
      },
      async initiate() {
        if (this.isInitiated) return;
        const promises = [this.updateMapLinks(), this.updateSongCategories(), this.updateSongs()];
        return await Promise.all(promises).then((values) => {
          this.isInitiated = true;
          return values;
        });
      },
    },
  })();

  store.initiate();
  return store;
};
