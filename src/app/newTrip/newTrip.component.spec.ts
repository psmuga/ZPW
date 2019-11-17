/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NewTripComponent } from './newTrip.component';

describe('NewTripComponent', () => {
  let component: NewTripComponent;
  let fixture: ComponentFixture<NewTripComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewTripComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
