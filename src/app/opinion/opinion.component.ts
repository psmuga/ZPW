import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { OpinionConfig } from 'src/models/opinion';

@Component({
  selector: 'app-opinion',
  templateUrl: './opinion.component.html',
  styleUrls: ['./opinion.component.scss']
})
export class OpinionComponent implements OnInit {
  settings: OpinionConfig;
  @Input() totalStar: number;
  @Output() voted = new EventEmitter<number>();
  index = 0;
  constructor() {}

  ngOnInit() {
    this.settings = {
      max: 5,
      min: 0,
      step: 1,
      value: -1,
      thumbLabel: true
    };
  }

  vote() {
    this.index++;
    this.voted.emit(this.settings.value);
  }
  getTotalStars() {
    const result = this.totalStar / this.index;
    return Number.isNaN(result) ? 0 : result;
  }
}
