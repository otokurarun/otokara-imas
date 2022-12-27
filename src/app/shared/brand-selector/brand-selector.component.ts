import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { ImasBrand } from '../imas-brand';

@Component({
  selector: 'app-brand-selector',
  templateUrl: './brand-selector.component.html',
  styleUrls: ['./brand-selector.component.scss'],
})
export class BrandSelectorComponent implements OnInit {
  public isShowing = false;
  public currentBrandName: ImasBrand = 'all';

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    // アイマスブランドが変更されたときのイベントリスナを設定
    this.appService.imasBrandChangeEventNotifier.subscribe(
      (brandName: ImasBrand) => {
        this.currentBrandName = brandName;
      }
    );
  }

  /**
   * 表示するアイマスブランドの設定
   * @param brandName ブランド
   */
  setBrandName(brandName: ImasBrand) {
    this.currentBrandName = brandName;
    this.appService.setImasBrand(brandName);
  }
}
