import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DocumentZoomModalPageRoutingModule } from './document-zoom-modal-routing.module';

import { DocumentZoomModalPage } from './document-zoom-modal.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule.forChild(),
    DocumentZoomModalPageRoutingModule
  ],
  declarations: [DocumentZoomModalPage]
})
export class DocumentZoomModalPageModule {}
