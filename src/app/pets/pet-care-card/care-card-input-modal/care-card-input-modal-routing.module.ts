import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CareCardInputModalPage } from './care-card-input-modal.page';

const routes: Routes = [
  {
    path: '',
    component: CareCardInputModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CareCardInputModalPageRoutingModule {}
