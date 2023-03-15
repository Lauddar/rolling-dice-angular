import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(private auth: AuthService, private router: Router) { }
  
  // Check if user session is active
  canActivate() {
    if (this.auth.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}

export function authGuardFn(auth: AuthService, router: Router) {
  return () => {
    const guard = new AuthGuard(auth, router);
    return guard.canActivate();
  };
}
