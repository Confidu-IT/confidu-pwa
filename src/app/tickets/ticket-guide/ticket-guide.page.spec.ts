import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketGuidePage } from './ticket-guide.page';

describe('TicketGuidePage', () => {
  let component: TicketGuidePage;
  let fixture: ComponentFixture<TicketGuidePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketGuidePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketGuidePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
