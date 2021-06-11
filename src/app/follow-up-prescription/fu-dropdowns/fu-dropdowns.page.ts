import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CommonService } from '../../shared/services/common/common.service';
import { AuthService } from '../../user/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FirebaseService } from '../../shared/services/firebase/firebase.service';
import { switchMap, tap } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-fu-dropdowns',
  templateUrl: './fu-dropdowns.page.html',
  styleUrls: ['./fu-dropdowns.page.scss'],
})
export class FuDropdownsPage {
  public user: any;
  public isLoading: boolean;
  public iconPath = '../../../../assets/icons/fu-prescription';
  public stehtImg = `${this.iconPath}/stethoscope.svg`;
  public diseases: any;
  public meds: any;
  public questionnaireKey: any;
  public disease: string;
  public manualChoice: boolean;
  public alertWindow: any;

  private subscription: Subscription;
  private pet: any;
  private language: string;
  private requestedMed: any;


  constructor(
    private translateService: TranslateService,
    private commonService: CommonService,
    private userAuth: AuthService,
    private firebaseService: FirebaseService,
    private router: Router,
    private alertCtrl: AlertController
  ) { }

  ionViewWillEnter() {
    this.isLoading = true;
    this.language = this.commonService.language;
    this.translateService.use(this.language);
    this.translateService.get('FU_PAGE')
      .subscribe(values => {
       this.alertWindow = values.ALERT;
      });

    this.subscription = this.userAuth.user$.pipe(
      tap(user => user),
      switchMap(user => {
        this.user = user;
        const petId = localStorage.getItem('activePet');
        if (this.user && petId) {
          return this.firebaseService.getPetById(this.user.uid, petId);
        } else {
          this.isLoading = false;
          return this.router.navigateByUrl('/');
        }
      }),
      switchMap(pet => {
        this.pet = pet;
        return this.firebaseService.getDiseases(this.language, pet.pet.species.value);
      })
    ).subscribe(diseases => {
      this.diseases = diseases;
      this.isLoading = false;

    });
  }

  public onPickDisease(event): void {
    this.disease = event.value.name;
    console.log(event.value.venomCode);
    this.questionnaireKey = null;
    this.firebaseService.getMedToDisease(this.language, this.pet.pet.species.value, event.value.venomCode)
      .subscribe(meds => {
        this.meds = meds;
      });
  }

  public onPickMedication(event): void {
    this.questionnaireKey = event.value.questionnaireKey || true;
    if (this.manualChoice) {
      this.requestedMed = event.value;
    }

  }

  public manualMeds(): void {
    this.manualChoice = true;
    this.questionnaireKey = null;
    this.firebaseService.getAllMeds(this.language)
      .subscribe(meds => {
        console.log('meds', meds);
        this.meds = meds;
      });
  }


  public onProgress(): void {
    if (this.manualChoice) {
      this.presentAlert();
    } else {
      const uri = `/tickets/FUP/${this.questionnaireKey}/${this.disease}/questions`;
      this.router.navigateByUrl(uri);
    }
  }

  private sendMedRequest() {
    console.log('send req for', this.requestedMed);
    this.router.navigateByUrl('/');
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      cssClass: 'request-med',
      header: this.alertWindow.TITLE,
      message: this.alertWindow.TEXT,
      buttons: [
        {
          text: this.alertWindow.BUTTONS.CANCEL,
          role: 'cancel',
          cssClass: 'med-cancel-button',
        }, {
          text: this.alertWindow.BUTTONS.DONE,
          cssClass: 'med-action-button',
          handler: () => {
            this.sendMedRequest();
          }
        }
      ]
    });
    await alert.present();
  }

  ionViewWillLeave() {
    this.manualChoice = false;
    this.disease = null;
    this.questionnaireKey = null;
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
