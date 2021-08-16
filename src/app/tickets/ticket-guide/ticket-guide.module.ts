import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TicketGuidePage } from './ticket-guide.page';
import { TranslateModule } from '@ngx-translate/core';
import {SharedComponentsModule} from '../../shared/components/shared-components.module';

const routes: Routes = [
  {
    path: '',
    component: TicketGuidePage
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
  declarations: [TicketGuidePage]
})
export class TicketGuidePageModule {}
