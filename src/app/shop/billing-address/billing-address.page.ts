import {Component, OnInit} from '@angular/core';
import { ShopwareService } from '../../shared/services/shopware/shopware.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CommonService } from '../../shared/services/common/common.service';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../user/auth.service';

@Component({
  selector: 'app-billing-address',
  templateUrl: './billing-address.page.html',
  styleUrls: ['./billing-address.page.scss'],
})
export class BillingAddressPage implements OnInit {
  public form: FormGroup;
  public phoneForm: FormGroup;
  public title: string;
  public countries: any[];
  public equalAddresses = true;


  private readonly routeSub: Subscription;
  private  subscription: Subscription;
  private language: any;
  private type: string;
  private billingTitle: string;
  private shippingTitle: string;
  private profile: any;
  public  user: any;

  constructor(
    private shopwareService: ShopwareService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private translateService: TranslateService,
    private userAuth: AuthService,
    private commonService: CommonService
  ) {
    this.routeSub = this.activatedRoute.params
      .subscribe(params => {
        this.type = params.type;
      });
  }

  ionViewWillEnter() {
    this.language = this.commonService.language;
    this.translateService.use(this.language);
    this.translateService.get('BILLING_ADDRESS_PAGE')
      .subscribe(values => {
        this.billingTitle = values.BILLING;
        this.shippingTitle = values.SHIPMENT;

        if (this.type === 'billing') {
          this.title = this.billingTitle;
        } else if (this.type === 'shipping') {
          this.title = this.shippingTitle;
        }
      });


    this.subscription = this.userAuth.user$
      .subscribe(user => {
        this.user = user;
        this.getProfile();
      });

  }

  ngOnInit(): void {
    this.form = new FormGroup({
      firstName: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      lastName: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      zipcode: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      city: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      street: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      country: new FormControl(null, {
        updateOn: 'change'
      })
    });

    this.phoneForm = new FormGroup({
      firstName: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      lastName: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      zipcode: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      city: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      street: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      phone: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      country: new FormControl(null, {
        updateOn: 'change'
      })
    });
  }





  public isPhoneForm() {
    if (this.equalAddresses) {
      return true;
    } else {
      if (this.type === 'shipping') {
        return true;
      } else {
        return false;
      }
    }
  }

  public onProgressForm(): void {
    let address: any;

    if (this.isPhoneForm()) {
      address = {
        countryId: this.profile.country?.id,
        firstName: this.phoneForm.value.firstName,
        lastName: this.phoneForm.value.lastName,
        zipcode: this.phoneForm.value.zipcode,
        city: this.phoneForm.value.city,
        street: this.phoneForm.value.street,
        customFields: {
          custom_customers_tel: this.phoneForm.value.phone
        }
      };
    }

    if (!this.isPhoneForm()) {
      address = {
        countryId: this.profile.country?.id,
        firstName: this.form.value.firstName,
        lastName: this.form.value.lastName,
        zipcode: this.form.value.zipcode,
        city: this.form.value.city,
        street: this.form.value.street,
      };
    }

    if (this.equalAddresses) {
      this.updateAddresses(address)
        .then(() => {
          this.router.navigateByUrl('/shop/delivery');
        });
    } else {
      this.updateAddress(address)
        .then(() => {
          // this.shopwareService.headers['firebase-context-token'] = this.user.za;
          this.getProfile()
            .then((resp) => {
              if (this.profile.defaultShippingAddress && this.profile.defaultBillingAddress) {
                if (this.profile.defaultPaymentMethod) {
                  this.router.navigateByUrl('/shop/delivery');
                } else {
                  this.router.navigateByUrl('/shop/payment');
                }
              } else if (this.title === this.billingTitle && !this.profile.defaultShippingAddress) {
                this.form.reset();
                this.title = this.shippingTitle;
              } else if (this.title === this.shippingTitle && !this.profile.defaultBillingAddress) {
                this.form.reset();
                this.title = this.billingTitle;
              }
            });
        });
    }
  }

  private updateAddresses(address): Promise<any> {
    // this.shopwareService.headers['firebase-context-token'] = this.user.za;
    return this.shopwareService.createAddress(address)
      .then(addressId => {
        if (addressId.errors) {
          this.commonService.handleResponseErrors(addressId.errors[0].status);
        } else {
          this.shopwareService.setAddress(addressId.id, 'billing');
        }
        this.shopwareService.setAddress(addressId.id, 'shipping');
      });
  }

  private updateAddress(address): Promise<any> {
    // this.shopwareService.headers['firebase-context-token'] = this.user.za;
    return this.shopwareService.createAddress(address)
      .then(addressId => {
        if (addressId.errors) {
          this.commonService.handleResponseErrors(addressId.errors[0].status);
        } else {
          if (this.title === this.billingTitle) {
            this.shopwareService.setAddress(addressId.id, 'billing');
          } else if (this.title === this.shippingTitle) {
            this.shopwareService.setAddress(addressId.id, 'shipping');
          }
        }
      });
  }

  private getProfile(): Promise<any> {
    // this.shopwareService.headers['firebase-context-token'] = this.user.za;
    return this.shopwareService.getProfile()
      .then(response => {
        console.log('response', response);
        if (response.errors) {
          this.commonService.handleResponseErrors(response.errors[0].status);
        } else {
          this.profile = response;
        }
      });
  }

  ionViewWillLeave() {
    this.form = null;
    this.phoneForm = null;

    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
