import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Trip } from 'src/models/trip';

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
  constructor() { }

  ngOnInit() {
  }

  add(): void {
    this.trip.capacityUsed += 1;
  }
  resign(): void {
    this.trip.capacityUsed -= 1;
  }
  removeTrip() {
    this.deleted.emit(this.trip.id);
  }
  onVoted($event) {
    this.counter++;
    this.trip.totalStar += $event;
  }
}
