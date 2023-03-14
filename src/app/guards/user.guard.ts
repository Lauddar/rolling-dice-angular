import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard {

  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree {
    let userId = this.auth.getUserId();
    console.log(userId);
    let userParam = route.paramMap.get('user');
    console.log(userParam);
    
    if (userId == userParam) {
      console.log('ep3');
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
