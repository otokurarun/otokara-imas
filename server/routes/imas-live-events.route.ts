import { Router } from 'express';
import { LiveEvent } from 'server/entities/live-event.entity';

const imasLiveEventsRouter = Router();

// Database接続を初期化
import { LiveEventRepository } from '../database';

/**
 * GET /api/imasLiveEvents?brandName=:brandName
 * 指定されたブランド名のライブまたは全てのライブ情報を返すAPI
 */
imasLiveEventsRouter.get('/', async (req, res) => {
  let result: LiveEvent[] = [];

  if (req.query['brandName']) {
    result = await LiveEventRepository.find({
      where: { brandName: req.query['brandName'].toString() },
      select: ['id', 'title', 'date', 'brandName'],
      order: { date: 'desc' },
    });
  } else {
    result = await LiveEventRepository.find({
      select: ['id', 'title', 'date', 'brandName'],
      order: { date: 'desc' },
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
    select: ['id', 'title', 'date', 'brandName'],
  });

  res.send(result);
});

export default imasLiveEventsRouter;
