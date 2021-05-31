import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TicketResultPage } from './ticket-result.page';
import { CanDeactivateGuard } from '../can-deactivate-guard.service';


const routes: Routes = [
  {
    path: '',
    component: TicketResultPage,
    canDeactivate: [CanDeactivateGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TicketResultRoutingModule {}
