import { Component, OnInit } from '@angular/core';
import { Trip } from 'src/models/trip';
@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.scss']
})
export class TripsComponent implements OnInit {
  trips: Trip[];

  constructor() {}

  ngOnInit() {
    this.trips = [
      {
        name: 'Trip 1',
        country: 'Poland',
        startDate: new Date(),
        endDate: new Date(),
        cost: 1000,
        capacity: 15,
        capacityUsed: 0,
        description:
          'Et nulla culpa quis adipisicing do cupidatat tempor eu officia adipisicing ipsum.',
        photoLink: '../../assets/poland.jpg'
      },
      {
        name: 'Trip 2',
        country: 'England',
        startDate: new Date(),
        endDate: new Date(),
        cost: 3000,
        capacity: 40,
        capacityUsed: 0,
        description:
          'Et nulla culpa quis adipisicing do cupidatat tempor eu officia adipisicing ipsum.',
        photoLink: '../../assets/england.jpg'
      },
      {
        name: 'Trip 3',
        country: 'Spain',
        startDate: new Date(),
        endDate: new Date(),
        cost: 4000,
        capacity: 10,
        capacityUsed: 0,
        description:
          'Et nulla culpa quis adipisicing do cupidatat tempor eu officia adipisicing ipsum.',
        photoLink: '../../assets/spain.jpg'
      },
      {
        name: 'Trip 4',
        country: 'Greece',
        startDate: new Date(),
        endDate: new Date(),
        cost: 2000,
        capacity: 20,
        capacityUsed: 0,
        description:
          'Et nulla culpa quis adipisicing do cupidatat tempor eu officia adipisicing ipsum.',
        photoLink: '../../assets/greece.jpg'
      },
      {
        name: 'Trip 5',
        country: 'Bali',
        startDate: new Date(),
        endDate: new Date(),
        cost: 5000,
        capacity: 40,
        capacityUsed: 0,
        description:
          'Et nulla culpa quis adipisicing do cupidatat tempor eu officia adipisicing ipsum.',
        photoLink: '../../assets/bali.jpg'
      },
      {
        name: 'Trip 6',
        country: 'Austria',
        startDate: new Date(),
        endDate: new Date(),
        cost: 3000,
        capacity: 40,
        capacityUsed: 0,
        description:
          'Et nulla culpa quis adipisicing do cupidatat tempor eu officia adipisicing ipsum.',
        photoLink: '../../assets/austria.jpg'
      },
      {
        name: 'Trip 7',
        country: 'Bora Bora',
        startDate: new Date(),
        endDate: new Date(),
        cost: 7000,
        capacity: 40,
        capacityUsed: 0,
        description:
          'Et nulla culpa quis adipisicing do cupidatat tempor eu officia adipisicing ipsum.',
        photoLink: '../../assets/bora.jpg'
      },
      {
        name: 'Trip 8',
        country: 'USA',
        startDate: new Date(),
        endDate: new Date(),
        cost: 7000,
        capacity: 40,
        capacityUsed: 0,
        description:
          'Et nulla culpa quis adipisicing do cupidatat tempor eu officia adipisicing ipsum.',
        photoLink: '../../assets/usa.jpg'
      }
    ];
  }

  getHighCost(): number {
    return Math.max.apply(Math, this.trips.map(o => o.cost));
  }
  getLowCost(): number {
    return Math.min.apply(Math, this.trips.map(o => o.cost));
  }
  getTotalSale(): number {
    return this.trips
      .map(item => item.capacityUsed)
      .reduce((prev, cur) => prev + cur);
  }

  onDeleted($event) {
    this.trips = this.trips.filter(value => value.name !== $event);
  }
}
