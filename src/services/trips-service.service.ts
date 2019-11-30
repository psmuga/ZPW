import { Trip } from "./../models/trip";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { FilterSettings } from "src/models/filters";
import { filter, map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class TripsService {
  private tripsUrl = "api/t";
  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };
  constructor(private http: HttpClient) {}

  getProducts(filterOpt: FilterSettings): Observable<Trip[]> {
    filterOpt = filterOpt ? filterOpt : {};
    return this.http
      .get<Trip[]>(this.tripsUrl)
      .pipe(
        map(item =>
          filterOpt.min ? item.filter(s => s.cost >= filterOpt.min) : item
        )
      )
      .pipe(
        map(item =>
          filterOpt.max ? item.filter(s => s.cost <= filterOpt.max) : item
        )
      )
      .pipe(
        map(item =>
          filterOpt.country
            ? item.filter(s => s.country.toLowerCase().includes(filterOpt.country.trim().toLowerCase()))
            : item
        )
      )
      .pipe(
        map(item =>
          filterOpt.name
            ? item.filter(s => s.name.toLowerCase().includes(filterOpt.name.trim().toLowerCase()))
            : item
        )
      );
  }
  getProduct(item: number): Observable<Trip> {
    const url = `${this.tripsUrl}/${item}`;

    return this.http.get<Trip>(url);
  }
  addProduct(trip: Trip): Observable<Trip> {
    return this.http.post<Trip>(this.tripsUrl, trip, this.httpOptions);
  }
  deleteProduct(trip: Trip | number): Observable<Trip> {
    const id = typeof trip === "number" ? trip : trip.id;
    const url = `${this.tripsUrl}/${id}`;

    return this.http.delete<Trip>(url, this.httpOptions);
  }
  updateTrip(item: Trip): Observable<any> {
    return this.http.put(this.tripsUrl, item, this.httpOptions);
  }
}
