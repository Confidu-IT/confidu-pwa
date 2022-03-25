import {Component, ElementRef, ViewChild} from '@angular/core';
import { TicketService } from '../ticket-service/ticket-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { tap, switchMap, startWith, map } from 'rxjs/operators';
import { AuthService } from '../../user/auth.service';
import { CommonService } from '../../shared/services/common/common.service';
import { TranslateService } from '@ngx-translate/core';
import { IonSlides, ModalController } from '@ionic/angular';
import { QuestionInfoModalPage } from './question-info-modal/question-info-modal.page';
import { FirebaseService } from '../../shared/services/firebase/firebase.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ticket-questions',
  templateUrl: './ticket-questions.page.html',
  styleUrls: ['./ticket-questions.page.scss'],
})
export class TicketQuestionsPage {
  public indexNr: number;
  public uploadedFiles: any[];
  public title: string;
  public selectedAnswer: any;
  public selectedNumber: number;
  public isLoading: boolean;
  public language: string;
  public sizeWarning: boolean;
  public question: any;
  public rangeStateImg: string;
  public activityVal: number;
  public rangeAnswer: string[];
  public dropdownOption: string;
  public toxicAmount: string | number;
  public toxicUnit: string;
  public beats: number;
  public questionProgressValue: number;
  public frequency: string[];
  public daily: string;
  public cancelText: string;
  public okText: string;
  public medFrequency: string | number;
  public currentMed: any = {};
  public pieces: string[];
  public liquid: string[];
  public parts: string[];
  public packUnit: string;
  public timeAmount: any;
  public medAmount: string | number;
  public vetZipCode: number;
  public vetsList: any[];
  public vetForm: FormGroup;
  public showVetForm: boolean;
  public checkBoxValues: string[] = [];
  public medNature: string;
  public medPiece: any;
  public medPart: any;
  public countdownDone: boolean;
  public vetError = false;
  public vaccines: any[];
  public foodTypes: any[];
  public snackTypes: any[];
  public foodRations: any[] = [];
  public foodType: string;
  public food: any[];
  public selectedFood: any;
  public filteredOptions: Observable<any[]>;
  public foodForm: FormGroup;
  public showFoods: boolean;
  public user: any;
  public treatmentLocs: any[];
  public treatmentLocation: any;
  public medVariant: any;
  public invoiceMeds: any;
  public singleDose: number;
  public vaccDates: any[];
  public pregnancyDate = null;
  public currentDateSet = false;
  public isGif = false;
  public clearData: boolean;
  public slideOpts = {
    initialSlide: 0
  };
  public guideQuestions = ['v+breathe_freq', 'v+pulse_freq', 'v+tempera', 'w+weightac', 'circ1'];
  public plusIcon = '../../../assets/icons/tickets/plus.svg';

  @ViewChild('filePicker') filePickerRef: ElementRef<HTMLInputElement>;
  @ViewChild(IonSlides) slides: IonSlides;
  @ViewChild('countdown') countdown: ElementRef;
  @ViewChild('img') img: ElementRef;
  @ViewChild('slider') slider: IonSlides

  private readonly routeSub: Subscription;
  private subscription: Subscription;
  private uploadSub: Subscription;

  private iconPath = '../../../../assets/icons/tickets/result';
  public infoButton = `${this.iconPath}/info-button.svg`;
  public vetFormImage = `${this.iconPath}/vet-form-image.svg`;
  public params: any;
  private questions: any[];
  private answers: any;
  private infoContent: any;
  private interval: any;
  private petId: string;
  private pet: any;
  private reducedQuestions: any[];
  private medPieceAmount: any[] = [];
  private medPartAmount: any[] = [];
  private dose: any[] = [];
  private vetKey: string;
  private vet: any;
  public vaccination: any;
  public parasite: any;
  public uploadPath: string;
  private addedFiles: string[];
  public lastVacMax = new Date().toISOString();


