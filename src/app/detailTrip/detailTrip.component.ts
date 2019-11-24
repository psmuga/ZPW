import { Star } from './../../models/opinion';
import { Trip } from './../../models/trip';
import { TripsService } from 'src/services/trips-service.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OpinionService } from 'src/services/Opinion.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BasketService } from 'src/services/basket.service';

@Component({
  selector: 'app-detailTrip',
  templateUrl: './detailTrip.component.html',
  styleUrls: ['./detailTrip.component.scss']
})
export class DetailTripComponent implements OnInit, OnDestroy {
  trip: Trip;
  id: number;
  sub: any;
  stars: Star[];
  totalStar =0;
  constructor(
    private tripsService: TripsService,
    private opinionService: OpinionService,
    private route: ActivatedRoute,
    private bucketService: BasketService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.trip = this.tripsService.getProduct(+params['id']);
    });
    this.getStars();
  }
  getStars() {
    this.stars = this.opinionService.getStars(this.trip.id);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }


  onVoted($event) {
    this.totalStar = $event;
  }

  add(): void {
    this.trip.capacityUsed += 1;
    this.bucketService.addProduct(this.trip);
    this.snackBar.open('Added 1 item to bucket!', 'OK', { duration: 2000 });
  }

  resign(): void {
    this.trip.capacityUsed -= 1;
    if(this.trip.capacityUsed == 0) {
      this.bucketService.deleteProduct(this.trip.id);
      this.tripsService.deleteProduct(this.trip.id);
    } else {
      this.bucketService.updateTrip(this.trip);
      this.tripsService.updateTrip(this.trip);
    }
  }
  removeTrip() {
    this.tripsService.deleteProduct(this.trip.id);
  }
}
