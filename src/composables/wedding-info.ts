import type { MapLinksCSV, MapLinksParsed } from '@/_types/requests';
import axios from 'axios';
import { ref } from 'vue';

const infoSourceURLs = {
  mapLinks:
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vT2TZnFzaS96BT8muIZT3zM5CCQqZ3iQk3tzfqtUsobPYDG4QvM74N42tAQcYY2dgG7IF6V8WKUFPCL/pub?gid=0&single=true&output=csv',
};

async function getMapLinks() {
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
  return result as unknown as MapLinksParsed;
}

export const useWeddingInfo = () => {
  const info = ref<MapLinksParsed>();
  const update = async () => {
    info.value = await getMapLinks();
  };

  update();
  return { info, update };
};
