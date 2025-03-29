import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FooterVisibleService {
  public isFirstFooterShow: boolean = false
  public issecondFooterShow: boolean = true;
  // public conditionalFooter: boolean = true;
  // public conditionalFooter1: boolean = false
  public isProfile: boolean = false;
  public isRouteShow: boolean = true;
  public isShow2: boolean = true;


  constructor() {
    if (localStorage.getItem('coaching-result')) {
      this.isFirstFooterShow = true
      this.issecondFooterShow = false;
    }

    if (localStorage.getItem('update-profile')) {
      this.isProfile = true

    }

    if (localStorage.getItem('search-result')) {
      this.isProfile = true
    }




  }
}
