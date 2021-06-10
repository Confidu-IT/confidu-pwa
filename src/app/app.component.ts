
import { CommonService } from './shared/services/common/common.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from './user/auth.service';
import {MenuController, Platform} from '@ionic/angular';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public iconPath = '../assets/icons/navi';

  constructor(
    private platform: Platform,
    private commonService: CommonService,
    private router: Router,
    private afAuth: AngularFireAuth,
    private authService: AuthService,
    public translateService: TranslateService,
    public menuCtrl: MenuController
  ) {
    this.initializeApp();
    translateService.addLangs(['en', 'de']);
    console.log('this.commonService.language', this.commonService.language)
    // translateService.use(this.commonService.language);

    // if (localStorage.getItem('country')) {
    //   console.log('localStorage.getItem(country)', localStorage.getItem('country'))
    //   translateService.use(localStorage.getItem('country'));
    // }

    // translateService.use('en');
    // if (localStorage.getItem('country')) {
    //   translateService.use(localStorage.getItem('country'));
    // } else {
    //   translateService.use(this.commonService.language);
    // }
    this.commonService.appLanguage
      .subscribe(lang => {
        console.log('lang', lang)
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
