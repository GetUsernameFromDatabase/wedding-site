import type { SongHeaders } from './requests';

export interface SongsByCategory {
  [category: string]: SongHeaders[];
}

export interface SpecificPeopleSongs {
  marion: SongsByCategory;
  ryan: SongsByCategory;
  'ryan,marion': SongsByCategory;
}

export interface PersonSongs extends SpecificPeopleSongs {
  [person: string]: SongsByCategory;
}
