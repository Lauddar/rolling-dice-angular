import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {


  constructor(private api: ApiService,  private auth: AuthService, private router: Router) { }
  
  onLogout() {
    this.auth.logout();
    this.router.navigate(['login']);
  }
}
