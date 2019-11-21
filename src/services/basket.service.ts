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
  getProduct(item: number): Trip {
    return this.saleTrips.find(({ id }) => id === item);
  }
  addProduct(trip: Trip) {
    this.saleTrips.push(trip);
  }
  deleteProduct(item: number) {
    this.saleTrips = this.saleTrips.filter(element => {
      if (element.id != item) {
        return element;
      }
    });
  }
}
