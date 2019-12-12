import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/Auth.service';
import { Trip } from 'src/models/trip';
import { TripsService } from 'src/services/trips-service.service';
import { NewTripComponent } from '../newTrip/newTrip.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
    trips: Trip[];
    constructor(private auth: AuthService, private tripsService: TripsService, public dialog: MatDialog) {}

    ngOnInit() {
        this.getProducts();
    }

    getProducts() {
        this.tripsService.getProducts().subscribe(trips => {
            this.trips = trips;
        });
    }

    delete(org: Trip) {
        this.tripsService.deleteProduct(org);
    }

    update(org: Trip) {
        this.tripsService.updateTrip(org);
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
