import { Component, OnInit } from '@angular/core';
import { ShopwareService } from '../../shared/services/shopware/shopware.service';
import { Router } from '@angular/router';
import { CommonService } from '../../shared/services/common/common.service';
import { AuthService } from '../../user/auth.service';
import { Subscription } from 'rxjs';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  public cartItems: any[] = [];
  public cart: any;
  public isLoading: boolean;
  public totalPrice: number;
  public shipment: number;
  public cancelText: string;
  public okText: string;

  public user: any;
  private subscription: Subscription;
  private language: string;

  constructor(
    private shopwareService: ShopwareService,
    private router: Router,
    private userAuth: AuthService,
    private commonService: CommonService,
    private translateService: TranslateService
  ) {
  }

  ngOnInit() {
    this.isLoading = true;
    this.language = this.commonService.language;
    this.translateService.use(this.language);
    this.translateService.get('CART_PAGE')
      .subscribe(values => {
        // console.log('values', values)
        this.okText = values.OK_BUTTON;
        this.cancelText = values.CANCEL_BUTTON;

      });
    this.subscription = this.userAuth.user$
      .subscribe(user => {
        this.user = user;
        this.shopwareService.headers['firebase-context-token'] = this.user.za;
      });

    this.shopwareService.getCart()
      .then(cart => {
        console.log('cart', cart);
        if (cart.errors.length > 0) {
          this.commonService.handleResponseErrors(cart.errors[0]?.status);
        } else {
          if (cart.deliveries.length > 0) {
            this.cart = cart;
            this.cartItems = this.cart?.deliveries[0]?.positions;
            this.totalPrice = cart?.price?.totalPrice;
            this.shipment = cart.deliveries[0].shippingCosts?.totalPrice;
          }
        }
        this.isLoading = false;
      });

  }

  public onChangeQuantity(event, id): void {
    console.log(event, ': ', id);
    const quantity = +event.detail.value;
    this.updateCartItem(id, quantity);
  }

  private updateCartItem(id, quantity) {
    this.shopwareService.headers['firebase-context-token'] = this.user.za;
    this.shopwareService.changeLineItemQuantity(id, quantity)
      .then(product => {
        if (product.errors. length > 0) {
          this.commonService.handleResponseErrors(product.errors[0].status);
        } else {
          this.shopwareService.getCart()
            .then(cart => {
              console.log('cart', cart)
              this.cartItems = cart.deliveries[0].positions;
              this.totalPrice = cart?.price?.totalPrice;
              this.shipment = cart.deliveries[0].shippingCosts?.totalPrice;
            });
        }
      });
  }

  private deleteCartItem(id) {
    this.shopwareService.headers['firebase-context-token'] = this.user.za;
    this.shopwareService.deleteLineItem(id)
      .then(product => {
        if (product?.errors?.length > 0) {
          this.commonService.handleResponseErrors(product?.errors[0]?.status);
        } else {
          this.shopwareService.getCart()
            .then(cart => {
                if (cart.deliveries[0]) {
                  this.cartItems = cart.deliveries[0].positions;
                  this.totalPrice = cart?.price?.totalPrice;
                  this.shipment = cart.deliveries[0].shippingCosts?.totalPrice;
                } else {
                  this.cartItems = [];
                  localStorage.removeItem('sw-token');
                  this.shopwareService.setCartState(false);
                }
            });
        }
      });
  }

  public onArticleRemove(id): void {
    this.deleteCartItem(id);
  }

  public onProgressCart(): void {
    this.shopwareService.headers['firebase-context-token'] = this.user.za;
    this.shopwareService.getProfile()
      .then(response => {
        console.log('response', response);
        if (response.errors?.length > 0) {
          this.commonService.handleResponseErrors(response.errors[0].status);
        } else {
          let route;
          if (!response.defaultBillingAddress) {
            route = '/shop/address/rechnungsadresse';
          }
          if (!route) {
            route = '/shop/order';
          }
          this.router.navigateByUrl(route);
        }
      });
  }

  public numbers(n: number): number[] {
    return Array(n);
  }

  ionViewWillLeave() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
