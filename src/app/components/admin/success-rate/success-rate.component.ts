import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-success-rate',
  templateUrl: './success-rate.component.html',
  styleUrls: ['./success-rate.component.css']
})
export class SuccessRateComponent {
public success_rate: number | undefined;

constructor(private api: ApiService) { }

// Get the players average success rate when the component is initialized.
ngOnInit() {
  this.api.ranking().subscribe(data => {
    this.success_rate = data.averageSuccessRate;
  });
}

}
