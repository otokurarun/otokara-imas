import { Router } from 'express';

const imasLiveEventsRouter = Router();

// Database接続を初期化
import { LiveEventRepository } from '../database';

/**
 * GET /api/imasLiveEvents/:brandName
 * 指定されたブランド名からライブ情報を返すAPI
 */
imasLiveEventsRouter.get('/:brandName', async (req, res) => {
  const result = await LiveEventRepository.find({
    where: { brandName: req.params.brandName },
    select: ['id', 'title', 'date', 'brandName'],
  });

  res.send(result);
});

export default imasLiveEventsRouter;
