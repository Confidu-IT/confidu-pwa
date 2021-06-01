import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PulsePageRoutingModule } from './pulse-routing.module';

import { PulsePage } from './pulse.page';
import { TranslateModule } from '@ngx-translate/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule.forChild(),
    PulsePageRoutingModule,
    MatFormFieldModule,
    MatInputModule
  ],
  declarations: [PulsePage]
})
export class PulsePageModule {}
