import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DiseasesModalPage } from './diseases-modal.page';

const routes: Routes = [
  {
    path: '',
    component: DiseasesModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiseasesModalPageRoutingModule {}
