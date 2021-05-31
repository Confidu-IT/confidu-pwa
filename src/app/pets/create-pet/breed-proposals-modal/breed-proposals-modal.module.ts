import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BreedProposalsModalPage } from './breed-proposals-modal.page';
import { MatAutocompleteModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { MatRadioModule } from '@angular/material/radio';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  {
    path: '',
    component: BreedProposalsModalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    ReactiveFormsModule,
    TranslateModule.forChild(),
    RouterModule.forChild(routes)
  ],
  declarations: [BreedProposalsModalPage]
})
export class BreedProposalsModalPageModule {}
