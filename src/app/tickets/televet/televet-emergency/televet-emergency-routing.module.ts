import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TelevetEmergencyPage } from './televet-emergency.page';

const routes: Routes = [
  {
    path: '',
    component: TelevetEmergencyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TelevetEmergencyPageRoutingModule {}
