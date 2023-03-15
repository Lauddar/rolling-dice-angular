import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';

import { GameResponseI } from '../model/game-response.intarfece';
import { LoginI } from '../model/login.interface';
import { RegisterI } from '../model/register.interface';
import { ResponseI } from '../model/response.interface';
import { PlayResponseI } from '../model/play-response.interface';
import { PlayerResponseI } from '../model/player-response.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiEndpoint = "http://159.65.63.87/api";

  private httpOptions = {
    headers: new HttpHeaders({
      'content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
  };

  constructor(private http: HttpClient) { }

  // Register a new player
  register(form: RegisterI): Observable<ResponseI> {
    let dir = this.apiEndpoint + "/players";
    return this.http.post<ResponseI>(dir, form);
  }

  // Log in a player
  login(form: LoginI): Observable<ResponseI> {
    let dir = this.apiEndpoint + "/login";
    return this.http.post<ResponseI>(dir, form);
  }

  // Throw two dice and give result
  play(user: string): Observable<PlayResponseI> {
    {
      let dir = this.apiEndpoint + "/players/" + user + "/games";
      return this.http.post<PlayResponseI>(dir, {}, this.httpOptions)
    }
  }

  // Update user nickname
  updateNickname(nickname: string, user: string): Observable<ResponseI> {
    let dir = this.apiEndpoint + "/players/" + user;
    return this.http.put<ResponseI>(dir, {nickname, user}, this.httpOptions)
  }

  // Return a list of user games
  gamesList(user: string): Observable<GameResponseI> {
    let dir = this.apiEndpoint + "/players/" + user + "/games";
    return this.http.get<any>(dir, this.httpOptions);
  }

  // Delete all user games
  deleteGames(user: string): Observable<any> {
      let dir = this.apiEndpoint + "/players/" + user + "/games";
      return this.http.delete<any>(dir, this.httpOptions);
  }

  // Return the list of players
  playersList(): Observable<PlayerResponseI> {
    let dir = this.apiEndpoint + "/players";
    return this.http.get<any>(dir, this.httpOptions);
  }

  // Return the average success rate from all users who have played
  ranking(): Observable<any> {
    let dir = this.apiEndpoint + "/players/ranking";
    return this.http.get<any>(dir, this.httpOptions);
  }

  // Return the player with the worst average success rate
  worstPlayer(): Observable<PlayerResponseI> {
    let dir = this.apiEndpoint + "/players/ranking/loser";
    return this.http.get<any>(dir, this.httpOptions);
  }

  // Return the player with the best average success rate
  bestPlayer(): Observable<PlayerResponseI> {
    let dir = this.apiEndpoint + "/players/ranking/winner";
    return this.http.get<any>(dir, this.httpOptions);
  }

}
