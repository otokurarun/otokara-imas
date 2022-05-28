// サーバを初期化
import * as express from 'express';
import { AddressInfo } from 'net';
import * as path from 'path';
const app = express();

// .envファイルを読み込む
import * as dotenv from 'dotenv';
dotenv.config({ path: `${__dirname}/.env` });

// Database接続を初期化
import { AppDataSource } from './database';

// ビルドされたangularアプリを静的ファイルとしてサーブ(本番用)
if (process.env['NODE_ENV'] && process.env['NODE_ENV'] === 'production') {
  app.use(express.static(path.join(__dirname, '../dist/otokara/')));
}

// ルートを定義
import songsRouter from './routes/songs.route';
app.use('/api/songs/', songsRouter);
import imasSongsRouter from './routes/imas-songs.route';
app.use('/api/imasSongs/', imasSongsRouter);
import imasLiveEventsRouter from './routes/imas-live-events.route';
app.use('/api/imasLiveEvents/', imasLiveEventsRouter);

// 404対策
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/otokara/index.html'));
});

// 非同期処理を実行
(async () => {
  // データベースの接続完了まで待機
  await AppDataSource.initialize();

  // サーバを開始
  const server = app.listen(process.env['PORT'] || 8080, () => {
    const address = server.address() as AddressInfo;
    const host = address.address;
    const port = address.port;
    console.log('server listening on port %s:%s', host, port);
  });
})();
