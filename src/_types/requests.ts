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
