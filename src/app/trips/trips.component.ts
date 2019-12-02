import { AuthService } from 'src/services/Auth.service';
import { TripsService } from './../../services/trips-service.service';
import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Trip } from 'src/models/trip';
import { MatDialog } from '@angular/material/dialog';
import { NewTripComponent } from '../newTrip/newTrip.component';
import { FilterSettings } from 'src/models/filters';
@Component({
    selector: 'app-trips',
    templateUrl: './trips.component.html',
    styleUrls: ['./trips.component.scss']
})
export class TripsComponent implements OnInit, OnChanges {
    trips: Trip[];
    totalSale = 0;
    filter: FilterSettings;
    isAdmin = false;
    constructor(private tripsService: TripsService, private auth: AuthService, public dialog: MatDialog) {}

    ngOnInit() {
        this.getProducts();
        this.auth.isAdmin().then(x => {
            this.isAdmin = x;
        });
    }
    ngOnChanges(changes: SimpleChanges): void {
        this.getProducts();
    }

    getProducts() {
        this.tripsService.getProducts(this.filter).subscribe(trips => {
            this.trips = trips;
            this.getTotalSale();
        });
    }

    getHighCost(): number {
        return Math.max.apply(
            Math,
            this.trips.map(o => o.cost)
        );
    }
    getLowCost(): number {
        return Math.min.apply(
            Math,
            this.trips.map(o => o.cost)
        );
    }
    getTotalSale() {
        // this.totalSale = this.trips
        //   .map(item => item.capacityUsed)
        //   .reduce((prev, cur) => prev + cur);
    }
    onDeleted($event) {
        const trip = this.trips.find(value => value.id ===$event);
        this.tripsService.deleteProduct(trip);
        this.trips = this.trips.filter(value => value.id !== $event);
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(NewTripComponent, {
            width: '50em'
        });

        dialogRef.afterClosed().subscribe(result => {
            this.getProducts();
        });
    }
    search($event) {
        this.filter = $event;
        this.getProducts();
    }
}
