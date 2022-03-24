import { Component, ElementRef, ViewChild } from '@angular/core';
import { environment } from '../../environments/environment';
import { AuthService } from '../user/auth.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { FirebaseService } from '../shared/services/firebase/firebase.service';
import { Subscription } from 'rxjs';
import { PetService } from '../shared/services/pet/pet.service';
import { TranslateService } from '@ngx-translate/core';
import { CommonService } from '../shared/services/common/common.service';
import { ModalController } from '@ionic/angular';
import { HomeModalPage } from './home-modal/home-modal.page';
// import { AngularFireMessaging } from '@angular/fire/messaging';
import { HttpClient } from '@angular/common/http';
import {AngularFireAnalytics} from '@angular/fire/analytics';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private subscription: Subscription;
  private species: string;
  private petId: string;
  private dummyTicket = {
    data: {
      type: 'dummy'
    }
  };


  public healthState: number;

  public logo = environment.logo;
  public user$: any;
  public language: string;
  public iconPath = '../../assets/icons';
  public healthStateImgPath = '../../assets/icons/health-state';
  public pet: any;
  public randomPetImg: any;
  public healthStateImg: string;
  public healthStateIcon: string;
  public healthStateText: string;
  public healthStateLink: string;
  public patchButton: boolean;
  public healthExcellent: string;
  public healthGood: string;
  public healthBad: string;
  public healthWorse: string;
  public noTasksImage: string;
  public exclamationImage = `${this.iconPath}/ex_mark.svg`;
  public recipeImage = `${this.iconPath}/home/recipe.svg`;
  public chevronRight = `${this.iconPath}/home/chevron-forward-outline.svg`;
  public checkBoxImage = `${this.iconPath}/home/checkbox_blue.svg`;
  public confiImg = `${this.iconPath}/home/confi.svg`;
  public bellImage = `${this.iconPath}/home/bell.svg`;
  public trophyIcon = `${this.iconPath}/home/trophies.svg`;
  public chartsIcon = `${this.iconPath}/home/charts.svg`;
  public camIcon = `${this.iconPath}/home/blue_cam.svg`;
  public switchPetIcon = `${this.iconPath}/home/switch_pet.svg`;
  public emergencyIcon = `${this.iconPath}/home/emergency.svg`;
  public statusIcon = `${this.iconPath}/home/status.svg`;
  public treatIcon = `${this.iconPath}/home/treat.svg`;
  public prescriptionIcon = `${this.iconPath}/home/prescription.svg`;
  public magazineIcon = `${this.iconPath}/home/magazin.svg`;
  public recipeIcon = `${this.iconPath}/home/recipes.svg`;
  public heartIcon = `${this.iconPath}/home/heart.svg`;
  public swipeIcon = `${this.iconPath}/home/swipe.svg`;
  public myPetsIcon = `${this.iconPath}/home/my_pets.svg`;
  public chartIcon = `${this.iconPath}/home/overview.svg`;
  public feedingIcon: string;
  public statusCheckInactiveImg = `${this.iconPath}/home/status-check-inactive.svg`;
  public statusCheckActiveImg = `${this.iconPath}/home/status-check-active.svg`;
  public barImg = `${this.iconPath}/home/bar.png`;
  public orderMedImg = `${this.iconPath}/home/order_meds.svg`;
  public labImg = `${this.iconPath}/home/forscher_box.svg`;
  public slideOptions = {
    initialSlide: 0,
    slidesPerView: 2.25,
    spaceBetween: 5
  };
  public tickets: any[];
  public articles: any;
  public rangeValue: number;
  public isEmergency: boolean;
  public isLoading: boolean;
  public coins: any;

  @ViewChild('filePicker') filePickerRef: ElementRef<HTMLInputElement>;

  constructor(
    public userAuth: AuthService,
    private router: Router,
    private afAuth: AngularFireAuth,
    private firebaseService: FirebaseService,
    private petService: PetService,
    private translateService: TranslateService,
    private commonService: CommonService,
    private modalCtrl: ModalController,
    // private afMessaging: AngularFireMessaging,
    private http: HttpClient,
    private analytics: AngularFireAnalytics
  ) {


    // if (localStorage.getItem('country')) {
    //   console.log('localStorage.getItem(country)', localStorage.getItem('country'))
    //   translateService.use(localStorage.getItem('country'));
    // }

    translateService.use(this.commonService.language);

  }

  ionViewWillEnter() {
    this.isLoading = true;
    // this.afMessaging.requestToken
    //   .subscribe(
    //     (token) => { console.log('rqtoken', token); },
    //     (error) => { console.error(error); }
    //   );
    // this.healthState = 0;
    // this.language = this.commonService.language;
    // this.language = 'en';
    this.language = this.commonService.language;
    this.translateService.use(this.language);
    this.translateService.get('HOME_PAGE')
      .subscribe(values => {
        this.healthExcellent = values.HEALTH_STATE_TEXT.EXCELLENT;
        this.healthGood = values.HEALTH_STATE_TEXT.GOOD;
        this.healthBad = values.HEALTH_STATE_TEXT.BAD;
        this.healthWorse = values.HEALTH_STATE_TEXT.WORSE;
      });


    this.subscription = this.userAuth.user$
      .subscribe((user) => {
        console.log(user);
        if (!user) {
          return this.router.navigateByUrl('/signin');
        }
        this.user$ = user;
        this.analytics.logEvent('confidu-event', {foo: '1337'});

        localStorage.setItem('user-id',user.uid);
        this.patchButton = false;
        this.healthStateIcon = this.statusCheckInactiveImg;
        console.log('local', localStorage)

        // this.afAuth.onIdTokenChanged(this.user$)
        // event emitter

        if (this.user$ && localStorage.getItem('activePet')) {
          this.petId = localStorage.getItem('activePet');
          this.getActivePet(user.uid, this.petId);
          this.getTickets(user.uid, this.petId);
          this.getArticles(this.petId, user.uid, user.za);
          this.getCoins(user.uid);
          this.isLoading = false;
        } else if (localStorage.getItem('showWalkthrough')) {
          this.router.navigateByUrl('walkthrough');
        } else {
          this.router.navigateByUrl('pets/pet-create');
        }
      });
  }

  private getCoins(userId: string) {
    this.firebaseService.getCoins(userId)
      .subscribe(data => {
        if (data?.confiCoins) {
          this.coins = data.confiCoins;
        }
      })
  }

  private getActivePet(userId: string, petId): void {
    this.firebaseService.getPetById(userId, petId)
      .subscribe(pet => {
        if (pet) {
          this.pet = pet;
          // console.log('pet', pet);
          // this.isLoading = false;
          this.species = this.pet.pet.species.value;
          this.noTasksImage = `${this.iconPath}/home/happy_${this.species}.svg`;
          this.feedingIcon = this.species === 'dog' ? `${this.iconPath}/home/bone.svg` : `${this.iconPath}/home/fish.svg`;
          this.healthStateImg = `${this.healthStateImgPath}/${this.species}_excellent.gif`;
          this.healthStateText = this.healthExcellent;
          this.createRandomImage(this.species);
        }
      });
  }

  private getArticles(petId: string, uid: string, token: any): void {
    this.commonService.getArticles(petId, uid, token)
      .subscribe(articles => {
        console.log('articles', articles);
        this.articles = articles;
      });
  }

  private createRandomImage(species: string): void {
    species = `${species}s`;
    this.firebaseService.getPetPics(species)
      .subscribe(images => {
        const el = Math.floor(Math.random() * (images?.length - 1));
        this.randomPetImg = images[el].image;
        // this.isLoading = false;
      });
  }



  private getTickets(userId: string, petId: string): void {
    this.firebaseService.getTicketsByPet(userId, petId)
      .subscribe((data: any) => {
        if (data) {
          const tickets = [];
          this.tickets = data;
          data.map(ticket => {
            // console.log('ticket', ticket);
            ticket.schedule.map(schedule => {
              if (schedule.status === 'open') {
                const obj: any = {};
                // console.log('schedule', schedule)
                obj.dateId = schedule.id;
                obj.endTime = schedule.endTime;
                obj.startTime = schedule.startTime;
                obj.data = ticket;
                // delete obj.data.schedule;
                if (this.isToday(obj.startTime.seconds)) {
                  tickets.push(obj);
                }
              }
            });
          });
          if (tickets.length > 0) {
            tickets.unshift(this.dummyTicket);
          }
          console.log('tickets', tickets)
          this.tickets = tickets;
        }
        // this.isLoading = false;
      });
  }


  public isOverdue(date: any): boolean {
    // console.log('data', date);
    if (!date?.seconds) {
      return;
    }
    return (date.seconds * 1000) + 60000 < Date.now();
  }

  public hasPagination(elements: number): boolean {
    return elements > 1;
  }

  public navigateToCareCard(): void {
    this.router.navigateByUrl(`pets/pet-care-card/${this.petId}`);
  }

  public navigateToTicket(ticketId: string, dateId: string): void {
    this.router.navigateByUrl(`ticket/${ticketId}/${dateId}`);
  }

  public orderPrescription(): void {
    this.router.navigateByUrl(`follow-up-prescription`);
  }

  private isToday(timestamp): boolean {
    const eventDate = new Date(timestamp * 1000);
    const today = new Date();
    return eventDate.getDate() === today.getDate() && eventDate.getMonth() === today.getMonth()
      && eventDate.getFullYear() === today.getFullYear();
    // return true;
  }

  public goToPage(link: string): void {
    this.router.navigateByUrl(link);
  }

  public onOpenHealthStateModal() {
    this.analytics.logEvent(
      'confidu-click-event', {
        page: 'home',
        button: 'treatment'
      }
    );
    this.presentModal();
  }

  public setHealthState(event) {
    const val = event.detail.value;
    if (val <= 40) {
      this.patchButton = false;
      this.healthStateImg = `${this.healthStateImgPath}/${this.species}_excellent.gif`;
      // this.healthStateText = this.healthExcellent;
      this.isEmergency = false;
    } else if (val >= 41 && val <= 85) {
      this.patchButton = true;
      this.healthStateImg = `${this.healthStateImgPath}/${this.species}_worse.gif`;
      // this.healthStateText = this.healthBad;
      this.isEmergency = false;
    }  else if (val >= 86) {
      this.healthStateImg = `${this.healthStateImgPath}/notfall.gif`;
      // this.healthStateText = this.healthWorse;
      this.patchButton = false;
      this.isEmergency = true;
    }
  }

  public onClickArticle(id: string) {
    this.router.navigateByUrl(`article/magazine/${id}`);
  }

  public onClickRecipe(id: string) {
    this.router.navigateByUrl(`article/recipe/${id}`);
  }

  private updatePetImage(imageUrl: string): void {
    this.pet.pet.image = imageUrl;
    this.firebaseService.updatePet(this.user$.uid, localStorage.getItem('activePet'), this.pet);
  }

  public onPickImage(): void {
    this.filePickerRef.nativeElement.click();
  }

  onClickPageCardLink(route: string): void {
    switch (route) {
      case 'carecard':
        this.router.navigateByUrl(`pets/pet-care-card/${this.petId}`);
        break;
      case 'fup':
        this.router.navigateByUrl(`follow-up-prescription`);
        break;
      case 'lab':
        this.router.navigateByUrl(`lab`);
        break;
    }
  }

  public onFileChosen(data): any {
    let file;
    let isTypeFile: boolean;

    if (data.target) { // file
      isTypeFile = true;
      file = (data.target as HTMLInputElement).files[0];
    } else { // img str
      file = data;
    }
    const headers = {
      'Content-Type': 'application/json',
      // 'firebase-context-token': this.user$.za,
      'sw-context-token': localStorage.getItem('sw-token')
    };

    const reader = new FileReader();

    if (!isTypeFile) {
      reader.readAsDataURL(this.commonService.dataURItoBlob(file));
    } else {
      reader.readAsDataURL(file);
    }

    reader.onload = (success) => {
      let result = reader.result;
      const url = `${environment.baseUrl}/${this.language}/label_detection`;

      console.log('url', url)

      if (typeof result === 'string') {
        if (result.indexOf('image/jpeg;base64') > -1) {
          result = result.replace('data:image/jpeg;base64,', '');
        } else if (result.indexOf('image/png;base64') > -1) {
          result = result.replace('data:image/png;base64,', '');
        }

        const body = {
          canvas_data: result
        };

        this.http.post(url, body, { headers })
          .subscribe((res: any) => {
            this.updatePetImage(res.image);
          });
      }
    };
  }

  public async presentModal() {
    const modal = await this.modalCtrl.create({
      component: HomeModalPage
    });
    modal.onDidDismiss()
      .then((response: any) => {
        const link = response?.data?.link;
        if (!link) {
         return;
        }
        this.router.navigateByUrl(response.data.link);
      });
    return await modal.present();
  }

  ionViewWillLeave() {
    this.healthState = undefined;
    this.isEmergency = false;
    this.rangeValue = undefined;
    this.tickets = null;
    this.isEmergency = false;
    this.petService.setPet(null);
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
