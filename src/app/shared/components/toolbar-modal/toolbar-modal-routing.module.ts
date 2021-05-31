import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ToolbarModalPage } from './toolbar-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ToolbarModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ToolbarModalPageRoutingModule {}
