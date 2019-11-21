import { TripsService } from './../../services/trips-service.service';
import { Component, OnInit } from '@angular/core';
import { Trip } from 'src/models/trip';
import { MatDialog } from '@angular/material/dialog';
import { NewTripComponent } from '../newTrip/newTrip.component';
@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.scss']
})
export class TripsComponent implements OnInit {
  trips: Trip[];
  isBucketVisible = false;

  constructor(private tripsService: TripsService, public dialog: MatDialog) {}

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
    this.trips = this.trips.filter(value => value.id !== $event);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(NewTripComponent, {
      width: '50em'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  onBucketVisible() {
    this.isBucketVisible = !this.isBucketVisible;
  }
}
