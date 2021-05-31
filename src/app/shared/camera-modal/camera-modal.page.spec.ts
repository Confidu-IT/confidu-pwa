import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CameraModalPage } from './camera-modal.page';

describe('CameraModalPage', () => {
  let component: CameraModalPage;
  let fixture: ComponentFixture<CameraModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CameraModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CameraModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
