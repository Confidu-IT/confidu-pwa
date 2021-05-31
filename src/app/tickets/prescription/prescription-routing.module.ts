import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrescriptionPage } from './prescription-page.component';

const routes: Routes = [
  {
    path: '',
    component: PrescriptionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipePageRoutingModule {}
