import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { GameI } from 'src/app/model/game.interface';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})

export class GameComponent {
  static images: string[] = ["../assets/dice/dice-01.svg",
    "../assets/dice/dice-02.svg",
    "../assets/dice/dice-03.svg",
    "../assets/dice/dice-04.svg",
    "../assets/dice/dice-05.svg",
    "../assets/dice/dice-06.svg"];

  public victory: string = "";
  public total: string = "";

  constructor(private api: ApiService, private router: Router, private activeRouter: ActivatedRoute) { }

  getToken() {
    return localStorage.getItem('access_token')
  }

  getUser() {
    return this.activeRouter.snapshot.paramMap.get('user');
  }

  roll() {
    this.total = '';
    this.victory = '';

    let user = this.getUser();

    let die1 = document.querySelector("#die-1");
    let die2 = document.querySelector("#die-2");

    /*die1?.setAttribute("src", GameComponent.images[0]);
    die2?.setAttribute("src", GameComponent.images[0]);*/

    die1?.classList.add("shake");
    die2?.classList.add("shake");

    if (user) {
      this.api.play(user).subscribe(data => {
        let dataResponse = data;
        let dieOneValue: any = dataResponse.game.first_dice;
        let dieTwoValue: any = dataResponse.game.second_dice;

        setTimeout(() => {
          die1?.classList.remove("shake");
          die2?.classList.remove("shake");

          die1?.setAttribute("src", GameComponent.images[dieOneValue - 1]);
          die2?.setAttribute("src", GameComponent.images[dieTwoValue - 1]);

          this.total = "Your result is " + (dieOneValue + dieTwoValue) + ".";
        }, 200);

        setTimeout(() => {
          if (dataResponse.game.victory) {
            this.victory = "YOU WIN";
          } else {
            this.victory = "YOU LOSE";
          }
        }, 1000);
      });

    }
  }

  listGames() {
    let user = this.getUser();
    this.router.navigate([`players/${user}/games`]);
  }
}