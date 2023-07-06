/// <reference types="vite-svg-loader" />
import type { FunctionalComponent, SVGAttributes } from 'vue';
import mainHouse1 from '@/assets/building-floors/main_house-1.svg?component';
import mainHouse2 from '@/assets/building-floors/main_house-2.svg?component';
import pondHouse1 from '@/assets/building-floors/pond_house-1.svg?component';
import pondHouse2 from '@/assets/building-floors/pond_house-2.svg?component';
import sauna from '@/assets/building-floors/sauna.svg?component';
import forestHouse from '@/assets/building-floors/forest_house.svg?component';

export type AvailableHouses = 'main_house' | 'pond_house' | 'sauna' | 'forest_house';

interface Floor {
  // eslint-disable-next-line @typescript-eslint/ban-types
  svg: FunctionalComponent<SVGAttributes, {}, never>;
  rooms?: string[];
}

interface House {
  floors: Floor[];
}

type Houses = Record<AvailableHouses, House>;

export const useHouses = () => {
  const houses: Houses = {
    main_house: {
      floors: [
        { svg: mainHouse1 },
        { svg: mainHouse2, rooms: ['tuba-1', 'tuba-2', 'tuba-3', 'tuba-4'] },
      ],
    },
    forest_house: { floors: [{ svg: forestHouse, rooms: ['tuba-8'] }] },
    pond_house: {
      floors: [
        { svg: pondHouse1, rooms: ['tuba-6', 'tuba-7'] },
        { svg: pondHouse2, rooms: ['tuba-5'] },
      ],
    },
    sauna: { floors: [{ svg: sauna, rooms: ['tuba-9'] }] },
  };
  return houses;
};
