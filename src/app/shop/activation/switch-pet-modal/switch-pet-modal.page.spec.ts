import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SwitchPetModalPage } from './switch-pet-modal.page';

describe('SwitchPetModalPage', () => {
  let component: SwitchPetModalPage;
  let fixture: ComponentFixture<SwitchPetModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwitchPetModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SwitchPetModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
