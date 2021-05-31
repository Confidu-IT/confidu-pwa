import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { CommonService } from '../../../shared/services/common/common.service';

@Component({
  selector: 'app-care-card-input-modal',
  templateUrl: './care-card-input-modal.page.html',
  styleUrls: ['./care-card-input-modal.page.scss'],
})
export class CareCardInputModalPage {
  @Input() type: any;
  public title: string;
  public headline: string;
  public subheader: string;
  public description: string;
  public value: any;
  public abortText: string;
  public confirmText: string;
  public confirmButton: string;
  public rangeStateImg: string;
  public activityVal: number;
  public activityText: any;
  public rangeAnswer: any;
  public activityIcon: any;
  public notNeutered: string;

  private iconPath = '../../../../assets/icons/care-card';

  constructor(
    private modalCtrl: ModalController,
    private translateService: TranslateService,
    private commonService: CommonService
  ) { }

  ionViewWillEnter() {
    console.log('type', this.type);
    this.translateService.setDefaultLang(this.commonService.language); // fallback
    this.translateService.use(this.translateService.getBrowserLang());
    this.translateService.get('CARE_CARD_INPUT_MODAL_PAGE')
      .subscribe(data => {
        console.log('data', data);
        const type = this.type.toUpperCase();
        this.title = data[type].TITLE;
        this.description = data[type].DESCRIPTION;
        this.headline = data[type].HEADLINE;
        this.abortText = data.ABORT;
        this.confirmText = data.CONFIRM;
        // console.log('this.abortText', this.abortText)

        if (this.type === 'activity') {
          this.activityText = data.ACTIVITY.STATUS;
          this.rangeAnswer = this.activityText.LOW;
          this.value = this.rangeAnswer[0];
          this.activityIcon = `${this.iconPath}/activity-icon.svg`;
        }

        if (this.type === 'castration') {
          this.notNeutered = data.CASTRATION.NOT_NEUTERED;
          this.value = data.CASTRATION.NOT_NEUTERED;
          console.log('this.value', this.value);
        }

      });
  }

  public validator(): boolean {
    return this.value && (this.value.toString().length > 9 && this.value.toString().length < 16);
  }


  public setActivityState(event) {
    const val = event.detail.value;
    if (val < 25) {
      // this.rangeStateImg = this.question.values.answerOption[0].imageLinkAnswer;
      this.rangeAnswer = this.activityText.LOW;
    } else if (val < 50 && val >= 25) {
      // this.rangeStateImg = this.question.values.answerOption[1].imageLinkAnswer;
      this.rangeAnswer = this.activityText.MODERATE;
    } else if (val < 75 && val >= 50) {
      // this.rangeStateImg = this.question.values.answerOption[2].imageLinkAnswer;
      this.rangeAnswer = this.activityText.HIGH;
    } else if (val >= 75) {
      // this.rangeStateImg = this.question.values.answerOption[3].imageLinkAnswer;
      this.rangeAnswer = this.activityText.EXTREME;
    }
    this.value = this.rangeAnswer[0];
  }

  public onConfirm() {
    // console.log(this.value);
    this.modalCtrl.dismiss({
      type: this.type,
      val: this.value
    });
  }

  public closeModal() {
    this.modalCtrl.dismiss(null);
  }

  ionViewWillLeave() {
    this.rangeAnswer = null;
  }

}
