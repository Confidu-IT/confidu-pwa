import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeliveryPageRoutingModule } from './delivery-routing.module';

import { DeliveryPage } from './delivery.page';
import {TranslateModule} from '@ngx-translate/core';
import {SharedComponentsModule} from '../../shared/components/shared-components.module';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule.forChild(),
    MatRadioModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    SharedComponentsModule,
    DeliveryPageRoutingModule
  ],
  declarations: [DeliveryPage]
})
export class DeliveryPageModule {}
