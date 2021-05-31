import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CareCardInputModalPageRoutingModule } from './care-card-input-modal-routing.module';

import { CareCardInputModalPage } from './care-card-input-modal.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule.forChild(),
    CareCardInputModalPageRoutingModule
  ],
  declarations: [CareCardInputModalPage]
})
export class CareCardInputModalPageModule {}
