import {Component, Input} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { CommonService } from '../../shared/services/common/common.service';

@Component({
  selector: 'app-home-modal',
  templateUrl: './home-modal.page.html',
  styleUrls: ['./home-modal.page.scss'],
})
export class HomeModalPage {
  @Input() pet: any;
  public selected: string;
  public showCallNotes = false;
  public showTelevetNotes = false;
  public showDiagNotes = false;
  public zoomIcon: string;
  public diagIcon: string;
  public imageIcon: string;
  public videoIcon: string;
  public plusIcon: string;

  private language: string;

  constructor(
    private modalCtrl: ModalController,
    private translateService: TranslateService,
    private commonService: CommonService
  ) { }

  ionViewWillEnter() {
    this.language = this.commonService.language;
    this.translateService.use(this.language);
    if (this.pet?.pet?.species?.value === 'cat') {
      this.diagIcon = '../../../assets/icons/home/diagnose_cat.svg';
    } else {
      this.diagIcon = '../../../assets/icons/home/diagnose_finder.svg';

    }
 this.zoomIcon = '../../../assets/icons/home/zoom_logo.svg';
 this.imageIcon = '../../../assets/icons/home/bild_diagnose.svg';
 this.videoIcon = '../../../assets/icons/home/videocall.svg';
 this.plusIcon = '../../../assets/icons/home/plus.svg';
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
    this.showTelevetNotes = false;
    this.showDiagNotes = false;
    if (this.selected === 'consultation' ) {
      this.showCallNotes = true;
    } else if (this.selected === 'tickets/televet-pet') {
      this.showTelevetNotes = true;
    } else if (this.selected === 'diagnosis') {
      this.showDiagNotes = true;
    }
  }

  public onClickZoomLink(): void {
    window.open('https://zoom.us/join', 'blank');
  }

  ionViewWillLeave() {
    this.selected = null;
    this.showCallNotes = false;
    this.showTelevetNotes = false;
    this.showDiagNotes = false;
  }

}
