import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { LoginI } from 'src/app/model/login.interface';
import { ResponseI } from 'src/app/model/response.interface';
import { Router } from '@angular/router'
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  public error: string = '';

  constructor(private api: ApiService, private auth: AuthService, private router: Router) { }

  ngOnInit() {
    if (this.auth.isLoggedIn()) {
      let user = localStorage.getItem('user_id');
      this.router.navigate([`players/${user}/play`]);
    } else {
      this.loginForm = new FormGroup({
        email: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required)
      });
    }
  }

  onLogin() {
    let formValue = this.loginForm.value as LoginI;
    this.api.login(formValue).subscribe(data => {
      let dataResponse: ResponseI = data;
      this.auth.setAuthToken(dataResponse.result.access_token.accessToken);
      this.auth.setUserId(dataResponse.result.user.id);
      localStorage.setItem('nickname', dataResponse.result.user.nickname);
      localStorage.setItem('role', dataResponse.result.user.role);
      let user = dataResponse.result.user.id;
      this.router.navigate([`players/${user}/play`]);
    },
      error => {
        this.error = "Invalid login credentials. Please try again."
        console.log(this.error);
      }
    );
  }
}
