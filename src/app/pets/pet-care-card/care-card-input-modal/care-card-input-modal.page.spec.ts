import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CareCardInputModalPage } from './care-card-input-modal.page';

describe('CareCardInputModalPage', () => {
  let component: CareCardInputModalPage;
  let fixture: ComponentFixture<CareCardInputModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CareCardInputModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CareCardInputModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
