import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PwaInstructionsPage } from './pwa-instructions.page';

const routes: Routes = [
  {
    path: '',
    component: PwaInstructionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PwaInstructionsPageRoutingModule {}
