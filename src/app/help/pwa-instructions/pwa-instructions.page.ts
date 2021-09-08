import { Component } from '@angular/core';
import {Platform} from '@ionic/angular';
import {Subscription} from 'rxjs';
import {CommonService} from '../../shared/services/common/common.service';
import {AuthService} from '../../user/auth.service';

@Component({
  selector: 'app-pwa-instructions',
  templateUrl: './pwa-instructions.page.html',
  styleUrls: ['./pwa-instructions.page.scss'],
})
export class PwaInstructionsPage {
  private iconPath = '../../../assets/icons/help';
  private subscription: Subscription;

  public infoImg: string;
  public user: any;
  public isLoading: boolean;
  public device: string;

  constructor(
    private platform: Platform,
    private commonService: CommonService,
    private userAuth: AuthService,
  ) { }

  ionViewWillEnter() {
    console.log('platforms', this.platform.platforms());

    this.isLoading = true;
    this.subscription = this.userAuth.user$
      .subscribe(user => {
        this.user = user;
        this.isLoading = false;
        if (this.platform.platforms().includes('mobile')) {
          if (this.platform.platforms().includes('ios')) {
            this.infoImg = `${this.iconPath}/ios_safari.svg`;
            this.device = 'ios';
          } else if (this.platform.platforms().includes('android')) {
            this.infoImg = `${this.iconPath}/android_chrome.svg`;
            this.device = 'android';
          }
        }
      });
  }

}
