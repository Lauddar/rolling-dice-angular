import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authToken!: string | null;
  private userId!: string | null;

  constructor(private router: Router) { }

  public setUserId(userId: string): void {
    this.userId = userId;
    localStorage.setItem('user_id', userId);
  }

  public getUserId(): string | null {
    if (!this.userId) {
      this.userId = localStorage.getItem('user_id');
    }
    return this.userId;
  }

  public setAuthToken(token: string): void {
    this.authToken = token;
    localStorage.setItem('token', token);
  }

  public getAuthToken(): string | null {
    if (!this.authToken) {
      this.authToken = localStorage.getItem('token');
    }

    return this.authToken;
  }

  public isLoggedIn(): boolean {
    return !!this.getAuthToken();
  }

  public checkLogOrRedirect() {
    if (!this.isLoggedIn()) {
      this.router.navigate(['login']);
    }
  }

  public logout(): void {
    this.authToken = null;
    localStorage.clear();
  }
}
