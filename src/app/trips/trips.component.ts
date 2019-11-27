import { TripsService } from './../../services/trips-service.service';
import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Trip } from 'src/models/trip';
import { MatDialog } from '@angular/material/dialog';
import { NewTripComponent } from '../newTrip/newTrip.component';
@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.scss']
})
export class TripsComponent implements OnInit, OnChanges {
  trips: Trip[];
  totalSale = 0;
  constructor(private tripsService: TripsService, public dialog: MatDialog) { }

  ngOnInit() {
    this.getProducts();

  }
  ngOnChanges(changes: SimpleChanges): void {
    this.getProducts();
  }

  getProducts() {
    this.tripsService.getProducts().subscribe(trips => {this.trips = trips; this.getTotalSale()});
  }

  getHighCost(): number {
    return Math.max.apply(Math, this.trips.map(o => o.cost));
  }
  getLowCost(): number {
    return Math.min.apply(Math, this.trips.map(o => o.cost));
  }
  getTotalSale() {
    this.totalSale = this.trips
      .map(item => item.capacityUsed)
      .reduce((prev, cur) => prev + cur);
  }
  onDeleted($event) {
    this.tripsService.deleteProduct($event).subscribe(_ => this.trips = this.trips.filter(value => value.id !== $event))

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(NewTripComponent, {
      width: '50em'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getProducts();
    });
  }
}
