import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePetPage } from './create-pet.page';

describe('CreatePetPage', () => {
  let component: CreatePetPage;
  let fixture: ComponentFixture<CreatePetPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreatePetPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
