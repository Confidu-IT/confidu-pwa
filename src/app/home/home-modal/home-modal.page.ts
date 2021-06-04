import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { CommonService } from '../../shared/services/common/common.service';

@Component({
  selector: 'app-home-modal',
  templateUrl: './home-modal.page.html',
  styleUrls: ['./home-modal.page.scss'],
})
export class HomeModalPage {
  public selected: string;
  public showNotes = false;

  constructor(
    private modalCtrl: ModalController,
    private translateService: TranslateService,
    private commonService: CommonService
  ) { }

  ionViewWillEnter() {
    this.translateService.setDefaultLang(this.commonService.language); // fallback
    this.translateService.use(this.translateService.getBrowserLang());
  }

  public closeModal() {
    this.modalCtrl.dismiss(null);
  }

  public onConfirm() {
    this.modalCtrl.dismiss({
      link: this.selected
    });
  }

  public onSelectLink(): void {
    this.showNotes = this.selected === 'consultation';
  }

  ionViewWillLeave() {
    this.selected = null;
    this.showNotes = false;
  }

}
