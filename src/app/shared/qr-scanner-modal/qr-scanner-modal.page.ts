import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CommonService } from '../services/common/common.service';
import { BarcodeFormat } from '@zxing/library';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-qr-scanner-modal',
  templateUrl: './qr-scanner-modal.page.html',
  styleUrls: ['./qr-scanner-modal.page.scss'],
})
export class QrScannerModalPage {
  public allowedFormats = [ BarcodeFormat.QR_CODE, BarcodeFormat.EAN_13, BarcodeFormat.CODE_128, BarcodeFormat.DATA_MATRIX ];
  private errMsg: string;

  constructor(
    private modalCtrl: ModalController,
    private commonService: CommonService,
    private translateService: TranslateService
  ) {
    this.translateService.get('QR_CODE_MODAL')
      .subscribe(values => {
        this.errMsg = values.ERROR;
      });
  }


  public closeModal() {
    this.modalCtrl.dismiss(null);
  }

  public onSuccess(event) {
    let uri: string;
    this.modalCtrl.dismiss({
      uri: event
    });
  }

  public onError() {
    this.commonService.presentToast(this.errMsg, 'danger');
    this.modalCtrl.dismiss(null);
  }

}
