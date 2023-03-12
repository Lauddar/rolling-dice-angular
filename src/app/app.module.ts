import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule  } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserComponent } from './components/user/user.component';
import { GamesListComponent } from './components/games-list/games-list.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { MatSelectModule } from '@angular/material/select';
import { AllPlayersComponent } from './components/admin/all-players/all-players.component';
import { WorstPlayerComponent } from './components/admin/worst-player/worst-player.component';
import { BestPlayerComponent } from './components/admin/best-player/best-player.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    GamesListComponent,
    AdminPanelComponent,
    AllPlayersComponent,
    WorstPlayerComponent,
    BestPlayerComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatTableModule ,
    MatPaginatorModule ,
    BrowserAnimationsModule,
    MatSortModule,
    MatSelectModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
