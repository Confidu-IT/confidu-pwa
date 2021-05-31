import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConsultationSchedulerPageRoutingModule } from './consultation-scheduler-routing.module';

import { ConsultationSchedulerPage } from './consultation-scheduler.page';
import { TranslateModule } from '@ngx-translate/core';
import { SharedComponentsModule } from '../../shared/components/shared-components.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { FirebaseModule } from '../../shared/services/firebase/firebase.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule.forChild(),
    SharedComponentsModule,
    MatExpansionModule,
    FirebaseModule,
    ConsultationSchedulerPageRoutingModule
  ],
  declarations: [ConsultationSchedulerPage]
})
export class ConsultationSchedulerPageModule {}
