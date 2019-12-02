export interface OpinionConfig {
  value: number;
  max: number;
}

export interface Opinion {
  author: string;
  comment: string;
  time: Date;
  id: string;
}

export interface Star {
    star: number;
    author: string;
    id: string;
}