import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InvoiceResultPage } from './invoice-result.page';

const routes: Routes = [
  {
    path: '',
    component: InvoiceResultPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvoiceResultPageRoutingModule {}
