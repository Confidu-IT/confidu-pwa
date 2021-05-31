import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../shared/services/common/common.service';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ShopwareService } from '../../../shared/services/shopware/shopware.service';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-pw-recovery',
  templateUrl: './pw-recovery.page.html',
  styleUrls: ['./pw-recovery.page.scss'],
})
export class PwRecoveryPage implements OnInit {
  public sign = '../../assets/icons/account.svg';
  public isMail: boolean;
  public isPw: boolean;
  public isSuccess: boolean;
  public mailForm: FormGroup;
  public pwForm: FormGroup;
  public logo = '../../assets/icons/logo-confid3.svg';
  public successSign = '../../assets/icons/success.svg';
  public failSign = '../../assets/icons/fail.svg';
  public user: any;

  private readonly routeSub: Subscription;
  private params: any;
  private subscription: Subscription;

  constructor(
    private commonService: CommonService,
    private translateService: TranslateService,
    private activatedRoute: ActivatedRoute,
    private shopwareService: ShopwareService,
    private userAuth: AuthService,
    private router: Router
  ) {
    this.routeSub = this.activatedRoute.queryParams
    // this.routeSub = this.activatedRoute.params
      .subscribe(params => {
        this.params = params;
      });
  }

  ngOnInit() {
    this.translateService.setDefaultLang(this.commonService.language); // fallback
    this.translateService.use(this.translateService.getBrowserLang());

    this.mailForm = new FormGroup({
      email: new FormControl(null, {
        updateOn: 'change',
        validators: [
          Validators.required,
          Validators.email
        ]
      }),
    });

    this.pwForm = new FormGroup({
      password: new FormControl(null, {
        updateOn: 'change',
        validators: [
          Validators.required
        ]
      }),
      password_confirm: new FormControl(null, {
        updateOn: 'change',
        validators: [
          Validators.required
        ]
      }),
    });
  }

  ionViewWillEnter() {
    this.subscription = this.userAuth.user$
      .subscribe(user => {
        this.user = user;
      });
    if (this.params.hash) {
      this.isPw = true;
      this.isMail = false;
    } else {
      this.isMail = true;
      this.isPw = false;
    }
  }

  get validForm(): boolean {
    if (this.params.hash) {
      return this.pwMatcher && this.pwForm.valid;
    } else {
      return this.mailForm.valid;
    }
  }

  get pwMatcher(): boolean {
    return this.pwForm.get('password').value === this.pwForm.get('password_confirm').value;
  }

  public onSendForm(): void {
    if (this.isMail) {
      this.sendEmail();
    } else {
      this.sendNewPassword();
    }
  }

  public onSuccess(): void {
    this.isPw = false;
    this.isMail = false;
    this.isSuccess = true;
  }

  private sendEmail(): void {
    this.shopwareService.sendEmailforPasswordReset(this.mailForm.value.email)
      .then(response => {
        console.log('response', response);
        if (response.success) {
          this.router.navigateByUrl(`verification/recovery-success/${this.mailForm.value.email}`);
        } else {
          this.router.navigateByUrl(`verification/recovery-fail/${this.mailForm.value.email}`);
        }
      });
  }

  private sendNewPassword(): void {
    this.shopwareService.sendNewPassword(this.params.hash, this.pwForm.value.password, this.pwForm.value.password_confirm)
      .then(response => {
        console.log('response', response);
        if (response.success) {
          this.onSuccess();
        } else {
          console.log('bleh');
        }
      });
  }

  ionViewWillLeave() {
    this.pwForm.reset();
    this.mailForm.reset();
    this.isPw = undefined;
    this.isMail = undefined;
    this.isSuccess = undefined;
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
