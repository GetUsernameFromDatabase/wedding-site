export interface MapLinkCsvRow {
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
  ourLocation: MapLinkCsvRow;
  weddingProcession: MapLinkCsvRow;
  embedWeddingProcession: MapLinkCsvRow;
}
