import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConsultationSchedulerPage } from './consultation-scheduler.page';

const routes: Routes = [
  {
    path: '',
    component: ConsultationSchedulerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConsultationSchedulerPageRoutingModule {}
