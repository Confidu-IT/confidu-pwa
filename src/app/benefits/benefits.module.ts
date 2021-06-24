import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BenefitsPageRoutingModule } from './benefits-routing.module';

import { BenefitsPage } from './benefits.page';
import {TranslateModule} from '@ngx-translate/core';
import {SharedComponentsModule} from '../shared/components/shared-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule.forChild(),
    SharedComponentsModule,
    BenefitsPageRoutingModule
  ],
  declarations: [BenefitsPage]
})
export class BenefitsPageModule {}
