export interface CsvWeddingInfoRow extends Array<string> {
  /**
   * Header
   */
  0: string;
  /**
   * Value
   */
  1: string;
}

export interface ParsedWeddingInfo {
  ourLocation: string;
  weddingProcession: string;
  embedWeddingProcession: string;
}
