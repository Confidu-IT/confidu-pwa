import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FuDropdownsPage } from './fu-dropdowns.page';

const routes: Routes = [
  {
    path: '',
    component: FuDropdownsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FuDropdownsPageRoutingModule {}
