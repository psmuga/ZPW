import { stars } from './../models/fakeOpinion';
import { Injectable } from '@angular/core';
import { Opinion, Star } from 'src/models/opinion';
import { opinions } from 'src/models/fakeOpinion';

@Injectable({
  providedIn: 'root'
})
export class OpinionService {
  stars: Star[];
  opinions: Opinion[];
  constructor() {
    this.opinions = opinions;
    this.stars = stars;
  }
  getOpinions(id: number) {
    return this.opinions.filter(item => {
      return item.id === id;
    });
  }

  addOpinion(element: Opinion) {
    this.opinions.push(element);
  }
  updateOpinion(item: Opinion) {
    this.opinions = this.opinions.map(element => {
      if(element.id == item.id) {
        return item;
      } else {
        return element;
      }
    })
  }

  getStars(id: number) {
    return this.stars.filter(item => {
      return item.id == id;
    })
  }

  addStar(element: Star)  {
    this.stars.push(element);
  }

  updateStars(item: Star) {
    this.stars = this.stars.map(element => {
      if(element.id == item.id) {
        return item;
      } else {
        return element;
      }
    })
  }
}
