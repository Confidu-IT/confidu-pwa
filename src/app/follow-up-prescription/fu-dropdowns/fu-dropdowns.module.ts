import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FuDropdownsPageRoutingModule } from './fu-dropdowns-routing.module';

import { FuDropdownsPage } from './fu-dropdowns.page';
import { MatFormFieldModule, MatInputModule, MatSelectModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { SharedComponentsModule } from '../../shared/components/shared-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    TranslateModule.forChild(),
    SharedComponentsModule,
    FuDropdownsPageRoutingModule
  ],
  declarations: [FuDropdownsPage]
})
export class FuDropdownsPageModule {}
