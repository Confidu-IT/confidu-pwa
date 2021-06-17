import { Component } from '@angular/core';
import {CommonService} from '../../../shared/services/common/common.service';
import {AuthService} from '../../auth.service';
import {Router} from '@angular/router';
import {FirebaseService} from '../../../shared/services/firebase/firebase.service';
import {TranslateService} from '@ngx-translate/core';
import {Subscription} from 'rxjs';
import {switchMap, tap} from 'rxjs/operators';

@Component({
  selector: 'app-notifications-list',
  templateUrl: './notifications-list.page.html',
  styleUrls: ['./notifications-list.page.scss'],
})
export class NotificationsListPage {
  public isLoading: boolean;
  public notes: any[];
  public language: string;
  public user: any;
  private subscription: Subscription;

  constructor(
    private commonService: CommonService,
    private userAuth: AuthService,
    private router: Router,
    private firebaseService: FirebaseService,
    private translateService: TranslateService
  ) { }

  ionViewWillEnter() {
    this.isLoading = true;
    this.language = this.commonService.language;
    this.translateService.use(this.language);
    this.subscription = this.userAuth.user$.pipe(
      tap(user => user),
      switchMap((user) => {
        if (!user) {
          this.router.navigateByUrl('/');
        }
        this.user = user;
        return this.firebaseService.markNotificationsAsRead(this.user.uid)
      }),
      switchMap(() => {
        return this.firebaseService.getNotifications(this.user.uid)
      })
    ).subscribe( (data: any) => {
      console.log('data', data);
      for (const item of data) {
        item.notification.header = item.notification.header[this.language];
        item.notification.body = item.notification.body[this.language];
      }
      this.notes = data;
      this.isLoading = false;
    });
  }

  ionViewWillLeave() {
    this.notes = undefined;
    this.subscription.unsubscribe();
  }

}
