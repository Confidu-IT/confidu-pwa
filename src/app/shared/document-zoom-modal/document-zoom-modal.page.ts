import { Component, Input } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { CommonService } from '../services/common/common.service';
import { TranslateService } from '@ngx-translate/core';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-document-zoom-modal',
  templateUrl: './document-zoom-modal.page.html',
  styleUrls: ['./document-zoom-modal.page.scss'],
})
export class DocumentZoomModalPage {
  @Input() user;
  @Input() path;
  @Input() link;

  public zoomedImage: string;
  public zoomedPdf: any;

  private delImageMsg: string;
  private delBtn: string;
  private cancelBtn: string;
  private language: string;

  constructor(
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private commonService: CommonService,
    private translateService: TranslateService,
    private sanitizer: DomSanitizer
  ) { }

  ionViewWillEnter() {
    this.fetchDocument();
    this.language = this.commonService.language;
    this.translateService.setDefaultLang(this.language); // fallback
    this.translateService.use(this.translateService.getBrowserLang());
    this.translateService.get('ZOOM_MODAL_PAGE')
      .subscribe(values => {
        this.delImageMsg = values.DELETE_MSG;
        this.cancelBtn = values.CANCEL;
        this.delBtn = values.DELETE;
      });
  }

  public closeModal() {
    this.modalCtrl.dismiss(null);
  }

  public onRemoveFile(): void {
    this.deleteAlert();
  }

  private fetchDocument() {
    this.commonService.getSecureLink(
      `${this.path}/${this.link}`,
      `user-docs`,
      localStorage.getItem('activePet'),
      this.user.za
    ).subscribe(data => {
      if (data) {
        const str = data.url;
        const x = str.search('pdf');
        if (x !== -1) {
          // console.log('pdf');
          // this.zoomedPdf = data.url;
          this.zoomedPdf = this.sanitizer.bypassSecurityTrustResourceUrl(data.url);
        } else {
          // console.log('img');
          this.zoomedImage = data.url;
        }
      }
    });
  }

  private async deleteAlert() {
    const alert = await this.alertCtrl.create({
      message: this.delImageMsg,
      buttons: [
        {
          text: this.cancelBtn,
          role: 'cancel',
          cssClass: 'disease-doc-delete-cancel',
        }, {
          text: this.delBtn,
          cssClass: 'disease-doc-delete-action',
          handler: () => {
           console.log('delete');
           this.modalCtrl.dismiss(this.link);
          }
        }
      ]
    });
    await alert.present();
  }

  ionViewWillLeave() {
    this.zoomedPdf = null;
    this.zoomedImage = null;
  }

}
