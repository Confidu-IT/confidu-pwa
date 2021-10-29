import { Component } from '@angular/core';
import {Platform} from '@ionic/angular';
import {Subscription} from 'rxjs';
import {CommonService} from '../../shared/services/common/common.service';
import {AuthService} from '../../user/auth.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-pwa-instructions',
  templateUrl: './pwa-instructions.page.html',
  styleUrls: ['./pwa-instructions.page.scss'],
})
export class PwaInstructionsPage {
  private iconPath = '../../../assets/icons/help';
  private subscription: Subscription;
  private language: string;

  public infoImg: string;
  public user: any;
  public isLoading: boolean;
  public device: string;

  constructor(
    private platform: Platform,
    private commonService: CommonService,
    private userAuth: AuthService,
    private translateService: TranslateService
  ) { }

  ionViewWillEnter() {
    console.log('platforms: ' + this.platform.platforms());
    this.language = this.commonService.language;
    this.translateService.use(this.language);

    /*
    platforms
    desktop: desktop
    android native: android, cordova, capacitor, mobile, hybrid
    android chrome phone: android, mobile, mobileweb
    android pwa: android, pwa, mobile, mobileweb,
    ios safari: iphone, ios, mobile, mobileweb
    ios pwa: iphone, ios, pwa, mobile, mobileweb
     */

    this.isLoading = true;
    this.subscription = this.userAuth.user$
      .subscribe(user => {
        this.user = user;
        this.isLoading = false;
        if (this.platform.platforms().includes('mobile')) {
          if (this.platform.platforms().includes('ios')) {
            this.infoImg = `${this.iconPath}/iphone_${this.language}.svg`;
            this.device = 'ios';
          } else if (this.platform.platforms().includes('android')) {
            this.infoImg = `${this.iconPath}/android_${this.language}.svg`;
            this.device = 'android';
          }
        }
      });
  }

}
