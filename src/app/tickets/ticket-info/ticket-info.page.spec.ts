import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketInfoPage } from './ticket-info.page';

describe('TicketInfoPage', () => {
  let component: TicketInfoPage;
  let fixture: ComponentFixture<TicketInfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketInfoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
