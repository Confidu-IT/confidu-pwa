import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CareCardListPage } from './care-card-list.page';

describe('CareCardListPage', () => {
  let component: CareCardListPage;
  let fixture: ComponentFixture<CareCardListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CareCardListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CareCardListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
