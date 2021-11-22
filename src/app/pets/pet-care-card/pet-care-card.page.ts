import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../user/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { FirebaseService } from '../../shared/services/firebase/firebase.service';
import { Observable, Subscription } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { CommonService } from '../../shared/services/common/common.service';
import { ModalController } from '@ionic/angular';
import { CareCardInputModalPage } from './care-card-input-modal/care-card-input-modal.page';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pet-care-card',
  templateUrl: './pet-care-card.page.html',
  styleUrls: ['./pet-care-card.page.scss'],
})
export class PetCareCardPage {
  public petId: any;
  // public user$: any;
  public isLoading = false;
  public pet: any;
  public baseDataImg: string;
  public nutritionImg: string;
  public language: string;
  public breed: string;
  public isCastrated: boolean;
  public castrationLabel: string;
  public hasId: boolean;
  public noId: string;
  public noData: string;
  public panels: any;
  public iconPath = '../../../../assets/icons/care-card';
  public user: any;
  public species: string;

  // public dummyImg = `${this.iconPath}/warning-triangle.svg`;
  public chevron = `${this.iconPath}/chevron-forward-outline.svg`;

  private subscription: Subscription;
  private readonly routeSub: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    public userAuth: AuthService,
    private afAuth: AngularFireAuth,
    private firebaseService: FirebaseService,
    private translateService: TranslateService,
    private commonService: CommonService,
    private modalCtrl: ModalController,
    private router: Router,
    private http: HttpClient
  ) {
    this.routeSub = this.activatedRoute.params
      .subscribe(params => {
        this.petId = params.petId;
      });
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.language = this.commonService.language;
    this.translateService.use(this.language);

    this.translateService.get('CARE_CARD_PAGE')
      .subscribe(data => {
        // console.log('data', data);
        this.noId = data.NO_DATA;
        this.noData = data.NO_DATA;

      });

    this.subscription = this.userAuth.user$.pipe(
      tap(user => {
        this.user = user;
      }),
      switchMap(user => {
        if (this.user && this.petId) {
          try {
            return this.getCareCardContent(user.za);
          } catch (e) {
            this.router.navigateByUrl('/');
          }
        } else {
          this.router.navigateByUrl('/');
        }
      }),
      switchMap(content => {
        console.log('content', content);
        this.panels = content.data;
        try {
          return this.firebaseService.getPetById(this.user.uid, this.petId);
        } catch (e) {
          this.router.navigateByUrl('pets/pets-list');
        }
      })
    ).subscribe(pet => {
      console.log('pet', pet);
      if (pet.pet.species.value === 'dog') {
        this.baseDataImg = 'https://firebasestorage.googleapis.com/v0/b/confidu-app.appspot.com/o/carecard%2Ficons%2Fsvg%2Fbasedata_dog.svg?alt=media&token=71a2427e-17b9-4b0c-a0a6-9757d69ebe09';
      } else {
        this.baseDataImg = 'https://firebasestorage.googleapis.com/v0/b/confidu-app.appspot.com/o/carecard%2Ficons%2Fsvg%2Fbasedata_cat.svg?alt=media&token=d4e521e7-daba-484d-9c05-3f380f989e79';
      }

      this.pet = pet;
      this.species = pet.pet.species.value;
      // tslint:disable-next-line:no-eval
      this.isCastrated = eval(pet.pet.castration.value);
      this.hasId = pet.pet.petIdent;
      this.breed = this.language === 'de' ? pet.pet.breed.data.name_de : pet.pet.breed.data.name_en;
      this.nutritionImg = `${this.iconPath}/nutrition-${pet.pet.species.value}.svg`;
      // this.presentModal('activity');
      this.isLoading = false;
    });
  }

  public onClickLink(el: any): void {
    console.log(el);
    this.router.navigateByUrl(`pets/pet-care-card/${this.petId}/${el.label}/${el.key}`);
  }


  public async presentModal(field: string) {
    const modal = await this.modalCtrl.create({
      component: CareCardInputModalPage,
      componentProps: {
        type: field
      }
    });
    modal.onDidDismiss()
      .then((response: any) => {
        console.log('modal dismissed', response);
        if (response && response.data) {
          if (response.data.type === 'castration') {
            this.castrationLabel = response.data.val;
            this.isCastrated = true;
            this.pet.pet.castration.value = 'true';
            this.pet.pet.castration.label[this.language] = response.data.val;
          } else if (response.data.type === 'id') {
            this.hasId = true;
            this.pet.pet.petIdent = response.data.val;
          } else if (response.data.type === 'activity') {
            this.pet.lifestyle = {
              activity: response.data.val
            };
          }
          this.updatePet(this.user.uid, this.petId, this.pet);
        }
      });
    return await modal.present();
  }

  private updatePet(userId: string, petId: string, petObj: any) {
    this.firebaseService.updatePet(userId, petId, petObj)
      .then(res => {
        console.log('res', res);
        this.commonService.presentToast('Eintrag erfolgreich', 'primary');
      })
      .catch(error => this.commonService.presentToast('Eintrag fehlgeschlagen', 'danger'));
  }

  private getCareCardContent(token): Observable<any> {
    const baseUrl = environment.baseUrl;
    const url = `${baseUrl}/${this.language}/carecard`;
    const headers = {
      'Content-Type': 'application/json',
      'firebase-context-token': token,
      'sw-context-token': localStorage.getItem('sw-token')
    };
    const body = {
      petId: this.petId,
      uid: this.user.uid
    };

    return this.http.post(url, body, { headers });
  }


  ionViewWillLeave() {
    this.panels = null;
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.routeSub) {
      this.subscription.unsubscribe();
    }
  }
}
