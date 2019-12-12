import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/Auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isAdmin = false;
  constructor(public auth: AuthService) {}

  ngOnInit() {
    this.auth.isAdmin().then(x => {
      this.isAdmin = x;
  });
  }
}
