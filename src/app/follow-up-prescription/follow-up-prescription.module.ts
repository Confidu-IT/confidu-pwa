import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FollowUpPrescriptionPageRoutingModule } from './follow-up-prescription-routing.module';

import { FollowUpPrescriptionPage } from './follow-up-prescription.page';
import { TranslateModule } from '@ngx-translate/core';
import { SharedComponentsModule } from '../shared/components/shared-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule.forChild(),
    SharedComponentsModule,
    FollowUpPrescriptionPageRoutingModule
  ],
  declarations: [FollowUpPrescriptionPage]
})
export class FollowUpPrescriptionPageModule {}
