import { Component, OnInit } from '@angular/core';
import { ImasBrand } from '../imas-brand';

@Component({
  selector: 'app-brand-selector',
  templateUrl: './brand-selector.component.html',
  styleUrls: ['./brand-selector.component.scss'],
})
export class BrandSelectorComponent implements OnInit {
  public isShowing = false;
  public currentBrandName: ImasBrand = 'all';

  constructor() {}

  ngOnInit(): void {}

  /**
   * 表示するアイマスブランドの設定
   * @param brandName ブランド
   */
  setBrandName(brandName: ImasBrand) {
    this.currentBrandName = brandName;
  }
}
