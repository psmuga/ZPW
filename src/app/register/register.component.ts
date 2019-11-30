import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/services/Auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    hide = true;
    hide2 = true;
    email = new FormControl('', [Validators.required, Validators.email]);
    password = new FormControl('', [Validators.required, Validators.minLength(6)]);
    repeat = new FormControl('', [Validators.required, Validators.minLength(6)]);
    constructor(public auth: AuthService, private router: Router, private snackBar: MatSnackBar) {}

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
    getErrorRepeatPasswordMessage() {
        if (this.repeat.invalid) {
            return 'Password must be the same';
        }
    }
    isValid(): boolean {
        return this.email.valid && this.password.valid && this.password.value === this.repeat.value;
    }
    signUp() {
        this.auth.register({ email: this.email.value, password: this.password.value }).then(_ => {
            this.snackBar.open('Account was created!', 'OK', { duration: 2000 });
            this.router.navigate(['home']);
        });
    }
}
