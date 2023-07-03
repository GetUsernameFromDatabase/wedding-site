import type { MapLinksParsed, SongCategoryHeaders, SongHeaders } from '@/_types/requests';
import axios from 'axios';
import { defineStore, type Store } from 'pinia';
import { parse, type Options } from 'csv-parse/browser/esm/sync';
import type { PersonSongs } from '@/_types/wedding-info';

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

async function csvFetchAndLog<T>(
  csvSourceKey: keyof typeof csvSources,
  store: Store,
  parseOptions: Options = {},
) {
  const parsedCSV = await csvFetch<T>(csvSources[csvSourceKey], parseOptions);
  console.info(`[${store.$id}] ${csvSourceKey}:`, parsedCSV);
  return parsedCSV;
}

export const useWeddingInfo = async () => {
  const store = defineStore('wedding-info', {
    state: () => ({
      mapLinks: {} as MapLinksParsed,
      songCategories: {} as { [key: string]: SongCategoryHeaders },
      songs: [] as SongHeaders[],
      isInitiated: false,
    }),
    actions: {
      async updateMapLinks() {
        const csvParseOptions = {
          columns: true,
          objname: 'NAME',
        };
        const parsedCSV = await csvFetchAndLog<MapLinksParsed>('mapLinks', this, csvParseOptions);
        this.mapLinks = parsedCSV;
      },
      async updateSongCategories() {
        const csvParseOptions = {
          columns: true,
          objname: 'SONG-CATEGORY',
        };
        const parsedCSV = await csvFetchAndLog<{ [key: string]: SongCategoryHeaders }>(
          'songCategories',
          this,
          csvParseOptions,
        );
        this.songCategories = parsedCSV;
      },
      async updateSongs() {
        const csvParseOptions = {
          columns: true,
        };
        const parsedCSV = await csvFetchAndLog<SongHeaders[]>('songs', this, csvParseOptions);
        this.songs = parsedCSV;
      },
      async initiate() {
        if (this.isInitiated) return;
        this.isInitiated = true;

        const promises = [this.updateMapLinks(), this.updateSongCategories(), this.updateSongs()];
        return await Promise.all(promises).then((values) => {
          return values;
        });
      },
    },
    getters: {
      personSongs() {
        const processedSongs: PersonSongs = { marion: {}, ryan: {}, 'ryan,marion': {} };

        for (const song of this.songs) {
          const { WHOSE, CATEGORY } = song;
          if (!processedSongs[WHOSE]) {
            processedSongs[WHOSE] = {};
          }
          if (!processedSongs[WHOSE][CATEGORY]) {
            processedSongs[WHOSE][CATEGORY] = [];
          }
          processedSongs[WHOSE][CATEGORY].push(song);
        }
        return processedSongs;
      },
    },
  })();

  await store.initiate();
  return store;
};
