import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SwitchPetModalPage } from './switch-pet-modal.page';

const routes: Routes = [
  {
    path: '',
    component: SwitchPetModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SwitchPetModalPageRoutingModule {}
