import { Component } from '@angular/core';
import {Subscription} from 'rxjs';
import {AuthService} from '../user/auth.service';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {FirebaseService} from '../shared/services/firebase/firebase.service';
import {CommonService} from '../shared/services/common/common.service';
import {switchMap, tap} from 'rxjs/operators';

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
  public data: any;


  private subscription: Subscription;
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
    this.subscription = this.userAuth.user$.pipe(
      tap(user => user),
      switchMap(user => {
        this.user = user;
        return this.firebaseService.getFaq(this.language);
      })
    ).subscribe(response => {
      console.log('resp', response);
      this.data = response.data;
      this.isLoading = false;
    });
  }

  ionViewWillLeave() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
