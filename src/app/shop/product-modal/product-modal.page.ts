import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CommonService } from '../../shared/services/common/common.service';
import { ModalController } from '@ionic/angular';
import { FormControl, FormGroup } from '@angular/forms';
import { ShopwareService } from '../../shared/services/shopware/shopware.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../user/auth.service';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.page.html',
  styleUrls: ['./product-modal.page.scss'],
})
export class ProductModalPage implements OnInit {
  public isLoading: boolean;
  public title: string;
  public productImage: string;
  public form: FormGroup;
  public medAmount: string;
  public okText: string;
  public cancelText: string;
  public instructionsLink: string;
  @Input() item: any;

  private subscription: Subscription;
  private language: string;
  private cartAdded: string;
  public user: any;

  constructor(
    private translateService: TranslateService,
    private commonService: CommonService,
    private modalCtrl: ModalController,
    private userAuth: AuthService,
    private shopwareService: ShopwareService,
  ) { }

  ngOnInit() {
    // this.translateService.get('PRODUCT_MODAL_PAGE')
    //   .subscribe(values => {
    //     this.cartAdded = values.CART_ADDED
    //   });
    this.subscription = this.userAuth.user$
      .subscribe(user => {
        this.user = user;
        // this.shopwareService.headers['firebase-context-token'] = this.user.za;
      });
    this.language = this.commonService.language;
    this.translateService.use(this.language);
    this.translateService.get('PRODUCT_MODAL_PAGE')
      .subscribe(values => {
        console.log('values', values);
        this.cartAdded = values.CART_ADDED
        this.cancelText = values.CANCEL;
        this.okText = values.OK;
        console.log('this.okText', this.okText);
      });
    console.log('item', this.item);
    this.title = this.item.med_name;
    this.productImage = this.item?.data?.cover?.media.url;
    this.instructionsLink = this.item?.product_pdf_dokument;
    this.medAmount = this.item.med_amount ? this.item.med_amount.toString() : '1';
    this.form = new FormGroup( {
      quantity: new FormControl(null, {
        updateOn: 'change',
      })
    });
    this.form.patchValue({quantity: this.medAmount});
  }

  public closeModal(): void {
    this.modalCtrl.dismiss(null);
  }

  public numbers(n: number): any[] {
    return Array(n);
  }

  public onTakeProduct() {
    // this.shopwareService.headers['firebase-context-token'] = this.user.za;
    this.shopwareService.setCartState(true);
    this.shopwareService.addProductToCart(this.item.data.id, +this.form.value.quantity)
      .then(product => {
        if (product.errors) {
          this.commonService.handleResponseErrors(product.errors[0].status);
        } else {
          this.commonService.presentToast(this.cartAdded, 'secondary');
          this.modalCtrl.dismiss(this.item?.data?.id);
        }
      });
  }

  ionViewWillLeave() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
