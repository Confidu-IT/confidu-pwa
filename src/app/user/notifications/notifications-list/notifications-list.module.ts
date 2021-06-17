import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotificationsListPageRoutingModule } from './notifications-list-routing.module';

import { NotificationsListPage } from './notifications-list.page';
import {TranslateModule} from '@ngx-translate/core';
import {SharedComponentsModule} from '../../../shared/components/shared-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedComponentsModule,
    TranslateModule.forChild(),
    NotificationsListPageRoutingModule
  ],
  declarations: [NotificationsListPage]
})
export class NotificationsListPageModule {}
