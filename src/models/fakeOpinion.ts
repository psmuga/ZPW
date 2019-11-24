import { Opinion, Star } from './opinion';

export let opinions: Opinion[] = [
  {
    author: 'Piotr Smuga',
    comment: 'That was the best vacation ever',
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

export let stars: Star[] = [
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
