import { Trip } from './../models/trip';
import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Opinion, Star } from 'src/models/opinion';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const t: Trip[] = [
      {
        id: 0,
        name: 'Trip 1',
        country: 'Poland',
        startDate: new Date(),
        endDate: new Date(),
        cost: 1000,
        capacity: 15,
        capacityUsed: 0,
        description:
          'Et nulla culpa quis adipisicing do cupidatat tempor eu officia adipisicing ipsum.',
        photoLink: '../../assets/poland.jpg',
        totalStar: 0
      },
      {
        id: 1,
        name: 'Trip 2',
        country: 'England',
        startDate: new Date(),
        endDate: new Date(),
        cost: 3000,
        capacity: 40,
        capacityUsed: 0,
        description:
          'Et nulla culpa quis adipisicing do cupidatat tempor eu officia adipisicing ipsum.',
        photoLink: '../../assets/england.jpg',
        totalStar: 0
      },
      {
        id: 2,
        name: 'Trip 3',
        country: 'Spain',
        startDate: new Date(),
        endDate: new Date(),
        cost: 4000,
        capacity: 10,
        capacityUsed: 0,
        description:
          'Et nulla culpa quis adipisicing do cupidatat tempor eu officia adipisicing ipsum.',
        photoLink: '../../assets/spain.jpg',
        totalStar: 0
      },
      {
        id: 3,
        name: 'Trip 4',
        country: 'Greece',
        startDate: new Date(),
        endDate: new Date(),
        cost: 2000,
        capacity: 20,
        capacityUsed: 0,
        description:
          'Et nulla culpa quis adipisicing do cupidatat tempor eu officia adipisicing ipsum.',
        photoLink: '../../assets/greece.jpg',
        totalStar: 0
      },
      {
        id: 4,
        name: 'Trip 5',
        country: 'Bali',
        startDate: new Date(),
        endDate: new Date(),
        cost: 5000,
        capacity: 40,
        capacityUsed: 0,
        description:
          'Et nulla culpa quis adipisicing do cupidatat tempor eu officia adipisicing ipsum.',
        photoLink: '../../assets/bali.jpg',
        totalStar: 0
      },
      {
        id: 5,
        name: 'Trip 6',
        country: 'Austria',
        startDate: new Date(),
        endDate: new Date(),
        cost: 3000,
        capacity: 40,
        capacityUsed: 0,
        description:
          'Et nulla culpa quis adipisicing do cupidatat tempor eu officia adipisicing ipsum.',
        photoLink: '../../assets/austria.jpg',
        totalStar: 0
      },
      {
        id: 6,
        name: 'Trip 7',
        country: 'Bora Bora',
        startDate: new Date(),
        endDate: new Date(),
        cost: 7000,
        capacity: 40,
        capacityUsed: 0,
        description:
          'Et nulla culpa quis adipisicing do cupidatat tempor eu officia adipisicing ipsum.',
        photoLink: '../../assets/bora.jpg',
        totalStar: 0
      },
      {
        id: 7,
        name: 'Trip 8',
        country: 'USA',
        startDate: new Date(),
        endDate: new Date(),
        cost: 7000,
        capacity: 40,
        capacityUsed: 0,
        description:
          'Et nulla culpa quis adipisicing do cupidatat tempor eu officia adipisicing ipsum.',
        photoLink: '../../assets/usa.jpg',
        totalStar: 0
      }
    ];
    const opinions: Opinion[] = [
      {
        author: 'Piotr Smuga',
        comment: 'That was the best vacation ever',
        time: new Date(),
        id: 1
      },
      {
        author: 'Marcin Smuga',
        comment: 'That was the best vacation ever 2',
        time: new Date(),
        id: 1
      },
      {
        author: 'Jan Kowalski',
        comment: 'Awesome trip!',
        time: new Date(),
        id: 2
      }
    ];
    const stars: Star[] = [
      {
        id: 0,
        author: 'Piotr Smuga',
        star: 2
      },
      {
        id: 2,
        author: 'Piotr Smuga',
        star: 4
      }
    ];

    return { t, opinions, stars };
  }

  genId(heroes: Trip[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 0;
  }
}