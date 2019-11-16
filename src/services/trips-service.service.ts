import { trips } from './../models/FakeData';
import { Injectable } from '@angular/core';
import { Trip } from 'src/models/trip';

@Injectable({
  providedIn: 'root'
})
export class TripsService {
  trips: Trip[] = trips;
  constructor() {}

  getProducts(): Trip[] {
    return this.trips;
  }
  getProduct(item: string): Trip {
    return this.trips.find(({ name }) => name === item);
  }
  addProduct(trip: Trip) {
    this.trips.push(trip);
  }
  deleteProduct(item: string) {
    const index = this.trips.findIndex(({ name }) => name === item);
    this.trips.slice(index, index + 1);
  }
}
