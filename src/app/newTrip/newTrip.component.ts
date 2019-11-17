import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { TripsService } from 'src/services/trips-service.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Validators } from '@angular/forms';
import { Trip } from 'src/models/trip';

@Component({
  selector: 'app-newTrip',
  templateUrl: './newTrip.component.html',
  styleUrls: ['./newTrip.component.scss']
})
export class NewTripComponent implements OnInit {
  tripForm = new FormGroup({
    name: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    amount: new FormControl('', Validators.required),
    capacity: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    start: new FormControl('', Validators.required),
    end: new FormControl('', Validators.required),
    photo: new FormControl('', Validators.required)
  });
  constructor(
    private tripsService: TripsService,
    public dialogRef: MatDialogRef<NewTripComponent>
  ) {}

  ngOnInit() {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  add() {
    const ID =
      this.tripsService.trips[this.tripsService.trips.length - 1].id + 1;
    const newTrip: Trip = {
      id: ID,
      name: this.tripForm.value.name,
      capacity: this.tripForm.value.capacity,
      capacityUsed: 0,
      cost: this.tripForm.value.amount,
      country: this.tripForm.value.country,
      description: this.tripForm.value.description,
      totalStar: 0,
      startDate: this.tripForm.value.start,
      endDate: this.tripForm.value.end,
      photoLink: this.tripForm.value.photo
    };
    this.tripsService.addProduct(newTrip);
    this.dialogRef.close();
  }
}
