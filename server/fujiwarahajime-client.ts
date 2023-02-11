import fetch from 'node-fetch';

const FUJIWARA_HAJIME_API_ENDPOINT = 'https://api.fujiwarahaji.me/v2/';

export interface LiveEventDetailResponse {
  name: string;
  type: string;
  tax_id: number;
  link: string;
  api: string;
  date: string;
  place: string;
  member: {
    name: string;
    type: string;
    tax_id: number;
    link: string;
    api: string;
    production: string;
    cv: string;
  }[];
  setlist: boolean;
  song: {
    name: string | null;
    type: string | null;
    music_type: string | undefined;
    song_id: number | null;
    link: string | null;
    api: string | null;
    song_text: string;
    unit?: {
      name: string;
      type: string;
      tax_id: number;
      link: string;
      api: string;
      member: {
        name: string;
        type: string;
        tax_id: number;
        link: string;
        api: string;
        production: string;
        cv: string;
      }[];
    }[];
    member?: {
      name: string;
      type: string;
      tax_id: number;
      link: string;
      api: string;
      production: string;
      cv: string;
    }[];
    member_text: string;
  }[];
}

export class FujiwarahajimeClient {
  /**
   * すべてのライブ情報を取得
   * @returns ライブ情報の配列
   */
  static async getLiveEvents() {
    const requestUrl = `${FUJIWARA_HAJIME_API_ENDPOINT}/list?type=live`;

    const apiResponse = await fetch(requestUrl);

    if (apiResponse.status != 200) {
      // リクエストに失敗したならば、エラーを返す
      throw apiResponse;
    }

    // 検索結果を取得
    const result = await apiResponse.json();

    return result;
  }

  /**
   * 指定されたキーワードからライブ情報を取得
   * @param keyword keyword
   * @returns ライブ情報の配列
   */
  static async getLiveEventsByKeyword(keyword: string) {
    const requestUrl = `${FUJIWARA_HAJIME_API_ENDPOINT}/list?type=live&search=${keyword}`;

    const apiResponse = await fetch(requestUrl);

    if (apiResponse.status != 200) {
      // リクエストに失敗したならば、エラーを返す
      throw apiResponse;
    }

    // 検索結果を取得
    const result = await apiResponse.json();

    return result;
  }

  static async getLiveEventDetailByTaxId(
    taxId: number
  ): Promise<LiveEventDetailResponse> {
    const requestUrl = `${FUJIWARA_HAJIME_API_ENDPOINT}/tax?id=${taxId}`;

    const apiResponse = await fetch(requestUrl);

    if (apiResponse.status != 200) {
      // リクエストに失敗したならば、エラーを返す
      throw apiResponse;
    }

    // 検索結果を取得
    const result = await apiResponse.json();

    return result;
  }
}
