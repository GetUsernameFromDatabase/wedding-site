import type { SongHeaders } from './requests';

export interface SongsByCategory {
  [category: string]: SongHeaders[];
}

export interface PersonSongs {
  [person: string]: SongsByCategory;
  marion: SongsByCategory;
  ryan: SongsByCategory;
  'ryan,marion': SongsByCategory;
}
