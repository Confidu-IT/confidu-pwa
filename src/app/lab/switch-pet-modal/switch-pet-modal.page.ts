import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { CommonService } from '../../shared/services/common/common.service';

@Component({
  selector: 'app-switch-pet-modal',
  templateUrl: './switch-pet-modal.page.html',
  styleUrls: ['./switch-pet-modal.page.scss'],
})
export class SwitchPetModalPage {
  @Input() pets;
  @Input() currentPet;

  public chosenId: string;
  private language: string;

  constructor(
    private modalCtrl: ModalController,
    private translateService: TranslateService,
    private commonService: CommonService,
  ) {
  }

  ionViewWillEnter() {
    this.chosenId = this.currentPet;
    this.language = this.commonService.language;
    this.translateService.use(this.language);
  }

  public closeModal() {
    this.modalCtrl.dismiss(null);
  }

  public onProgressPet(): void {
    this.modalCtrl.dismiss(this.chosenId);
  }
}
