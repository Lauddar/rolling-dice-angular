import { Component } from '@angular/core';

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

  roll() {
    let die1: HTMLImageElement | null = document.querySelector("#die-1");
    let die2: HTMLImageElement | null = document.querySelector("#die-2");

    if (die1) die1.classList.add("shake");
    if (die2) die2.classList.add("shake");

    setTimeout(() => {
      if (die1) die1.classList.remove("shake");
      if (die2) die2.classList.remove("shake");

      let dieOneValue = Math.floor(Math.random() * 6);
      let dieTwoValue = Math.floor(Math.random() * 6);

      console.log(dieOneValue, dieTwoValue);

      if (die1) die1.setAttribute("src", GameComponent.images[dieOneValue]);
      if (die2 )die2.setAttribute("src", GameComponent.images[dieTwoValue]);
      this.total = "Your roll is " + ((dieOneValue + 1) + (dieTwoValue + 1));
    },
      1000
    );
  }
}
