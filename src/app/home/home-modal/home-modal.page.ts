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
  public showCallNotes = false;
  public showDiagNotes = false;

  private language: string;

  constructor(
    private modalCtrl: ModalController,
    private translateService: TranslateService,
    private commonService: CommonService
  ) { }

  ionViewWillEnter() {
    this.language = this.commonService.language;
    this.translateService.use(this.language);
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
    this.showCallNotes = false;
    this.showDiagNotes = false;
    if (this.selected === 'consultation' ) {
      this.showCallNotes = true;
    } else if (this.selected === 'tickets/televet-pet') {
      this.showDiagNotes = true;
    }
  }

  ionViewWillLeave() {
    this.selected = null;
    this.showCallNotes = false;
    this.showDiagNotes = false;
  }

}
