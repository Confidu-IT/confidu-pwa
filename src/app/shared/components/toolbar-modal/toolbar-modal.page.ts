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

  constructor(
    private modalCtrl: ModalController,
    private translateService: TranslateService,
    private commonService: CommonService,
    private router: Router
  ) { }

  ionViewWillEnter() {
    this.translateService.setDefaultLang(this.commonService.language); // fallback
    this.translateService.use(this.translateService.getBrowserLang());
  }

  public closeModal() {
    this.modalCtrl.dismiss(null);
  }

  public onConfirm() {
    if (this.selected === 'invoice') {
      const petId = localStorage.getItem('activePet');
      if (!petId) {
        this.modalCtrl.dismiss(null);
      }
      this.modalCtrl.dismiss(null).then(() => {
        this.router.navigateByUrl(`invoice-upload/${petId}/Tierarztbesuche/consultation_cc`);
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
