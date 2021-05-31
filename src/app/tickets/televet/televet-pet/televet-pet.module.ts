import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TelevetPetPage } from './televet-pet.page';
import { MatRadioModule } from '@angular/material';
import { SharedComponentsModule } from '../../../shared/components/shared-components.module';

const routes: Routes = [
  {
    path: '',
    component: TelevetPetPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatRadioModule,
    SharedComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TelevetPetPage]
})
export class TelevetPetPageModule {}
