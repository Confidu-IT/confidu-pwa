import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TicketResultPage } from './ticket-result.page';
import { TranslateModule } from '@ngx-translate/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { CanDeactivateGuard } from '../can-deactivate-guard.service';
import { TicketResultRoutingModule } from './ticket-result-routing.module';
import { SharedComponentsModule } from '../../shared/components/shared-components.module';

const routes: Routes = [
  {
    path: '',
    component: TicketResultPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatExpansionModule,
    TicketResultRoutingModule,
    TranslateModule.forChild(),
    SharedComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TicketResultPage],
  providers: [CanDeactivateGuard]
})
export class TicketResultPageModule {}
