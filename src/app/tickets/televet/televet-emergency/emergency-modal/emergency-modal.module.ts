import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmergencyModalPageRoutingModule } from './emergency-modal-routing.module';

import { EmergencyModalPage } from './emergency-modal.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule.forChild(),
    EmergencyModalPageRoutingModule,
    TranslateModule
  ],
  declarations: [EmergencyModalPage]
})
export class EmergencyModalPageModule {}
