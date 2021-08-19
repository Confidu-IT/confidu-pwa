import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CommonService } from '../shared/services/common/common.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../user/auth.service';

@Component({
  selector: 'app-follow-up-prescription',
  templateUrl: './follow-up-prescription.page.html',
  styleUrls: ['./follow-up-prescription.page.scss'],
})
export class FollowUpPrescriptionPage {
  public user: any;
  public isLoading: boolean;
  public iconPath = '../../../../assets/icons/fu-prescription';
  public caseImg = `${this.iconPath}/koffer.svg`;
  public listItems: any;

  private subscription: Subscription;
  private language: string;

  constructor(
    private translateService: TranslateService,
    private commonService: CommonService,
    private userAuth: AuthService
  ) { }

  ionViewWillEnter() {
    this.isLoading = true;
    this.language = this.commonService.language;
    this.translateService.use(this.language);
    this.translateService.get('FU_PAGE')
      .subscribe(values => {
       this.listItems = values.INTRO_LIST;
      });
    this.subscription = this.userAuth.user$
      .subscribe(user => {
        this.user = user;
        this.isLoading = false;
      });
  }

  ionViewWillLeave() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
