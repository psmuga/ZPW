import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, of } from 'rxjs/index';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User, Roles } from 'src/models/user';
import { switchMap } from 'rxjs/operators';

export interface Credentials {
    email: string;
    password: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    readonly authState$: Observable<User | null> = this.fireAuth.authState;
    constructor(private fireAuth: AngularFireAuth, private afs: AngularFirestore, private router: Router) {
        this.fireAuth.authState.pipe(
            switchMap(user => {
                // Logged in
                if (user) {
                    return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
                } else {
                    // Logged out
                    return of(null);
                }
            })
        );
    }

    get user(): User | null {
        return this.fireAuth.auth.currentUser;
    }
    // login({ email, password }: Credentials) {
    //     return this.fireAuth.auth.signInWithEmailAndPassword(email, password);
    // }

    isAdmin(): Promise<boolean> {
        return this.afs
            .doc(`users/${this.user.uid}`)
            .get()
            .toPromise()
            .then(x => {
                return x.get('role') === Roles.admin ? true : false;
            });
    }
    login({ email, password }: Credentials) {
        const session = firebase.auth.Auth.Persistence.SESSION;
        return this.fireAuth.auth.setPersistence(session).then(() => {
            return this.fireAuth.auth.signInWithEmailAndPassword(email, password);
        });
    }
    async register({ email, password }: Credentials) {
        const credential = await this.fireAuth.auth.createUserWithEmailAndPassword(email, password);
        return this.updateUserData(credential.user);
    }
    logout() {
        this.router.navigate(['login']);
        return this.fireAuth.auth.signOut();
    }

    async googleSignin() {
        const provider = new firebase.auth.GoogleAuthProvider();
        const credential = await firebase.auth().signInWithPopup(provider);
        return this.updateUserData(credential.user);
    }

    private updateUserData(user) {
        // Sets user data to firestore on login
        const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

        const data = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL
        };
        this.router.navigate(['dashboard']);
        return userRef.set(data, { merge: true });
    }
}
