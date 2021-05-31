import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductShipmentModalPageRoutingModule } from './product-shipment-modal-routing.module';

import { ProductShipmentModalPage } from './product-shipment-modal.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule.forChild(),
    ProductShipmentModalPageRoutingModule
  ],
  declarations: [ProductShipmentModalPage]
})
export class ProductShipmentModalPageModule {}
