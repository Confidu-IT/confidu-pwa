import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DiseasesModalPage } from './diseases-modal.page';

describe('DiseasesModalPage', () => {
  let component: DiseasesModalPage;
  let fixture: ComponentFixture<DiseasesModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiseasesModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DiseasesModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
