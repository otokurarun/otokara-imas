import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SongsService } from '../songs.service';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.scss'],
})
export class SongListComponent implements OnInit {
  // 楽曲の検索タイプ
  public searchType: 'keyword' | 'songName' | 'none' = 'none';
  // 楽曲の検索キーワード
  public keyword: string | undefined = undefined;
  // 楽曲の検索曲名
  public songName: string | undefined = undefined;
  // 取得した楽曲の配列
  public songs: any[] | undefined = undefined;

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

    // URLから曲名を取得
    this.songName = this.acivatedRoute.snapshot.paramMap
      .get('songName')
      ?.toString();

    if (this.keyword) {
      this.searchType = 'keyword';
    } else if (this.songName) {
      this.searchType = 'songName';
    } else {
      this.searchType = 'none';
    }

    // キーワードがあれば、楽曲の検索処理を実行
    if (this.keyword) {
      this.songs = await this.songsService.getSongsByKeyword(this.keyword);
    }

    // キーワードがあれば、楽曲の検索処理を実行
    if (this.songName) {
      this.songs = await this.songsService.getSongsBySongName(this.songName);
    }
  }

  /**
   * 楽曲の曲名検索(検索フォーム用)
   * @param songName 検索曲名
   */
  async searchSongBySongName(songName: string) {
    this.songName = songName;
    this.songs = undefined;

    // URLを「/songs/songName/アイドルマスター」のように変更
    this.router.navigate(['songs', 'songName', songName]);

    // 検索を実行
    this.songs = await this.songsService.getSongsBySongName(this.songName);
  }

  /**
   * 楽曲のキーワード検索(検索フォーム用)
   * @param keyword 検索キーワード
   */
  async searchSongByKeyword(keyword: string) {
    this.keyword = keyword;
    this.songs = undefined;

    // URLを「/songs/keyword/アイドルマスター」のように変更
    this.router.navigate(['songs', 'keyword', keyword]);

    // 検索を実行
    this.songs = await this.songsService.getSongsByKeyword(this.keyword);
  }
}
