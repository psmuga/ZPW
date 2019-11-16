/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TripsService } from './trips-service.service';

describe('Service: TripsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TripsService]
    });
  });

  it('should ...', inject([TripsService], (service: TripsService) => {
    expect(service).toBeTruthy();
  }));
});
