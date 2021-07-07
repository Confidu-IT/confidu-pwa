import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {CommonService} from '../../shared/services/common/common.service';
import {AuthService} from '../../user/auth.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-benefits-detail',
  templateUrl: './benefits-detail.page.html',
  styleUrls: ['./benefits-detail.page.scss'],
})
export class BenefitsDetailPage {
  public user: any;
  public isLoading: boolean;
  public data: any;

  private subscription: Subscription;
  private readonly routeSub: Subscription;
  private params: any;

  constructor(
    private translateService: TranslateService,
    private commonService: CommonService,
    private userAuth: AuthService,
    private activatedRoute: ActivatedRoute
  ) {
    this.routeSub = this.activatedRoute.params
      .subscribe(params => {
        this.params = params;
      });
  }

 ionViewWillEnter() {
   this.isLoading = true;
   this.subscription = this.userAuth.user$
     .subscribe(user => {
       this.user = user;
       this.data = this.foo;
       this.isLoading = false;
     });
 }

 private foo = {
    header: {
      headline: 'Dein Pflegepokal',
      body: 'Du bist Chefpfleger! Schau dir an consetetur sadipscing elitr sed.',
      image: 'https://biblicalpreaching.files.wordpress.com/2013/02/example.jpg'
    },
   achievements: [
     {
       headline: 'Hermanns Pflege-Erfolge',
       body: '27 von 64 Aufgaben in dieser Kategorie geschafft.',
       rankings: [
         {
           image: 'https://biblicalpreaching.files.wordpress.com/2013/02/example.jpg',
           type: 'Fell',
           rank: '13/13'
         },
         {
           image: 'https://biblicalpreaching.files.wordpress.com/2013/02/example.jpg',
           type: 'Zähne',
           rank: '2/8'
         },
         {
           image: 'https://biblicalpreaching.files.wordpress.com/2013/02/example.jpg',
           type: 'Krallen',
           rank: '4/6'
         },
         {
           image: 'https://biblicalpreaching.files.wordpress.com/2013/02/example.jpg',
           type: 'Ohren',
           rank: '4/6'
         }
       ]
     }
   ]
 };

  ionViewWillLeave() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

}
