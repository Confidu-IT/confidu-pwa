import { Component } from '@angular/core';
import { ShopwareService } from '../../shared/services/shopware/shopware.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { CommonService } from '../../shared/services/common/common.service';
import { AuthService } from '../../user/auth.service';
import { Subscription } from 'rxjs';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage {
  private customer: any;
  private payments: any;
  private processing: string;
  public cartItems: any[] = [];
  public cartData: any;
  public cartTransaction: any;
  public cart: any;
  public isLoading: boolean;
  public shippingAddress: any;
  public billingAddress: any;
  public payment: any;
  public language: string;

  public user: any;
  private subscription: Subscription;


  constructor(
    private shopwareService: ShopwareService,
    private router: Router,
    private commonService: CommonService,
    private userAuth: AuthService,
    private loadingCtrl: LoadingController,
    private translateService: TranslateService,
  ) { }

  ionViewWillEnter() {
    this.isLoading = true;
    this.language = this.commonService.language;
    this.translateService.use(this.language);
    this.translateService.get('ORDER_PAGE')
      .subscribe(values => {
       this.processing = values.PROCESSING;
      });

    this.subscription = this.userAuth.user$
      .subscribe(user => {
        this.user = user;
        this.shopwareService.headers['firebase-context-token'] = this.user.za;

        this.shopwareService.getProfile()
          .then(profile => {
            if (profile.errors) {
              this.commonService.handleResponseErrors(profile.errors[0].status);
            } else {
              this.customer = profile;
              this.billingAddress = this.customer.defaultBillingAddress;
              this.shippingAddress = this.customer.defaultShippingAddress;
            }
          });
        this.getCart();
      });

  }

  public onPlaceOrder(): void {
    this.orderProducts();
  }

  public onArticleRemove(id): void {
    this.deleteCartItem(id)
      .then(() => this.getCart());
  }

  private deleteCartItem(id): Promise<any> {
    this.shopwareService.headers['firebase-context-token'] = this.user.za;
    return this.shopwareService.deleteLineItem(id)
      .then(product => {
        if (product.errors) {
          this.commonService.handleResponseErrors(product?.errors[0]?.status);
        } else {
          this.shopwareService.getCart()
            .then(cart => {
              if (cart.deliveries[0]) {
                this.cartItems = cart.deliveries[0].positions;
              } else {
                this.cartItems = [];
                localStorage.removeItem('sw-token');
                this.shopwareService.setCartState(false);
              }
            });
        }
      });
  }

  private getCart(): void {
    this.shopwareService.getPayments()
      .then(payments => {
        this.payments = payments;
        this.shopwareService.getCart()
          .then(cart => {
            console.log('cart', cart);
            if (cart.errors.length > 0) {
              this.commonService.handleResponseErrors(cart.errors[0].status);
            } else {
              this.cart = cart;
              if (this.cart.deliveries.length > 0) {
                this.cartItems = this.cart.deliveries[0].positions;
                this.cartData = this.cart.deliveries[0];
                this.cartTransaction = this.cart.transactions[0];
                const paymentId = this.cartTransaction.paymentMethodId;
                this.payments.map(payment => {
                  if (payment.id === paymentId) {
                    this.payment = payment;
                  }
                });
              } else {
                this.router.navigateByUrl('/');
              }
            }
          });
      });
    this.isLoading = false;
  }

  private orderProducts() {
    if (this.cart.lineItems.leading < 1) {
      return false;
    }
    this.presentLoading();
    this.shopwareService.headers['firebase-context-token'] = this.user.za;
    const petId = localStorage.getItem('activePet');
    this.shopwareService.orderProducts({ petId })
      .then(order => {
        console.log('order', order);
        if (order.errors) {
          this.commonService.handleResponseErrors(order.errors[0].status);
        } else {
          this.shopwareService.payOrder(order).then((data) => {
            console.log('data', data);
            // location.href = data.redirectUrl;
          });

        }
      });
  }

  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      message: this.processing
    });
    return await loading.present();
  }

  ionViewWillLeave() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }


}
