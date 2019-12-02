import { Trip } from 'src/models/trip';
import { Injectable } from '@angular/core';
import { element } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  saleTrips: Trip[];
  constructor() {
    this.saleTrips = [];
  }
  getProducts(): Trip[] {
    return this.saleTrips;
  }
  getProduct(item: string): Trip {
    return this.saleTrips.find(({ id }) => id === item);
  }
  addProduct(trip: Trip) {
    if (this.getProduct(trip.id) === undefined) {
      this.saleTrips.push(trip);
    }
  }
  deleteProduct(item: string) {
    this.saleTrips = this.saleTrips.filter(element => {
      if (element.id != item) {
        return element;
      }
    });
  }
  updateTrip(item: Trip) {
    this.saleTrips = this.saleTrips.map(element => {
      if(element.id == item.id) {
        return item;
      } else {
        return element;
      }
    })
  }
}
