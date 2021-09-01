import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { ToolbarFooterComponent } from './toolbar-footer/toolbar-footer.component';
import { ProductsContainerComponent } from '../../shop/products-container/products-container.component';
import { TranslateModule } from '@ngx-translate/core';
import { AttachDocumentComponent } from './attach-document/attach-document.component';
import { SocialBarComponent } from './social-bar/social-bar.component';

@NgModule({
  imports: [
    TranslateModule.forChild(),
    CommonModule,
    IonicModule,
    RouterModule,
  ],
  declarations: [
    ToolbarComponent,
    ToolbarFooterComponent,
    ProductsContainerComponent,
    AttachDocumentComponent,
    SocialBarComponent
  ],
  exports: [
    CommonModule,
    ToolbarComponent,
    ToolbarFooterComponent,
    ProductsContainerComponent,
    AttachDocumentComponent,
    SocialBarComponent
  ]
})
export class SharedComponentsModule {
}
