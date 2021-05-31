import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeModalPageRoutingModule } from './home-modal-routing.module';

import { HomeModalPage } from './home-modal.page';
import { TranslateModule } from '@ngx-translate/core';
import { MatRadioModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule.forChild(),
    MatRadioModule,
    HomeModalPageRoutingModule
  ],
  declarations: [HomeModalPage]
})
export class HomeModalPageModule {}
