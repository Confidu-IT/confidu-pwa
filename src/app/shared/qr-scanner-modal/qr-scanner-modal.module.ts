import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QrScannerModalPageRoutingModule } from './qr-scanner-modal-routing.module';

import { QrScannerModalPage } from './qr-scanner-modal.page';
import { ZXingScannerModule } from '@zxing/ngx-scanner';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ZXingScannerModule,
    QrScannerModalPageRoutingModule
  ],
  declarations: [QrScannerModalPage]
})
export class QrScannerModalPageModule {}