  constructor(
    public userAuth: AuthService,
    private commonService: CommonService,
    private ticketService: TicketService,
    private activatedRoute: ActivatedRoute,
    private translateService: TranslateService,
    private modalCtrl: ModalController,
    private router: Router,
    private firebaseService: FirebaseService,
  ) {
    this.routeSub = this.activatedRoute.params
      .subscribe((params: any) => {
        console.log('params', params)
        this.params = params;
        this.currentMed.code = this.params.code;
      });

    this.foodForm = new FormGroup({
      mainFood: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      mainFoodAmount: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      mainFoodUnit: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      })
    });

    this.vetForm = new FormGroup({
      docOffice: new FormControl(null, {
        updateOn: 'change'
      }),
      name: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      address: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      zip: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
    });
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.title = this.params.symptom;
    this.activityVal = 0;
    this.questions = [];
    this.uploadedFiles = [];
    this.language = this.commonService.language;
    this.translateService.use(this.language);
    this.uploadPath = `questionnaire/${this.commonService.createShortID()}`;
    this.vaccination = {
      key: undefined,
      currentDate: undefined,
      nextDate: undefined
    };
    this.parasite = {
      key: undefined,
      date: undefined
    };

    this.translateService.get('TICKET_QUESTION_PAGE')
      .subscribe(values => {
        // console.log('values', values);
        this.daily = values?.MED?.DAILY;
        this.frequency = [];
        for (let i = 1; i <= 5; i++) {
          this.frequency.push(`${i}x ${this.daily}`);
        }
        this.cancelText = values?.CANCEL_BUTTON;
        this.okText = values?.OK_BUTTON;
        this.treatmentLocs = [
          { name: values?.TREATMENT?.VET, value: 'vet' },
          { name: values?.TREATMENT?.HOME, value: 'home' }
        ];

        this.foodTypes = [
          { label: values?.FOOD?.TYPES?.DRY, key: 'dry' },
          { label: values?.FOOD?.TYPES?.WET, key: 'wet' },
          { label: values?.FOOD?.TYPES?.FOODS, key: 'foods' },
          { label: values?.FOOD?.TYPES?.VMIN, key: 'vmin' },
        ];
        this.snackTypes = [
          { label: values?.FOOD?.TYPES?.SNACKS, key: 'snacks' },
          { label: values?.FOOD?.TYPES?.FOODS, key: 'foods' }
        ];
      });

    this.subscription = this.userAuth.user$.pipe(
      tap(user => user),
      switchMap(user => {
        this.user = user;
        this.petId = localStorage.getItem('activePet');
        if (user && this.petId) {
          return this.firebaseService.getPetById(user.uid, this.petId);
        } else {
          this.isLoading = false;
          this.router.navigateByUrl('/');
        }
      }),
      switchMap(pet => {
        this.pet = pet;
        return this.ticketService.getQuestions(
          this.params.type,
          this.params.code,
          this.user.uid,
          this.user.za,
          this.petId,
          this.commonService.language
        );
      })
    ).subscribe(response => {
        console.log('response', response);
        // delete this
        // this.showVetForm = true;
        // this.filteredOptions = this.myControl.valueChanges
        //   .pipe(
        //     startWith(''),
        //     map(value => typeof value === 'string' ? value : value.name),
        //     map(name => name ? this._filter(name) : this.options.slice())
        //   );

        if (response.data.length < 1) {
          // this.isLoading = false;
          // this.router.navigateByUrl(`/ticket/ticket-result/${this.params.symptom}`);
          const id = this.params.id || null;
          this.router.navigateByUrl(`tickets/${this.params.type}/${this.params.code}/${id}/result`);
        } else {
          this.questions = [];
          this.uploadedFiles = [];
          this.reducedQuestions = []; // for progressbar
          this.answers = {};
          this.indexNr = 0;
          this.beats = 0;
          this.questionProgressValue = 0;
          this.vaccDates = [];

          response.data.map(obj => {
            this.questions.push(obj);
            return [...this.questions];
          });

          this.questions.map(question => {
            if (question.values.questionType !== 'I' && question.values.questionType !== 'F' && question.values.questionType !== 'B') {
              this.reducedQuestions.push(question);
            }
            return [...this.reducedQuestions];
          });

          console.log('this.questions', this.questions);
          // console.log('this.reducedQuestions', this.reducedQuestions);

          this.question = this.questions[this.indexNr];
          this.checkForGIF(this.question.values.imageLink);
          console.log('this.question', this.question);
          this.createInfoModalContent(this.indexNr);
          // console.log('this.infoContent', this.infoContent);

          // recognized invoice meds
          if (this.question.values.questionType.toLowerCase() === 'dose') {
            this.invoiceMeds = [];
            const arr = this.question.values.answerOption[0].answerValue;
            this.treatmentLocation = [];
            for (const el of arr) {
              this.invoiceMeds.push(el);
              this.treatmentLocation.push(this.treatmentLocs[0].value);
            }
            this.timeAmount = Array(this.invoiceMeds.length);
            console.log('this.invoiceMeds', this.invoiceMeds);
          }

          if (this.question.values.questionType.toLowerCase() === 's') {
            this.rangeStateImg = this.question.values.answerOption[0].imageLinkAnswer;
            this.rangeAnswer = this.question.values.answerOption[0].answerLongtext;
          }


          if (this.question.values.questionType.toLowerCase() === 'se') {
            this.firebaseService.getVaccines(this.language, this.pet.pet.species.value)
              .subscribe(vaccines => this.vaccines = vaccines);
          }



          // change this
          // this.foodRations = [];

          // this.getMedNature();
          // this.pieces = ['0', '1', '2', '3', '4', '5'];
          // this.parts = ['0', '1/8', '1/4', '1/3', '1/2', '2/3', '3/4'];
          // this.liquid = ['100', '200', '300', '400', '500'];

          this.isLoading = false;
        }
      });
  }

  public hasGuide(): boolean {
    return this.guideQuestions.includes(this.params.code);
  }


  public goToGuide(symptom: string): void {
    console.log('S', symptom);
    // http://localhost:8100/tickets/ticket/default/guide/v%2Btempera
    this.router.navigateByUrl(`tickets/ticket/default/guide/${symptom}`);
  }

  public onPickFindingType(event): void {
    this.selectedAnswer = event.value;
  }

  public onPickFoodType(event): void {
    this.showFoods = true;
    this.firebaseService.getFoodByType(this.language, this.pet.pet.species.value, event.value)
      .subscribe(food => {
        this.food = food;
        if (this.food?.length > 0) {
          this.filteredOptions = this.foodForm.get('mainFood').valueChanges
            .pipe(
              startWith(''),
              map(value => {
                if (!value) return;
                return typeof value === 'string' ? value : value.name;
              }),
              map(name => name ? this.filterFood(name) : this.food.slice())
            );
        }
      });
  }

  public receiveAddedFiles(event) {
    this.addedFiles = event;
    this.selectedAnswer = true;
    // console.log(this.addedFiles);
  }

  public foodLabel(food?: any): any {
    return food ? food.name : undefined;
  }

  private filterFood(name: string) {
    const filterValue = name.toLowerCase();
    return this.food.filter(option => {
      console.log('o', option)
      return option.name.toLowerCase().includes(filterValue);
    });
  }

  // private _filter(name: string) {
  //   const filterValue = name.toLowerCase();
  //
  //   return this.foods.filter(option => {
  //     return option.name.toLowerCase().indexOf(filterValue) === 0;
  //   });
  // }

  // private filterFood(name: string) {
  //   const filterValue = name.toLowerCase();
  //
  //   return this.food.filter(option => {
  //     return option.name.toLowerCase().indexOf(filterValue) === 0;
  //   });
  // }

  public onAddRation(): void {
    this.selectedFood.amount = this.foodForm.value.mainFoodAmount;
    this.selectedFood.unit = this.foodForm.value.mainFoodUnit;
    this.foodRations.push(this.selectedFood);
    this.selectedAnswer = this.foodRations;

    this.foodType = null;
    this.showFoods = false;
    this.food = [];
    this.foodForm.reset();
  }

  public onRemoveRation(index): void {
    this.foodRations.splice(index, 1);
    this.selectedAnswer = this.foodRations;
    // console.log('this.selectedAnswer', this.selectedAnswer);
  }

  public onPickVaccine(event): void {
    console.log('event', event);
    this.vaccination.key = event.value;
    this.completeVacc();
  }

  public onPickParasite(event): void {
    console.log(event.value);
    this.parasite.key = event.value;
    this.completeParasite();
  }

  public onPickCurrentVaccTime(event) {
    this.vaccination.currentDate = event.detail.value;
    this.currentDateSet = true;
    console.log('this.vaccination', this.vaccination);
    this.completeVacc();
  }

  public onPickParasiteTime(event) {
    this.parasite.date = event.detail.value;
    this.completeParasite();
  }

  public onPickNextVaccTime(event) {
    this.vaccination.nextDate = event.detail.value;
    this.completeVacc();
  }

  public setNextVaccDate(event, index) {
    this.question.values.answerOption[0].answerValue[index].nextDate = event.detail.value;
    // console.log('!!!', this.question.values.answerOption[0].answerValue[index])
  }

  public onClickVetLink(): void {
    this.showVetForm = true;
  }

  public onPickVet(event): void {
    this.vetKey = event.value.key;
    this.selectedAnswer = true;
  }

  public onPickVetZip(): void {
    console.log('this.vetZipCode', this.vetZipCode);
    this.vetError = false;
    if (String(this.vetZipCode).length > 4 || String(this.vetZipCode).length < 6) {
      console.log('load vets');
      this.firebaseService.getVetsByZipCode(this.language, String(this.vetZipCode))
        .subscribe(vets => {
          console.log('vets', vets);
          this.vetsList = vets;
          if (this.vetsList.length < 1) {
            this.vetError = true;
          }
        });
    }
  }

  public setVariant(event, index): void {
    this.medVariant = event.value;
    const item = this.invoiceMeds[index].variants.filter(option => option.key === this.medVariant);
    this.invoiceMeds[index].selectedVariant = item[0];
    this.invoiceMeds[index].selectedVariant.permanent = false;
    this.invoiceMeds[index].selectedVariant.singledose = null;
    console.log('this.invoiceMeds', this.invoiceMeds);
  }

  public setFrequency(event, index): void {
    this.timeAmount[index] = null;
    this.invoiceMeds[index].selectedVariant.singledose = null;
    this.invoiceMeds[index].selectedVariant.amountdose = null;
    this.timeAmount[index] = parseInt(event.value.charAt(0), 10);
    this.invoiceMeds[index].selectedVariant.durationPd = event.value.charAt(0);
    console.log('this.invoiceMeds', this.invoiceMeds);
  }

  public pickMedDose(event, index): void {
    this.invoiceMeds[index].selectedVariant.singledose = String(event.target.value);
    this.invoiceMeds[index].selectedVariant.amountdose = String(this.timeAmount[index] * event.target.value);
    console.log('this.invoiceMeds', this.invoiceMeds);

  }

  public setMedicationPermanent(event, index) {
    if (event.checked === true) {
      this.invoiceMeds[index].selectedVariant.durationLength = null;
      this.invoiceMeds[index].selectedVariant.startDate = null;
      this.invoiceMeds[index].selectedVariant.permanent = true;
    } else {
      this.invoiceMeds[index].selectedVariant.permanent = false;
    }
    console.log('this.invoiceMeds', this.invoiceMeds);
  }

  public clueless(event) {
    if (event.checked === true) {
      this.selectedAnswer = true;
    }
  }

  public pickPregDay(event): void {
    // const val = event.target.value;
    // if (val.toString().length > 9 && val.toString().length < 16) {
    //   this.selectedAnswer = val;
    // }

    if (event.target.value) {
      this.selectedAnswer = event.target.value;
    }
  }

  public onPickFrequency(event): void {
    if (this.currentMed?.med_amount?.length !== this.timeAmount) {
      this.selectedAnswer = false;
    }
    this.timeAmount = parseInt(event.value.charAt(0), 10);
    this.currentMed.med_duration_pd = this.timeAmount.toString();
    // console.log('this.timeAmount', this.timeAmount);
    console.log('this.invoiceMeds', this.invoiceMeds);
  }

  public numbers(n: number): number[] {
    return Array(n);
  }

  // public renderedFileName(fileName: string) {
  //   return fileName.split('-')[0];
  // }

  public onPickMedAmount(event, type, index): void {
    let val;

    this.medPieceAmount[index] = event.target.value;

    // if (type === 'medPiece') {
    //  this.medPieceAmount[index] = event.value;
    // } else if (type === 'medPart') {
    //   // tslint:disable-next-line:no-eval
    //   this.medPartAmount[index] = eval(event.value);
    // }

    // if (this.medPieceAmount[index] && this.medPartAmount[index]) {
    //   val = Number(this.medPieceAmount[index]) + Number(this.medPartAmount[index]);
    // } else if (this.medPieceAmount[index] && !this.medPartAmount[index]) {
    //   val = this.medPieceAmount[index];
    // } else if (!this.medPieceAmount[index] && this.medPartAmount[index]) {
    //   val = this.medPartAmount[index];
    // } else {
    //   return;
    // }

    val = this.medPieceAmount[index];

    this.dose[index] = val.toString();
    this.currentMed.med_amount = this.dose;

    // console.log('this.currentMed.med_amount', this.currentMed.med_amount);
    // console.log('this.timeAmount', this.timeAmount);

    if (this.currentMed.med_amount.length === this.timeAmount) {
      this.selectedAnswer = true;
    }
  }

  public startTimer(): void {
    clearInterval(this.interval);
    let countdown = 60;
    if (this.indexNr < this.questions.length - 1) {
      this.indexNr = this.indexNr + 1;
      this.question = this.questions[this.indexNr];
      this.createInfoModalContent(this.indexNr);
      const timer = setInterval(() => {
        if (--countdown >= 0) {
          this.countdown.nativeElement.textContent = countdown.toString();
          // console.log('!!');
        } else {
          this.selectedAnswer = this.countdown;
          clearInterval(timer);
          this.countdownDone = true;
        }
      }, 1000);
    }
  }

  public onCollectBeats(): void {
    this.beats = this.beats + 1;
    this.img.nativeElement.src = this.question.values.imageSwitch;
  }

  public onClickSliderBox(val): void {
    this.selectedAnswer = true;
  }

  public onSlideChanged(): void {
    this.selectedAnswer = false;
  }

  public onClickSliderImage(img: string): void {
    this.presentInfoModal(this.infoContent, img);
  }

  public onOpenInfoModal(): void {
    this.presentInfoModal(this.infoContent);
  }

  public onPickToxicItem(event): void {
    this.selectedAnswer = event.value;
  }

  public onProgressQuestion(): void {
    let val;
    let path: string;

    if (this.question?.values?.questionType.toLowerCase() === 'up') {
      path = this.question.name.toLowerCase();
    } else {
      path = this.uploadPath;
    }

    if (this.question?.values?.questionType.toLowerCase() === 'find') {
      path = this.question.values?.answerOption[0]?.answerValue?.category_key + '/' + this.question.values?.answerOption[0]?.answerValue?.key;
    }

    console.log('this.addedFiles', this.addedFiles);

    if (this.addedFiles?.length > 0 && this.uploadedFiles) {
      for (const file of this.addedFiles) {
        const str = `${path}/${file}`;
        this.uploadedFiles.push(str);
      }
    }

    if (this.question.values.questionType.toLowerCase() === 'r' || this.question.values.questionType.toLowerCase() === 'c') {
      val = this.question.values.answerOption.filter(option => option.value === this.selectedAnswer);
      val = val[0];
    } else if (this.question.values.questionType.toLowerCase() === 'alpha_num') {
      val = this.question.values.answerOption;
      val = val[0];
      val.answerValue = this.selectedAnswer;
    } else if (this.question.values.questionType.toLowerCase() === 'z') {
      val = this.question.values.answerOption;
      val = val[0];
      val.answerValue = this.selectedNumber;
    }
    else if (this.question.values.questionType.toLowerCase() === 't') {
      val = this.question.values.answerOption[0];
      val.answerValue = this.selectedAnswer;
      val.answerLongtext = [];
      val.answerLongtext.push(this.selectedAnswer);
    } else if (
      this.question.values.questionType.toLowerCase() === 'fu'
      || this.question.values.questionType.toLowerCase() === 'ful'
    ) {
      val = this.question.values.answerOption;
      val = val[0];
      val.answerValue = this.selectedAnswer;
    } else if (this.question.values.questionType.toLowerCase() === 'se') {
      // val = this.question.values.answerOption;
      val = this.question.values.answerOption.filter(option => option.value === this.vaccination.key);
      val = val[0];
      val.answerValue = this.vaccination;
    } else if (this.question.values.questionType.toLowerCase() === 'sei') {
      val = this.question.values.answerOption.filter(option => option.value === this.parasite.key);
      val = val[0];
      val.answerValue = this.parasite;
    } else if (this.question.values.questionType.toLowerCase() === 'drs') {
      val = this.question.values.answerOption.filter(option => option.value === this.selectedAnswer);
      val = val[0];
      val.answerValue = this.toxicAmount;
    }
    else if (this.question.values.questionType.toLowerCase() === 'dr') {
      val = this.question.values.answerOption.filter(option => option.value === this.selectedAnswer);
      val = val[0];
      val.answerValue = this.toxicAmount;
    } else if (this.question.values.questionType === 'DR_F') {
      val = this.question.values.answerOption.filter(option => option.value === this.selectedAnswer);
      val.answerValue = this.selectedAnswer;
    } else if (this.question.values.questionType.toLowerCase() === 'vi') {
      val = this.question.values.answerOption;
      val = val[0];
      val.answerValue = this.beats;
    } else if (this.question.values.questionType.toLowerCase() === 's') {
      val = this.question.values.answerOption.filter(option => option.answerLongtext === this.selectedAnswer);
      val = val[0];
      val.answerValue = this.selectedAnswer;
    } else if (this.question.values.questionType.toLowerCase() === 'd') {
      val = this.question.values.answerOption;
      val = val[0];
    } else if (this.question.values.questionType.toLowerCase() === 'date') {
      val = this.question.values.answerOption;
      val = val[0];
      val.answerValue = this.selectedAnswer;

    } else if (this.question.values.questionType === 'MED_T_L') {
      if (this.timeAmount === this.currentMed.med_amount.length) {
        val = this.question.values.answerOption;
        val = val[0];
        val.answerValue = this.currentMed;
      }
    } else if (this.question.values.questionType.toLowerCase() === 'ff' && !this.showVetForm) {
      val = this.question.values.answerOption;
      val = val[0];
      val.answerValue = this.vetKey;
    } else if (this.question.values.questionType.toLowerCase() === 'ff' && this.showVetForm) {
      const obj = {
        office: this.vetForm.value.docOffice,
        name: this.vetForm.value.name,
        address: this.vetForm.value.address,
        zip: this.vetForm.value.zip
      };
      val = this.question.values.answerOption;
      val = val[1];
      val.value = obj;
      val.answerValue = null;
      this.showVetForm = false;
    } else if (this.question.values.questionType.toLowerCase() === 'up' || this.question.values.questionType.toLowerCase() === 'f') {
      val = this.question.values.answerOption;
      val = val[0];
      val.answerValue = this.uploadedFiles;
      this.uploadedFiles = [];
    } else if (this.question.values.questionType.toLowerCase() === 'find') {
      val = this.question.values.answerOption;
      val = val[0];
      val.answerValue.docs = this.uploadedFiles;
      this.uploadedFiles = [];
      this.ticketService.setUploadDocs(this.uploadedFiles);
    } else if (this.question.values.questionType.toLowerCase() === 'dose') {
      const arr = [];
      for (const item of this.invoiceMeds) {
        arr.push(item.selectedVariant);
      }
      val = this.question.values.answerOption;
      val = val[0];
      val.answerValue = arr;
    } else if (this.question.values.questionType.toLowerCase() === 'ch2') {
      val = this.question.values.answerOption;
      val = val[0];
    }

    // no file upload
    if (this.question.values.questionType.toLowerCase() !== 'i') {
      const obj = {
        [this.question.name]: { // change this
          name: this.question.name,
          values: {
            answer: val
          },
          questionText: this.question.values.questionsLongText,
          questionType: this.question.values.questionType
        }
      };
      Object.assign(this.answers, obj);
    }

    console.log('answers', this.answers);

    this.checkBoxValues = [];
    this.addedFiles = [];

    // this.uploadedFiles = [];
    this.foodRations = [];
    this.selectedNumber = null;
    this.selectedAnswer = null;
    this.toxicUnit = null;
    this.toxicAmount = null;
    this.dropdownOption = null;
    this.vetKey = null;
    this.vetForm.reset();
    this.infoContent = undefined;

    // console.log('foodRations', this.foodRations);

    if (this.indexNr < this.questions.length - 1) {
      this.indexNr = this.indexNr + 1;
      this.slideOpts.initialSlide = 0;
      this.question = this.questions[this.indexNr];
      this.createInfoModalContent(this.indexNr);
      // this.getMedNature();

      console.log('this.question', this.question);

      setTimeout(() => {
        if (this.slider) {
          this.slider.slideTo(0);
        }
      },50);


      // recognized invoice meds
      if (this.question.values.questionType.toLowerCase() === 'dose') {
        this.invoiceMeds = [];
        const arr = this.question.values.answerOption[0].answerValue;
        this.treatmentLocation = [];
        for (const el of arr) {
          this.invoiceMeds.push(el);
          this.treatmentLocation.push(this.treatmentLocs[0].value);
        }
        this.timeAmount = Array(this.invoiceMeds.length);
        console.log('this.invoiceMeds', this.invoiceMeds);
      }

      this.questionProgressValue = Object.keys(this.answers).length / this.reducedQuestions.length;

      // console.log('Object.keys(this.answers).length', Object.keys(this.answers).length);
      // console.log('this.questions.length - 1', this.questions.length - 1);
      // console.log('this.selectedAnswer', this.selectedAnswer);

      if (this.question.values.questionType.toLowerCase() === 'f') {
        this.selectedAnswer = 'f';
      }
    } else {
      let answers = [];
      for (const [key, value] of Object.entries(this.answers)) {
        answers.push(value);
      }
      console.log('answers', answers);
      this.ticketService.setAnswers(answers);
      answers = null;
      const id = this.params.id || null;
      this.router.navigateByUrl(`tickets/${this.params.type}/${this.params.code}/${id}/result`);
    }
  }

  public goBack(): void {
    this.indexNr = this.indexNr - 1;
    this.showVetForm = false;
    this.vetKey = null;
    this.vetZipCode = null;
    this.question = this.questions[this.indexNr];
    this.createInfoModalContent(this.indexNr);
  }

  // public onRemoveFile(index) {
  //   if (this.uploadedFiles.length > 0) {
  //     this.uploadedFiles.splice(index, 1);
  //   }
  // }

  public setActivityState(event) {
    const val = event.detail.value;
    if (val < 25) {
      this.rangeStateImg = this.question.values.answerOption[0].imageLinkAnswer;
      this.rangeAnswer = this.question.values.answerOption[0].answerLongtext;
    } else if (val < 50 && val >= 25) {
      this.rangeStateImg = this.question.values.answerOption[1].imageLinkAnswer;
      this.rangeAnswer = this.question.values.answerOption[1].answerLongtext;
    } else if (val < 75 && val >= 50) {
      this.rangeStateImg = this.question.values.answerOption[2].imageLinkAnswer;
      this.rangeAnswer = this.question.values.answerOption[2].answerLongtext;
    } else if (val >= 75) {
      this.rangeStateImg = this.question.values.answerOption[3].imageLinkAnswer;
      this.rangeAnswer = this.question.values.answerOption[3].answerLongtext;
    }

    this.selectedAnswer = this.rangeAnswer;

    console.log('this.selectedAnswer', this.selectedAnswer);
  }

  public hasAnswer() {
    console.log('this.selectedAnswer', this.selectedAnswer);
    if (this.question.values.questionType.toLowerCase() === 'i' || !this.selectedAnswer) {
      // console.log('answer')
      return false;
    }
    return false;

  }

  public changeCheckbox(event, index) {
    this.selectedAnswer = false;
    this.checkBoxValues[index] = event.checked.toString();
    if (this.question.values.answerOption[0].answerLongtext.length === this.checkBoxValues.length && !this.checkBoxValues.includes('false')) {
      this.selectedAnswer = true;
    }
  }

  // private getMedNature(): any {
  //   if (
  //     this.question.values.questionType === 'MED_T_L') {
  //     const unit = this.question.values.answerOption[0].answerUnit;
  //     if (unit === 'Suspension' || unit === 'Lösung') {
  //       this.medNature = 'liquid';
  //     } else if (unit === 'Tabletten' || unit === 'Kautabletten') {
  //       this.medNature = 'solid';
  //     }
  //   } else {
  //     return;
  //   }
  // }

  private checkForGIF(img: string): any {
    if (!img) {
      return;
    }
    if (img.indexOf('.gif') > -1) {
      return this.isGif = true;
    }
    return false;
  }

  private completeVacc(): void {
    if (this.vaccination.key && this.vaccination.currentDate && this.vaccination.nextDate) {
      this.selectedAnswer = this.vaccination;
    }
  }

  private completeParasite(): void {
    console.log('parasite', this.parasite);
    if (this.parasite.key && this.parasite.date) {
      this.selectedAnswer = this.parasite;
    }
  }

  private validateMedAnswer(): boolean {
    const selectedVariants = [];
    const locations = [];
    const amount = [];
    const pday = [];
    const dates = [];
    const duration = [];
    const permanent = [];


    this.invoiceMeds.map((med, index) => {
      locations.push(this.treatmentLocation[index]);
      selectedVariants.push(med.selectedVariant);

      if (med.selectedVariant) {
        amount.push(med.selectedVariant.amountdose);
        pday.push(med.selectedVariant.durationPd);
        duration.push(med.selectedVariant.durationLength);
        dates.push(med.selectedVariant.startDate);
        permanent.push(med.selectedVariant.permanent);
      }
    });

    const undefinedVariants = selectedVariants.includes(undefined);
    const allVetOffice = !locations.includes('home');
    const allHome = !locations.includes('vet');

    console.log()

    if (allVetOffice && !undefinedVariants) { // all medication variants set and given at vet office
      return false;
    } else if (allHome && !undefinedVariants) { // all medication variants set and given at home
      if (this.invoiceMeds.length === permanent.length && !permanent.includes(false)) { // all medication permanent
        if (this.invoiceMeds.length === amount.length && !amount.includes(null)) { // just check for doses
          return false;
        }
      } else if (this.invoiceMeds.length === permanent.length && !permanent.includes(true)) { // all medication !permanent
        if (
          this.invoiceMeds.length === amount.length && !amount.includes(null)
          && this.invoiceMeds.length === duration.length && !duration.includes(null)
          && this.invoiceMeds.length === dates.length && !dates.includes(null)
        ) {
          return false;
        }
      } else if (this.invoiceMeds.length === permanent.length && permanent.includes(true)) { // mixed permanent and !permanent
        if (
          this.invoiceMeds.length === amount.length
          && this.invoiceMeds.length === duration.length
          && this.invoiceMeds.length === dates.length
        ) {
          return false;
        }
      }
    } else if (!undefinedVariants) {
      return false;
    }
    return true;
  }

  // console.log('some medication !permanent')
  // console.log('permanent', permanent)
  // console.log('locations', locations)
  // console.log('amount', amount);
  // console.log('duration', duration);
  // console.log('dates', dates);

  // const arr = [];
  // this.invoiceMeds.map((value, index) => {
  //
  //   if (value.selectedVariant.permanent === false) { // not permanent
  //     // no pday || no startDate
  //     if (value.durationLength === null || value.startDate === null) {
  //     }
  //   } else { // permanent
  //
  //   }
  //     // arr.push(true);
  // });

  private validateVaccDates(): boolean {
    const dateStrings = [];
    this.question.values.answerOption[0]?.answerValue?.map((value, index) => {
      dateStrings.push(value.nextDate);
    });
    return dateStrings.includes(null);

  }

  private validWeight(num: number) {
    if (
      this.question?.values.answerOption[0].value == '*pet_weight*'
      || this.question?.values.answerOption[0].value == '*pet_idealweight*'
    ) {
      if (this.pet.pet.species.value === 'dog') {
        return (num > 0 && num < 121);
      } else if (this.pet.pet.species.value === 'cat') {
        return (num > 0 && num < 13);
      }
    }

    return num > 0;


  }

  get validateAnswer(): boolean {
    if (this.question?.values?.questionType.toLowerCase() === 'dose' && this.invoiceMeds) { // med question
      return this.validateMedAnswer();
    } else if (this.question?.values?.questionType.toLowerCase() === 'd') { // vaccination dates
      return this.validateVaccDates();
    } else if (
      this.question?.values?.questionType.toLowerCase() === 'i' ||
      this.question?.values?.questionType.toLowerCase() === 'find' ||
      this.question?.values?.questionType === 'Z_OPT'
    ) {
      return false;
    } else if (this.question?.values?.questionType.toLowerCase() === 'z') {
      return !this.validWeight(this.selectedNumber);
    } else if (this.question?.values?.questionType.toLowerCase() === 'ff' && this.showVetForm) {
      return !this.vetForm.valid;
    } else if (!this.selectedAnswer) {
      return true;
    }
  }

  get validateBackButton(): boolean {
    if (this.indexNr < 1) {
      return true;
    } else if (this.questions) {
      if (this.questions[this.indexNr - 1]?.values?.questionType === 'VI') {
        return true;
      }
    }
    return false;
  }

  private createInfoModalContent(index: number): void {
    this.infoContent = {
      headline: this.questions[index]?.values?.questionInfoHeadline || null,
      text: this.questions[index]?.values?.questionInfoText || null,
      type: this.questions[index]?.values?.questionType
    };
    console.log('this.infoContent', this.infoContent);
  }

  private async presentInfoModal(infoContent: any, image?: string) {
    const modal = await this.modalCtrl.create({
      component: QuestionInfoModalPage,
      componentProps: {
        content: infoContent,
        img: image || null
      }
    });
    return await modal.present();
  }

  ionViewWillLeave() {
    this.infoContent = undefined;
    this.currentDateSet = false;
    this.selectedAnswer = null;
    this.selectedNumber = null;
    this.uploadedFiles = null;
    this.vetKey = null;
    this.invoiceMeds = null;
    this.vaccDates = null;
    this.checkBoxValues = [];
    this.medPieceAmount = [];
    this.medPartAmount = [];
    this.dose = [];
    this.foodRations = [];
    this.beats = 0;
    this.activityVal = 0;
    this.rangeStateImg = null;
    this.rangeAnswer = null;
    this.questionProgressValue = 0;
    this.timeAmount = 0;
    this.singleDose = undefined;
    this.vaccination = undefined;
    this.addedFiles = null;
    this.isGif = false;

    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
    if (this.uploadSub) {
      this.uploadSub.unsubscribe();
    }
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
