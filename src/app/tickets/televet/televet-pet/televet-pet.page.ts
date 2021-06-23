import { Component } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AuthService } from '../../../user/auth.service';
import { Router } from '@angular/router';
import { FirebaseService } from '../../../shared/services/firebase/firebase.service';
import { TicketService } from '../../ticket-service/ticket-service';
import { TelevetService } from '../televet.service';
import { ActionSheetController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { CommonService } from '../../../shared/services/common/common.service';

@Component({
  selector: 'app-televet',
  templateUrl: './televet-pet.page.html',
  styleUrls: ['./televet-pet.page.scss'],
})
export class TelevetPetPage {
  public species: string;
  public castrationState: string;
  public symptom: string;
  public isZoomed: boolean;
  public imagePath: string;
  public petImage: string;
  public leftIcon: string;
  public rightIcon: string;
  public poisonIcon: string;
  public isLoading = true;
  public bodyPart: string;
  public televet: any;
  public spot: string;
  public region: string;
  public isPoison: boolean;


  private subscription: Subscription;
  private buttonSub: Subscription;
  private code: string;
  private gender: string;
  public user: any;
  private language: string;


  constructor(
    public userAuth: AuthService,
    private router: Router,
    private firebaseService: FirebaseService,
    private ticketService: TicketService,
    private televetService: TelevetService,
    private translateService: TranslateService,
    private commonService: CommonService,
    private actionSheetCtrl: ActionSheetController
  ) { }

  ionViewWillEnter() {
    // console.log('ionViewWillEnter', this.symptom);
    this.symptom = '';
    this.isPoison = false;
    // console.log('symptom', this.symptom);

    this.subscription = this.userAuth.user$
      .subscribe(user => {
        // console.log('user', user);
        this.user = user;
        const petId = localStorage.getItem('activePet');

        if (!user || !petId) {
          this.router.navigateByUrl('/');
        } else {
          try {
            this.getPet(user.uid, petId);
          } catch (e) {
            this.router.navigateByUrl('/ticket/televet');
          }
        }
      });

    this.language = this.commonService.language;
    this.translateService.use(this.language);
    this.translateService.get('TELEVET_PET_PAGE')
      .subscribe(televet => {
        console.log('televet', televet)
        this.televet = televet;
      });

    this.buttonSub = this.televetService.buttonData
      .subscribe(data => {
        console.log('data', data);
        this.symptom = data.symptom;
        this.code = data.code;
      });
  }

  public onClickSpot(spot: string, label: string, event: any): void {
    // spot = spot.toLowerCase();
    console.log('spot', spot);
    console.log('label', label);
    console.log('event', event);

    this.isPoison = false;
    this.spot = spot;
    this.leftIcon = `${this.imagePath}/general_condition.svg`;
    this.rightIcon = `${this.imagePath}/skin_and_fur.svg`;
    this.poisonIcon = `${this.imagePath}/toxic.svg`;
    this.petImage = `${this.imagePath}/${spot}.svg`;

    if (spot === 'head-region' || spot === 'body-region') {
      this.isZoomed = true;
      this.region = spot;
      // spot = null;
      event.stopPropagation();
      return;
    }

    if (event.target.className === 'left-icon') {
      this.leftIcon = `${this.imagePath}/select_general_condition.svg`;
    }
    if (event.target.className === 'right-icon') {
      this.rightIcon = `${this.imagePath}/select_skin_and_fur.svg`;
    }

    if (event.target.className === 'poison-icon') {
      this.isPoison = true;
      this.poisonIcon = `${this.imagePath}/select_toxic.svg`;
    }

    this.bodyPart = label;
    this.showActionSheet(spot);
    event.stopPropagation();
  }

  public zoomOut() {
    if (!this.isZoomed) {
      return;
    }

    this.isZoomed = false;
    this.region = '';
    this.petImage = `${this.imagePath}/body.svg`;
  }

  public onProgress() {
    this.petImage = `${this.imagePath}/body.svg`;
    const symptom = this.symptom.replace(/\//g, '-');
    const uri = `/tickets/televet/${this.code}/${symptom}/questions`;
    console.log(uri);
    this.router.navigateByUrl(uri);
  }

  private getPet(userId: string, petId: string): void {
    this.firebaseService.getPetById(userId, petId)
      .subscribe(pet => {
        if (pet) {
          // console.log('pet', pet);
          this.castrationState = pet.pet.castration.value === 'false' ? 'uncastrated' : 'castrated';
          console.log('castrationState', this.castrationState);
          this.species = pet.pet.species.value;
          this.gender = pet.pet.gender.value;
          this.imagePath = `../../../assets/icons/televet/${this.species}`;
          this.petImage = `${this.imagePath}/body.svg`;
          this.leftIcon = `${this.imagePath}/general_condition.svg`;
          this.rightIcon = `${this.imagePath}/skin_and_fur.svg`;
          this.poisonIcon = `${this.imagePath}/toxic.svg`;
          this.isLoading = false;
        } else {
          this.router.navigateByUrl('/ticket/televet');
        }
      });
  }

  private showActionSheet(spot): void {
    this.actionSheetCtrl
      .create({
        buttons: this.televetService.televetSpotButtons[this.species][this.gender][this.castrationState][spot]
      })
      .then(actionSheetEl => {
        actionSheetEl.present();
      });
  }

  ionViewWillLeave() {
    this.isPoison = false;
    this.symptom = null;
    this.code = null;
    if (this.buttonSub) {
      this.bodyPart = null;
      this.televetService.buttonData$ = new BehaviorSubject<{ symptom: string; code: string; }>({ symptom: '', code: '' });
      this.buttonSub.unsubscribe();
    }

    if (this.subscription) {
      this.subscription.unsubscribe();
      this.isLoading = false;
    }

  }

}
