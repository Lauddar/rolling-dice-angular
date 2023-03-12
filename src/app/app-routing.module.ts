import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayersComponent } from './components/admin/players/players.component';
import { GameComponent } from './components/game/game.component';
import { GamesListComponent } from './components/games-list/games-list.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  { path: '', redirectTo:'login', pathMatch:'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'players/:user/play', component: GameComponent },
  { path: 'players/:user/games', component: GamesListComponent },
  { path: 'players/:user/delete', component: GamesListComponent },
  { path: 'players/ranking/:route', component: PlayersComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }