import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreedProposalsModalPage } from './breed-proposals-modal.page';

describe('BreedProposalsModalPage', () => {
  let component: BreedProposalsModalPage;
  let fixture: ComponentFixture<BreedProposalsModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreedProposalsModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreedProposalsModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
