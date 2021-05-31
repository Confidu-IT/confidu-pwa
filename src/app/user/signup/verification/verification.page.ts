import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonService } from '../../../shared/services/common/common.service';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.page.html',
  styleUrls: ['./verification.page.scss'],
})
export class VerificationPage implements OnInit, OnDestroy {
  public sign: string;
  public logo = '../../assets/icons/logo-confid3.svg';
  public signupForm: FormGroup;
  public mail: string;
  public verification = false;
  public recoverySuccess = false;
  public recoveryFail = false;
  private params: any;
  private readonly subscription: Subscription;

  constructor(
    private commonService: CommonService,
    private translateService: TranslateService,
    private activatedRoute: ActivatedRoute
  ) {
    this.subscription = this.activatedRoute.params
      .subscribe(params => {
        this.params = params;
        this.mail = params.mail;
        console.log(this.params);
        if ( params.type === 'account') {
          this.verification = true;
          this.sign = '../../assets/icons/verific_img.svg';
        } else if (params.type === 'recovery-success') {
          this.recoverySuccess = true;
          this.sign = '../../assets/icons/success.svg';
        } else if (params.type === 'recovery-fail') {
          this.recoveryFail = true;
          this.sign = '../../assets/icons/failure.svg';
        }
      });
  }

  ngOnInit() {
    this.translateService.setDefaultLang(this.commonService.language); // fallback
    this.translateService.use(this.translateService.getBrowserLang());
  }

  ngOnDestroy(): void {
    this.verification = false;
    this.recoverySuccess = false;
    this.recoveryFail = false;
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
