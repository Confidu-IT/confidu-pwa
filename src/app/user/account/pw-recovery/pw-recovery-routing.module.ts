import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PwRecoveryPage } from './pw-recovery.page';

const routes: Routes = [
  {
    path: '',
    component: PwRecoveryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PwRecoveryPageRoutingModule {}
