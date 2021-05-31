import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TicketOrderPageRoutingModule } from './ticket-order-routing.module';

import { TicketOrderPage } from './ticket-order.page';
import { TranslateModule } from '@ngx-translate/core';
import { SharedComponentsModule } from '../../shared/components/shared-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule.forChild(),
    SharedComponentsModule,
    TicketOrderPageRoutingModule
  ],
  declarations: [TicketOrderPage]
})
export class TicketOrderPageModule {}
