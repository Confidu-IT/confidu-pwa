import { Component } from '@angular/core';
import {Subscription} from 'rxjs';
import {ShopwareService} from '../../shared/services/shopware/shopware.service';
import {Router} from '@angular/router';
import {CommonService} from '../../shared/services/common/common.service';
import {AuthService} from '../../user/auth.service';
import {LoadingController} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.page.html',
  styleUrls: ['./delivery.page.scss'],
})
export class DeliveryPage {
  public isLoading: boolean;
  public user: any;
  public shippingAddress: any;
  public billingAddress: any;
  public vetZipCode: string;
  public vetError: boolean;

  private subscription: Subscription;
  private language: string;
  private customer: any;

  constructor(
    private shopwareService: ShopwareService,
    private router: Router,
    private commonService: CommonService,
    private userAuth: AuthService,
    private loadingCtrl: LoadingController,
    private translateService: TranslateService,
  ) { }

 ionViewWillEnter() {
   this.isLoading = true;
   this.language = this.commonService.language;
   this.translateService.use(this.language);

   this.subscription = this.userAuth.user$
     .subscribe(user => {
       this.user = user;
       this.shopwareService.headers['firebase-context-token'] = this.user.za;

       this.shopwareService.getProfile()
         .then(profile => {
           if (profile.errors) {
             this.commonService.handleResponseErrors(profile.errors[0].status);
           } else {
             this.customer = profile;
             this.billingAddress = this.customer.defaultBillingAddress;
             this.shippingAddress = this.customer.defaultShippingAddress;
             this.isLoading = false;
           }
         });
     });
 }

  public onPickZip(): void {
    console.log('this.vetZipCode', this.vetZipCode);
    this.vetError = false;
    if (String(this.vetZipCode).length > 4 || String(this.vetZipCode).length < 6) {
      console.log('load vets');
      // this.firebaseService.getVetsByZipCode(this.language, String(this.vetZipCode))
      //   .subscribe(vets => {
      //     console.log('vets', vets);
      //     this.vetsList = vets;
      //     if (this.vetsList.length < 1) {
      //       this.vetError = true;
      //     }
      //   });
    }
  }

 ionViewWillLeave() {
   if (this.subscription) {
     this.subscription.unsubscribe();
   }
 }

}
