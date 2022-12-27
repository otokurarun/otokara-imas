import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppService } from '../app.service';
import { ImasBrand } from '../shared/imas-brand';
import { SearchParams, SearchType } from '../shared/song-list/search';

/**
 * 検索結果画面のコンポーネント
 * (キーワード検索、ライブの楽曲検索)
 */
@Component({
  selector: 'app-song-search-page',
  templateUrl: './song-search-page.component.html',
  styleUrls: ['./song-search-page.component.scss'],
})
export class SongSearchPageComponent implements OnInit, OnDestroy {
  // 検索モード
  public searchType: SearchType;

  // 検索パラメータ
  public searchParams: SearchParams = {};

  // ブランド名
  public brandName: ImasBrand = 'all';

  // URL の変更を検知するための Subscription
  private urlParamsSubscription: Subscription;

  // ブランド名の変更を検知するための Subscription
  private imasBrandChangeSubscription: Subscription;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private appService: AppService
  ) {}

  /**
   * コンポーネントが初期化されたときの処理
   */
  async ngOnInit(): Promise<void> {
    // URL のパラメータからブランド名を取得
    if (this.activatedRoute.snapshot.paramMap.get('brandName')) {
      this.brandName = this.activatedRoute.snapshot.paramMap.get(
        'brandName'
      ) as ImasBrand;
      this.appService.setImasBrand(this.brandName);
    } else {
      // 現在のアイマスブランドを取得
      this.brandName = this.appService.getImasBrand();
    }

    // URL の変更を検知するための Subscription を登録
    this.urlParamsSubscription = this.activatedRoute.paramMap.subscribe(
      (params) => {
        this.onUrlParamsChange(params);
        console.log(`URLが変更されました: `, params);
      }
    );

    // アイマスブランドの変更を検知するための Subscription を登録
    this.imasBrandChangeSubscription =
      this.appService.imasBrandChangeEventNotifier.subscribe(
        (brandName: ImasBrand) => {
          this.onImasBrandChange(brandName);
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

    // アイマスブランドの変更を検知するための Subscription を解除
    if (this.imasBrandChangeSubscription) {
      this.imasBrandChangeSubscription.unsubscribe();
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
        brandName: this.brandName,
      };
    } else if (paramMap.has('songName')) {
      // 指定された曲名から楽曲検索
      this.searchType = 'songName';
      this.searchParams = {
        songName: paramMap.get('songName')!,
        brandName: this.brandName,
      };
    } else if (paramMap.has('liveEventId')) {
      // 指定されたライブから楽曲検索
      this.searchType = 'liveEvent';
      this.searchParams = {
        liveEventId: parseInt(paramMap.get('liveEventId')!, 10),
      };
    }
  }

  /**
   * アイマスブランドが変更されたときのイベントリスナ
   * @param ブランド名
   */
  onImasBrandChange(brandName: ImasBrand) {
    // 変更後のアイマスブランドに設定
    this.brandName = brandName;

    // URL を更新
    // (onUrlParamsChange() が呼び出される)
    if (this.searchType == 'keyword') {
      this.router.navigate([
        this.brandName,
        'imasSongs',
        this.searchType,
        this.searchParams?.keyword,
      ]);
    } else if (this.searchType == 'songName') {
      this.router.navigate([
        this.brandName,
        'imasSongs',
        this.searchType,
        this.searchParams?.songName,
      ]);
    }
  }
}
