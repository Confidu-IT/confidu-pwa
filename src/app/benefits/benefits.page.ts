import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {CommonService} from '../shared/services/common/common.service';
import {Subscription} from 'rxjs';
import {AuthService} from '../user/auth.service';
import {Router} from '@angular/router';
import {switchMap, tap} from 'rxjs/operators';
import {FirebaseService} from '../shared/services/firebase/firebase.service';

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
  public coins = 0;
  public coinsIcon = `${this.iconPath}/coins_icon.svg`;
  public cupIcon = `${this.iconPath}/cup.svg`;

  constructor(
    private translateService: TranslateService,
    private commonService: CommonService,
    private userAuth: AuthService,
    private firebaseService: FirebaseService,
    private router: Router
  ) { }

  ionViewWillEnter() {
    this.isLoading = true;
    this.subscription = this.userAuth.user$
      .subscribe(user => {
        console.log(user)
        this.user = user;
        this.data = this.foo;
        this.isLoading = false;
      });

    this.subscription = this.userAuth.user$.pipe(
      tap(user => user),
      switchMap(user => {
        return this.firebaseService.getCoins(user.uid)
      })
    ).subscribe(data => {
      // console.log('data', data);
      if (data?.confiCoins) {
        this.coins = data.confiCoins;
      }
    })

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
