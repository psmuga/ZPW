import { Injectable } from '@angular/core';
import { Opinion, Star } from 'src/models/opinion';
import { Observable } from 'rxjs';
import { AngularFirestoreDocument, AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class OpinionService {
    data$: Observable<Opinion[]>;
    dataCollection: AngularFirestoreCollection<Opinion>;
    dataDoc: AngularFirestoreDocument<Opinion>;

    constructor(private afs: AngularFirestore) {
        this.dataCollection = this.afs.collection('opinions');
    }

    getOpinions(id: string): Observable<Opinion[]> {
        this.dataCollection = this.afs.collection('opinions', x => {
            return x.where('tripID', '==', id);
        });

        this.data$ = this.dataCollection.snapshotChanges().pipe(
            map(changes => {
                return changes.map(a => {
                    const data = a.payload.doc.data() as Opinion;
                    data.id = a.payload.doc.id;
                    return data;
                });
            })
        );
        return this.data$;
    }

    addOpinion(element: Opinion){
        this.dataCollection.add(element);
    }
    updateOpinion(item: Opinion) {
        this.dataDoc = this.afs.doc(`opinions/${item.id}`);
        this.dataDoc.update(item);
    }
    deleteOpinion(opinion: Opinion | number) {
        const id = typeof opinion === 'number' ? opinion : opinion.id;
        this.dataDoc = this.afs.doc(`opinions/${id}`);
        this.dataDoc.delete();
    }
}
