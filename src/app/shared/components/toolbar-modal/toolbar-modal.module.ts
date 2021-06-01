import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ToolbarModalPageRoutingModule } from './toolbar-modal-routing.module';

import { ToolbarModalPage } from './toolbar-modal.page';
import { TranslateModule } from '@ngx-translate/core';
import {MatRadioModule} from '@angular/material/radio';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule.forChild(),
    MatRadioModule,
    ToolbarModalPageRoutingModule
  ],
  declarations: [ToolbarModalPage]
})
export class ToolbarModalPageModule {}
