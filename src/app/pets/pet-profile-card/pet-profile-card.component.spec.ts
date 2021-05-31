import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PetProfileCardComponent } from './pet-profile-card.component';

describe('PetProfileCardComponent', () => {
  let component: PetProfileCardComponent;
  let fixture: ComponentFixture<PetProfileCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PetProfileCardComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetProfileCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
