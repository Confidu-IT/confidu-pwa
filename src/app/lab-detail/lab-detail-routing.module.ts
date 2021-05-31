import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LabDetailPage } from './lab-detail.page';

const routes: Routes = [
  {
    path: '',
    component: LabDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LabDetailPageRoutingModule {}
