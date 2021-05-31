import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ConsultationSchedulerPage } from './consultation-scheduler.page';

describe('ConsultationSchedulerPage', () => {
  let component: ConsultationSchedulerPage;
  let fixture: ComponentFixture<ConsultationSchedulerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultationSchedulerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ConsultationSchedulerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
