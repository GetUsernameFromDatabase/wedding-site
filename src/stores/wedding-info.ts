import axios from 'axios';
import { defineStore, type Store } from 'pinia';
import { parse, type Options } from 'csv-parse/browser/esm/sync';
import type {
  MapLinksParsed,
  SongCategoryHeaders,
  SongHeaders,
  PeopleInfoHeaders,
  MapLinkHeaders,
} from '@/_types/requests';
import type { PersonSongs } from '@/_types/wedding-info';

interface WeddingInfoState {
  mapLinks: MapLinksParsed;
  songCategories: { [category: string]: SongCategoryHeaders };
  songs: SongHeaders[];
  isInitiated: boolean;
  peopleInfo: { [person: string]: PeopleInfoHeaders };
}

type WeddingInfoSources = Record<keyof Omit<WeddingInfoState, 'isInitiated'>, string>;

const csvSources: WeddingInfoSources = {
  mapLinks:
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vT2TZnFzaS96BT8muIZT3zM5CCQqZ3iQk3tzfqtUsobPYDG4QvM74N42tAQcYY2dgG7IF6V8WKUFPCL/pub?gid=0&single=true&output=csv',
  songCategories:
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vT2TZnFzaS96BT8muIZT3zM5CCQqZ3iQk3tzfqtUsobPYDG4QvM74N42tAQcYY2dgG7IF6V8WKUFPCL/pub?gid=1913930644&single=true&output=csv',
  songs:
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vT2TZnFzaS96BT8muIZT3zM5CCQqZ3iQk3tzfqtUsobPYDG4QvM74N42tAQcYY2dgG7IF6V8WKUFPCL/pub?gid=1679195903&single=true&output=csv',
  peopleInfo:
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vT2TZnFzaS96BT8muIZT3zM5CCQqZ3iQk3tzfqtUsobPYDG4QvM74N42tAQcYY2dgG7IF6V8WKUFPCL/pub?gid=1788616748&single=true&output=csv',
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

function ensureWeddingInfoStateKey<K extends keyof WeddingInfoSources>(text: K) {
  return text;
}

export const useWeddingInfo = async () => {
  const store = defineStore('wedding-info', {
    state: (): WeddingInfoState => ({
      mapLinks: {
        embedWeddingProcession: { LINK: '', NAME: '' },
        ourLocation: { LINK: '', NAME: '' },
        weddingProcession: { LINK: '', NAME: '' },
      },
      songCategories: {},
      songs: [],
      isInitiated: false,
      peopleInfo: {},
    }),
    actions: {
      async updateMapLinks() {
        const key = ensureWeddingInfoStateKey('mapLinks');
        type ParseType = WeddingInfoState[typeof key];

        const objname: keyof MapLinkHeaders = 'NAME';
        const parsedCSV = await csvFetchAndLog<ParseType>(key, this, { columns: true, objname });
        this.mapLinks = parsedCSV;
      },
      async updateSongCategories() {
        const key = ensureWeddingInfoStateKey('songCategories');
        type ParseType = WeddingInfoState[typeof key];

        const objname: keyof SongCategoryHeaders = 'SONG-CATEGORY';
        const parsedCSV = await csvFetchAndLog<ParseType>(key, this, { columns: true, objname });
        this.songCategories = parsedCSV;
      },
      async updateSongs() {
        const key = ensureWeddingInfoStateKey('songs');
        type ParseType = WeddingInfoState[typeof key];

        const parsedCSV = await csvFetchAndLog<ParseType>(key, this, { columns: true });
        this.songs = parsedCSV;
      },
      async updatePeopleInfo() {
        const key = ensureWeddingInfoStateKey('peopleInfo');
        type ParseType = WeddingInfoState[typeof key];

        const objname: keyof PeopleInfoHeaders = 'PERSON';
        const parsedCSV = await csvFetchAndLog<ParseType>(key, this, { columns: true, objname });
        this.peopleInfo = parsedCSV;
      },
      async initiate() {
        if (this.isInitiated) return;
        this.isInitiated = true;

        const promises = [
          this.updateMapLinks(),
          this.updateSongCategories(),
          this.updateSongs(),
          this.updatePeopleInfo(),
        ];
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
