import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() showBucket = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit() {
  }

  onShowBucket() {
    this.showBucket.emit();
  }
}
