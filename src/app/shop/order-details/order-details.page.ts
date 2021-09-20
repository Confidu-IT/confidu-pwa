import { Component } from '@angular/core';
import {Subscription} from 'rxjs';
import {AuthService} from '../../user/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {CommonService} from '../../shared/services/common/common.service';
import {ShopwareService} from '../../shared/services/shopware/shopware.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.page.html',
  styleUrls: ['./order-details.page.scss'],
})
export class OrderDetailsPage {
  private subscription: Subscription;
  private routeSub: Subscription;
  private params: any;
  private language: string;
  private iconPath = '../../../../assets/icons/shop';

  public replacementImg = `${this.iconPath}/no_image.png`;
  public user: any;
  public isLoading: boolean;
  public order: any;

  constructor(
    private userAuth: AuthService,
    private router: Router,
    private translateService: TranslateService,
    private commonService: CommonService,
    private activatedRoute: ActivatedRoute,
    private shopwareService: ShopwareService,
  ) {
    this.routeSub = this.activatedRoute.params
      .subscribe(params => {
        this.params = params;
      });
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.language = this.commonService.language;
    this.translateService.use(this.language);

    this.subscription = this.userAuth.user$
      .subscribe(user => {
        if (user) {
          this.user = user;
          this.getOrderById(this.params.orderId);
        } else {
          this.router.navigateByUrl('/');
        }
      });
  }

  private getOrderById(id: string): void {
    this.shopwareService.headers['firebase-context-token'] = this.user.za;
    this.shopwareService.getOrderDetails(id)
      .then(response => {
        console.log('response', response);
        if (response.errors?.length > 0) {
          this.commonService.handleResponseErrors(response.errors[0]?.status);
          this.isLoading = false;
        } else {
          this.order = response;
          this.isLoading = false;
        }
      });
  }

  ionViewWillLeave() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

}
