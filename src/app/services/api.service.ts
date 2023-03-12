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

  play(user: string): Observable<GameI> {
    {
      let dir = this.apiEndpoint + "/players/" + user + "/games";
      return this.http.post<GameI>(dir, {}, this.httpOptions)
    }
  }

  getUser(user: string): Observable<any> {
    let dir = this.apiEndpoint + "/players/" + user;;
    return this.http.get<any>(dir, this.httpOptions);
  }

  updateNickname(nickname: string, user: string): Observable<ResponseI> {
    let dir = this.apiEndpoint + "/players/" + user;
    return this.http.put<ResponseI>(dir, {nickname, user}, this.httpOptions)
  }

  gamesList(user: string): Observable<any> {
    let dir = this.apiEndpoint + "/players/" + user + "/games";
    return this.http.get<any>(dir, this.httpOptions);
  }

  deleteGames(user: string): Observable<any> {
      let dir = this.apiEndpoint + "/players/" + user + "/games";
      return this.http.delete<any>(dir, this.httpOptions);
  }

  playersList(): Observable<any> {
    let dir = this.apiEndpoint + "/players";
    return this.http.get<any>(dir, this.httpOptions);
  }

  ranking(): Observable<any> {
    let dir = this.apiEndpoint + "/players/ranking";
    return this.http.get<any>(dir, this.httpOptions);
  }

  worstPlayer(): Observable<any> {
    let dir = this.apiEndpoint + "/players/ranking/loser";
    return this.http.get<any>(dir, this.httpOptions);
  }

  bestPlayer(): Observable<any> {
    let dir = this.apiEndpoint + "/players/ranking/winner";
    return this.http.get<any>(dir, this.httpOptions);
  }



}
