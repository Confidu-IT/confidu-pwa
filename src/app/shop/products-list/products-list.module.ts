import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProductsListPage } from './products-list.page';
import { SharedComponentsModule } from '../../shared/components/shared-components.module';

const routes: Routes = [
  {
    path: '',
    component: ProductsListPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedComponentsModule
  ],
  declarations: [ProductsListPage]
})
export class ProductsListPageModule {}
