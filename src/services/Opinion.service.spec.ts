/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OpinionService } from './Opinion.service';

describe('Service: Opinion', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OpinionService]
    });
  });

  it('should ...', inject([OpinionService], (service: OpinionService) => {
    expect(service).toBeTruthy();
  }));
});
