import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DiseasesModalPageRoutingModule } from './diseases-modal-routing.module';

import { DiseasesModalPage } from './diseases-modal.page';
import { TranslateModule } from '@ngx-translate/core';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatSelectModule,
    TranslateModule.forChild(),
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    DiseasesModalPageRoutingModule
  ],
  declarations: [DiseasesModalPage]
})
export class DiseasesModalPageModule {}
