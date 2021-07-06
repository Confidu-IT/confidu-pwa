import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BenefitsDetailPageRoutingModule } from './benefits-detail-routing.module';

import { BenefitsDetailPage } from './benefits-detail.page';
import {TranslateModule} from '@ngx-translate/core';
import {SharedComponentsModule} from '../../shared/components/shared-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule.forChild(),
    SharedComponentsModule,
    BenefitsDetailPageRoutingModule
  ],
  declarations: [BenefitsDetailPage]
})
export class BenefitsDetailPageModule {}
