import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConsultationModalPage } from './consultation-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ConsultationModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConsultationModalPageRoutingModule {}
