import { Component } from '@angular/core';
import { AuthService } from '../user/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { FirebaseService } from '../shared/services/firebase/firebase.service';
import { TranslateService } from '@ngx-translate/core';
import { CommonService } from '../shared/services/common/common.service';
import { Subscription } from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-lab',
  templateUrl: './lab.page.html',
  styleUrls: ['./lab.page.scss'],
})
export class LabPage {
  private subscription: Subscription;

  public petId: string;
  public user: any;

  public language: string;
  public isLoading: boolean;
  public regNr: string;
  public labIcon = '../../assets/icons/lab-page/lab.svg';
  public chevron = '../../assets/icons/lab-page/chevron-forward-outline.svg';

  constructor(
    public userAuth: AuthService,
    private afAuth: AngularFireAuth,
    private firebaseService: FirebaseService,
    private translateService: TranslateService,
    private commonService: CommonService,
    private router: Router,
  ) {
  }

  ionViewWillEnter() {
    this.language = this.commonService.language;
    this.translateService.use(this.language);

    this.subscription = this.userAuth.user$
      .subscribe(user => {
        this.user = user;
      });
  }

  public onClickLink(type: string): void {
    this.router.navigateByUrl(`lab-detail/${type}`);
  }

  ionViewWillLeave() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
