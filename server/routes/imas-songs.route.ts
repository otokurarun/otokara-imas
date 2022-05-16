import { Router } from 'express';
import { Like } from 'typeorm';

const imasSongsRouter = Router();

// Database接続を初期化
import { KaraokeSongRepository } from '../database';

/**
 * GET /api/imasSongs/keyword/:keyword
 * 指定されたキーワードから楽曲を返すAPI
 */
imasSongsRouter.get('/keyword/:keyword', async (req, res) => {
  // 検索結果を取得
  const result = await KaraokeSongRepository.find({
    where: [
      { title: Like(`%${req.params.keyword}%`) },
      { titleYomi: Like(`%${req.params.keyword}%`) },
      { artist: Like(`%${req.params.keyword}%`) },
      { artistYomi: Like(`%${req.params.keyword}%`) },
    ],
    order: { titleYomi: 'ASC' },
  });

  // 検索結果をクライアントに返す
  res.send(result);
});

/**
 * GET /api/imasSongs/songName/:songName
 * 指定された曲名から楽曲を返すAPI
 */
imasSongsRouter.get('/songName/:songName', async (req, res) => {
  // 検索結果を取得
  const result = await KaraokeSongRepository.find({
    where: [
      { title: Like(`%${req.params.songName}%`) },
      { titleYomi: Like(`%${req.params.songName}%`) },
    ],
    order: { titleYomi: 'ASC' },
  });

  // 検索結果をクライアントに返す
  res.send(result);
});

/**
 * GET /api/imasSongs/ranking/:brandName
 * 指定されたブランド名から人気順に楽曲を返すAPI
 */
imasSongsRouter.get('/ranking/:brandName', async (req, res) => {
  const result = await KaraokeSongRepository.find({
    where: { brand: req.params.brandName },
    order: { damRank: 'asc' },
  });

  res.send(result);
});

export default imasSongsRouter;
