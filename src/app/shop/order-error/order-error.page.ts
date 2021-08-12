import { Component } from '@angular/core';
import {Subscription} from 'rxjs';
import {ShopwareService} from '../../shared/services/shopware/shopware.service';
import {Router} from '@angular/router';
import {CommonService} from '../../shared/services/common/common.service';
import {AuthService} from '../../user/auth.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-order-error',
  templateUrl: './order-error.page.html',
  styleUrls: ['./order-error.page.scss'],
})
export class OrderErrorPage {
  public language: string;
  public isLoading: boolean;
  public user: any;
  private subscription: Subscription;

  constructor(
    private shopwareService: ShopwareService,
    private router: Router,
    private commonService: CommonService,
    private userAuth: AuthService,
    private translateService: TranslateService
  ) { }

  ionViewWillEnter() {
    this.isLoading = true;
    this.language = this.commonService.language;
    this.translateService.use(this.language);

    this.subscription = this.userAuth.user$
      .subscribe(user => {
        this.user = user;
        this.isLoading = false;
      });
  }

  ionViewWillLeave() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
