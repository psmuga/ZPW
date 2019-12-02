import { Trip } from './../models/trip';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FilterSettings } from 'src/models/filters';
import { map, filter } from 'rxjs/operators';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
@Injectable({
    providedIn: 'root'
})
export class TripsService {
    data$: Observable<Trip[]>;
    dataCollection: AngularFirestoreCollection<Trip>;
    dataDoc: AngularFirestoreDocument<Trip>;
    constructor(private afs: AngularFirestore) {
        this.dataCollection = this.afs.collection('trips');
        this.getProducts();
    }

    getProducts(filterOpt?: FilterSettings): Observable<Trip[]> {
        filterOpt = filterOpt ? filterOpt : {};
        this.data$ = this.dataCollection
            .snapshotChanges()
            .pipe(
                map(changes => {
                    return changes.map(a => {
                        const data = a.payload.doc.data() as Trip;
                        data.id = a.payload.doc.id;
                        return data;
                    });
                })
            )
            .pipe(map(item => (filterOpt.min ? item.filter(s => s.cost >= filterOpt.min) : item)))
            .pipe(map(item => (filterOpt.max ? item.filter(s => s.cost <= filterOpt.max) : item)))
            .pipe(
                map(item =>
                    filterOpt.country ? item.filter(s => s.country.toLowerCase().includes(filterOpt.country.trim().toLowerCase())) : item
                )
            )
            .pipe(
                map(item => (filterOpt.name ? item.filter(s => s.name.toLowerCase().includes(filterOpt.name.trim().toLowerCase())) : item))
            );

        return this.data$;
    }
    getProduct(item: string) {
        this.dataDoc = this.afs.doc(`trips/${item}`);
        return this.dataDoc.valueChanges();
    }
    addProduct(trip: Trip) {
        return this.dataCollection.add(trip);
    }
    deleteProduct(trip: Trip) {
        this.dataDoc = this.afs.doc(`trips/${trip.id}`);
        this.dataDoc.delete();
    }
    updateTrip(item: Trip) {
        this.dataDoc = this.afs.doc(`trips/${item.id}`);
        this.dataDoc.update(item);
    }
}
