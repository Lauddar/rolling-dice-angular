import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterI } from 'src/app/model/register.interface';
import { ResponseI } from 'src/app/model/response.interface';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {
  registerForm!: FormGroup;
  public error: string = '';
  public errorDetail: string = '';

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      nickname: new FormControl(''),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      password_confirmation: new FormControl('', Validators.required),
    });
  }

  onRegister() {
    let formValue = this.registerForm.value as RegisterI;

    this.api.register(formValue).subscribe(data => {
      let dataResponse: ResponseI = data;
      console.log(dataResponse);
      this.router.navigate(['login']);
    },
    error => {
      console.log(error);
      this.error = "Invalid sign in credentials. Please try again."
      this.errorDetail = error.error.result.message;
    });
  }
}