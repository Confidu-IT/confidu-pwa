import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../../shared/services/common/common.service';
import { ShopwareService } from '../../shared/services/shopware/shopware.service';
import { AuthService } from '../auth.service';
import { LoadingController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { FirebaseService } from '../../shared/services/firebase/firebase.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  public logo = '../../assets/icons/logo-confid3.svg';
  public signupForm: FormGroup;
  public signinForm: FormGroup;
  public isSignup: boolean;
  public isChecked: boolean;
  public privacyLink = '';
  public conditionsLink = '';
  public countries: any[];
  private userId: string;
  private readonly subscription: Subscription;
  private readonly routeSub: Subscription;
  private mail: string;
  private params: any;
  private language: string;

  constructor(
    private commonService: CommonService,
    private shopwareService: ShopwareService,
    private firebaseService: FirebaseService,
    private userAuth: AuthService,
    private translateService: TranslateService,
    private loadingCtrl: LoadingController,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.routeSub = this.activatedRoute.queryParams
      .subscribe(params => {
        this.params = params;
      });
  }

  ngOnInit() {
    this.isSignup = this.router.url === '/signup';
    this.isChecked = false;
    this.language = this.commonService.language;
    this.translateService.use(this.language);
    this.shopwareService.getCountries()
      .then(response => {
        if (response.errors) {
          this.commonService.handleResponseErrors(response.errors[0].status);
        } else {
          this.countries = response.elements;
        }
      });

    if (this.params.em && this.params.hash) {
      this.shopwareService.validate(this.params.em, this.params.hash)
        .then( resp => {
          console.log('resp', resp);
        });
    }

    this.signupForm = new FormGroup({
      email: new FormControl(null, {
        updateOn: 'change',
        validators: [
          Validators.required,
          Validators.email
        ]
      }),
      password: new FormControl(null, {
        updateOn: 'change',
        validators: [
          Validators.required,
          // Validators.pattern('(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{7,}')
        ]
      }),
      password_confirm: new FormControl(null, {
        updateOn: 'change',
        validators: [
          Validators.required
        ]
      }),
      country: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      })
    });

    this.signinForm = new FormGroup({
      email: new FormControl(null, {
        updateOn: 'change',
        validators: [
          Validators.required,
          Validators.email
        ]
      }),
      password: new FormControl(null, {
        updateOn: 'change',
        validators: [
          Validators.required,
          // Validators.pattern('(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{7,}')
        ]
      })
    });
  }

  public validForm(): boolean {
    if (this.isSignup) {
      return this.signupForm.valid && this.isChecked && this.pwMatcher;
    } else {
      return this.signinForm.valid;
    }
  }

  get pwMatcher(): boolean {
    return this.signupForm.get('password').value === this.signupForm.get('password_confirm').value;
  }

  public onSendForm(): void {
    let email, password, country;
    this.presentLoading();

    if (this.isSignup) {
      this.mail = this.signupForm.value.email;
      email =  this.signupForm.value.email;
      password = this.signupForm.value.password;
      country = this.signupForm.value.country;
    } else {
      password = this.signinForm.value.password;
      email = this.signinForm.value.email;
    }

    if (this.isSignup) {
      this.createUser(email, password, country)
        .then((res: any) => {
          if (res?.errors) {
            this.loadingCtrl.dismiss(null);
            this.commonService.handleLoginErrors(res.errors[0].status);
            this.signupForm.reset();
            this.isChecked = false;
            return;
          } else if (res) {
            // console.log('res', res);
            this.loadingCtrl.dismiss(null);
            this.router.navigateByUrl(`verification/account/${this.mail}`);
          }

        });
    } else {
      this.signinUser(email, password)
        .then(res => {
          if (res?.errors) {
            this.commonService.handleLoginErrors(res.errors[0].status);
            this.loadingCtrl.dismiss(null);
            return;
          } else if (res) {
            this.userId = res.id;
            this.userAuth.createOrGetFirebaseUser(res)
              .then(() => {
                // this.signinForm.reset();
                this.isChecked = false;
                this.getUserData(this.userId);
              });
          }
          this.loadingCtrl.dismiss(null);
        });
    }
  }

  private createUser(email: string, password: string, country: string): Promise<any> {
    localStorage.clear();
    localStorage.setItem('showWalkthrough', 'yes');
    this.shopwareService.customer.email = email;
    this.shopwareService.customer.password = password;
    this.shopwareService.customer.countryId = country;
    console.log(this.shopwareService.customer);
    return this.shopwareService.signup(this.shopwareService.customer);
  }

  private async signinUser(email: string, password: string) {
    const signin = await this.shopwareService.signin(email, password);
    if (signin && signin.errors) {
      this.commonService.handleLoginErrors(signin.errors[0].status);
      this.loadingCtrl.dismiss(null);
      return;
    } else {
      return await this.shopwareService.getProfile();
    }
  }

  private async presentLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'lade ...'
    });
    return await loading.present();
  }

  private getUserData(userId: string) {
    this.firebaseService.getUser(userId)
      .subscribe((data: any) => {
        if (data?.activePet) {
          localStorage.setItem('activePet', data.activePet);
        }

        if (data?.country) {
          localStorage.setItem('country', data.country);
        }
        this.loadingCtrl.dismiss(null);
        this.router.navigateByUrl('/');
      });
  }

  ionViewWillLeave() {
    this.signupForm.reset();
    this.signinForm.reset();
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

}
