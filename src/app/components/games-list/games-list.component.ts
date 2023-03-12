import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Game } from 'src/app/model/game.intarfece';

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

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private api: ApiService, private router: Router, private activeRouter: ActivatedRoute) { }

  ngOnInit() {
    let user = this.getUser();
    if (user) {
      this.api.gamesList(user).subscribe((game: Game) => {
        this.games = new MatTableDataSource(game.games);
        this.games.paginator = this.paginator;
        this.games.sort = this.sort;
        console.log(game);
        this.success_rate = game.success_rate;
        console.log(this.success_rate)
      });
    }
  }

  getUser() {
    return this.activeRouter.snapshot.paramMap.get('user');
  }

  play() {
    let user = this.getUser();
    this.router.navigate([`players/${user}/play`]);
  }

  delete() {
    if (confirm('Are you sure you want to delete all your games?')) {
      let user = this.getUser();
      if (user) {
        this.api.deleteGames(user).subscribe(data => {
          let dataResponse = data;
          console.log(dataResponse);
        });
      }
      this.ngOnInit();
    }
  }

}
