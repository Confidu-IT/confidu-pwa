import { Component } from '@angular/core';
import { AuthService } from '../user/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { FirebaseService } from '../shared/services/firebase/firebase.service';
import { TranslateService } from '@ngx-translate/core';
import { CommonService } from '../shared/services/common/common.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ToolbarModalPage } from '../shared/components/toolbar-modal/toolbar-modal.page';
import { SwitchPetModalPage } from './switch-pet-modal/switch-pet-modal.page';

@Component({
  selector: 'app-lab',
  templateUrl: './lab.page.html',
  styleUrls: ['./lab.page.scss'],
})
export class LabPage {
  private subscription: Subscription;
  private routeSub: Subscription;
  public petId: string;
  private invalidCode: string;
  private usedCode: string;
  private assignment: any;
  private regSuccess: string;

  public successText: string;
  public pet: any;
  public pets: any[];
  public petString: string;
  public user: any;
  public language: string;
  public isLoading: boolean;
  public regNr: string;
  public validated: boolean;
  public checkIcon = '../../assets/icons/product-registration/checkbox.svg';
  public labIcon = '../../assets/icons/lab-page/lab.svg';
  public chevron = '../../assets/icons/lab-page/chevron-forward-outline.svg';

  constructor(
    public userAuth: AuthService,
    private afAuth: AngularFireAuth,
    private firebaseService: FirebaseService,
    private translateService: TranslateService,
    private commonService: CommonService,
    private router: Router,
    private modalCtrl: ModalController,
    private activatedRoute: ActivatedRoute
  ) {
    this.routeSub = this.activatedRoute.params
      .subscribe((params: Params) => {
        if (params.activationKey) {
          this.regNr = params.activationKey;
        }
      });
  }

  ionViewWillEnter() {
    this.language = this.commonService.language;
    this.translateService.use(this.language);

    this.translateService.get('REGISTER_CODE')
      .subscribe(values => {
        this.invalidCode = values.INVALID_CODE;
        this.usedCode = values.USED_CODE;
        this.assignment = values.ASSIGNMENT;
        this.regSuccess = values.REG_SUCCESS;
      });

    this.subscription = this.userAuth.user$
      .subscribe(user => {
        this.user = user;
        this.petId = localStorage.getItem('activePet');
        if (this.user && this.petId) {
          this.getActivePet(user.uid, this.petId);
          this.getAllPets(user.uid);
        }
      });
  }

  private getActivePet(userId: string, petId): void {
    this.firebaseService.getPetById(userId, petId)
      .subscribe(pet => {
        if (pet) {
          this.pet = pet.pet;
        }
      });
  }

  private getAllPets(userId): void {
    this.firebaseService.getAllPets(userId)
      .subscribe(pets => {
        this.pets = pets;
      });
  }

  public onSwitchPet(): void {
    console.log('foo');
  }

  public onClickLink(type: string): void {
    this.router.navigateByUrl(`lab-detail/${type}`);
  }

  public onRegisterCode() {
    this.commonService.registerProductKey(this.regNr, this.user.uid, this.petId, this.user.za)
      .subscribe(response => {
          console.log('response', response);
          this.regNr = null;
          this.validated = true;
          const message = this.regSuccess;
          this.successText = `
          ${this.assignment[0]} ${response.product} ${this.assignment[1]} ${this.pet.name} ${this.assignment[2]}
          `;
          this.commonService.presentToast(message, 'secondary');
        },
        (e) => {
          this.regNr = null;
          this.validated = false;
          this.commonService.presentToast(e.error.error, 'danger');
        });
  }

  public async presentModal(pets: any, currentPet: string) {
    const modal = await this.modalCtrl.create({
      component: SwitchPetModalPage,
      componentProps: {
       pets, currentPet
      }
    });
    modal.onDidDismiss()
      .then((response: any) => {
        if (response.data) {
          console.log('r', response.data);
          this.firebaseService.createActivePetId(this.user.uid, response.data)
            .then(() => {
              localStorage.setItem('activePet', response.data);
            })
        }
      });
    return await modal.present();
  }


  ionViewWillLeave() {
    this.validated = false;
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

}
