import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent {
  options = [
    { label: 'See all players', route: 'all' },
    { label: 'See worst player', route: 'loser' },
    { label: 'See best player', route: 'winner' },
  ];

  constructor(private router: Router) { }
  
  onSelectionChange(route: string) {
    this.router.navigate(['players/ranking/', route]);
  }
}
