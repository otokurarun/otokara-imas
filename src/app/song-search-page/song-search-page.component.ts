import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchParams, SearchType } from '../shared/song-list/search';

/**
 * 検索結果画面のコンポーネント
 * (キーワード検索、ライブの楽曲検索)
 */
@Component({
  selector: 'app-song-list-page',
  templateUrl: './song-search-page.component.html',
  styleUrls: ['./song-search-page.component.scss'],
})
export class SongSearchPageComponent implements OnInit {
  // 検索モード
  public searchType: SearchType;

  // 検索パラメータ
  public searchParams: SearchParams = {};

  constructor(private acivatedRoute: ActivatedRoute) {}

  /**
   * コンポーネントが初期化されたときの処理
   */
  async ngOnInit(): Promise<void> {
    // URLからパラメータを取得
    if (this.acivatedRoute.snapshot.paramMap.has('keyword')) {
      // 指定されたキーワードから楽曲検索
      this.searchType = 'keyword';
      this.searchParams = {
        keyword: this.acivatedRoute.snapshot.paramMap.get('keyword')!,
      };
    } else if (this.acivatedRoute.snapshot.paramMap.has('songName')) {
      // 指定された曲名から楽曲検索
      this.searchType = 'songName';
      this.searchParams = {
        songName: this.acivatedRoute.snapshot.paramMap.get('songName')!,
      };
    } else if (this.acivatedRoute.snapshot.paramMap.has('liveEventId')) {
      // 指定されたライブから楽曲検索
      this.searchType = 'liveEvent';
      this.searchParams = {
        liveEventId: parseInt(
          this.acivatedRoute.snapshot.paramMap.get('liveEventId')!,
          10
        ),
      };
    }
  }
}
