import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuestionInfoModalPage } from './question-info-modal.page';

const routes: Routes = [
  {
    path: '',
    component: QuestionInfoModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuestionInfoModalPageRoutingModule {}
