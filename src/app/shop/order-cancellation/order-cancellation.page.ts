import { Component } from '@angular/core';
import {Subscription} from 'rxjs';
import {AuthService} from '../../user/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {CommonService} from '../../shared/services/common/common.service';
import {ShopwareService} from '../../shared/services/shopware/shopware.service';

@Component({
  selector: 'app-order-cancellation',
  templateUrl: './order-cancellation.page.html',
  styleUrls: ['./order-cancellation.page.scss'],
})
export class OrderCancellationPage {
  private subscription: Subscription;
  private readonly routeSub: Subscription;
  public params: any;
  private language: string;
  private iconPath = '../../../../assets/icons/shop';

  public successImg = `${this.iconPath}/cancel_success.svg`;
  public errorImg = `${this.iconPath}/cancel_error.svg`;
  public user: any;
  public isLoading: boolean;
  public profile: any;
  public selectedAnswer: string;
  public showForm: boolean;
  public showSuccess: boolean;
  public showError: boolean;

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
          this.getProfile();
        } else {
          this.router.navigateByUrl('/');
        }
      });
  }

  public onSendCancellation() {
    const answer = {
      'salutationId': this.shopwareService.fakeSalutationId,
      'firstName': this.profile.firstName,
      'lastName': this.profile?.lastName,
      'email': this.profile.email,
      'phone': this.profile?.customFields?.custom_customers_tel || ' ',
      'subject': this.params.orderNr,
      'comment': this.selectedAnswer
    };
    this.shopwareService.sendCancellation(answer)
      .then(response => {
        this.showForm = false;
        if (response.errors) {
          this.showError = true;
        } else {
          this.showSuccess = true;
        }
      });
  }

  private getProfile(): Promise<any> {
    // this.shopwareService.headers['firebase-context-token'] = this.user.za;
    return this.shopwareService.getProfile()
      .then(response => {
        if (response.errors) {
          this.commonService.handleResponseErrors(response.errors[0].status);
          this.router.navigateByUrl(`order-history`);
        } else {
          this.profile = response;
          this.showForm = true;
          this.isLoading = false;
        }
      });
  }

  ionViewWillLeave() {
    this.selectedAnswer = undefined;
    this.showError = false;
    this.showSuccess = false;

    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }
}
