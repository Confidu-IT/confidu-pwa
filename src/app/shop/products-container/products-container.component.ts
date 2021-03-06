import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ModalController } from '@ionic/angular';
import { ProductModalPage } from '../product-modal/product-modal.page';
import { ProductShipmentModalPage } from '../product-shipment-modal/product-shipment-modal.page';
import {CommonService} from '../../shared/services/common/common.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-products-container',
  templateUrl: './products-container.component.html',
  styleUrls: ['./products-container.component.scss'],
})
export class ProductsContainerComponent {
  private iconPath = '../../../../assets/icons/shop';
  private language: string;

  public selectedProducts: string[] = [];
  public eyeIcon = `${this.iconPath}/eye.svg`;
  public cartCheckIcon = `${this.iconPath}/product-check.svg`;
  public infoButton = `${this.iconPath}/info-button.svg`;

  @Input() products;
  @Input() template;

  constructor(
    private translateService: TranslateService,
    private modalCtrl: ModalController,
    private commonService: CommonService,
    private router: Router
  ) {
    if (!this.template) {
      this.template = 'card';
    }
    this.language = this.commonService.language;
    this.translateService.use(this.language);

    setTimeout(() => {
      console.log('products', this.products)
    }, 100)
  }

  public onClickInfo(): void {
    this.presentInfoModal();
  }

  public onClickProduct(product: any): void {
    this.presentProductModal(product);
  }

  public toCartAdded(id: string): boolean {
    return this.selectedProducts.includes(id);
  }

  public goToCart() {
    this.router.navigateByUrl('shop/cart');
  }

  private async presentProductModal(product: any) {
    const modal = await this.modalCtrl.create({
      component: ProductModalPage,
      componentProps: {
        item: product
      }
    });
    modal.onDidDismiss()
      .then((response: any) => {
        // console.log('products', this.selectedProducts);
        if (response?.data) {
          if (!this.selectedProducts.includes(response.data)) {
            this.selectedProducts.push(response.data);
          }
        }
      });
    return await modal.present();
  }

  private async presentInfoModal() {
    const modal = await this.modalCtrl.create({
      component: ProductShipmentModalPage
    });
    return await modal.present();
  }
}
