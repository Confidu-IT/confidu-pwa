import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QrScannerModalPage } from './qr-scanner-modal.page';

describe('QrScannerModalPage', () => {
  let component: QrScannerModalPage;
  let fixture: ComponentFixture<QrScannerModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QrScannerModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QrScannerModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
