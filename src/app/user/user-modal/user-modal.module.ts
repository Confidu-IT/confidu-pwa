import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserModalPageRoutingModule } from './user-modal-routing.module';

import { UserModalPage } from './user-modal.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule.forChild(),
    ReactiveFormsModule,
    UserModalPageRoutingModule
  ],
  declarations: [UserModalPage]
})
export class UserModalPageModule {}
