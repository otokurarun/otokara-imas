export interface SearchParams {
  keyword?: string;
  songName?: string;
  brandName?: string;
  liveEventId?: number;
}

export type SortType = 'newer' | 'alphabetical' | undefined;

export type SearchType = 'keyword' | 'songName' | 'liveEvent' | 'all';
