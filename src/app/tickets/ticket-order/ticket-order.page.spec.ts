import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TicketOrderPage } from './ticket-order.page';

describe('TicketOrderPage', () => {
  let component: TicketOrderPage;
  let fixture: ComponentFixture<TicketOrderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketOrderPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TicketOrderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
