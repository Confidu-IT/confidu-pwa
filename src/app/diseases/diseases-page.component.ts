import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { CommonService } from '../shared/services/common/common.service';
import { FirebaseService } from '../shared/services/firebase/firebase.service';
import { AuthService } from '../user/auth.service';
import { Router } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { ModalController } from '@ionic/angular';
import { DiseasesModalPage } from './diseases-modal/diseases-modal.page';

@Component({
  selector: 'app-disease',
  templateUrl: './diseases-page.component.html',
  styleUrls: ['./diseases-page.component.scss'],
})
export class DiseasesPage {
  private subscription: Subscription;
  private iconPath = '../../assets/icons/diseases';
  private language: string;
  private diseases: any;
  private pet: any;
  private petId: string;
  private updateSuccess: string;
  private updateError: string;
  private modalTitle: {
    med: string;
    doc: string;
  };

  public user: any;
  public diseaseInfoImg = `${this.iconPath}/diseases.svg`;
  public notCuredImg = `${this.iconPath}/not-cured.svg`;
  public disease: any = {};
  public arrowIcon = `${this.iconPath}/chevron-forward-outline.svg`;
  public isLoading: boolean;
  public title: string;
  public availableDiseases: any[];
  public okText: string;
  public cancelText: string;
  public detected: any;
  public cured: any;
  public diseaseStart: any;
  public diseaseEnd: any;
  public availableMeds: any[] = [];
  public medChoice: string;
  public diseaseComplete: boolean;
  public disorder: { cured: any[]; notCured: any[] } = {
    cured: [],
    notCured: []
  };


  constructor(
    private translateService: TranslateService,
    private commonService: CommonService,
    private firebaseService: FirebaseService,
    private userAuth: AuthService,
    private router: Router,
    private modalCtrl: ModalController,
  ) { }

  ionViewWillEnter(): void {
    this.isLoading = true;
    this.language = this.commonService.language;
    this.translateService.setDefaultLang(this.language); // fallback
    this.translateService.use(this.translateService.getBrowserLang());
    this.translateService.get('DISEASE_PAGE')
      .subscribe(values => {
        this.okText = values.DATE_TIME.CONFIRM;
        this.cancelText = values.DATE_TIME.CANCEL;
        this.updateSuccess = values.UPDATE_SUCCESS;
        this.updateError = values.UPDATE_ERROR;
        this.modalTitle = {
          med: values.MED.ADD,
          doc: values.DOC.ADD
        };
      });

    this.subscription = this.userAuth.user$.pipe(
      tap(user => user),
      switchMap(user => {
        this.user = user;
        this.petId = localStorage.getItem('activePet');
        if (this.user && this.petId) {
          return this.firebaseService.getPetById(this.user.uid, this.petId);
        } else {
          this.isLoading = false;
          return this.router.navigateByUrl('/');
        }
      })
    ).subscribe(pet => {
      if (pet) {
        this.pet = pet;
        this.getDiseases(this.language);
        this.isLoading = false;

        if (this.pet.pet.diseases) {
          this.sortDiseases(this.pet.pet.diseases);
        }

      } else {
        this.isLoading = false;
        return this.router.navigateByUrl('/');
      }
    });
  }

  public onAddDisease(): void {
    this.diseases = this.pet.pet.diseases || [];
    this.diseases.push(this.disease);
    this.pet.pet.diseases = this.diseases;
    console.log('this.pet', this.pet);
    this.diseaseComplete = false;
    this.firebaseService.updatePet(this.user.uid, this.petId, this.pet)
      .then(() => {
        this.resetAll();
        this.commonService.presentToast(this.updateSuccess, 'primary');
      }).catch(() => {
      this.resetAll();
      this.commonService.presentToast(this.updateError, 'danger');
    });
  }

  public onPickDisease(event): void {
    this.disease.name = event.value.name;
    this.disease.key = event.value.key;
    this.availableMeds = null;
    this.firebaseService.getMedToDisease(this.language, 'dog', this.disease.key)
      .subscribe(meds => {
        this.availableMeds = meds;
      });
  }

  public onAddDiseaseStart(): void {
    this.disease.startTime = this.diseaseStart;
  }

  public onConfirmCured(): void {
    this.disease.endTime = this.diseaseEnd;
    if (this.disease.endTime) {
      this.disease.cured = 'yes';
    }
  }

  public onDenyCured(): void {
    this.cured = false;
    this.diseaseEnd = null;
    this.disease.endTime = null;
    this.disease.cured = 'no';
  }

  private getDiseases(language: string): void {
    this.firebaseService.getDiseases(language, 'dog')
      .subscribe(data => {
        this.availableDiseases = data;
        // this.onOpenModal('doc');
      });
  }

  private sortDiseases(diseases: any[]): void {
    console.log('diseases', diseases);
    if (diseases.length < 1) {
      return;
    }
    this.disorder = {
      cured: [],
      notCured: []
    };
    for (const item of diseases) {
      if (!item.endTime) {
        this.disorder.notCured.push(item);
      } else {
        this.disorder.cured.push(item);
      }
    }
    console.log(this.disorder);
  }

  public dataComplete(): boolean {
    return this.disease.key && this.disease.cured;
  }

  public onOpenModal(type: string): void {
    // console.log('user', this.user);
    let title;
    if (type === 'med') {
      title = this.modalTitle.med;
    } else if (type === 'doc') {
      title = this.modalTitle.doc;
    }

    // Change This
    this.presentModal(this.user, type, title, this.disease);
    // this.presentModal(this.user, type, title, this.availableDiseases[0]);
  }

  private async presentModal(user: any, type: string, title: string, disease: any) {
    const modal = await this.modalCtrl.create({
      component: DiseasesModalPage,
      componentProps: {
        user,
        type,
        title,
        disease
      }
    });
    modal.onDidDismiss()
      .then((response: any) => {
        console.log('modal dismissed', response);
        this.diseaseComplete = true;
        if (response && response.data) {
          this.disease = response.data;
        }
      });
    return await modal.present();
  }

  private resetAll(): void {
    this.medChoice = null;
    this.diseaseStart = null;
    this.diseaseEnd = null;
    // this.cured = false;
  }

  ionViewWillLeave() {
    this.disorder = {
      cured: [],
      notCured: []
    };
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
