import { Trip } from './../models/trip';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {tap} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class TripsService {
  private tripsUrl = 'api/t';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) {}

  getProducts(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.tripsUrl);
  }
  getProduct(item: number): Observable<Trip> {
    const url = `${this.tripsUrl}/${item}`;

    return this.http.get<Trip>(url);
  }
  addProduct(trip: Trip): Observable<Trip> {
    return this.http.post<Trip>(this.tripsUrl, trip, this.httpOptions);
  }
  deleteProduct(trip: Trip | number): Observable<Trip> {
    const id = typeof trip === 'number' ? trip : trip.id;
    const url = `${this.tripsUrl}/${id}`;

    return this.http.delete<Trip>(url, this.httpOptions);
  }
  updateTrip(item: Trip): Observable<any> {
    return this.http.put(this.tripsUrl, item, this.httpOptions);
  }
}
