import { Component, OnInit } from '@angular/core';
import { ShopwareService } from '../../shared/services/shopware/shopware.service';
import { Router } from '@angular/router';
import { CommonService } from '../../shared/services/common/common.service';
import { AuthService } from '../../user/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  public cartItems: any[] = [];
  public cart: any;
  public isLoading: boolean;

  public user: any;
  private subscription: Subscription;

  constructor(
    private shopwareService: ShopwareService,
    private router: Router,
    private userAuth: AuthService,
    private commonService: CommonService
  ) {
  }

  ngOnInit() {
    this.isLoading = true;
    this.subscription = this.userAuth.user$
      .subscribe(user => {
        this.user = user;
        this.shopwareService.headers['firebase-context-token'] = this.user.ma;
      });

    this.shopwareService.getCart()
      .then(cart => {
        console.log('cart', cart);
        if (cart.errors.length > 0) {
          this.commonService.handleShopErrors(cart.errors[0]?.status);
        } else {
          if (cart.deliveries.length > 0) {
            this.cart = cart;
            this.cartItems = this.cart?.deliveries[0]?.positions;
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
    this.shopwareService.headers['firebase-context-token'] = this.user.ma;
    this.shopwareService.changeLineItemQuantity(id, quantity)
      .then(product => {
        if (product.errors. length > 0) {
          this.commonService.handleShopErrors(product.errors[0].status);
        } else {
          this.shopwareService.getCart()
            .then(cart => {
              this.cartItems = cart.deliveries[0].positions;
            });
        }
      });
  }

  private deleteCartItem(id) {
    this.shopwareService.headers['firebase-context-token'] = this.user.ma;
    this.shopwareService.deleteLineItem(id)
      .then(product => {
        if (product.errors) {
          this.commonService.handleShopErrors(product.errors[0].status);
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

  public onArticleRemove(id): void {
    this.deleteCartItem(id);
  }

  public onProgressCart(): void {
    this.shopwareService.headers['firebase-context-token'] = this.user.ma;
    this.shopwareService.getProfile()
      .then(response => {
        console.log('response', response);
        if (response.errors?.length > 0) {
          this.commonService.handleShopErrors(response.errors[0].status);
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
