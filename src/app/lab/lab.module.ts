import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LabPageRoutingModule } from './lab-routing.module';

import { LabPage } from './lab.page';
import { TranslateModule } from '@ngx-translate/core';
import { SharedComponentsModule } from '../shared/components/shared-components.module';
import {MatExpansionModule} from '@angular/material/expansion';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule.forChild(),
    SharedComponentsModule,
    MatExpansionModule,
    LabPageRoutingModule
  ],
  declarations: [LabPage]
})
export class LabPageModule {}
