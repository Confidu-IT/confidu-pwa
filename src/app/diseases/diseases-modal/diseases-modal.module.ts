import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DiseasesModalPageRoutingModule } from './diseases-modal-routing.module';

import { DiseasesModalPage } from './diseases-modal.page';
import { TranslateModule } from '@ngx-translate/core';
import { MatAutocompleteModule, MatFormFieldModule, MatInputModule, MatSelectModule } from '@angular/material';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatSelectModule,
    TranslateModule.forChild(),
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    PdfViewerModule,
    DiseasesModalPageRoutingModule
  ],
  declarations: [DiseasesModalPage]
})
export class DiseasesModalPageModule {}
