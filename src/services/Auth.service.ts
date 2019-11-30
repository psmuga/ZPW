import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { Observable } from 'rxjs/index';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';

export interface Credentials {
    email: string;
    password: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    readonly authState$: Observable<User | null> = this.fireAuth.authState;
    constructor(private fireAuth: AngularFireAuth, private router: Router) {}

    get user(): User | null {
        return this.fireAuth.auth.currentUser;
    }
    // login({ email, password }: Credentials) {
    //     return this.fireAuth.auth.signInWithEmailAndPassword(email, password);
    // }
    login({ email, password }: Credentials) {
        const session = firebase.auth.Auth.Persistence.SESSION;
        return this.fireAuth.auth.setPersistence(session).then(() => {
            return this.fireAuth.auth.signInWithEmailAndPassword(
                email,
                password
            );
        });
    }
    register({ email, password }: Credentials) {
        return this.fireAuth.auth.createUserWithEmailAndPassword(
            email,
            password
        );
    }
    logout() {
        this.router.navigate(['login']);
        return this.fireAuth.auth.signOut();
    }
}
