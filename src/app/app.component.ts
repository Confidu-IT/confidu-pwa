
import { CommonService } from './shared/services/common/common.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from './user/auth.service';
import {MenuController, Platform} from '@ionic/angular';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {Component} from '@angular/core';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { SplashScreen } from '@capacitor/splash-screen';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public iconPath = '../assets/icons/navi';
  public iosNative: boolean;
  private existingScreenOrientation: string;

  constructor(
    private platform: Platform,
    private commonService: CommonService,
    private router: Router,
    private afAuth: AngularFireAuth,
    private authService: AuthService,
    private so: ScreenOrientation,
    public translateService: TranslateService,
    public menuCtrl: MenuController
  ) {
    this.initializeApp();
    SplashScreen.hide();
    translateService.addLangs(['en', 'de']);
    this.so.lock(this.so.ORIENTATIONS.PORTRAIT);
    this.existingScreenOrientation = this.so.type;

    // alert('platforms: ' + this.platform.platforms());

    // add class for native ios
    if (this.platform.platforms().includes('ios') && this.platform.platforms().includes('capacitor')) {
      this.iosNative = true;
    }

    this.commonService.appLanguage
      .subscribe(lang => {
        if (lang) {
          this.translateService.use(lang);
        }
      });
  }

  public toggleMenu(link: string) {
    this.menuCtrl.close().then(() => {
      return this.router.navigateByUrl(link);
    });
  }

  public onLogout(): void {
    this.menuCtrl.close().then(() => {
      this.authService.logOut();
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {

    });
  }
}
