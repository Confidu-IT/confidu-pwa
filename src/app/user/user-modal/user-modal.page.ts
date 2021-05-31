import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { CommonService } from '../../shared/services/common/common.service';
import { ShopwareService } from '../../shared/services/shopware/shopware.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.page.html',
  styleUrls: ['./user-modal.page.scss'],
})
export class UserModalPage {
  @Input() type;
  @Input() user;

  public title: string;
  public currentPW: string;
  public nameForm: FormGroup;
  public emailForm: FormGroup;
  public passwordForm: FormGroup;
  public phoneForm: FormGroup;

  private salutationId: string;
  private countryId: string;
  private isPhone: boolean;

  constructor(
    private modalCtrl: ModalController,
    private translateService: TranslateService,
    private storage: AngularFireStorage,
    private commonService: CommonService,
    private shopwareService: ShopwareService
  ) {
    this.nameForm = new FormGroup({
      firstName: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      lastName: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      })
    });

    this.phoneForm = new FormGroup({
      phone: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      })
    });

    this.emailForm = new FormGroup({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email
      ])),
      emailConfirmation: new FormControl('', Validators.required)
    }, (formGroup: FormGroup) => {
      return UserModalPage.areEqual(formGroup);
    });

    this.passwordForm = new FormGroup({
      password: new FormControl('', Validators.compose([
        Validators.minLength(8),
        Validators.required,
        // Validators.pattern('(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}')
      ])),
      confirm_password: new FormControl('', Validators.required)
    }, (formGroup: FormGroup) => {
      return UserModalPage.areEqual(formGroup);
    });

  }

  private static areEqual(formGroup: FormGroup) {
    let val;
    let valid = true;

    for (const key in formGroup.controls) {
      if (formGroup.controls.hasOwnProperty(key)) {
        const control: FormControl = formGroup.controls[key] as FormControl;
        if (val === undefined) {
          val = control.value;
        } else {
          if (val !== control.value) {
            valid = false;
            break;
          }
        }
      }
    }
    if (valid) {
      return null;
    }
    return {
      areEqual: true
    };
  }

  ionViewWillEnter() {
    this.translateService.get('USER_MODAL_PAGE')
      .subscribe(values => {
        if (this.type === 'name') {
          this.title = values.NAME.TITLE;
        }
        if (this.type === 'phone') {
          this.title = values.PHONE.TITLE;
        }
        if (this.type === 'pw') {
          this.title = values.PW.TITLE;
        }
        if (this.type === 'email') {
          this.title = values.EMAIL.TITLE;
        }
      });

    this.shopwareService.getProfile()
      .then(response => {
        // console.log('response', response);
        if (response.errors) {
          this.commonService.handleShopErrors(response.errors[0].status);
        } else {
          this.salutationId = response.salutationId;
          // this.countryId = response.defaultBillingAddress.countryId;
        }
      });
  }

  public onUpdateName() {
    const data = {
      firstName: this.nameForm.value.firstName,
      lastName: this.nameForm.value.lastName,
      salutationId: this.salutationId
    };
    this.updateAccount(data, 'change-profile');
  }

  public onChangeEmail() {
    const data = {
      email: this.emailForm.value.email,
      emailConfirmation: this.emailForm.value.emailConfirmation,
      password: this.currentPW
    };
    this.updateAccount(data, 'change-email');
  }

  public onUpdatePhone() {
    const data = {
      phone: this.phoneForm.value.phone
    };
    this.isPhone = true;
    this.updateAccount(data, 'change-profile');
  }

  public onChangePassword() {
    const data = {
      password: this.currentPW,
      newPassword: this.passwordForm.value.password,
      newPasswordConfirm: this.passwordForm.value.confirm_password
    };
    this.updateAccount(data, 'change-password');
  }

  public pwFormValidator(): boolean {
    return !!this.currentPW && this.passwordForm.value.password !== ''
      && (this.passwordForm.value.password === this.passwordForm.value.confirm_password);
  }

  public emailFormValidator(): boolean {
    return !!this.currentPW && this.emailForm.value.email !== ''
      && (this.emailForm.value.email === this.emailForm.value.emailConfirmation);
  }

  public closeModal() {
    this.modalCtrl.dismiss(null);
  }

  private updateAccount(data, uri) {
    this.shopwareService.updateAccountInfo(data, uri)
      .then(response => {
        if (response && response.errors) {
          this.commonService.presentToast(response.errors[0].detail, 'danger');
          this.passwordForm.reset();
          this.nameForm.reset();
          this.emailForm.reset();
          this.phoneForm.reset();
          this.currentPW = null;
        } else {
          if (uri === 'change-email') {
            this.modalCtrl.dismiss(this.emailForm.value.email, this.type);
          } else if (uri === 'change-profile' && this.isPhone) {
            this.modalCtrl.dismiss(this.phoneForm.value, this.type);
            this.isPhone = false;
          } else if (uri === 'change-profile') {
            this.modalCtrl.dismiss(this.nameForm.value, this.type);
          } else {
            this.modalCtrl.dismiss(null);
          }
        }
      });
  }
}
