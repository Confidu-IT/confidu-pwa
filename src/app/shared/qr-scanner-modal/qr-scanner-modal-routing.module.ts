import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QrScannerModalPage } from './qr-scanner-modal.page';

const routes: Routes = [
  {
    path: '',
    component: QrScannerModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QrScannerModalPageRoutingModule {}
