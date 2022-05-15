// .envファイルを読み込む
import * as dotenv from 'dotenv';
dotenv.config({ path: `${__dirname}/.env` });

// Database接続を初期化
import { AppDataSource, KaraokeSongRepository } from './database';

import fetch from 'node-fetch';

class Cron {
  static async execute() {
    // データベースの接続完了まで待機
    await AppDataSource.initialize();

    // 楽曲情報を取得
    const songs = await Cron.getSongsByKeyword(
      'アイドルマスターシンデレラガールズ'
    );

    let rankCount: number = 1;

    // 楽曲情報をDBに保存
    for (let song of songs) {
      await KaraokeSongRepository.save({
        title: song.title,
        titleYomi: song.titleYomi,
        artist: song.artist,
        artistYomi: song.artistYomi,
        damArtistCode: song.artistCode,
        damPlaybackTime: song.playbackTime,
        damReleaseDate: song.releaseDate,
        damRequestNo: song.requestNo,
        damRank: rankCount,
        brand: 'cg',
      });

      console.log(`${song.title}を保存しました。`);

      rankCount++;
    }

    console.log(`${songs.length}件の保存が完了しました。`);
  }

  /**
   * 指定されたキーワードから楽曲を取得
   * @param keyword keyword
   * @returns 楽曲の配列
   */
  static async getSongsByKeyword(keyword: string, page = 1) {
    // Denmoku API についての定義
    const DENMOKU_SEARCH_API_ENDPOINT =
      'https://csgw.clubdam.com/dkwebsys/search-api';

    // Denmoku API へ楽曲検索をリクエスト
    const requestUrl = `${DENMOKU_SEARCH_API_ENDPOINT}/SearchVariousByKeywordApi`;
    const requestBody = {
      authKey: process.env['DENMOKU_API_AUTH_KEY'],
      compId: '1',
      dispCount: '100',
      keyword: keyword,
      ondemandSearchPatternCode: '0',
      modelTypeCode: '3',
      pageNo: page,
      serialNo: 'AT00001', // 'AT00001' = LIVE DAM Ai, 'AF00001' = LIVE DAM, ...
      sort: '2', // '1' = 50音順、'2' = 人気順
    };

    const apiResponse = await fetch(requestUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (apiResponse.status != 200) {
      // リクエストに失敗したならば、エラーを返す
      throw apiResponse;
    }

    // 検索結果を取得
    const result = await apiResponse.json();
    let songs = result.list;

    if (result.data.hasNext == true && page < 5) {
      // 次ページがあれば、次ページを取得 (ただし最大5ページまで)
      const nextPageSongs = await Cron.getSongsByKeyword(keyword, page + 1);
      songs = songs.concat(nextPageSongs);
    }

    return songs;
  }
}

// 非同期処理を実行
(async () => {
  await Cron.execute();
})();
