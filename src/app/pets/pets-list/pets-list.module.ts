import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PetsListPage } from './pets-list.page';
import { TranslateModule } from '@ngx-translate/core';
import { SharedComponentsModule } from '../../shared/components/shared-components.module';

const routes: Routes = [
  {
    path: '',
    component: PetsListPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule.forChild(),
    SharedComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PetsListPage]
})
export class PetsListPageModule {
}
