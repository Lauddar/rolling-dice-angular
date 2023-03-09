import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent {
  public nickname: string | null = "";
  public editable: boolean = false;

  constructor(private api: ApiService, private router: Router, private activeRouter: ActivatedRoute) {
    this.nickname = this.getNickname();
  }

  getToken() {
    return localStorage.getItem('access_token')
  }

  getUser() {
    return this.activeRouter.firstChild?.snapshot.paramMap.get('user');
  }

  getNickname() {
    return localStorage.getItem('nickname');
  }

  setNickname() {
    if(this.nickname) localStorage.setItem('nickname', this.nickname);
  }

  setEditable() {
    if (this.editable) {
      this.editable = false;
      this.setNickname();
      this.updateNickname();
    } else {
      this.editable = true;
    }
  }

  updateNickname() {
    let user = this.getUser();
    let nickname = this.getNickname();
    if (user && nickname) {
      this.api.updateNickname(nickname, user).subscribe(data => {
        let dataResponse = data;
        console.log(data);
      });
    }
  }





}

