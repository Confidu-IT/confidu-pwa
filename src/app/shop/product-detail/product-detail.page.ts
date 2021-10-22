import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ShopwareService } from '../../shared/services/shopware/shopware.service';
import { CommonService } from '../../shared/services/common/common.service';
import { IonSlides } from '@ionic/angular';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../user/auth.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit  {
  @ViewChild(IonSlides) slides: IonSlides;
  public product: any;
  public productImage: string;
  public isLoading = true;
  public form: FormGroup;
  public slideOptions = {
    // width: 80,
    // height: 80
  };

  private productId: string;
  private routeSub: Subscription;
  private subscription: Subscription;
  private language: string;
  private cartAdded: string;
  public user: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private shopwareService: ShopwareService,
    private commonService: CommonService,
    private translateService: TranslateService,
    private userAuth: AuthService,
    private router: Router
  ) {
    this.routeSub = this.activatedRoute.params
      .subscribe(param => {
        this.productId = param.productId;
      });
  }

  ngOnInit(): void {
    this.language = this.commonService.language;
    this.translateService.use(this.language);
    this.translateService.get('PRODUCT_DETAIL_PAGE')
      .subscribe(values => {
       this.cartAdded = values.CART_ADDED
      });
    this.subscription = this.userAuth.user$
      .subscribe(user => {
        this.user = user;
        // this.shopwareService.headers['firebase-context-token'] = this.user.za;
      });
    this.form = new FormGroup( {
      quantity: new FormControl(null, {
        updateOn: 'change',
      })
    });
    this.form.patchValue({quantity: '1'});
    this.shopwareService.getProductById(this.productId)
      .then(product => {
        console.log('product', product);
        if (product.errors) {
          this.commonService.handleResponseErrors(product.errors[0].status);
        } else {
          try {
            this.setTotalPrice(product.calculatedPrice.unitPrice, +this.form.value.quantity);
            this.product = product;
            this.productImage = this.product.cover.media.url;

            let str = product.customFields.product_json_description;
            str = str.replace(/^"|"$/g, '');
            str = str.replace(/'/g, '"');
            this.product.med_description = JSON.parse(str);
            console.log('product', this.product);
            this.isLoading = false;
          } catch (e) {
            console.log('e', e);
            this.router.navigateByUrl('/shop/products');
          }
        }
      });
  }

  public onTakeProduct() {
    this.shopwareService.setCartState(true);
    this.shopwareService.addProductToCart(this.product.id, +this.form.value.quantity)
      .then(product => {
        if (product.errors) {
          this.commonService.handleResponseErrors(product.errors[0].status);
        } else {
          this.commonService.presentToast(this.cartAdded, 'secondary');
        }
      });
    // this.router.navigateByUrl('shop/products');
  }

  public numbers(n: number): any[] {
    return Array(n);
  }

  public setTotalPrice(price: number, quantity: number): string {
    const value = price * quantity;
    return (Math.round((value * 1000) / 10) / 100).toFixed(2);
  }

  ionViewWillLeave() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.routeSub.unsubscribe();
  }

}
