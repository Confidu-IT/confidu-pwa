import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InvoiceUploadPage } from './invoice-upload.page';

const routes: Routes = [
  {
    path: '',
    component: InvoiceUploadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvoiceUploadPageRoutingModule {}
