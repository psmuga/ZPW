/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OpinionComponent } from './opinion.component';

describe('OpinionComponent', () => {
  let component: OpinionComponent;
  let fixture: ComponentFixture<OpinionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpinionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpinionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
