import { element } from 'protractor';
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
  deleteProduct(item: number) {
    const index = this.trips.findIndex(({ id }) => id === item);
    this.trips.slice(index, index + 1);
  }
  updateTrip(item: Trip) {
    this.trips = this.trips.map(element => {
      if(element.id == item.id) {
        return item;
      } else {
        return element;
      }
    })
  }
}
