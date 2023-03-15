import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { GameResponseI } from 'src/app/model/game-response.intarfece'; 

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.css']
})

export class GamesListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'first_dice', 'second_dice', 'victory', 'created_at'];
  dataSource!: MatTableDataSource<any>;
  games!: MatTableDataSource<any>
  public success_rate: number | undefined;
  public message: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private api: ApiService, private activeRouter: ActivatedRoute) { }

  ngOnInit() {
    let user = this.getRouteUser();

    // Get games list from API
    if (user) {
      this.api.gamesList(user).subscribe((game: GameResponseI) => {
        this.games = new MatTableDataSource(game.games);
        this.games.paginator = this.paginator;
        this.games.sort = this.sort;
        this.success_rate = game.success_rate;
      });
    }
  }

  // Get user from route
  getRouteUser() {
    return this.activeRouter.snapshot.paramMap.get('user');
  }

  // Delete all user's games with API
  delete() {
    if (confirm('Are you sure you want to delete all your games?')) {
      let user = this.getRouteUser();
      if (user) {
        this.api.deleteGames(user).subscribe(data => {
          let dataResponse = data;
          this.setMessage(dataResponse.message);
        });
      }
      this.ngOnInit();
    }
  }

  // Set message
  setMessage(message: string) {
    this.message = message;
    let messageTimeout = setTimeout(() => {
      this.message = '';
    }, 5000);
  }

}
