import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderErrorPageRoutingModule } from './order-error-routing.module';

import { OrderErrorPage } from './order-error.page';
import {SharedComponentsModule} from '../../shared/components/shared-components.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedComponentsModule,
    TranslateModule.forChild(),
    OrderErrorPageRoutingModule
  ],
  declarations: [OrderErrorPage]
})
export class OrderErrorPageModule {}
