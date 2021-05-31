import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PetCareCardPage } from './pet-care-card.page';

describe('PetCareCardPage', () => {
  let component: PetCareCardPage;
  let fixture: ComponentFixture<PetCareCardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PetCareCardPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetCareCardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
