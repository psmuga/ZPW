import { TripsService } from './../../services/trips-service.service';
import { Component, OnInit } from '@angular/core';
import { Trip } from 'src/models/trip';
@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.scss']
})
export class TripsComponent implements OnInit {
  trips: Trip[];

  constructor(private tripsService: TripsService) {}

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.trips = this.tripsService.getProducts();
  }

  getHighCost(): number {
    return Math.max.apply(Math, this.trips.map(o => o.cost));
  }
  getLowCost(): number {
    return Math.min.apply(Math, this.trips.map(o => o.cost));
  }
  getTotalSale(): number {
    return this.trips
      .map(item => item.capacityUsed)
      .reduce((prev, cur) => prev + cur);
  }

  onDeleted($event) {
    this.trips = this.trips.filter(value => value.name !== $event);
  }
}
