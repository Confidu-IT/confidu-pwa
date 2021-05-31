import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InvoiceUploadPageRoutingModule } from './invoice-upload-routing.module';

import { InvoiceUploadPage } from './invoice-upload.page';
import { TranslateModule } from '@ngx-translate/core';
import { SharedComponentsModule } from '../../shared/components/shared-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule.forChild(),
    SharedComponentsModule,
    InvoiceUploadPageRoutingModule
  ],
  declarations: [InvoiceUploadPage]
})
export class InvoiceUploadPageModule {}
