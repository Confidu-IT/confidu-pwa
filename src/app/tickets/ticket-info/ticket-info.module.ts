import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TicketInfoPage } from './ticket-info.page';
import { TranslateModule } from '@ngx-translate/core';
import {SharedComponentsModule} from '../../shared/components/shared-components.module';

const routes: Routes = [
  {
    path: '',
    component: TicketInfoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule.forChild(),
    SharedComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TicketInfoPage]
})
export class TicketInfoPageModule {}
