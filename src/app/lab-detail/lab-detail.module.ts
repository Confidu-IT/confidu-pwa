import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LabDetailPageRoutingModule } from './lab-detail-routing.module';

import { LabDetailPage } from './lab-detail.page';
import { TranslateModule } from '@ngx-translate/core';
import { SharedComponentsModule } from '../shared/components/shared-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedComponentsModule,
    TranslateModule.forChild(),
    LabDetailPageRoutingModule
  ],
  declarations: [LabDetailPage]
})
export class LabDetailPageModule {}
