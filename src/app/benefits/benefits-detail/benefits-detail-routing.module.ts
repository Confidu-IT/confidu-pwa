import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BenefitsDetailPage } from './benefits-detail.page';

const routes: Routes = [
  {
    path: '',
    component: BenefitsDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BenefitsDetailPageRoutingModule {}
