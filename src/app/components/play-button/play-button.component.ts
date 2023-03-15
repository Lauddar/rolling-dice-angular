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

  // Go back to game
  onPlay() {
    let user = this.getStorageUser();
    console.log(user);
    if (user) {
      this.router.navigate(['/players', user, 'play']);
    }
  }

  // Get user from local storage
  getStorageUser() {
    return localStorage.getItem('user_id');
  }
}
