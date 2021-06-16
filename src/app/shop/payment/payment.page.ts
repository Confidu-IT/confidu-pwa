import { Component } from '@angular/core';
import { ShopwareService } from '../../shared/services/shopware/shopware.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CommonService } from '../../shared/services/common/common.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../user/auth.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage {
  public payments: any;
  public paymentId: string;

  public user: any;
  private subscription: Subscription;
  private language: string;

  constructor(
    private shopwareService: ShopwareService,
    private translateService: TranslateService,
    private commonService: CommonService,
    private userAuth: AuthService,
    private router: Router
  ) { }

  ionViewWillEnter() {
    this.language = this.commonService.language;
    this.translateService.use(this.language);
    this.subscription = this.userAuth.user$
      .subscribe(user => {
        this.user = user;
        this.shopwareService.headers['firebase-context-token'] = this.user.za;
      });

    this.shopwareService.getPayments()
      .then(payments => {
        console.log('payments', payments);
        this.payments = payments;
      });
  }

  public onProgress() {
    this.shopwareService.headers['firebase-context-token'] = this.user.za;
    this.shopwareService.setPaymentMethod(this.paymentId)
      .then(() => {
        this.router.navigateByUrl('/shop/order');
      });
  }

  ionViewWillLeave() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }


}
