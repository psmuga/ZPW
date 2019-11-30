import { AuthService } from 'src/services/Auth.service';
import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'ZPW';
    constructor(public auth: AuthService) {}
}
