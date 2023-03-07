import { Injectable } from '@angular/core';
import { LoginI } from '../model/login.interface';
import { ResponseI } from '../model/response.interface';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url: string = "http://localhost:80/workspace/laravelAPIRest-old/public/";

  constructor(private http: HttpClient) { }

  login(form: LoginI): Observable<ResponseI> {
    let dir = this.url + "api/login";
    return this.http.post<ResponseI>(dir, form);
  }
}
