import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../shared/services/common/common.service';
import { TranslateService } from '@ngx-translate/core';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AuthService } from '../../user/auth.service';

@Component({
  selector: 'app-product-shipment-modal',
  templateUrl: './product-shipment-modal.page.html',
  styleUrls: ['./product-shipment-modal.page.scss'],
})
export class ProductShipmentModalPage implements OnInit {
  private iconPath = '../../../../assets/icons/shop';
  public infoIcon = `${this.iconPath}/shipment-modal-info.svg`;

  private subscription: Subscription;
  private language: string;

  constructor(
    private commonService: CommonService,
    private translateService: TranslateService,
    private userAuth: AuthService,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.language = this.commonService.language;
    this.translateService.use(this.language);
  }

  public closeModal(): void {
    this.modalCtrl.dismiss(null);
  }

  ionViewWillLeave() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
