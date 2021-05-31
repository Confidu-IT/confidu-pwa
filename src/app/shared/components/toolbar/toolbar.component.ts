import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../../user/auth.service';
import { environment } from '../../../../environments/environment';
import { ShopwareService } from '../../services/shopware/shopware.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit, OnDestroy {
  public logo = environment.logo;
  public cart: boolean;
  public cartSubscription: Subscription;

  constructor(
    public userAuth: AuthService,
    private shopwareService: ShopwareService
  ) {
    this.shopwareService.cartState
      .subscribe(state => {
        console.log('cardState', state);
        this.cart = state;
      });

  }


  ngOnInit() {
    // ToDo: Refactor this
    const headers = this.shopwareService.headers;

    // if (!headers['sw-context-token']) {
    //   const validToken = this.shopwareService.tokenFromLocalStorage;
    //   if (validToken) {
    //     this.shopwareService.getCart()
    //       .then(cart => {
    //         if (cart.data.deliveries.length) {
    //           this.cart = true;
    //         }
    //       });
    //   }
    // }
  }

  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }
}
