import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FollowUpPrescriptionPage } from './follow-up-prescription.page';

const routes: Routes = [
  {
    path: '',
    component: FollowUpPrescriptionPage
  },
  {
    path: 'dropdowns',
    loadChildren: () => import('./fu-dropdowns/fu-dropdowns.module').then( m => m.FuDropdownsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FollowUpPrescriptionPageRoutingModule {}
