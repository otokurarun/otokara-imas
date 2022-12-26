import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';

/**
 * ホーム画面のコンポーネント
 */
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  // 開かれているタブページの番号
  public tabIndex: number = 0;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    // URL のクエリパラメータからタブページの番号を取得
    if (this.activatedRoute.snapshot.queryParamMap.get('tab')) {
      this.tabIndex = parseInt(
        this.activatedRoute.snapshot.queryParamMap.get('tab')!,
        10
      );
    }
  }

  /**
   * タブが切り替わったときのイベントハンドラ
   * @param event タブ変更時のイベント
   */
  onSelectedTabChange(event: MatTabChangeEvent) {
    // URLのクエリパラメータにタブページの番号をいれる
    this.router.navigate([''], {
      queryParams: {
        tab: event.index,
      },
    });
  }
}
