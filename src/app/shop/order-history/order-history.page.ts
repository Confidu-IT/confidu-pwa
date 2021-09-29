import { Component } from '@angular/core';
import { AuthService } from '../../user/auth.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CommonService } from '../../shared/services/common/common.service';
import { ShopwareService } from '../../shared/services/shopware/shopware.service';
import { Subscription } from 'rxjs';

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
  public isLoading: boolean;
  public orders: any[];
  public selectedProducts: string[];

  constructor(
    private userAuth: AuthService,
    private router: Router,
    private translateService: TranslateService,
    private commonService: CommonService,
    private shopwareService: ShopwareService,
  ) { }

  ionViewWillEnter() {
    this.isLoading = true;
    this.selectedProducts = [];
    this.language = this.commonService.language;
    this.translateService.use(this.language);

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

  public goToOrder(id: string) {
    this.router.navigateByUrl(`order-details/${id}`);
  }


  private getAllOrders(): void {
    // this.shopwareService.headers['firebase-context-token'] = this.user.za;
    this.shopwareService.getOrders()
      .then(orders => {
        console.log('orders', orders);
        if (orders.error) {
          this.commonService.handleResponseErrors(orders.errors[0].status);
          this.orders = [];
          this.isLoading = false;
        } else {
          this.orders = orders.orders?.elements || [];
          console.log('this.orders', this.orders);
          this.isLoading = false;
        }
      });
  }

  ionViewWillLeave() {
    this.orders = undefined;
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
