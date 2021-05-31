import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuestionInfoModalPageRoutingModule } from './question-info-modal-routing.module';

import { QuestionInfoModalPage } from './question-info-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuestionInfoModalPageRoutingModule
  ],
  declarations: [QuestionInfoModalPage]
})
export class QuestionInfoModalPageModule {}
