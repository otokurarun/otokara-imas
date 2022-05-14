import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SongsService } from '../songs.service';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.scss'],
})
export class SongListComponent implements OnInit {
  // 楽曲の検索キーワード
  public keyword: string | undefined = undefined;
  // 取得した楽曲の配列
  public songs: any[] = [];

  constructor(
    private acivatedRoute: ActivatedRoute,
    public songsService: SongsService,
    private router: Router
  ) {}

  /**
   * コンポーネントが初期化されたときの処理
   */
  async ngOnInit(): Promise<void> {
    // URLから検索キーワードを取得
    this.keyword = this.acivatedRoute.snapshot.paramMap
      .get('keyword')
      ?.toString();

    // キーワードがあれば、楽曲の検索処理を実行
    if (this.keyword) {
      this.songs = await this.songsService.getSongsByKeyword(this.keyword);
    }
  }

  /**
   * 楽曲の検索(検索フォーム用)
   * @param keyword 検索キーワード
   */
  async searchSong(keyword: string) {
    this.keyword = keyword;

    // URLを「/songs/keyword/アイドルマスター」のように変更
    this.router.navigate(['songs', 'keyword', keyword]);

    // 検索を実行
    this.songs = await this.songsService.getSongsByKeyword(this.keyword);
  }
}
