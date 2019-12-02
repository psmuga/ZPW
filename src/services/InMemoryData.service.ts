import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Opinion, Star } from 'src/models/opinion';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const opinions: Opinion[] = [
      {
        author: 'Piotr Smuga',
        comment: 'That was the best vacation ever',
        time: new Date(),
        id: '1'
      },
      {
        author: 'Marcin Smuga',
        comment: 'That was the best vacation ever 2',
        time: new Date(),
        id: '1'
      },
      {
        author: 'Jan Kowalski',
        comment: 'Awesome trip!',
        time: new Date(),
        id: '2'
      }
    ];
    const stars: Star[] = [
      {
        id: '0',
        author: 'Piotr Smuga',
        star: 2
      },
      {
        id: '2',
        author: 'Piotr Smuga',
        star: 4
      }
    ];

    return { opinions, stars };
  }
}