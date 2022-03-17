import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { CommonService } from '../../services/common/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar-modal',
  templateUrl: './toolbar-modal.page.html',
  styleUrls: ['./toolbar-modal.page.scss'],
})
export class ToolbarModalPage {
  public selected: string;
  public isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  public showLabNotes = false;
  public showInvoiceNotes = false;
  public showDiagNotes = false;

  public labIcon = '../../../assets/icons/toolbar-footer/forscher_box_activation.svg';
  public diagIcon = '../../../assets/icons/toolbar-footer/bild_diagnose.svg';
  public invoiceIcon = '../../../assets/icons/toolbar-footer/invoice_upload.svg';

  private language: string;

  constructor(
    private modalCtrl: ModalController,
    private translateService: TranslateService,
    private commonService: CommonService,
    private router: Router
  ) {
    this.language = commonService.language;
    translateService.use(this.language);
  }

  public onSelectLink(): void {
    console.log('selected', this.selected)
    this.showLabNotes = false;
    this.showInvoiceNotes = false;
    this.showDiagNotes = false;
    if (this.selected === 'lab' ) {
      this.showLabNotes = true;
    } if (this.selected === 'invoice') {
      this.showInvoiceNotes = true;
    } else if (this.selected === 'diagnosis') {
      this.showDiagNotes = true;
    }
  }

  public closeModal() {
    this.modalCtrl.dismiss(null);
  }

  public onConfirm() {
    console.log('this.selected', this.selected)
    if (this.selected === 'invoice') {
      const petId = localStorage.getItem('activePet');
      if (!petId) {
        this.modalCtrl.dismiss(null);
      }
      this.modalCtrl.dismiss(null).then(() => {
        this.router.navigateByUrl(`invoice-upload/${petId}/Tierarztbesuche/consultation_cc`);
      });
    } else if (this.selected === 'diagnosis') {
      this.modalCtrl.dismiss(null).then(() => {
        this.router.navigateByUrl(`diagnosis`);
      });

    } else {
      this.modalCtrl.dismiss({
        action: this.selected
      });
    }
  }

  ionViewWillLeave() {
    this.selected = null;
    this.modalCtrl.dismiss(null);
  }

}
