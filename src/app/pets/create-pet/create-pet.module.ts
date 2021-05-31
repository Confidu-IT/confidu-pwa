import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CreatePetPage } from './create-pet.page';
// import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';
import { FirebaseModule } from '../../shared/services/firebase/firebase.module';
import { SharedComponentsModule } from '../../shared/components/shared-components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';



const routes: Routes = [
  {
    path: '',
    component: CreatePetPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    SharedComponentsModule,
    FirebaseModule,
    FormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    // NgxAuthFirebaseUIModule,
    TranslateModule.forChild(),
    RouterModule.forChild(routes)
  ],
  declarations: [
    CreatePetPage
  ]
})
export class CreatePetPageModule {
}
