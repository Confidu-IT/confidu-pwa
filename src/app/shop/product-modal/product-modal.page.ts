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
  public usageInstructions: any;
  public instructionsLink: string;
  @Input() item: any;

  private subscription: Subscription;
  public user: any;

  constructor(
    private translateService: TranslateService,
    private commonService: CommonService,
    private modalCtrl: ModalController,
    private userAuth: AuthService,
    private shopwareService: ShopwareService,
  ) { }

  ngOnInit() {
    this.subscription = this.userAuth.user$
      .subscribe(user => {
        this.user = user;
        this.shopwareService.headers['firebase-context-token'] = this.user.ma;
      });
    this.translateService.setDefaultLang(this.commonService.language); // fallback
    this.translateService.use(this.translateService.getBrowserLang());
    console.log('item', this.item);
    this.title = this.item.translated.name;
    this.productImage = this.item.cover.media.url;

    let str = this.item.translated.customFields.product_json_description;
    str = str.replace(/^"|"$/g, '');
    str = str.replace(/'/g, '"');

    this.usageInstructions = JSON.parse(str);
    // this.usageInstructions = '';
    console.log('this.usageInstructions', this.usageInstructions);

    this.instructionsLink = this.item.translated.customFields.product_pdf_Dokument;
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
    this.shopwareService.headers['firebase-context-token'] = this.user.ma;
    this.shopwareService.setCartState(true);
    this.shopwareService.addProductToCart(this.item.id, +this.form.value.quantity)
      .then(product => {
        if (product.errors) {
          this.commonService.handleShopErrors(product.errors[0].status);
        } else {
          this.commonService.presentToast('Zum Warenkorb hinzugefügt', 'secondary');
          this.modalCtrl.dismiss(this.item.id);
        }
      });
  }

  ionViewWillLeave() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
