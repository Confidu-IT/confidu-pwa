import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {AuthService} from '../user/auth.service';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {CommonService} from '../shared/services/common/common.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.page.html',
  styleUrls: ['./error.page.scss'],
})
export class ErrorPage {
  public user: any;
  public iconPath = '../../assets/icons';
  public fourOfourIcon = `${this.iconPath}/404.png`;

  private subscription: Subscription;
  private language: string;

  constructor(
    private userAuth: AuthService,
    private router: Router,
    private translateService: TranslateService,
    private commonService: CommonService
  ) { }

  InViewWillEnter() {
    this.language = this.commonService.language;
    this.translateService.use(this.language);
    this.subscription = this.userAuth.user$.subscribe(user => this.user);
  }

  public goHome() {
    this.router.navigateByUrl('/');
  }

  ionViewWillLeave() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
