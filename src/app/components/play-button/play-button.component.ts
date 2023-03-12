import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-play-button',
  templateUrl: './play-button.component.html',
  styleUrls: ['./play-button.component.css']
})
export class PlayButtonComponent {

  constructor(private api: ApiService, private router: Router) { }

  onPlay() {
    let user = this.getUser();
    console.log(user);
    if (user) {
      this.router.navigate(['/players', user, 'play']);
    }
  }

  getUser() {
    return localStorage.getItem('user_id');
  }
}
