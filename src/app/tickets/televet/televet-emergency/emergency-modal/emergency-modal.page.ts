import { Component, Input } from '@angular/core';
import { CommonService } from '../../../../shared/services/common/common.service';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-emergency-modal',
  templateUrl: './emergency-modal.page.html',
  styleUrls: ['./emergency-modal.page.scss'],
})
export class EmergencyModalPage {
  @Input() item;
  public title: string;
  public cancel = 'Abbrechen';
  public proceed = 'weiter';

  constructor(
    private modalCtrl: ModalController,
    private commonService: CommonService,
    private router: Router
  ) { }

  ionViewWillEnter() {
    this.title = this.item.label;
  }

  public closeModal(): void {
    this.modalCtrl.dismiss(null);
  }

  public onProceed(): void {
    this.modalCtrl.dismiss(null);
    this.router.navigateByUrl(`tickets/televet/${this.item.key}/${this.item.label}/questions`);
  }

}
