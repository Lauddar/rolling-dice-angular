import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-success-rate',
  templateUrl: './success-rate.component.html',
  styleUrls: ['./success-rate.component.css']
})
export class SuccessRateComponent {
public success_rate: number | undefined;

constructor(private api: ApiService, private router: Router) { }

ngOnInit() {
  this.api.ranking().subscribe(data => {
    this.success_rate = data.averageSuccessRate;
  });
}



}
