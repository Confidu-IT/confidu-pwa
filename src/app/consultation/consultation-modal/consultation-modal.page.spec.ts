import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ConsultationModalPage } from './consultation-modal.page';

describe('ConsultationModalPage', () => {
  let component: ConsultationModalPage;
  let fixture: ComponentFixture<ConsultationModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultationModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ConsultationModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
