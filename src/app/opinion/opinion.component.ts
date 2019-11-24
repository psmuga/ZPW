import { Star } from './../../models/opinion';
import { Trip } from './../../models/trip';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { OpinionConfig, Opinion } from 'src/models/opinion';
import { OpinionService } from 'src/services/Opinion.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-opinion',
  templateUrl: './opinion.component.html',
  styleUrls: ['./opinion.component.scss']
})
export class OpinionComponent implements OnInit {
  settings: OpinionConfig;
  @Input() trip: Trip;
  @Output() totalS = new EventEmitter<number>();
  opinionForm = new FormGroup({
    coment: new FormControl('', Validators.required)
  });
  star = 0;
  stars: Star[];
  index = 0;
  opinions: Opinion[];
  constructor(private opinionService: OpinionService) {}

  ngOnInit() {
    this.settings = {
      max: 5,
      value: -1
    };
    this.getOpinions();
    this.getStars();
    this.totalS.emit(this.getTotalStars());
  }

  getOpinions() {
    this.opinions = this.opinionService.getOpinions(this.trip.id);
  }
  getStars() {
    this.stars = this.opinionService.getStars(this.trip.id);
    if (this.stars[0]) {
      this.star = this.stars[0].star;
    }
  }

  addStar() {
    const st: Star = {
      author: 'abc',
      id: this.trip.id,
      star: this.star
    };
    this.opinionService.addStar(st);
    this.stars.push(st);
    this.totalS.emit(this.getTotalStars());
  }

  getTotalStars() {
    const result =
      this.stars.reduce((a, b) => a + b.star, 0) / this.stars.length;
    return Number.isNaN(result) ? 0 : result;
  }

  onCreateComment() {
    const opinion: Opinion = {
      author: 'XYZ',
      time: new Date(),
      comment: this.opinionForm.value.coment,
      id: this.trip.id
    };
    this.opinions.push(opinion);
    this.opinionService.addOpinion(opinion);
    this.opinionForm.reset();
  }
}
