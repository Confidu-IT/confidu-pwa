import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OrderPage } from './order.page';
import {TranslateModule} from '@ngx-translate/core';
import {SharedComponentsModule} from '../../shared/components/shared-components.module';

const routes: Routes = [
  {
    path: '',
    component: OrderPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    FormsModule,
    IonicModule,
    SharedComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [OrderPage]
})
export class OrderPageModule {}
