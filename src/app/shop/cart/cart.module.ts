import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CartPage } from './cart.page';
import {TranslateModule} from '@ngx-translate/core';
import {SharedComponentsModule} from '../../shared/components/shared-components.module';

const routes: Routes = [
  {
    path: '',
    component: CartPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    SharedComponentsModule,
    TranslateModule.forChild(),
    RouterModule.forChild(routes)
  ],
  declarations: [CartPage]
})
export class CartPageModule {}
