import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../../../../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import {AngularFireAnalyticsModule} from '@angular/fire/analytics';
// import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireAnalyticsModule
    // NgxAuthFirebaseUIModule.forRoot(
    //   environment.firebase,
    //   null,
    //   { toastMessageOnAuthSuccess: false, toastMessageOnAuthError: false },
    // )
  ]
})
export class FirebaseModule {
}
