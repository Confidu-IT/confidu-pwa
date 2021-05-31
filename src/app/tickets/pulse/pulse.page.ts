import { Component, ElementRef, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CommonService } from '../../shared/services/common/common.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../user/auth.service';
import { tap } from 'rxjs/operators';
import { FirebaseService } from '../../shared/services/firebase/firebase.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketService } from '../ticket-service/ticket-service';

@Component({
  selector: 'app-pulse',
  templateUrl: './pulse.page.html',
  styleUrls: ['./pulse.page.scss'],
})
export class PulsePage {
  private language: string;
  private subscription: Subscription;
  private readonly routeSub: Subscription;
  private user: any;
  private pet: any;
  private answers = [];
  private interval: any;
  private params: any;
  private heartImg = '../../assets/icons/pulse/heart.svg';
  private switchHeartImg = '../../assets/icons/pulse/heart_3.gif';
  private breatheImg = '../../assets/icons/pulse/breathe.svg';
  private switchBreatheImg = '../../assets/icons/pulse/breathe_3.gif';

  public beatsImg: string;
  public switchBeatsImg: string;
  public petsImg = '../../assets/icons/pulse/result.png';
  public showIntro = true;
  public showTimer = false;
  public getResult = false;
  public showQuestion = false;
  public beats = 0;
  public isLoading = true;
  public question: string;
  public introText: string;
  public timerText: string;
  public title: string;
  public selectedAnswer: any;
  public questionImg = 'https://firebasestorage.googleapis.com/v0/b/confidu-app.appspot.com/o/televet_icons_new%2Fgewicht_dog_cat_pp.svg?alt=media&token=a6e116d7-ca48-4914-ac02-bc967ac61809';

  @ViewChild('countdown') countdown: ElementRef;
  @ViewChild('img') img: ElementRef;

  constructor(
    private translateService: TranslateService,
    private commonService: CommonService,
    private userAuth: AuthService,
    private firebaseService: FirebaseService,
    private activatedRoute: ActivatedRoute,
    private ticketService: TicketService,
    private router: Router
  ) {
    this.routeSub = this.activatedRoute.params
      .subscribe((params: any) => {
        this.params = params;
      });
  }

  ionViewWillEnter() {
    this.language = this.commonService.language;
    this.translateService.setDefaultLang(this.language); // fallback
    this.translateService.use(this.translateService.getBrowserLang());
    this.translateService.get('PULSE_PAGE')
      .subscribe(values => {
       this.question = values.WEIGHT_QUESTION;
       if (this.params.symptom === 'breathe') {
         this.introText = values.INTRO.TEXT.BREATHE;
         this.timerText = values.TIMER.TEXT.BREATHE;
         this.title = values.TITLE.BREATHE;
         this.beatsImg = this.breatheImg;
         this.switchBeatsImg = this.switchBreatheImg;
       } else if (this.params.symptom === 'pulse') {
         this.introText = values.INTRO.TEXT.PULSE;
         this.timerText = values.TIMER.TEXT.PULSE;
         this.title = values.TITLE.PULSE;
         this.beatsImg = this.heartImg;
         this.switchBeatsImg = this.switchHeartImg;
       }
      });

    this.subscription = this.userAuth.user$.pipe(
      tap(user => user),
    ).subscribe(user => {
      const petId = localStorage.getItem('activePet');
      if (user && petId) {
        this.user = user;
        return this.getPet(user.uid, petId);
      } else {
        this.router.navigateByUrl('url');
      }
    });

  }

  public closeIntro(): void {
    this.showIntro = false;
    this.showTimer = true;
    this.interval = setInterval(() => {
      this.startTimer();
    }, 300);
  }



  public startTimer(): void {
    clearInterval(this.interval);
    let countdown = 10;
    this.countdown.nativeElement.textContent = countdown.toString();
    const timer = setInterval(() => {
      if (--countdown >= 0) {
        this.countdown.nativeElement.textContent = countdown.toString();
      } else {
        const answer = {
          questionType: 'VI',
          name: 'VITAL',
          values: {
            answer: {
              value: 'xxx',
              answerValue: this.beats
            }
          }
        };
        this.answers.push(answer);
        this.showTimer = false;
        this.showQuestion = true;
        clearInterval(timer);
      }
    }, 1000);
  }

  public onCollectBeats(): void {
    this.beats = this.beats + 1;
    this.img.nativeElement.src = this.switchBeatsImg;
  }

  public closeQuestion() {
    this.showQuestion = false;
    this.getResult = true;
    const weight = {
      questionType: 'Z',
      name: 'SHA_Q19',
      values: {
        answer: {
          value: 'xxx',
          answerValue: this.selectedAnswer
        }
      }
    };
    this.answers.push(weight);
  }

  public onProgress(): void {
    let answers = [];
    for (const [key, value] of Object.entries(this.answers)) {
      answers.push(value);
    }
    this.ticketService.setAnswers(answers);
    answers = null;
    const id = this.params.id || null;

    // v+pulse_freq
    // v+breathe_freq
    this.router.navigateByUrl(`tickets/ticket/v+${this.params.symptom}_freq/${id}/result`);
  }

  private getPet(userId: string, petId): void {
    this.firebaseService.getPetById(userId, petId)
      .subscribe(pet => {
        if (pet) {
          this.pet = pet;
          this.isLoading = false;
          const str = this.question;
          this.question = str.replace('FOO', this.pet.pet.name);
        }
      });
  }

  ionViewWillLeave() {
    this.answers = [];
    this.beats = 0;
    this.isLoading = false;
    this.showQuestion = false;
    this.showIntro = true;
    this.showTimer = false;
    this.getResult = false;
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }
}
