import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DocumentZoomModalPage } from './document-zoom-modal.page';

const routes: Routes = [
  {
    path: '',
    component: DocumentZoomModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocumentZoomModalPageRoutingModule {}
