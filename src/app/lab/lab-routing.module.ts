import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LabPage } from './lab.page';

const routes: Routes = [
  {
    path: '',
    component: LabPage
  },
  {
    path: 'switch-pet-modal',
    loadChildren: () => import('./switch-pet-modal/switch-pet-modal.module').then( m => m.SwitchPetModalPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LabPageRoutingModule {}
