import { Injectable } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(private cookie: CookieService) { }

  setCookieAsObject(cookieName: string, cookieValue: any) {
    this.cookie.set(cookieName, JSON.stringify(cookieValue));
  }

  setCookieAsValue(cookieName: string, cookieValue: any) {
    this.cookie.set(cookieName, cookieValue);
  }

  checkCookieExist(name: string) {
    return this.cookie.check(name);
  }

  getCookie(name: string) {
    return this.cookie.get(name);
  }
}
