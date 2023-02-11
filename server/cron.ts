// .envファイルを読み込む
import * as dotenv from 'dotenv';
dotenv.config({ path: `${__dirname}/.env` });

import { FujiwarahajimeClient } from './fujiwarahajime-client';

import { Helper } from './helper';

// Database接続を初期化
import {
  AppDataSource,
  KaraokeSongRepository,
  LiveEventRepository,
} from './database';

import fetch from 'node-fetch';
import { Like } from 'typeorm';

class Cron {
  static async execute() {
    // データベースの接続完了まで待機
    await AppDataSource.initialize();

    // DAMから楽曲を取得しDBに保存
    await this.crawlSongs('cg', 'アイドルマスターシンデレラガールズ');
    await this.crawlSongs('sc', 'アイドルマスターシャイニーカラーズ');
    await this.crawlSongs('ml', 'アイドルマスターミリオンライブ');

    // ふじわらはじめからライブイベントを取得しDBに保存
    await this.crawlLiveEvents();

    // ライブイベントと楽曲をマッチング
    await this.matchSongOfLiveEvents();
  }

  /**
   * 指定されたキーワードに当てはまる楽曲を取得しDBに保存
   * @param brand ブランド名
   * @param keyword キーワード
   */
  static async crawlSongs(brand: string, keyword: string) {
    // 楽曲情報を取得
    const songs = await Cron.getSongsByKeyword(keyword);

    // 人気順位を初期化
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
        brand: brand,
      });

      console.log(`${song.title}を保存しました。`);

      rankCount++;
    }

    console.log(`${songs.length}件の楽曲を保存しました。`);
  }

  /**
   * ふじわらはじめAPIからイベントを取得しDBに保存
   */
  static async crawlLiveEvents() {
    // ライブのリストを取得
    const liveEvents = await FujiwarahajimeClient.getLiveEvents();

    let counter = 0;
    for (let liveEvent of liveEvents) {
      if (
        await LiveEventRepository.findOne({
          where: {
            id: liveEvent.tax_id,
          },
        })
      ) {
        continue;
      }

      if (1 < counter) {
        break;
      }
      counter++;

      // ライブ情報を取得
      const liveEventDetail =
        await FujiwarahajimeClient.getLiveEventDetailByTaxId(liveEvent.tax_id);

      // 楽曲配列を初期化
      let songs: {
        title: string;
        artist: string;
        damRequestNo?: string;
      }[] = [];

      // ブランドの特定 - ライブのメンバー情報から
      let brandNames: Set<string> = new Set();
      for (let member of liveEventDetail.member) {
        if (member.production) {
          if (member.production === '765') {
            brandNames.add('as');
          } else {
            brandNames.add(member.production);
          }
        }
      }

      // ブランドの特定 - 楽曲情報から
      for (let song of liveEventDetail.song) {
        if (song.music_type) {
          switch (song.music_type) {
            case '765':
              brandNames.add('as');
              break;
            case 'cg':
            case 'ml':
            case 'sm':
            case 'sc':
              brandNames.add(song.music_type);
              break;
          }
        }
      }

      if (1 <= brandNames.size) {
        // ブランドが一つでもあれば、楽曲情報を反復して追加していく

        for (let song of liveEventDetail.song) {
          if (song.name == null) {
            continue;
          }

          let artists: string[] = [];

          if (song.unit) {
            for (let unit of song.unit) {
              for (let member of unit.member) {
                artists.push(member.name);
              }
            }
          }

          if (song.member) {
            for (let member of song.member) {
              artists.push(member.name);
            }
          }

          // アーティスト情報を配列から文字列に変換
          let artistString: string = artists.join('、');

          // 楽曲情報を配列にプッシュ
          songs.push({
            title: song.name,
            artist: artistString,
            damRequestNo: undefined,
          });
        }
      }

      //ライブ情報をDBに保存
      await LiveEventRepository.save({
        id: liveEvent.tax_id,
        title: liveEvent.name,
        date: liveEvent.date,
        brandNames: Array.from(brandNames.values()),
        songs: songs,
      });
      console.log(`${liveEvent.name}を保存しました。`);
    }

    console.log(`${counter}件のライブを保存しました。`);
  }

  /**
   * DBに保存されたライブイベントとカラオケ楽曲をマッチング
   */
  static async matchSongOfLiveEvents() {
    // DBから保存されたライブ情報を取得
    const liveEvents = await LiveEventRepository.find();

    // 各ライブを反復
    for (let liveEvent of liveEvents) {
      if (!liveEvent.brandNames || liveEvent.brandNames.length == 0) {
        // ブランドが登録されていないライブ (声優さんのイベントなど？) はスキップ
        continue;
      }

      // ライブの楽曲数を初期化
      let numOfMatchedSongs = 0;

      // 各ライブ情報の楽曲を反復
      for (let liveSong of liveEvent.songs) {
        // DAMリクエスト番号が入っていればなにもしない
        if (liveSong.damRequestNo !== undefined) {
          numOfMatchedSongs++;
          continue;
        }

        const songTitle = liveSong.title;

        // 楽曲名の機種依存文字をスペースに置換
        const replacedSongTitle =
          Helper.replacePlatformDependentCharacter(songTitle);

        // 検索条件を設定
        const searchCondition = {
          // そのままの条件
          default: replacedSongTitle.replace(/[ 　]/g, '%') + '%',
          // 全角記号を半角にした条件
          replaceSymbol:
            replacedSongTitle
              .replace(/[ 　]/g, '%')
              .replace(/[！-～]/g, (str: string) => {
                return String.fromCharCode(str.charCodeAt(0) - 0xfee0);
              }) + '%',
        };

        // 条件に当てはまる楽曲を取得
        const karaokeSongs = await KaraokeSongRepository.find({
          where: [
            {
              title: Like(searchCondition.default),
            },
            {
              title: Like(searchCondition.replaceSymbol),
            },
          ],
        });

        for (let karaokeSong of karaokeSongs) {
          // 楽曲タイトルに「G@ME VERSION」が含まれるならスキップ
          if (karaokeSong.title.match('G@ME VERSION')) {
            continue;
          } else {
            // ライブ楽曲とrequestNoを紐付け
            liveSong.damRequestNo = karaokeSong.damRequestNo;
            console.log(
              `${liveSong.title}と${karaokeSong.title}をマッチングしました。`
            );
            numOfMatchedSongs++;
            break;
          }
        }
      }

      // ライブ情報をDBに保存 (または上書き)
      liveEvent.numOfMatchedSongs = numOfMatchedSongs;
      await liveEvent.save();
    }
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
