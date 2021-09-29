import { Component } from '@angular/core';
import { ShopwareService } from '../../shared/services/shopware/shopware.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../user/auth.service';
import { CommonService } from '../../shared/services/common/common.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.page.html',
  styleUrls: ['./order-summary.page.scss'],
})
export class OrderSummaryPage {
  private subscription: Subscription;
  private readonly routeSubscription: Subscription;
  private params: any;
  private language: string;
  private iconPath = '../../../../assets/icons/shop';
  public user: any;
  public isLoading: boolean
  public radioOnIcon = `${this.iconPath}/radio_on.svg`;
  public radioOffLightIcon = `${this.iconPath}/radio_off_light.svg`;
  public radioOnLightIcon = `${this.iconPath}/radio_on_light.svg`;
  public confirmCheckIcon = `${this.iconPath}/confirm_check.svg`;
  public orderDetails: any;

  constructor(
    private shopwareService: ShopwareService,
    private activatedRoute: ActivatedRoute,
    private userAuth: AuthService,
    private commonService: CommonService,
    private translateService: TranslateService
  ) {
    this.routeSubscription = this.activatedRoute.params
      .subscribe(params => {
        // console.log('params', params);
        this.params = params;
      });
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.language = this.commonService.language;
    this.translateService.use(this.language);
    this.subscription = this.userAuth.user$
      .subscribe(user => {
        console.log('user', user);
        this.user = user;
        const petId = localStorage.getItem('activePet');
        try {
          this.shopwareService.sendOrderId(this.params.orderId)
            .then(data => {
              console.log('data', data);
              if (data?.errors) {
                this.commonService.handleResponseErrors(data.errors[0].status);
              } else {
                this.orderDetails = data;
                this.isLoading = false;
              }


            });
        } catch (e) {
          console.log('e', e);

        }
      });
  }

  public onClickZoomLink(): void {
    window.open('https://zoom.us/join', 'blank');
  }

  ionViewWillLeave(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.routeSubscription) {
      this.subscription.unsubscribe();
    }
  }

}
