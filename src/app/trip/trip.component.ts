import { BasketService } from './../../services/basket.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Trip } from 'src/models/trip';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.scss']
})
export class TripComponent implements OnInit {
  @Input() trip: Trip;
  @Input() max: number;
  @Input() min: number;
  @Output() deleted = new EventEmitter<number>();
  counter: 0;
  constructor(
    private bucketService: BasketService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {}

  add(): void {
    this.trip.capacityUsed += 1;
    this.bucketService.addProduct(this.trip);
    this.snackBar.open('Added 1 item to bucket!', 'OK', { duration: 2000 });
  }
  resign(): void {
    this.trip.capacityUsed -= 1;
    this.bucketService.deleteProduct(this.trip.id);
  }
  removeTrip() {
    this.deleted.emit(this.trip.id);
  }
  onVoted($event) {
    this.counter++;
    this.trip.totalStar += $event;
  }
}
