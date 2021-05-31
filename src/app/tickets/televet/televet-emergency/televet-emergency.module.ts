import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TelevetEmergencyPageRoutingModule } from './televet-emergency-routing.module';

import { TelevetEmergencyPage } from './televet-emergency.page';
import { TranslateModule } from '@ngx-translate/core';
import { SharedComponentsModule } from '../../../shared/components/shared-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule.forChild(),
    SharedComponentsModule,
    TelevetEmergencyPageRoutingModule
  ],
  declarations: [TelevetEmergencyPage]
})
export class TelevetEmergencyPageModule {}
