import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductShipmentModalPage } from './product-shipment-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ProductShipmentModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductShipmentModalPageRoutingModule {}
