export interface CsvWeddingInfoRow extends Array<string> {
  /**
   * NAME
   */
  0: string;
  /**
   * VALUE
   */
  1: string;
}

export interface ParsedWeddingInfo {
  ourLocation: string;
  weddingProcession: string;
  embedWeddingProcession: string;
}
