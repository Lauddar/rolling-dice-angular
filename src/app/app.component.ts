import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'rollingDice';

  constructor(private activatedRoute: ActivatedRoute) {}

  displayAppUser(): boolean {
    let routePath = this.activatedRoute.firstChild?.snapshot.routeConfig?.path;
    return routePath !== 'login' && routePath !== 'register';
  }

}
