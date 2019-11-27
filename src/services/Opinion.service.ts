import { Injectable } from '@angular/core';
import { Opinion, Star } from 'src/models/opinion';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpinionService {
  stars: Star[];
  opinions: Opinion[];
  private opinionUrl = 'api/opinions';
  private starsUrl = 'api/stars';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) {}

  getOpinions(id: number): Observable<Opinion[]> {
    return this.http.get<Opinion[]>(`${this.opinionUrl}/?id=${id}`);
  }

  addOpinion(element: Opinion): Observable<Opinion> {
    return this.http.post<Opinion>(this.opinionUrl, element, this.httpOptions);
  }
  updateOpinion(item: Opinion): Observable<any> {
    return this.http.put(this.opinionUrl, item, this.httpOptions);
  }
  deleteOpinion(opinion: Opinion | number): Observable<Opinion> {
    const id = typeof opinion === 'number' ? opinion : opinion.id;
    const url = `${this.opinionUrl}/${id}`;

    return this.http.delete<Opinion>(url, this.httpOptions);
  }

  getStars(id: number): Observable<Star[]> {
    return this.http.get<Star[]>(`${this.starsUrl}/?id=${id}`);
  }

  addStar(element: Star): Observable<Star> {
    return this.http.post<Star>(this.starsUrl, element, this.httpOptions);
  }
  updateStars(item: Star): Observable<any> {
    return this.http.put(this.starsUrl, item, this.httpOptions);
  }

}
