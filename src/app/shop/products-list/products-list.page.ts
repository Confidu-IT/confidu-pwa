import { Component, OnInit } from '@angular/core';
import { ShopwareService } from '../../shared/services/shopware/shopware.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../user/auth.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.page.html',
  styleUrls: ['./products-list.page.scss'],
})
export class ProductsListPage implements OnInit {
  public products: any[];
  public isLoading = true;

  private subscription: Subscription;
  public user: any;

  constructor(
    private userAuth: AuthService,
    private shopwareService: ShopwareService
  ) { }

  ngOnInit() {
    this.subscription = this.userAuth.user$
      .subscribe(user => {
        this.user = user;
        this.shopwareService.headers['firebase-context-token'] = this.user.za;
      });
    this.shopwareService.getProducts()
      .then(products => {
        this.products = products;
        this.isLoading = false;
      });
  }

  ionViewWillLeave() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
