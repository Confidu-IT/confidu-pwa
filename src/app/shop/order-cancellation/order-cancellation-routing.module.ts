import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderCancellationPage } from './order-cancellation.page';

const routes: Routes = [
  {
    path: '',
    component: OrderCancellationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderCancellationPageRoutingModule {}
