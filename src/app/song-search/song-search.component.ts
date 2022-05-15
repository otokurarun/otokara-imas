import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SongListComponent } from '../song-list/song-list.component';
import { SongsService } from '../songs.service';

@Component({
  selector: 'app-song-search',
  templateUrl: './song-search.component.html',
  styleUrls: ['./song-search.component.scss'],
})
export class SongSearchComponent implements OnInit {
  // 楽曲の検索タイプ
  public searchType: 'keyword' | 'songName' | 'all' | 'none' = 'none';

  // 楽曲の並び替えタイプ
  public sortType: 'popular' | 'newer' | 'alphabetical' = 'popular';

  public searchParams: {
    keyword?: string;
    songName?: string;
    brandName?: string;
  } = {};

  @ViewChild('searchResultList')
  private searchResultList: SongListComponent;

  constructor(private acivatedRoute: ActivatedRoute, private router: Router) {}

  /**
   * コンポーネントが初期化されたときの処理
   */
  async ngOnInit(): Promise<void> {
    // URLから検索キーワードを取得
    this.searchParams.keyword = this.acivatedRoute.snapshot.paramMap
      .get('keyword')
      ?.toString();

    // URLから曲名を取得
    this.searchParams.songName = this.acivatedRoute.snapshot.paramMap
      .get('songName')
      ?.toString();

    // URLからブランド名を取得
    if (
      this.acivatedRoute.snapshot.paramMap
        .get('rankingBrandName')
        ?.toString() == 'cg'
    ) {
      this.searchParams.brandName = 'cg';
    }

    // 表示する検索タイプを設定
    if (this.searchParams.keyword) {
      this.searchType = 'keyword';
    } else if (this.searchParams.songName) {
      this.searchType = 'songName';
    } else if (this.searchParams.brandName) {
      this.searchType = 'all';
    } else {
      this.searchType = 'none';
    }
  }

  /**
   * 楽曲の曲名検索(検索フォーム用)
   * @param songName 検索曲名
   */
  async searchSongBySongName(songName: string) {
    this.searchParams.songName = songName;

    // URLを「/songs/songName/アイドルマスター」のように変更
    this.router.navigate(['songs', 'songName', songName]);

    // 検索を実行
    this.searchResultList.search();
  }

  /**
   * 楽曲のキーワード検索(検索フォーム用)
   * @param keyword 検索キーワード
   */
  async searchSongByKeyword(keyword: string) {
    this.searchParams.keyword = keyword;

    // URLを「/songs/keyword/アイドルマスター」のように変更
    this.router.navigate(['songs', 'keyword', keyword]);

    // 検索を実行
    this.searchResultList.search();
  }
}
