import { Component } from '@angular/core';
import {Subscription} from 'rxjs';
import {AuthService} from '../user/auth.service';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {FirebaseService} from '../shared/services/firebase/firebase.service';
import {CommonService} from '../shared/services/common/common.service';

@Component({
  selector: 'app-help',
  templateUrl: './help.page.html',
  styleUrls: ['./help.page.scss'],
})
export class HelpPage {
  public isLoading: boolean;
  public user: any;
  public iconPath = '../../assets/icons/help';
  public helpIcon = `${this.iconPath}/help.svg`;
  public formText: string;
  public uploadPath: string;

  private subscription: Subscription;
  private addedFiles: string[];
  private language: string;

  constructor(
    private userAuth: AuthService,
    private router: Router,
    private translateService: TranslateService,
    private firebaseService: FirebaseService,
    private commonService: CommonService
  ) { }

  ionViewWillEnter() {
    this.isLoading = true;
    this.language = this.commonService.language;
    this.translateService.use(this.language);
    this.uploadPath = `support-doc`;
    // user-docs/uid/petId/support/datum
    this.subscription = this.userAuth.user$
      .subscribe(user => {
        this.user = user;
        this.isLoading = false;
      })
  }

  public receiveAddedFiles(event) {
    this.addedFiles = event;
  }

  public onSendForm() {

  }

  ionViewWillLeave() {
    this.addedFiles = null;
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
