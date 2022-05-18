import { Component } from '@angular/core';
import {Subscription} from 'rxjs';
import {ShopwareService} from '../../shared/services/shopware/shopware.service';
import {Router} from '@angular/router';
import {CommonService} from '../../shared/services/common/common.service';
import {AuthService} from '../../user/auth.service';
import {LoadingController} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';
import {FirebaseService} from '../../shared/services/firebase/firebase.service';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.page.html',
  styleUrls: ['./delivery.page.scss'],
})
export class DeliveryPage {
  public isLoading: boolean;
  public user: any;
  public shippingAddress: any;
  public billingAddress: any;
  public zipCode: string;
  public pharmacyError: boolean;
  public pharmacyList: any;
  public customer: any;
  public prescriptionDeliveries: any;
  public standardDeliveries: any;
  public selectedStandardDelivery: any;
  public selectedPrescriptionDelivery: any;
  public warningMessage: string;
  public warningImage = '../../../../assets/icons/shop/warning.svg';

  public get validForm(): boolean {
    if (this.selectedPrescriptionDelivery === 'prescription') {
      return this.selectedPharmacy;
    }
    return true;
  }

  private subscription: Subscription;
  private language: string;
  private selectedPharmacy: any;

  private hasPayment: any;

  constructor(
    private shopwareService: ShopwareService,
    private router: Router,
    private commonService: CommonService,
    private firebaseService: FirebaseService,
    private userAuth: AuthService,
    private loadingCtrl: LoadingController,
    private translateService: TranslateService,
  ) { }

 ionViewWillEnter() {
   this.isLoading = true;
   this.language = this.commonService.language;
   this.translateService.use(this.language);

   this.subscription = this.userAuth.user$
     .subscribe(user => {
       this.user = user;
       this.shopwareService.headers['firebase-context-token'] = this.user.za;
       this.getDeliveries();
     });
 }

 public onSwitchDelivery(event): void {
   this.selectedPrescriptionDelivery = event.value;
   this.zipCode = null;
   this.selectedPharmacy = null;

   if (this.selectedPrescriptionDelivery === 'prescription') {
     this.selectedStandardDelivery = 'standardDelivery';
   } else {
     this.selectedStandardDelivery = null;
   }

 }

 public getDeliveries() {
    this.shopwareService.getDeliveryMethods().then(resp => {
      console.log('resp', resp);

      if (resp.prescriptionDeliveries) {
        this.prescriptionDeliveries = resp.prescriptionDeliveries;
        let selectedPrescriptionDelivery = this.prescriptionDeliveries.filter(item => item.checked === true);
        if (selectedPrescriptionDelivery.length > 0) {
          this.selectedPrescriptionDelivery = selectedPrescriptionDelivery[0].key
        }
      }

      if (resp.standardDeliveries) {
        this.standardDeliveries = resp.standardDeliveries;
        let selectedStandardDelivery = this.standardDeliveries.filter(item => item.checked === true);
        if (selectedStandardDelivery.length > 0) {
          this.selectedStandardDelivery = selectedStandardDelivery[0].key
        }
      }

      this.customer = resp.customer;
      this.warningMessage = resp.tooltips;
      this.hasPayment = resp.customer.defaultPaymentMethodId;
      this.billingAddress = this.customer.defaultBillingAddress;
      this.shippingAddress = this.customer.defaultShippingAddress;
      this.isLoading = false;
    })
 }

  public onPickPharmacy(event): void {
    console.log('event', event);
    this.selectedPharmacy = event.value;
  }

  public onChooseZip(): void {
    this.pharmacyError = false;

    console.log('this.zipCode.length', this.zipCode.length)

    console.log('this.zipCode.length type', typeof this.zipCode.length)

    if (this.zipCode.length === 5) {
      this.firebaseService.getPharmaciesByZipCode(this.language, String(this.zipCode))
        .subscribe(pharmacies => {
          console.log('pharmacies', pharmacies);
          this.pharmacyList = pharmacies;
          if (this.pharmacyList.length < 1) {
            this.pharmacyError = true;
          }
        });
    } else {
      console.log('bleh')
    }
  }

  public validate() {

  }

  public onProceed(): void {
    const url = this.hasPayment ? 'shop/order' : 'shop/payment';

    const result = {
      prescriptionDeliverys: this.selectedPrescriptionDelivery || null,
      standardDeliverys: this.selectedStandardDelivery || null,
      pharmacy: this.selectedPharmacy || null
    };

    this.shopwareService.setDeliveryMethod(result).then(resp => {
      this.router.navigateByUrl(url);
    });
  }

 ionViewWillLeave() {
   if (this.subscription) {
     this.zipCode = null;
     this.selectedPharmacy = null;
     this.selectedPrescriptionDelivery = null;
     this.subscription.unsubscribe();
   }
 }

}
