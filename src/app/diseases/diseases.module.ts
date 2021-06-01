import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DiseasePageRoutingModule } from './diseases-routing.module';

import { DiseasesPage } from './diseases-page.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatRadioModule } from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DiseasePageRoutingModule,
    MatSelectModule,
    MatRadioModule,
    TranslateModule.forChild()
  ],
  declarations: [DiseasesPage]
})
export class DiseasePageModule {}
