import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PwaInstructionsPageRoutingModule } from './pwa-instructions-routing.module';

import { PwaInstructionsPage } from './pwa-instructions.page';
import {SharedComponentsModule} from '../../shared/components/shared-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedComponentsModule,
    PwaInstructionsPageRoutingModule
  ],
  declarations: [PwaInstructionsPage]
})
export class PwaInstructionsPageModule {}
