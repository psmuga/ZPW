export interface OpinionConfig {
  value: number;
  max: number;
}

export interface Opinion {
  author: string;
  comment: string;
  time: Date;
  tripID: string;
  id?: string;
}

export interface Star {
    star: number;
    author: string;
    tripID: string;
    id?: string;
}