import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { ConsultationModalPageRoutingModule } from './consultation-modal-routing.module';

import { ConsultationModalPage } from './consultation-modal.page';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    TranslateModule.forChild(),
    ConsultationModalPageRoutingModule
  ],
  declarations: [ConsultationModalPage]
})
export class ConsultationModalPageModule {}
