import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConsultationPageRoutingModule } from './consultation-routing.module';

import { ConsultationPage } from './consultation.page';
import { TranslateModule } from '@ngx-translate/core';
import { MatInputModule, MatSelectModule } from '@angular/material';
import { SharedComponentsModule } from '../shared/components/shared-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule.forChild(),
    MatSelectModule,
    MatInputModule,
    SharedComponentsModule,
    ConsultationPageRoutingModule
  ],
  declarations: [ConsultationPage]
})
export class ConsultationPageModule {}
