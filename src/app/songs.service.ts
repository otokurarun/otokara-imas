import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SongsService {
  constructor() {}

  /**
   * 指定されたキーワードから楽曲を取得
   * @param keyword キーワード
   * @returns 楽曲の配列
   */
  async getSongsByKeyword(keyword: string) {
    // バックエンドに対してリクエストを送信
    const apiResponse = await fetch(`/api/songs/keyword/${keyword}`);

    // リクエストに失敗した場合、エラーをスロー
    if (!apiResponse.ok) {
      throw apiResponse.status;
    }

    // レスポンスとして返されたjsonを配列に変換して、変数に代入
    const songs = await apiResponse.json();

    // 楽曲の配列を返す
    return songs;
  }
}
