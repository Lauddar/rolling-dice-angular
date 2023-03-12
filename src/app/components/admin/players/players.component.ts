import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PlayerI } from 'src/app/model/player.interface';
import { SuccessRateComponent } from '../success-rate/success-rate.component';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nickname', 'email', 'success_rate', 'created_at'];
  dataSource!: MatTableDataSource<any>;
  players!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private api: ApiService, private router: Router, private activeRouter: ActivatedRoute) { }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updatePlayers();
      }
    });

    this.updatePlayers();
  }

  updatePlayers() {
    let route = this.getRoute();

    switch(route) {
      case 'all':
        this.getAllPlayersFromApi();
        break;
      case 'loser':
        this.getLoserFromApi();
        break;
      case 'winner':
        this.getWinnerFromApi();
        break;
      default:
        this.getAllPlayersFromApi();
        break;
    }
  }

  getRoute() {
    return this.activeRouter.snapshot.paramMap.get('route');
  }

  getAllPlayersFromApi() {
    this.api.playersList().subscribe((player: PlayerI) => {
      this.players = new MatTableDataSource(player.players);
      this.players.paginator = this.paginator;
      this.players.sort = this.sort;
    });
  }

  getWinnerFromApi() {
    this.api.bestPlayer().subscribe((player: PlayerI) => {
      this.players = new MatTableDataSource(player.players);
      this.players.paginator = this.paginator;
      this.players.sort = this.sort;
    });
  }

  getLoserFromApi() {
    this.api.worstPlayer().subscribe((player: PlayerI) => {
      this.players = new MatTableDataSource(player.players);
      this.players.paginator = this.paginator;
      this.players.sort = this.sort;
    });
  }
}