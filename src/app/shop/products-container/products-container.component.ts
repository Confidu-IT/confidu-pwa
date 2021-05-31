import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ModalController } from '@ionic/angular';
import { ProductModalPage } from '../product-modal/product-modal.page';
import { ProductShipmentModalPage } from '../product-shipment-modal/product-shipment-modal.page';

@Component({
  selector: 'app-products-container',
  templateUrl: './products-container.component.html',
  styleUrls: ['./products-container.component.scss'],
})
export class ProductsContainerComponent {
  private iconPath = '../../../../assets/icons/shop';

  public selectedProducts: string[] = [];
  public eyeIcon = `${this.iconPath}/eye.svg`;
  public cartCheckIcon = `${this.iconPath}/product-check.svg`;
  public infoButton = `${this.iconPath}/info-button.svg`;

  @Input() products;
  @Input() template;

  constructor(
    private translateService: TranslateService,
    private modalCtrl: ModalController
  ) {
    if (!this.template) {
      this.template = 'card';
    }
    console.log('template', this.template);
  }

  public onClickInfo(): void {
    this.presentInfoModal();
  }

  public onClickProduct(product: any): void {
    this.presentProductModal(product.data);
  }

  public toCartAdded(id: string): boolean {
    return this.selectedProducts.includes(id);
  }

  private async presentProductModal(product: any) {
    const modal = await this.modalCtrl.create({
      component: ProductModalPage,
      componentProps: {
        item: product,
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
