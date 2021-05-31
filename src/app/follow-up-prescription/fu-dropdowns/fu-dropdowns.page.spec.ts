import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FuDropdownsPage } from './fu-dropdowns.page';

describe('FuDropdownsPage', () => {
  let component: FuDropdownsPage;
  let fixture: ComponentFixture<FuDropdownsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FuDropdownsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FuDropdownsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
