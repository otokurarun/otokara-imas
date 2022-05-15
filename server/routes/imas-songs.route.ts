import { Router } from 'express';

const imasSongsRouter = Router();

// Database接続を初期化
import { KaraokeSongRepository } from '../database';

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
