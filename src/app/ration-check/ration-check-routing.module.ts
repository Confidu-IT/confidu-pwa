import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RationCheckPage } from './ration-check.page';

const routes: Routes = [
  {
    path: '',
    component: RationCheckPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RationCheckPageRoutingModule {}
