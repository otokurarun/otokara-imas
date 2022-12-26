/**
 * 検索パラメータ
 */
export interface SearchParams {
  // キーワード
  keyword?: string;
  // 曲名
  songName?: string;
  // ブランド名
  brandName?: string;
  // ライブイベントのID
  liveEventId?: number;
}

/**
 * ソートタイプ
 * - newer: 配信順
 * - alphabetical: 50音順
 * - undefined: 未指定
 */
export type SortType = 'newer' | 'alphabetical' | undefined;

/**
 * 検索タイプ
 * - keyword: 指定したキーワードで楽曲を絞り込む
 * - songName: 指定した曲名で楽曲を絞り込む
 * - liveEvent: 指定したライブイベントで楽曲を絞り込む
 * - all: すべての楽曲を取得
 */
export type SearchType = 'keyword' | 'songName' | 'liveEvent' | 'all';
