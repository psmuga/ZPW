import { Trip } from './../../models/trip';
import { TripsService } from 'src/services/trips-service.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-detailTrip',
  templateUrl: './detailTrip.component.html',
  styleUrls: ['./detailTrip.component.scss']
})
export class DetailTripComponent implements OnInit, OnDestroy {
  trip: Trip;
  id: number;
  sub: any;
  constructor(
    private tripsService: TripsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.trip = this.tripsService.getProduct(+params['id']);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  getTotalStars()  {
    return 0;
  }
}
