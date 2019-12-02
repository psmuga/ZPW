import { Star } from './../../models/opinion';
import { Trip } from './../../models/trip';
import { TripsService } from 'src/services/trips-service.service';
import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OpinionService } from 'src/services/Opinion.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BasketService } from 'src/services/basket.service';

@Component({
    selector: 'app-detailTrip',
    templateUrl: './detailTrip.component.html',
    styleUrls: ['./detailTrip.component.scss']
})
export class DetailTripComponent implements OnInit, OnChanges {
    trip: Trip;
    id: number;
    stars: Star[];
    totalStar = 0;
    sellPlaces = -1;
    constructor(
        private tripsService: TripsService,
        private opinionService: OpinionService,
        private route: ActivatedRoute,
        private bucketService: BasketService,
        private snackBar: MatSnackBar
    ) {}

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.tripsService.getProduct(params['id']).subscribe(data => {
                console.log(data);
                this.trip = data;
                this.getStars();
                this.sellPlaces = this.trip.capacity - this.trip.capacityUsed;
            });
        });
    }
    ngOnChanges(changes: import('@angular/core').SimpleChanges): void {
        this.getStars();
    }
    getStars() {
        this.opinionService.getStars(this.trip.id).subscribe(data => (this.stars = data));
    }

    onVoted($event) {
        this.totalStar = $event;
    }

    add(): void {
        this.trip.capacityUsed += 1;
        this.tripsService.updateTrip(this.trip);
        this.snackBar.open('Added 1 item to bucket!', 'OK', { duration: 2000 });
        this.bucketService.addProduct(this.trip);
    }

    resign(): void {
        this.trip.capacityUsed -= 1;
        if (this.trip.capacityUsed == 0) {
            this.bucketService.deleteProduct(this.trip.id);
            this.tripsService.deleteProduct(this.trip);
        } else {
            this.bucketService.updateTrip(this.trip);
            this.tripsService.updateTrip(this.trip);
        }
    }
    removeTrip() {
        this.tripsService.deleteProduct(this.trip);
    }
}
