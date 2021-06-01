import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TicketsPage } from './tickets.page';

import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import { NgCalendarModule } from 'ionic2-calendar';
import { MatExpansionModule } from '@angular/material/expansion';
import { TranslateModule } from '@ngx-translate/core';
import { SharedComponentsModule } from '../shared/components/shared-components.module';
import {MatCheckboxModule} from '@angular/material/checkbox';
registerLocaleData(localeDe);

const routes: Routes = [
  {
    path: '',
    component: TicketsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgCalendarModule,
    MatExpansionModule,
    MatCheckboxModule,
    TranslateModule.forChild(),
    SharedComponentsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    TicketsPage
  ]
})
export class TicketsPageModule {}
