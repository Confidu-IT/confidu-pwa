import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OrderSummaryPage } from './order-summary.page';
import { SharedComponentsModule } from '../../shared/components/shared-components.module';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  {
    path: '',
    component: OrderSummaryPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedComponentsModule,
    TranslateModule.forChild(),
    RouterModule.forChild(routes)
  ],
  declarations: [OrderSummaryPage]
})
export class OrderSummaryPageModule {}
