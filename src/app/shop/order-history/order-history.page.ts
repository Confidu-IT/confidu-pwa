import { Component } from '@angular/core';
import { AuthService } from '../../user/auth.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CommonService } from '../../shared/services/common/common.service';
import { ShopwareService } from '../../shared/services/shopware/shopware.service';
import { Subscription } from 'rxjs';
import { TicketService } from '../../tickets/ticket-service/ticket-service';
import { ModalController } from '@ionic/angular';
import { ProductModalPage } from '../product-modal/product-modal.page';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.page.html',
  styleUrls: ['./order-history.page.scss'],
})
export class OrderHistoryPage {
  private subscription: Subscription;
  private iconPath = '../../assets/icons/shop';
  private language: string;
  public user: any;

  public parcelImg = `${this.iconPath}/parcel.svg`;
  public chevron = `${this.iconPath}/chevron-forward-outline.svg`;
  public cartCheckIcon = `${this.iconPath}/product-check.svg`;
  public isLoading: boolean;
  public orders: any[];
  public selectedProducts: string[];

  constructor(
    private userAuth: AuthService,
    private router: Router,
    private translateService: TranslateService,
    private commonService: CommonService,
    private shopwareService: ShopwareService,
    private modalCtrl: ModalController,
    private ticketService: TicketService
  ) { }

  ionViewWillEnter() {
    this.isLoading = true;
    this.selectedProducts = [];
    this.language = this.commonService.language;
    this.translateService.setDefaultLang(this.language); // fallback
    this.translateService.use(this.translateService.getBrowserLang());

    this.subscription = this.userAuth.user$
      .subscribe(user => {
        if (user) {
          this.user = user;
          this.getAllOrders();
        } else {
          this.router.navigateByUrl('/');
        }
      });
  }

  public openModal(id: string) {
    this.presentProductModal(this.ticketService.product);
  }

  private getAllOrders(): void {
    this.shopwareService.headers['firebase-context-token'] = this.user.za;
    this.shopwareService.getOrders()
      .then(orders => {
        console.log('orders', orders);
        if (orders.error) {
          this.commonService.handleShopErrors(orders.errors[0].status);
          this.isLoading = false;
        } else {
          this.orders = orders;
          this.isLoading = false;
        }
      });
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
        console.log('modal dismissed', response);
        console.log('products', this.selectedProducts);

        if (!this.selectedProducts.includes(response.data)) {
          this.selectedProducts.push(response.data);
        }
      });
    return await modal.present();
  }

  ionViewWillLeave() {
    this.selectedProducts = [];
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
