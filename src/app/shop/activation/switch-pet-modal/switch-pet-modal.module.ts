import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SwitchPetModalPageRoutingModule } from './switch-pet-modal-routing.module';

import { SwitchPetModalPage } from './switch-pet-modal.page';
import { TranslateModule } from '@ngx-translate/core';
import {MatRadioModule} from '@angular/material/radio';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule.forChild(),
    MatRadioModule,
    SwitchPetModalPageRoutingModule
  ],
  declarations: [SwitchPetModalPage]
})
export class SwitchPetModalPageModule {}
