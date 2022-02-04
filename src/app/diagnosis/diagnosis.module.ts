import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DiagnosisPageRoutingModule } from './diagnosis-routing.module';

import { DiagnosisPage } from './diagnosis.page';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {TranslateModule} from '@ngx-translate/core';
import {SharedComponentsModule} from '../shared/components/shared-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    TranslateModule.forChild(),
    SharedComponentsModule,
    DiagnosisPageRoutingModule
  ],
  declarations: [DiagnosisPage]
})
export class DiagnosisPageModule {}
