import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecipePageRoutingModule } from './prescription-routing.module';

import { PrescriptionPage } from './prescription-page.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatSelectModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule.forChild(),
    MatSelectModule,
    RecipePageRoutingModule
  ],
  declarations: [PrescriptionPage]
})
export class PrescriptionPageModule {}
