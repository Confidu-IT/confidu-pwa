import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderCancellationPageRoutingModule } from './order-cancellation-routing.module';

import { OrderCancellationPage } from './order-cancellation.page';
import {TranslateModule} from '@ngx-translate/core';
import {SharedComponentsModule} from '../../shared/components/shared-components.module';
import {MatRadioModule} from '@angular/material/radio';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule.forChild(),
    SharedComponentsModule,
    MatRadioModule,
    OrderCancellationPageRoutingModule
  ],
  declarations: [OrderCancellationPage]
})
export class OrderCancellationPageModule {}
