import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActionSheetController, LoadingController, Platform, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../user/auth.service';
import { FirebaseService } from '../../shared/services/firebase/firebase.service';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { CommonService } from '../../shared/services/common/common.service';
import { HttpClient } from '@angular/common/http';
import { BreedProposalsModalPage } from './breed-proposals-modal/breed-proposals-modal.page';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-create-pet',
  templateUrl: './create-pet.page.html',
  styleUrls: ['./create-pet.page.scss'],
})
export class CreatePetPage implements OnInit {
  public form: FormGroup;
  public petImage: string;
  public usePicker = false;
  public castrationLabel: string;
  public genderLabel: string;
  public logo = environment.logo;
  public iconPath = '../../assets/icons';
  public petAvatar = `${this.iconPath}/symbiose.svg`;
  public camIcon = `${this.iconPath}/home/blue_cam.svg`;
  public user$: any;
  public filteredOptions: Observable<any[]>;
  public isLoading = false;
  public showBreedList = false;
  public hasImage = false;
  public selectedSpecies: any;
  public fixedBreed: any;
  public breed: any;
  public okText: string;
  public cancelText: string;

  public speciesList = [
    {
      value: 'cat',
      label: {
        de: 'Katze',
        dk: 'Kat',
        en: 'Cat',
        es: 'Gato',
        fr: 'Chat',
        it: 'Gatto',
        pl: 'Kat'
      }
    },
    {
      value: 'dog',
      label: {
        de: 'Hund',
        dk: 'Hund',
        en: 'Dog',
        es: 'Perro',
        fr: 'Chien',
        it: 'Cane',
        pl: 'Pies'
      }
    }
  ];

  public language: any;

  private species: any;
  private breedProposals: any;
  private reducedBreedList: any;
  private uploadSub: Subscription;
  private breedModal: any;
  private subscription: Subscription;
  private waiting: string;
  private createProfile: string;

  @ViewChild('filePicker') filePickerRef: ElementRef<HTMLInputElement>;

  constructor(
    private loadingCtrl: LoadingController,
    private actionSheetCtrl: ActionSheetController,
    private platform: Platform,
    private authService: AuthService,
    private router: Router,
    private firebaseService: FirebaseService,
    public userAuth: AuthService,
    private storage: AngularFireStorage,
    private commonService: CommonService,
    private modalCtrl: ModalController,
    private translateService: TranslateService,
    public loadingController: LoadingController,
    private http: HttpClient
  ) {

  }

