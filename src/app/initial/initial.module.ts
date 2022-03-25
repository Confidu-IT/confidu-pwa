import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InitialPageRoutingModule } from './initial-routing.module';

import { InitialPage } from './initial.page';
import {TranslateModule} from '@ngx-translate/core';
import {SharedComponentsModule} from '../shared/components/shared-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule.forChild(),
    SharedComponentsModule,
    InitialPageRoutingModule
  ],
  declarations: [InitialPage]
})
export class InitialPageModule {}
