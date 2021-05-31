import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RationCheckPageRoutingModule } from './ration-check-routing.module';

import { RationCheckPage } from './ration-check.page';
import { TranslateModule } from '@ngx-translate/core';
import { SharedComponentsModule } from '../shared/components/shared-components.module';
import { FirebaseModule } from '../shared/services/firebase/firebase.module';
import { MatSelectModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FirebaseModule,
    TranslateModule.forChild(),
    SharedComponentsModule,
    MatSelectModule,
    RationCheckPageRoutingModule
  ],
  declarations: [RationCheckPage]
})
export class RationCheckPageModule {}
