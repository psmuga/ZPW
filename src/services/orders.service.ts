import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class OrdersService {
    data$: Observable<Order[]>;
    dataCollection: AngularFirestoreCollection<Order>;
    dataDoc: AngularFirestoreDocument<Order>;
    constructor(private afs: AngularFirestore) {
        this.dataCollection = this.afs.collection('orders');
    }

    getOrders(userid: string, tripid: string): Observable<Order[]> {
        this.dataCollection = this.afs.collection('orders', x => {
            const z = x.where('userID', '==', userid);
            return z.where('tripID', '==', tripid);
        });

        this.data$ = this.dataCollection.snapshotChanges().pipe(
            map(changes => {
                return changes.map(a => {
                    const data = a.payload.doc.data() as Order;
                    data.id = a.payload.doc.id;
                    return data;
                });
            })
        );
        return this.data$;
    }
    addOrder(element: Order) {
        this.dataCollection.add(element);
    }
    updateOrder(item: Order) {
      this.dataDoc = this.afs.doc(`orders/${item.id}`);
      this.dataDoc.update(item);
  }
}

export interface Order {
    id?: string;
    userID: string;
    tripID: string;
    star?: number;
    comment?: string;
}
