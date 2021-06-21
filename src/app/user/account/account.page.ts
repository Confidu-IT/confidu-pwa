import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CommonService } from '../../shared/services/common/common.service';
import { ShopwareService } from '../../shared/services/shopware/shopware.service';
import { ModalController } from '@ionic/angular';
import { UserModalPage } from '../user-modal/user-modal.page';
import { FirebaseService } from '../../shared/services/firebase/firebase.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage {
  private subscription: Subscription;
  private iconPath = '../../assets/icons/account';
  private language: string;
  public user: any;

  public accountImg = `${this.iconPath}/account.svg`;
  public chevron = `${this.iconPath}/chevron-forward-outline.svg`;
  public isLoading: boolean;
  public account: any;
  public title: string;
  public firstName: string;
  public lastName: string;
  public email: string;
  public phone: string;
  public languages: any;
  public selectedLanguage: any;

  constructor(
    private userAuth: AuthService,
    private firebaseService: FirebaseService,
    private router: Router,
    private translateService: TranslateService,
    private commonService: CommonService,
    private shopwareService: ShopwareService,
    private modalCtrl: ModalController
  ) { }

  ionViewWillEnter() {
    this.isLoading = true;

    this.translateService.get('ACCOUNT_PAGE')
      .subscribe(values => {
        this.title = values.TITLE;
      });
    this.translateService.get('USER_MODAL_PAGE')
      .subscribe(values => {
        const ger = values.LANGUAGES.GERMAN;
        const en = values.LANGUAGES.ENGLISH;
        const dk = values.LANGUAGES.DANISH;
        const it = values.LANGUAGES.ITALIAN;
        const fr = values.LANGUAGES.FRENCH;
        const es = values.LANGUAGES.SPANISH;
        const pl = values.LANGUAGES.POLISH;

        this.languages = [
          { label: dk, value: 'dk' },
          { label: ger, value: 'de' },
          { label: en, value: 'en' },
          { label: fr, value: 'fr' },
          { label: it, value: 'it' },
          { label: es, value: 'es' },
          { label: pl, value: 'pl' },
        ];
      });



    this.subscription = this.userAuth.user$
      .subscribe(user => {
        if (!user) {
          this.router.navigateByUrl('/');
        }
        this.user = user;

        this.shopwareService.headers['firebase-context-token'] = this.user.za;
        this.shopwareService.getCustomer()
          .then(response => {
            if (response.errors) {
              this.commonService.handleShopErrors(response.errors[0].status);
            } else {

              this.account = response;
              this.firstName = response.firstName;
              this.lastName = response.lastName;
              this.email = response.email;
              this.phone = response?.customFields?.custom_customers_tel;
              this.updateLanguage();
              this.isLoading = false;
            }
          });
      });
  }

  private updateLanguage(): string {
    this.language = this.commonService.language;
    this.translateService.use(this.language);
    const country: any[] = this.languages.filter(lang => lang.value === this.language);
    return this.selectedLanguage = country.length > 0 ? this.selectedLanguage = country[0].label : '';
  }

  public updateInfo(type: string) {
    this.presentModal(type);
  }

  private async presentModal(type: string) {
    const modal = await this.modalCtrl.create({
      component: UserModalPage,
      componentProps: {
        type
      }
    });
    modal.onDidDismiss()
      .then((response: any) => {
        if (response.role === 'name') {
          this.firstName = response.data.firstName;
          this.lastName = response.data.lastName;
        }
        if (response.role === 'email') {
          this.email = response.data;
        }

        if (response.role === 'phone') {
          this.phone = response.data.phone;
        }
        if (response.role === 'language') {
          this.updateLanguage();
        }
      });
    return await modal.present();
  }

  ionViewWillLeave() {
   if (this.subscription) {
     this.subscription.unsubscribe();
   }
 }

}
