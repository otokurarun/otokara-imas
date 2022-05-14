import { Router } from 'express';
import fetch from 'node-fetch';
import { v4 as uuidv4 } from 'uuid';
import * as crypto from 'crypto';

const songsRouter = Router();

// Denmoku API についての定義
const DENMOKU_SEARCH_API_ENDPOINT =
  'https://csgw.clubdam.com/dkwebsys/search-api';

/**
 * GET /api/songs/keyword/:keyword
 * 指定されたキーワードから楽曲を返すAPI
 */
songsRouter.get('/keyword/:keyword', async (req, res) => {
  // Denmoku API へ楽曲検索をリクエスト
  const requestUrl = `${DENMOKU_SEARCH_API_ENDPOINT}/SearchVariousByKeywordApi`;
  const requestBody = {
    authKey: process.env['DENMOKU_API_AUTH_KEY'],
    compId: '1',
    dispCount: '100',
    keyword: req.params.keyword,
    ondemandSearchPatternCode: '0',
    modelTypeCode: '3',
    pageNo: '1',
    serialNo: 'AT00001', // 'AT00001' = LIVE DAM Ai, 'AF00001' = LIVE DAM, ...
    sort: '1', // '1' = 50音順、'2' = 人気順
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

  res.send(songs);
});

export default songsRouter;
