
import { Component } from '@angular/core';
import { FirebaseService } from '../../shared/services/firebase/firebase.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../shared/services/common/common.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../user/auth.service';
import { ModalController } from '@ionic/angular';
import { ProductModalPage } from '../../shop/product-modal/product-modal.page';
import { TicketService } from '../ticket-service/ticket-service';

@Component({
  selector: 'app-ticket-order',
  templateUrl: './ticket-order.page.html',
  styleUrls: ['./ticket-order.page.scss'],
})
export class TicketOrderPage {
  private readonly routeSub: Subscription;
  private params: any;
  private subscription: Subscription;
  private iconPath = '../../../../assets/icons/tickets/result';
  private language: string;

  public isLoading: boolean;
  public eyeIcon = `${this.iconPath}/eye.svg`;
  public cartCheckIcon = `${this.iconPath}/product-check.svg`;
  public selectedProducts: string[];
  // public shop: {
  //   main_products?: any;
  //   sec_products?: any;
  // };
  public products: any;
  public user: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private firebaseService: FirebaseService,
    private router: Router,
    private commonService: CommonService,
    private userAuth: AuthService,
    private translateService: TranslateService,
    private modalCtrl: ModalController,
    private ticketService: TicketService
  ) {
    this.routeSub = this.activatedRoute.params
      .subscribe(params => {
        this.params = params;
      });
  }


  ionViewWillEnter(): void {
    this.isLoading = true;
    this.selectedProducts = [];
    this.language = this.commonService.language;
    this.translateService.use(this.language);
    this.subscription = this.userAuth.user$
      .subscribe(user => {
        this.user = user;
        const petId = localStorage.getItem('activePet');
        if (!user || !petId) {
          this.isLoading = false;
          this.router.navigateByUrl('tickets');
        }
        if (!this.params.ticketKey) {
          this.getTicket(user.uid, petId, this.params.id);
        } else {
          this.getDefaultTicket(user.uid, user.za, petId, this.params.ticketKey, this.language);
        }
      });
  }


  private getTicket(user, pet, ticket): void {
    this.firebaseService.getTicketById(user, pet, ticket)
      .subscribe(resp => {
        console.log('resp', resp);
        if (resp?.products) {
          this.products = resp.products;
          // Delete THIS
          // this.presentProductModal(this.shop.main_products[0]);
          this.isLoading = false;
        } else {
          this.router.navigateByUrl('/');
        }
      });
  }

  private getDefaultTicket(
    userID: string,
    token: string,
    petID: string,
    ticketId: string,
    language: string,
  ): void {
    this.ticketService.getTicket(userID, token, petID, ticketId, language, true)
      .subscribe(data => {
        console.log('ticket', data);
        if (data) {
          this.products = data.products;
          this.isLoading = false;
        } else {
          this.router.navigateByUrl('lab-page');
        }
      });
  }

  public onClickProduct(item: any): void {
    console.log('!!', item);
    this.presentProductModal(item);
  }

  public toCartAdded(id: string): boolean {
    return this.selectedProducts.includes(id);
  }

  private async presentProductModal(product: any) {
    const modal = await this.modalCtrl.create({
      component: ProductModalPage,
      componentProps: {
        item: product,
      }
    });
    modal.onDidDismiss()
      .then((response: any) => {
        console.log('modal dismissed', response);
        console.log('products', this.selectedProducts);

        if (!this.selectedProducts.includes(response.data)) {
          this.selectedProducts.push(response.data);
        }
      });
    return await modal.present();
  }

  ionViewWillLeave() {
    this.selectedProducts = [];
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
