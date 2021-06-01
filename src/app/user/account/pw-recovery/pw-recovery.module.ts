import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PwRecoveryPageRoutingModule } from './pw-recovery-routing.module';

import { PwRecoveryPage } from './pw-recovery.page';
import { TranslateModule } from '@ngx-translate/core';
import { SharedComponentsModule } from '../../../shared/components/shared-components.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule.forChild(),
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    SharedComponentsModule,
    PwRecoveryPageRoutingModule
  ],
  declarations: [PwRecoveryPage]
})
export class PwRecoveryPageModule {}
