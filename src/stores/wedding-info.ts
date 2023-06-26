import type { MapLinksParsed, SongCategoryHeaders, SongHeaders } from '@/_types/requests';
import axios from 'axios';
import { defineStore } from 'pinia';
import { parse, type Options } from 'csv-parse/browser/esm/sync';

const csvSources = {
  mapLinks:
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vT2TZnFzaS96BT8muIZT3zM5CCQqZ3iQk3tzfqtUsobPYDG4QvM74N42tAQcYY2dgG7IF6V8WKUFPCL/pub?gid=0&single=true&output=csv',
  songCategories:
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vT2TZnFzaS96BT8muIZT3zM5CCQqZ3iQk3tzfqtUsobPYDG4QvM74N42tAQcYY2dgG7IF6V8WKUFPCL/pub?gid=1913930644&single=true&output=csv',
  songs:
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vT2TZnFzaS96BT8muIZT3zM5CCQqZ3iQk3tzfqtUsobPYDG4QvM74N42tAQcYY2dgG7IF6V8WKUFPCL/pub?gid=1679195903&single=true&output=csv',
};

async function csvFetch<T>(url: string, parseOptions: Options = {}) {
  const response = await axios.get<string>(url);
  return parse(response.data, parseOptions) as T;
}

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
        const csvParseOptions = {
          columns: true,
          objname: 'NAME',
        };
        const parsedCSV = await csvFetch<MapLinksParsed>(csvSources.mapLinks, csvParseOptions);
        console.info(`[${this.$id}] mapLinks:`, parsedCSV);
        this.mapLinks = parsedCSV;
      },
      async updateSongCategories() {
        const csvParseOptions = {
          columns: true,
        };
        const parsedCSV = await csvFetch<SongCategoryHeaders[]>(
          csvSources.songCategories,
          csvParseOptions,
        );
        console.info(`[${this.$id}] songCategories:`, parsedCSV);
        this.songCategories = parsedCSV;
      },
      async updateSongs() {
        const csvParseOptions = {
          columns: true,
        };
        const parsedCSV = await csvFetch<SongHeaders[]>(csvSources.songs, csvParseOptions);
        console.info(`[${this.$id}] songs:`, parsedCSV);
        this.songs = parsedCSV;
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
