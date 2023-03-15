import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard {

  constructor(private auth: AuthService, private router: Router) {}

  // Check if session and route user parameter are the same
  canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree {
    let userId = this.auth.getUserId();
    let userParam = route.paramMap.get('user');
    
    if (userId == userParam) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
