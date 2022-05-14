// サーバを初期化
import * as express from 'express';
import { AddressInfo } from 'net';
import * as path from 'path';
const app = express();

// .envファイルを読み込む
import * as dotenv from 'dotenv';
dotenv.config({ path: `${__dirname}/.env` });

// ビルドされたangularアプリを静的ファイルとしてサーブ(本番用)
if (process.env['NODE_ENV'] && process.env['NODE_ENV'] === 'production') {
  app.use(express.static(path.join(__dirname, '../dist/otokara/')));
}

// ルートを定義
import songsRouter from './routes/songs.route';
app.use('/api/songs/', songsRouter);

// 404対策
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/otokara/index.html'));
});

// サーバを開始
const server = app.listen(process.env['PORT'] || 8080, () => {
  const address = server.address() as AddressInfo;
  const host = address.address;
  const port = address.port;
  console.log('server listening on port %s:%s', host, port);
});