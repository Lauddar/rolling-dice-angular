import { Injectable } from '@angular/core';
import { LoginI } from '../model/login.interface';
import { ResponseI } from '../model/response.interface';
import { GameI } from '../model/game.interface';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { RegisterI } from '../model/register.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiEndpoint = "http://localhost:80/workspace/laravelAPIRest-old/public/api";

  private httpOptions = {
    headers: new HttpHeaders({
      'content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
  };

  constructor(private http: HttpClient) { }

  register(form: RegisterI): Observable<ResponseI> {
    let dir = this.apiEndpoint + "/players";
    return this.http.post<ResponseI>(dir, form);
  }

  login(form: LoginI): Observable<ResponseI> {
    let dir = this.apiEndpoint + "/login";
    return this.http.post<ResponseI>(dir, form);
  }

  play(user: string): Observable<GameI>{
    {
      console.log(this.httpOptions.headers.get('Authorization'));
      let dir = this.apiEndpoint + "/players/" + user + "/games";
      return this.http.post<GameI>(dir, {}, this.httpOptions)
    }
  }
}
