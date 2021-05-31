import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DocumentZoomModalPage } from './document-zoom-modal.page';

describe('DocumentZoomModalPage', () => {
  let component: DocumentZoomModalPage;
  let fixture: ComponentFixture<DocumentZoomModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentZoomModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DocumentZoomModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
