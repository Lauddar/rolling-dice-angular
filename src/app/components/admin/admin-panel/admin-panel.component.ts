import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent {
  options = [
    { label: 'See all players', route: '/players' },
    { label: 'See worst player', route: '/worst-player' },
    { label: 'See best player', route: '/best-player' },
  ];

  onSelectionChange(route: string) {
    // aquí puedes redirigir al usuario al componente correspondiente
  }
}
