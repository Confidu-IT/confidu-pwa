import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CareCardListPageRoutingModule } from './care-card-list-routing.module';

import { CareCardListPage } from './care-card-list.page';
import { TranslateModule } from '@ngx-translate/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { SharedComponentsModule } from '../../../shared/components/shared-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule.forChild(),
    MatExpansionModule,
    SharedComponentsModule,
    CareCardListPageRoutingModule
  ],
  declarations: [CareCardListPage]
})
export class CareCardListPageModule {}
