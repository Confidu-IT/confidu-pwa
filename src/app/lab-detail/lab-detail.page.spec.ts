import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LabDetailPage } from './lab-detail.page';

describe('LabDetailPage', () => {
  let component: LabDetailPage;
  let fixture: ComponentFixture<LabDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LabDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
