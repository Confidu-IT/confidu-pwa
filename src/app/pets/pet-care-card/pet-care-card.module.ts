import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PetCareCardPage } from './pet-care-card.page';
import { TranslateModule } from '@ngx-translate/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { SharedComponentsModule } from '../../shared/components/shared-components.module';

const routes: Routes = [
  {
    path: '',
    component: PetCareCardPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatExpansionModule,
    TranslateModule.forChild(),
    SharedComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PetCareCardPage]
})
export class PetCareCardPageModule {
}
