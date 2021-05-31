import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConsultationBookingPageRoutingModule } from './consultation-booking-routing.module';

import { ConsultationBookingPage } from './consultation-booking.page';
import { TranslateModule } from '@ngx-translate/core';
import { SharedComponentsModule } from '../../shared/components/shared-components.module';
import { MatCheckboxModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule.forChild(),
    SharedComponentsModule,
    MatCheckboxModule,
    ConsultationBookingPageRoutingModule
  ],
  declarations: [ConsultationBookingPage]
})
export class ConsultationBookingPageModule {}
