import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConsultationBookingPage } from './consultation-booking.page';

const routes: Routes = [
  {
    path: '',
    component: ConsultationBookingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConsultationBookingPageRoutingModule {}
