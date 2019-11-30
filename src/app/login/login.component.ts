import { Component, OnInit } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { AuthService, Credentials } from 'src/services/Auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    hide = true;
    email = new FormControl('', [Validators.required, Validators.email]);
    password = new FormControl('', [Validators.required, Validators.minLength(6)]);
    constructor(public auth: AuthService, private router: Router) {}

    ngOnInit() {}
    getErrorMessage() {
        return this.email.hasError('required') ? 'You must enter a value' : this.email.hasError('email') ? 'Not a valid email' : '';
    }
    getErrorPasswordMessage() {
        return this.password.hasError('required')
            ? 'You must enter a value'
            : this.password.hasError('minlength')
            ? 'Not a valid password'
            : '';
    }
    isValid(): boolean {
        return this.email.valid && this.password.valid;
    }

    onLoginWithEmailAndPassword() {
        const data: Credentials = { email: this.email.value, password: this.password.value };
        this.email.reset();
        this.password.reset();
        this.auth.login(data).then(() => this.router.navigate(['home']));
    }
}
