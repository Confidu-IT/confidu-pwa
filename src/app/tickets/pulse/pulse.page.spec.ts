import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PulsePage } from './pulse.page';

describe('PulsePage', () => {
  let component: PulsePage;
  let fixture: ComponentFixture<PulsePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PulsePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PulsePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
