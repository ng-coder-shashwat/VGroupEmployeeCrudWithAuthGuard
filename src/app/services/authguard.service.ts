import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { UtilityService } from './utility.service';

@Injectable({
  providedIn: 'root'
})
export class Authguard implements CanActivate {

  constructor(private router: Router, private utility: UtilityService) { }

  canActivate() {
    const isUserLoggedIn = this.utility.checkCookieExist('isLoggedIn');
    if (isUserLoggedIn) {
      return true;
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}
