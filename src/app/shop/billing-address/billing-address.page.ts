import { Component } from '@angular/core';
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
export class BillingAddressPage {
  public form: FormGroup;
  public title: string;
  public countries: any[];
  public equalAddresses = true;

  private readonly routeSub: Subscription;
  private  subscription: Subscription;
  private language: any;
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
        this.title = params.type;
      });
  }

  ionViewWillEnter() {
    this.language = this.commonService.language;
    this.translateService.setDefaultLang(this.language); // fallback
    this.translateService.use(this.translateService.getBrowserLang());
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

    this.subscription = this.userAuth.user$
      .subscribe(user => {
        this.user = user;
        this.getProfile();
      });

  }

  public onProgressForm(): void {
    const address = {
      countryId: this.profile.country?.id,
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      zipcode: this.form.value.zipcode,
      city: this.form.value.city,
      street: this.form.value.street
    };

    if (this.equalAddresses) {
      this.updateAddresses(address)
        .then(() => {
          this.router.navigateByUrl('/shop/payment');
        });
    } else {
      this.updateAddress(address)
        .then(() => {
          this.shopwareService.headers['firebase-context-token'] = this.user.za;
          this.getProfile()
            .then((resp) => {
              if (this.profile.defaultShippingAddress && this.profile.defaultBillingAddress) {
                if (this.profile.defaultPaymentMethod) {
                  this.router.navigateByUrl('/shop/order');
                } else {
                  this.router.navigateByUrl('/shop/payment');
                }
              } else if (this.title === 'rechnungsadresse' && !this.profile.defaultShippingAddress) {
                this.form.reset();
                this.title = 'lieferadresse';
              } else if (this.title === 'lieferadresse' && !this.profile.defaultBillingAddress) {
                this.form.reset();
                this.title = 'rechnungsadresse';
              }
            });
        });
    }
  }

  private updateAddresses(address): Promise<any> {
    this.shopwareService.headers['firebase-context-token'] = this.user.za;
    return this.shopwareService.createAddress(address)
      .then(addressId => {
        if (addressId.errors) {
          this.commonService.handleShopErrors(addressId.errors[0].status);
        } else {
          this.shopwareService.setAddress(addressId.id, 'billing');
        }
        this.shopwareService.setAddress(addressId.id, 'shipping');
      });
  }

  private updateAddress(address): Promise<any> {
    this.shopwareService.headers['firebase-context-token'] = this.user.za;
    return this.shopwareService.createAddress(address)
      .then(addressId => {
        if (addressId.errors) {
          this.commonService.handleShopErrors(addressId.errors[0].status);
        } else {
          if (this.title === 'rechnungsadresse') {
            this.shopwareService.setAddress(addressId.id, 'billing');
          } else if (this.title === 'lieferadresse') {
            this.shopwareService.setAddress(addressId.id, 'shipping');
          }
        }
      });
  }

  private getProfile(): Promise<any> {
    this.shopwareService.headers['firebase-context-token'] = this.user.za;
    return this.shopwareService.getProfile()
      .then(response => {
        console.log('response', response);
        if (response.errors) {
          this.commonService.handleShopErrors(response.errors[0].status);
        } else {
          this.profile = response;
        }
      });
  }

  ionViewWillLeave() {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
