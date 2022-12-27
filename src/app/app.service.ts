import { EventEmitter, Injectable } from '@angular/core';
import { ImasBrand } from './shared/imas-brand';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  public imasBrandChangeEventNotifier: EventEmitter<ImasBrand> =
    new EventEmitter<ImasBrand>();

  private imasBrand: ImasBrand = 'all';

  constructor() {}

  public setImasBrand(brandName: ImasBrand) {
    console.log(`[AppService] setImasBrand`, brandName);
    this.imasBrand = brandName;
    this.imasBrandChangeEventNotifier.emit(brandName);
  }

  public getImasBrand() {
    return this.imasBrand;
  }
}
