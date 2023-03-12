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

  public total: string = "";

  constructor(private api: ApiService, private router: Router, private activeRouter: ActivatedRoute) {
  }

  getToken() {
    return localStorage.getItem('access_token')
  }

  getUser() {
    return this.activeRouter.snapshot.paramMap.get('user');
  }

  roll() {
    let die1: HTMLImageElement | null = document.querySelector("#die-1");
    let die2: HTMLImageElement | null = document.querySelector("#die-2");

    let dieOneValue: any;
    let dieTwoValue: any;

    let user = this.getUser();

    die1?.classList.add("shake");
    die2?.classList.add("shake");

    if (user) {
      this.api.play(user).subscribe(data => {
        let dataResponse = data;
        let dieOneValue: any = dataResponse.game.first_dice;
        let dieTwoValue: any = dataResponse.game.second_dice;

        die1?.classList.add("shake");
        die2?.classList.add("shake");

        setTimeout(() => {
          die1?.classList.remove("shake");
          die2?.classList.remove("shake");

          console.log(dieOneValue);
          console.log(dieTwoValue);
          die1?.setAttribute("src", GameComponent.images[dieOneValue-1]);
          die2?.setAttribute("src", GameComponent.images[dieTwoValue-1]);

          if(dataResponse.game.victory) {
            this.total = "YOU WIN";
          } else {
            this.total = "YOU LOSE";
          }
        }, 200);
      });
    }
  }

  listGames() {
    let user = this.getUser();
    this.router.navigate([`players/${user}/games`]);
  }
}
