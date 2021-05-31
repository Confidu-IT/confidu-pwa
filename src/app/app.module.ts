import { NgModule } from '@angular/core';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FirebaseModule } from './shared/services/firebase/firebase.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BreedProposalsModalPageModule } from './pets/create-pet/breed-proposals-modal/breed-proposals-modal.module';
import { CameraModalPageModule } from './shared/camera-modal/camera-modal.module';
import { ProductModalPageModule } from './shop/product-modal/product-modal.module';
import { ProductShipmentModalPageModule } from './shop/product-shipment-modal/product-shipment-modal.module';
import { QuestionInfoModalPageModule } from './tickets/ticket-questions/question-info-modal/question-info-modal.module';
import { CareCardInputModalPageModule } from './pets/pet-care-card/care-card-input-modal/care-card-input-modal.module';
import { ToolbarModalPageModule } from './shared/components/toolbar-modal/toolbar-modal.module';
import { QrScannerModalPageModule } from './shared/qr-scanner-modal/qr-scanner-modal.module';
import { DiseasesModalPageModule } from './diseases/diseases-modal/diseases-modal.module';
import { UserModalPageModule } from './user/user-modal/user-modal.module';
import { EmergencyModalPageModule } from './tickets/televet/televet-emergency/emergency-modal/emergency-modal.module';
// import { SwitchPetModalPage } from './lab/switch-pet-modal/switch-pet-modal.page';
import { SwitchPetModalPageModule } from './lab/switch-pet-modal/switch-pet-modal.module';
import { HomeModalPageModule } from './home/home-modal/home-modal.module';
import { ConsultationModalPageModule } from './consultation/consultation-modal/consultation-modal.module';
import { DocumentZoomModalPageModule } from './shared/document-zoom-modal/document-zoom-modal.module';
import { AngularFireMessagingModule } from '@angular/fire/messaging';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FirebaseModule,
    BreedProposalsModalPageModule,
    DiseasesModalPageModule,
    ToolbarModalPageModule,
    QrScannerModalPageModule,
    EmergencyModalPageModule,
    ProductModalPageModule,
    UserModalPageModule,
    CareCardInputModalPageModule,
    QuestionInfoModalPageModule,
    SwitchPetModalPageModule,
    ProductShipmentModalPageModule,
    CameraModalPageModule,
    HomeModalPageModule,
    ConsultationModalPageModule,
    DocumentZoomModalPageModule,
    AngularFireMessagingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ServiceWorkerModule.register('combined-sw.js', { enabled: environment.production })
  ],
  providers: [
    StatusBar,
    SplashScreen,
    TranslateService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  exports: [TranslateModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
