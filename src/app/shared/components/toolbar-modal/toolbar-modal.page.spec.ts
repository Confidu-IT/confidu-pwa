import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ToolbarModalPage } from './toolbar-modal.page';

describe('ToolbarModalPage', () => {
  let component: ToolbarModalPage;
  let fixture: ComponentFixture<ToolbarModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolbarModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ToolbarModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
