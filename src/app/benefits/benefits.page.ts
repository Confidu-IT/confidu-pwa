import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {CommonService} from '../shared/services/common/common.service';
import {Subscription} from 'rxjs';
import {AuthService} from '../user/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-benefits',
  templateUrl: './benefits.page.html',
  styleUrls: ['./benefits.page.scss'],
})
export class BenefitsPage {
  private subscription: Subscription;
  private iconPath = '../../assets/icons';

  public user: any;
  public isLoading: boolean;
  public data: any;
  public coinsIcon = `${this.iconPath}/coins_icon.svg`;
  public cupIcon = `${this.iconPath}/cup.svg`;

  constructor(
    private translateService: TranslateService,
    private commonService: CommonService,
    private userAuth: AuthService,
    private router: Router
  ) { }

  ionViewWillEnter() {
    this.isLoading = true;
    this.subscription = this.userAuth.user$
      .subscribe(user => {
        this.user = user;
        this.data = this.foo;
        this.isLoading = false;
      });
  }

  public onClickLink(link: string): void {
    this.router.navigateByUrl(`benefits-detail/${link}`);
  }

  ionViewWillLeave() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public foo = {
    points: '128',
    cups: [
      {
        label: 'Du bist: Chefpfleger',
        section: 'Pflege',
        rank: 'Rang 2/3',
        image: `${this.iconPath}/trashme.svg`,
        text: 'noch 17 Punkte bis zum nächsten Pokal',
      }
    ]
  }

}
