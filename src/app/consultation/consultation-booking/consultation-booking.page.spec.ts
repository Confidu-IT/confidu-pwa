import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ConsultationBookingPage } from './consultation-booking.page';

describe('ConsultationBookingPage', () => {
  let component: ConsultationBookingPage;
  let fixture: ComponentFixture<ConsultationBookingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultationBookingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ConsultationBookingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
