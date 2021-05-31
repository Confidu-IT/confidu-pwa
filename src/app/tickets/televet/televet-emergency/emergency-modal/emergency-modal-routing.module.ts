import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmergencyModalPage } from './emergency-modal.page';

const routes: Routes = [
  {
    path: '',
    component: EmergencyModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmergencyModalPageRoutingModule {}
