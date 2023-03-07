import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { LoginI } from 'src/app/model/login.interface';
import { ResponseI } from 'src/app/model/response.interface';
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private api: ApiService, private router:Router) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  onLogin() {
    let formValue = this.loginForm.value as LoginI;
    this.api.login(formValue).subscribe(data => {
      let dataResponse:ResponseI = data;
      if(dataResponse.status) {
        localStorage.setItem("access_token", dataResponse.access_token);
        this.router.navigate(['play']);
      }
    });
  }
}