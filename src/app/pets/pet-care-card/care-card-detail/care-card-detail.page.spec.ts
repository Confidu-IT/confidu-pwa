import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CareCardDetailPage } from './care-card-detail.page';

describe('CareCardDetailPage', () => {
  let component: CareCardDetailPage;
  let fixture: ComponentFixture<CareCardDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CareCardDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CareCardDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
