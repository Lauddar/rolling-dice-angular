import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

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

// Get access token from local storage
getToken() {
  return localStorage.getItem('access_token')
}

// Get user ID from route parameter
getRouteUser() {
  return this.activeRouter.snapshot.paramMap.get('user');
}

// Roll the dice and show results
roll() {
  this.total = '';
  this.victory = '';

  let user = this.getRouteUser();

  let die1 = document.querySelector("#die-1");
  let die2 = document.querySelector("#die-2");

  // If the dice images are not set, set them to default image
  if (!die1?.getAttribute("src")) {
    die1?.setAttribute("src", GameComponent.images[5]);
    die2?.setAttribute("src", GameComponent.images[5]);
  }

  // Add animation to dice
  die1?.classList.add("shake");
  die2?.classList.add("shake");

  // Call to API 
  if (user) {
    this.api.play(user).subscribe(data => {
      let dataResponse = data;
      let dieOneValue: any = dataResponse.game.first_dice;
      let dieTwoValue: any = dataResponse.game.second_dice;

      // Set results in screen
      setTimeout(() => {
        die1?.classList.remove("shake");
        die2?.classList.remove("shake");

        die1?.setAttribute("src", GameComponent.images[dieOneValue - 1]);
        die2?.setAttribute("src", GameComponent.images[dieTwoValue - 1]);

        this.total = "Your result is " + (dieOneValue + dieTwoValue) + ".";
      }, 1000);

      setTimeout(() => {
        if (dataResponse.game.victory) {
          this.victory = "YOU WIN";
        } else {
          this.victory = "YOU LOSE";
        }
      }, 1500);
    });
  }
}

// Go to the list of games for the current user from API
listGames() {
  let user = this.getRouteUser();
  this.router.navigate([`players/${user}/games`]);
}

}