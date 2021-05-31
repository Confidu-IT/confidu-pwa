import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RationCheckPage } from './ration-check.page';

describe('RationCheckPage', () => {
  let component: RationCheckPage;
  let fixture: ComponentFixture<RationCheckPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RationCheckPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RationCheckPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
