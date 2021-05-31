import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { TranslateService } from '@ngx-translate/core';
import { CommonService } from '../../shared/services/common/common.service';
import { FirebaseService } from '../../shared/services/firebase/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage {
  private subscription: Subscription;
  private iconPath = '../../assets/icons/notifications';
  public bellImg = `${this.iconPath}/bell.svg`;

  private language: string;
  public user: any;
  public notifications: any;

  constructor(
    private userAuth: AuthService,
    private translateService: TranslateService,
    private commonService: CommonService,
    private router: Router,
    private firebaseService: FirebaseService
  ) {
  }

  ionViewWillEnter() {
    this.language = this.commonService.language;
    this.translateService.setDefaultLang(this.language); // fallback
    this.translateService.use(this.translateService.getBrowserLang());
    this.subscription = this.userAuth.user$
      .subscribe(user => {
        if (!user) {
          this.router.navigateByUrl('/');
        }
        this.user = user;
        this.getPermissions(this.user.uid);
      });
  }

  private getPermissions(userId: any) {
    this.firebaseService.getUser(userId)
      .subscribe((data: any) => {
        if (data.notification_permissions) {
          this.notifications = data.notification_permissions;
        } else {
          this.notifications = {
            lab_results: {
              push: false,
              mail: false
            },
            tasks_reminder: {
              push: false,
              mail: false
            },
            recipe_comments: {
              push: false,
              mail: false
            },
            recipe_ratings: {
              push: false,
              mail: false
            }
          };
        }
      });
  }

  public onClickRadiobutton(event, field, type): void {
    this.notifications[field][type] = event.detail.checked;
    this.firebaseService.creatNotificationPermissions(this.user.uid, this.notifications);
  }

  ionViewWillLeave() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
