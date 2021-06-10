import { Component } from '@angular/core';
import { AuthService } from '../../../user/auth.service';
import { Router } from '@angular/router';
import { FirebaseService } from '../../../shared/services/firebase/firebase.service';
import { TranslateService } from '@ngx-translate/core';
import { CommonService } from '../../../shared/services/common/common.service';
import { AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-televet-emergency',
  templateUrl: './televet-emergency.page.html',
  styleUrls: ['./televet-emergency.page.scss'],
})
export class TelevetEmergencyPage {
  private language: string;
  private subscription: Subscription;
  private species: string;
  private alertButtons: any;
  private pet: any;

  public isLoading: boolean;
  public emergencies: any;
  public user: any;

  constructor(
    public userAuth: AuthService,
    private router: Router,
    private firebaseService: FirebaseService,
    private translateService: TranslateService,
    private commonService: CommonService,
    private alertController: AlertController
  ) {
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.language = this.commonService.language;
    this.translateService.use(this.language);
    this.translateService.get('TELEVET_EMERGENCY_PAGE')
      .subscribe(values => {
        this.alertButtons = values.BUTTONS;
      });

    this.subscription = this.userAuth.user$.pipe(
      tap(user => user),
      switchMap(user => {
        this.user = user;
        const petId = localStorage.getItem('activePet');
        if (user && petId) {
          return this.firebaseService.getPetById(user.uid, petId);
        } else {
          this.isLoading = false;
          this.router.navigateByUrl('/');
        }
      }),
      switchMap(pet => {
        this.pet = pet;
        const species = pet.pet.species.value;
        return this.firebaseService.getEmergencySymptoms(this.language, species);
      })
    ).subscribe(data => {
      console.log('data', data);
      if (this.pet.pet.gender.value === 'male' || this.pet.pet.castration.value === 'true') {
        this.emergencies = data.filter(item => {
          return item.key !== 'NOG';
        });
      } else {
        this.emergencies = data;
      }
      this.isLoading = false;
    });
  }

  public onClickTile(content: any): void {
    this.router.navigateByUrl(`tickets/televet/${content.key}/${content.label}/questions`);
  }

  async presentAlert(title: string, text: string, key: string, label: string) {
    const alert = await this.alertController.create({
      cssClass: 'emergency-alert',
      header: title,
      message: text,
      buttons: [
        {
          text: this.alertButtons?.CANCEL,
          role: 'cancel',
          cssClass: 'alert-cancel-button',
        }, {
          text: this.alertButtons?.CONFIRM,
          cssClass: 'alert-action-button',
          handler: () => {
            this.router.navigateByUrl(`tickets/televet/${key}/${label}/questions`);
          }
        }
      ]
    });
    await alert.present();
  }

}
