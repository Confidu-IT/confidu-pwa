import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DiseasesPage } from './diseases-page.component';

describe('DiseasePage', () => {
  let component: DiseasesPage;
  let fixture: ComponentFixture<DiseasesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiseasesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DiseasesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
