import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
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
export class SongSearchPageComponent implements OnInit, OnDestroy {
  // 検索モード
  public searchType: SearchType;

  // 検索パラメータ
  public searchParams: SearchParams = {};

  // URL の変更を検知するための Subscription
  private urlParamsSubscription: Subscription;

  constructor(private acivatedRoute: ActivatedRoute) {}

  /**
   * コンポーネントが初期化されたときの処理
   */
  async ngOnInit(): Promise<void> {
    // URL の変更を検知するための Subscription を登録
    this.urlParamsSubscription = this.acivatedRoute.paramMap.subscribe(
      (params) => {
        this.onUrlParamsChange(params);
      }
    );
  }

  /**
   * コンポーネントが破棄されるときの処理
   */
  ngOnDestroy(): void {
    // URL の変更を検知するための Subscription を解除
    if (this.urlParamsSubscription) {
      this.urlParamsSubscription.unsubscribe();
    }
  }

  /**
   * URL が変更されたときに呼び出されるイベントリスナ
   * @param paramMap URL のパラメータ
   */
  onUrlParamsChange(paramMap: ParamMap) {
    if (paramMap.has('keyword')) {
      // 指定されたキーワードから楽曲検索
      this.searchType = 'keyword';
      this.searchParams = {
        keyword: paramMap.get('keyword')!,
      };
    } else if (paramMap.has('songName')) {
      // 指定された曲名から楽曲検索
      this.searchType = 'songName';
      this.searchParams = {
        songName: paramMap.get('songName')!,
      };
    } else if (paramMap.has('liveEventId')) {
      // 指定されたライブから楽曲検索
      this.searchType = 'liveEvent';
      this.searchParams = {
        liveEventId: parseInt(paramMap.get('liveEventId')!, 10),
      };
    }
  }
}
