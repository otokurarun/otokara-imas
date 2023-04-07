import { Router } from 'express';
import { LiveEvent } from 'server/entities/live-event.entity';
import { MoreThanOrEqual } from 'typeorm';

const imasLiveEventsRouter = Router();

// Database接続を初期化
import { LiveEventRepository } from '../database';

/**
 * GET /api/imasLiveEvents?brandName=:brandName
 * 指定されたブランド名のライブまたは全てのライブ情報を返すAPI
 */
imasLiveEventsRouter.get('/', async (req, res) => {
  // データベースからライブのリストを取得
  let result: LiveEvent[] = await LiveEventRepository.find({
    where: {
      numOfMatchedSongs: MoreThanOrEqual(1),
    },
    select: ['id', 'title', 'date', 'brandNames'],
    order: { date: 'desc' },
  });

  if (req.query['brandName']) {
    // ブランド名が指定されている場合は、そのブランドを含んだライブのみに絞る
    const brandName = req.query['brandName'] as string;
    result = result.filter((liveEvent) => {
      if (!liveEvent.brandNames) return false;
      return liveEvent.brandNames.includes(brandName);
    });
  }

  res.send(result);
});

imasLiveEventsRouter.get('/:id', async (req, res): Promise<any> => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.sendStatus(400);
  }

  const result = await LiveEventRepository.findOne({
    where: { id: id },
    select: ['id', 'title', 'date', 'brandNames'],
  });

  res.send(result);
});

export default imasLiveEventsRouter;
