import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {
  public nickname: string | null = '';
  private savedNickname: string | null = '';
  public error: string | null = null;
  public editable: boolean = false;

  constructor(private api: ApiService, private auth: AuthService, private router: Router, private activeRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.nickname = localStorage.getItem('nickname');
    this.savedNickname = this.nickname;
  }

  getUser() {
    return this.auth.getUserId();
  }

  async setEditable(): Promise<void> {
    if (this.editable) {
      this.editable = false;
      let result = await this.updateNickname();
      if (result) {
        this.savedNickname = this.nickname;
        if (!this.nickname) {
          this.nickname = 'anonymous';
          this.savedNickname = this.nickname;
        }
        localStorage.setItem('nickname', this.nickname);
      } else {
        this.nickname = this.savedNickname;
        this.setError("Nickname already taken");
      }
    } else {
      this.editable = true;
    }
  }

  async updateNickname(): Promise<boolean> {
    const user = this.getUser();
    if (!this.nickname) this.nickname = '';
    if (user) {
      let data = await firstValueFrom(this.api.updateNickname(this.nickname, user));
      let dataResponse = data;
      return dataResponse.status;
    }
    return false;
  }

  setError(message: string) {
    let errorTimeout = null;
    this.error = message;
    errorTimeout = setTimeout(() => {
      this.error = null;
    }, 5000);
  }

}

