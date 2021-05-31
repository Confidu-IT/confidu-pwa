import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { CommonService } from '../../shared/services/common/common.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-consultation-modal',
  templateUrl: './consultation-modal.page.html',
  styleUrls: ['./consultation-modal.page.scss'],
})
export class ConsultationModalPage {
  public form: FormGroup;

  constructor(
    private modalCtrl: ModalController,
    private translateService: TranslateService,
    private commonService: CommonService
  ) {
    this.form = new FormGroup({
      firstName: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      lastName: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      phone: new FormControl(null, {
        updateOn: 'change'
      })
    });
  }

  ionViewWillEnter() {
    this.translateService.setDefaultLang(this.commonService.language); // fallback
    this.translateService.use(this.translateService.getBrowserLang());


  }

  public closeModal() {
    this.modalCtrl.dismiss(null);
  }

  public onConfirm() {
    this.modalCtrl.dismiss({
      value: this.form.value
    });
  }

  ionViewWillLeave() {
    this.form.reset();
  }


}
