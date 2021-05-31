import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PwRecoveryPage } from './pw-recovery.page';

describe('PwRecoveryPage', () => {
  let component: PwRecoveryPage;
  let fixture: ComponentFixture<PwRecoveryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PwRecoveryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PwRecoveryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
