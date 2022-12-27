import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppService } from '../app.service';
import { ImasBrand } from '../shared/imas-brand';

/**
 * ホーム画面のコンポーネント
 */
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit, OnDestroy {
  // 開かれているタブページの番号
  public tabIndex: number = 0;

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

  ngOnInit(): void {
    // URL のクエリパラメータからタブページの番号を取得
    if (this.activatedRoute.snapshot.queryParamMap.get('tab')) {
      this.tabIndex = parseInt(
        this.activatedRoute.snapshot.queryParamMap.get('tab')!,
        10
      );
    }

    // URL のパラメータからブランド名を取得
    this.applyImasBrandByUrlParams(this.activatedRoute.snapshot.paramMap, true);

    // URL の変更を検知するための Subscription を登録
    this.urlParamsSubscription = this.activatedRoute.paramMap.subscribe(
      (params) => {
        this.applyImasBrandByUrlParams(params);
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

  ngOnDestroy(): void {
    // アイマスブランドの変更を検知するための Subscription を解除
    if (this.imasBrandChangeSubscription) {
      this.imasBrandChangeSubscription.unsubscribe();
    }
  }

  /**
   * タブが切り替わったときのイベントハンドラ
   * @param event タブ変更時のイベント
   */
  onSelectedTabChange(event: MatTabChangeEvent) {
    if (this.brandName == 'all') return;

    // URLのクエリパラメータにタブページの番号をいれる
    this.router.navigate([this.brandName], {
      queryParams: {
        tab: event.index,
      },
    });
  }

  /**
   * URL で指定されたアイマスブランドが変更されたときに呼び出されるイベントリスナ
   * @param paramMap URL のパラメータ
   */
  applyImasBrandByUrlParams(paramMap: ParamMap, isInitial: boolean = false) {
    console.log(`[HomePageComponent] applyImasBrandByUrlParams`, paramMap);
    if (paramMap.has('brandName')) {
      // URL にブランド名が含まれていれば、そのブランド名から設定
      this.brandName = paramMap.get('brandName') as ImasBrand;
      this.appService.setImasBrand(this.brandName);
    } else {
      // URL にブランド名が含まれていなければ
      if (isInitial) {
        // ページ読み込み時ならば、全ブランドを設定
        this.brandName = 'all';
        this.appService.setImasBrand(this.brandName);
      } else {
        // ページ読み込み時以外 (同一画面でURLが変動したとき) ならば、AppService から現在のアイマスブランドを取得
        this.brandName = this.appService.getImasBrand();
      }
    }
  }

  /**
   * アイマスブランドが変更されたときのイベントリスナ
   * @param ブランド名
   */
  onImasBrandChange(brandName: ImasBrand) {
    if (this.brandName == brandName) return;

    // 変更後のアイマスブランドに設定
    this.brandName = brandName;

    // URL を更新
    if (this.brandName == 'all') {
      this.router.navigate(['']);
    } else {
      this.router.navigate([this.brandName]);
    }
  }
}
