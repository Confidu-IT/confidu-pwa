import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ErrorPageRoutingModule } from './error-routing.module';

import { ErrorPage } from './error.page';
import {TranslateModule} from '@ngx-translate/core';
import {SharedComponentsModule} from '../shared/components/shared-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule.forChild(),
    SharedComponentsModule,
    ErrorPageRoutingModule
  ],
  declarations: [ErrorPage]
})
export class ErrorPageModule {}
