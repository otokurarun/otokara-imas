export interface SearchParams {
  keyword?: string;
  songName?: string;
  brandName?: string;
  liveEventId?: number;
}

export type SortType = 'popular' | 'newer' | 'alphabetical';

export type SearchType = 'keyword' | 'songName' | 'liveEvent' | 'all' | 'none';