  ionViewWillEnter() {
    if (localStorage.length < 1) {
      // this.authService.logOut();
    }
    this.subscription = this.userAuth.user$
      .subscribe((user) => {
        this.user$ = user;
      });

    this.language = this.commonService.language;
    // console.log('this.language', this.language);
    this.translateService.use(this.language);
    this.translateService.get('CREATE_PET_PAGE')
      .subscribe(values => {
        // console.log('values', values)
        this.okText = values.OK_BUTTON;
        this.cancelText = values.CANCEL_BUTTON;
        this.waiting = values.WAITING;
        this.createProfile = values.CREATE_PROFILE;
      });

  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      gender: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      species: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      race: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      birthday: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      castration: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      image: new FormControl(null)
    });

    if ((this.platform.is('mobile') && !this.platform.is('hybrid')) || this.platform.is('desktop')) {
      this.usePicker = true; // use filepicker
    }
  }

  ionViewWillLeave(): void {
    this.breed = undefined;
    this.fixedBreed = undefined;
    this.petAvatar = `${this.iconPath}/pets_blue_cam.svg`;
    this.petImage = this.petAvatar;
    this.form.reset();

    if (this.uploadSub) {
      this.uploadSub.unsubscribe();
    }

    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public onValueChange(event: any): void {
    if (!event.isUserInput) {
      return;
    }
    this.breed = event.source?.value;

    console.log('this.breed', this.breed);
  }
  public validBreed() {
    return typeof this.breed !== 'string';
  }

  public raceLabel(race?: any): any {
    const lang = localStorage.getItem('country') || 'de';
    const field = `name_${lang}`;
    return race ? race.data[field] : undefined;
  }

  private filterRace(racesList: any, value: string) {
    let filterValue;
    const lang = localStorage.getItem('country') || 'de';
    const field = `name_${lang}`;
    if (typeof value === 'string') {
      filterValue = value.toLowerCase();
    }
    return racesList.filter(option => {
      return option.data[field].toLowerCase().includes(filterValue);
    });
  }

  public onCreatePet(): void {
    if (!this.form) {
      return;
    }

    this.loadingCtrl
      .create({
        message: 'Erstelle Tierprofil ...'
      })
      .then(loadingEl => {
        loadingEl.present();

        if (!this.petImage) {
          this.form.patchValue({ image: this.petAvatar });
        } else {
          this.form.patchValue({ image: this.petImage });
        }
        this.createPet(this.form);
        loadingEl.dismiss();
      });
  }

  public openModal() {
    this.presentBreedProposalsModal(this.breedProposals, this.reducedBreedList);
  }

  public onFileChosen(data): any {
    this.presentLoading();

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
      'firebase-context-token': this.user$.za,
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

      // console.log('url', url)

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
            console.log('res', res);
            this.form.patchValue({ image: res.image });
            this.hasImage = true;
            this.petImage = res.image;
            this.isLoading = false;
            this.loadingController.dismiss();
            if (res.race.length > 0) {
              try {
                this.species = this.speciesList.filter(item => item.value === res.species.value);
                this.selectedSpecies = this.species[0].value;
                this.breedProposals = res.race;

                this.presentBreedProposalsModal(this.breedProposals, this.selectedSpecies);
              } catch (e) {
                console.log('e', e);
              }
            }
          });
      }
    };
  }

  public compareFn(species1: any, species2: any): boolean {
    return species1 && species2 ? species1 === species2 : null;
  }

  public onPickImage(): void {

    this.filePickerRef.nativeElement.click();
  }

  public onSelectSpecies(event: any) {
    this.showBreedList = false;
    this.form.patchValue({ race: null });

    if (!this.petImage) {
      this.petAvatar = event.detail.value === 'dog' ? `${this.iconPath}/dog_animated.gif` : `${this.iconPath}/cat_animated.gif`;
    }

    if (!event.detail.value) {
      return false;
    }
    this.showBreedList = true;
    this.fixedBreed = undefined;

    this.species = this.speciesList.filter(item => item.value === event.detail.value);
    this.selectedSpecies = this.species[0].value;
    return this.firebaseService.getAllBreeds(this.selectedSpecies, this.language)
      .subscribe((response: any) => {
        console.log('response', response);
        return this.createBreedList(response);
      });
  }

  private createPet(data: any): void {
    if (!this.user$) {
      return;
    }

    let castration = [
      {
        value: 'true',
        label: {
          de: 'Kastriert',
          dk: 'Kastrerede',
          en: 'Castrated',
          es: 'Castrado',
          fr: 'Castré',
          it: 'Castrato',
          pl: 'Wykastrowany'
        }
      },
      {
        value: 'false',
        label: {
          de: 'Unkastriert',
          dk: 'Ikke Kastreret',
          en: 'Intact',
          es: 'Sin castrar',
          fr: 'Non castré',
          it: 'Non castrato',
          pl: 'Niekastrowany'
        }
      }
    ];

    let gender = [
      {
        value: 'male',
        label: {
          de: 'Männlich',
          dk: 'Mand',
          en: 'Male',
          es: 'Masculino',
          fr: 'Masculin',
          it: 'Maschile',
          pl: 'Rodzaj męski'
        }
      },
      {
        value: 'female',
        label: {
          de: 'Weiblich',
          dk: 'Kvinde',
          en: 'Female',
          es: 'Mujer',
          fr: 'Femelle',
          it: 'Femmina',
          pl: 'Płeć żeńska'
        }
      }
    ];

    let kind;
    kind = this.speciesList.filter(item => item.value === data.value.species);
    castration = castration.filter(item => item.value === data.value.castration);
    gender = gender.filter(item => item.value === data.value.gender);

    const pet = {
      breed: this.breed,
      gender: gender[0],
      image: data.value.image,
      name: data.value.name,
      species: kind[0],
      castration: castration[0],
      birthday: new Date(data.value.birthday),
      currentWeight: null,
      petIdent: null,
      magazines: [],
      recipes: []
    };

    console.log('pet', pet);
    this.createFireBasePet(this.user$.uid, pet)
      .then((res) => {
        console.log('res', res);
        this.form.reset();
        this.petAvatar = `${this.iconPath}/pets_blue_cam.svg`;
        this.loadingController.dismiss();
        this.router.navigateByUrl('initial');
      })
      .catch((error) => {
        console.log('error', error);
        this.commonService.presentToast('Eintrag fehlgeschlagen', 'danger');
      });
  }

  private async createFireBasePet(userId, pet): Promise<any> {
    this.presentLoading();
    const data = await this.firebaseService.createPet(this.user$.uid, pet);
    console.log('data', data);
    localStorage.setItem('activePet', data.id);
    await this.commonService.notifyBackend(data.id, userId, this.user$.za);
    return this.firebaseService.createActivePetId(userId, data.id);
  }

  private createBreedList(races: any[]) {
    this.filteredOptions = this.form.get('race').valueChanges
      .pipe(
        startWith(''),
        map(value => {
          this.breed = value;
          console.log('breed', this.breed)
          return this.filterRace(races, value);
        })
      );
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message:  this.waiting,
      duration: 10000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

  private async presentBreedProposalsModal(proposedBreeds, species): Promise<void> {
    this.breedModal = await this.modalCtrl.create({
      component: BreedProposalsModalPage,
      componentProps: {
        proposals: proposedBreeds,
        species: species
      }
    });
    this.breedModal.onDidDismiss()
      .then((response: any) => {

        if (response?.data) {
          this.breed = response.data;
          // console.log(' this.breed',  this.breed);
          const field = `name_${this.language}`;
          this.form.patchValue({ race: this.breed });
          this.showBreedList = false;
          this.fixedBreed = this.breed.data[field];
          // console.log(' this.fixedBreed',  this.fixedBreed);
        }
      });
    return await this.breedModal.present();
  }
}
