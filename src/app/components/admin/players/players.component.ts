import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ApiService } from 'src/app/services/api.service';
import { PlayerResponseI } from 'src/app/model/player-response.interface';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {

  displayedColumns: string[] = ['nickname', 'email', 'success_rate', 'games'];
  dataSource!: MatTableDataSource<any>;
  players!: MatTableDataSource<any>;
  public title: string = '';
  public isAll:boolean = false;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private api: ApiService, private router: Router, private activeRouter: ActivatedRoute) { }

  ngOnInit() {
    // Subscribe to router events to update the players data when the route changes
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updatePlayers();
      }
    });

    // Update the players data
    this.updatePlayers();
  }

  getRoute() {
    return this.activeRouter.snapshot.paramMap.get('route');
  }

  // Update the players data depending on the current route
  updatePlayers() {
    let route = this.getRoute();

    switch(route) {
      case 'all':
        this.getAllPlayersFromApi();
        this.title = 'All players';
        this.isAll = true;
        break;
      case 'loser':
        this.getLoserFromApi();
        this.title = 'Worst player';
        this.isAll = false;
        break;
      case 'winner':
        this.getWinnerFromApi();
        this.title = 'Best player';
        break;
      default:
        this.getAllPlayersFromApi();
        this.title = 'All players';
        this.isAll = false;
        break;
    }
  }

  // Get all the players from the API and update the table.
  getAllPlayersFromApi() {
    this.api.playersList().subscribe(data => {
      this.players = new MatTableDataSource(data.users);
      this.players.paginator = this.paginator;
      this.players.sort = this.sort;
    });
  }

  // Get the best player from the API and update the table.
  getWinnerFromApi() {
    this.api.bestPlayer().subscribe(data => {
      this.players = new MatTableDataSource(data.user);
      this.players.paginator = this.paginator;
      this.players.sort = this.sort;
    });
  }

  // Get the worst player from the API and update the table.
  getLoserFromApi() {
    this.api.worstPlayer().subscribe(data => {
      this.players = new MatTableDataSource(data.user);
      this.players.paginator = this.paginator;
      this.players.sort = this.sort;
    });
  }
}
