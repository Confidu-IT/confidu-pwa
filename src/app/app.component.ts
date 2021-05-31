
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
    public translate: TranslateService,
    public menuCtrl: MenuController
  ) {
    this.initializeApp();
    translate.addLangs(['en', 'de']);
    translate.setDefaultLang('de');

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|de/) ? browserLang : 'de');
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

    // if (this.afAuth.auth) {
    //   this.afAuth.auth.signOut()
    //     .then(() => {
    //       localStorage.clear();
    //       this.router.navigateByUrl('/signup');
    //     });
    // }
  }

  initializeApp() {
    this.platform.ready().then(() => {

    });
  }
}
