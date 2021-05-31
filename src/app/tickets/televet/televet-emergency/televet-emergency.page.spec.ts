import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TelevetEmergencyPage } from './televet-emergency.page';

describe('TelevetEmergencyPage', () => {
  let component: TelevetEmergencyPage;
  let fixture: ComponentFixture<TelevetEmergencyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TelevetEmergencyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TelevetEmergencyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
