import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './components/game/game.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  { path: '', redirectTo:'login', pathMatch:'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'players/:user/play', component: GameComponent, canActivate: [AuthGuard, UserGuard]  },
  { path: 'players/:user/games', component: GamesListComponent, canActivate: [AuthGuard, UserGuard]  },
  { path: 'players/:user/delete', component: GamesListComponent, canActivate: [AuthGuard, UserGuard]  },
  { path: 'players/ranking/:route', component: PlayersComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }