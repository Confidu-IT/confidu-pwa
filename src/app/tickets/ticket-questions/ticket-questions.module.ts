import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TicketQuestionsPage } from './ticket-questions.page';
import { MatRadioModule } from '@angular/material/radio';
import { TranslateModule } from '@ngx-translate/core';
import { MultiLineOptionModule } from '../../shared/components/multi-line/multi-line-option-module';
import { SharedComponentsModule } from '../../shared/components/shared-components.module';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

const routes: Routes = [
  {
    path: '',
    component: TicketQuestionsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatRadioModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MultiLineOptionModule,
    MatAutocompleteModule,
    TranslateModule.forChild(),
    SharedComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TicketQuestionsPage]
})
export class TicketQuestionsPageModule {}
