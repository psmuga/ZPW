import { TripsService } from 'src/services/trips-service.service';
import { BasketService } from './../../services/basket.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Trip } from 'src/models/trip';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/services/Auth.service';

@Component({
    selector: 'app-trip',
    templateUrl: './trip.component.html',
    styleUrls: ['./trip.component.scss']
})
export class TripComponent implements OnInit {
    @Input() trip: Trip;
    @Input() max: number;
    @Input() min: number;
    @Output() deleted = new EventEmitter<string>();
    isAdmin = false;
    constructor(
        private bucketService: BasketService,
        private snackBar: MatSnackBar,
        private tripService: TripsService,
        private auth: AuthService
    ) {}

    ngOnInit() {
        this.auth.isAdmin().then(x => {
            this.isAdmin = x;
        });
    }

    add(): void {
        this.trip.capacityUsed += 1;
        //this.tripService.updateTrip(this.trip);
        this.snackBar.open('Added 1 item to bucket!', 'OK', { duration: 2000 });
        this.bucketService.addProduct(this.trip);
    }
    resign(): void {
        this.trip.capacityUsed -= 1;
        if(this.trip.capacityUsed === 0) {
            this.bucketService.deleteProduct(this.trip.id);
        }
        this.bucketService.updateTrip(this.trip);
        //this.tripService.updateTrip(this.trip);
    }
    removeTrip() {
        this.deleted.emit(this.trip.id);
    }
    onVoted($event) {
        this.trip.totalStar += $event;
    }
}
