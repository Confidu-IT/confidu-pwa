import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BillingAddressPage } from './billing-address.page';
import { MatRadioModule } from '@angular/material/radio';
import { TranslateModule } from '@ngx-translate/core';
import { MatCheckboxModule, MatFormFieldModule, MatInputModule, MatSelectModule } from '@angular/material';

const routes: Routes = [
  {
    path: '',
    component: BillingAddressPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatSelectModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    TranslateModule.forChild(),
    RouterModule.forChild(routes)
  ],
  declarations: [BillingAddressPage]
})
export class BillingAddressPageModule {}
