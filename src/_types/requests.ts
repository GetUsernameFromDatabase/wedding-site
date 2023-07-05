export interface MapLinkHeaders {
  /**
   * Name of the link, KEY
   */
  NAME: string;
  /**
   * Link to the url
   */
  LINK: string;
}

export interface MapLinksParsed {
  ourLocation: MapLinkHeaders;
  weddingProcession: MapLinkHeaders;
  embedWeddingProcession: MapLinkHeaders;
}

export interface SongCategoryHeaders {
  'SONG-CATEGORY': string;
  'ET-TRANSLATION': string;
  'EN-TRANSLATION': string;
}

export interface SongHeaders {
  WHOSE: 'ryan' | 'marion' | 'ryan,marion';
  /**
   * @see {@link SongCategoryHeaders}
   */
  CATEGORY: string;
  /** @example 'https://open.spotify.com/track/4skbQNtyjy8A7mo8oqe2oD?si=96b1d5f7524a48e8' */
  'SPOTIFY-LINK': string;
  /**
   * Song Name -- Artist
   * @example A Drug From God -- Chris Lake
   * */
  'SONG-INFO': string;
}

export interface PeopleInfoHeaders {
  PERSON: string;
  'ROOM-ID': string;
}
