import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FirebaseService} from '../shared/services/firebase/firebase.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {AuthService} from '../user/auth.service';
import {CommonService} from '../shared/services/common/common.service';
import {AlertController} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';
import {AngularFireStorage} from '@angular/fire/storage';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.page.html',
  styleUrls: ['./tickets.page.scss'],
})
export class TicketsPage implements OnInit {
  public date: any;
  public time: any;
  public radioChecked: any;
  public user: any;
  public checkboxChecked: boolean;
  public eventSource: any;
  public language: string;
  public species: string;
  public action: string;
  public viewTitle: string;
  public form: FormGroup;
  public weightForm: FormGroup;
  public petImage: string;
  public petName: string;
  public isLoading = true;
  public showTaskForm = false;
  public currentDay: string;
  public imagePath = '../../assets/icons/tickets';
  public calendar: any;
  public confiTicketImg = '../../assets/icons/tickets/conficoins_small_ticket.svg';
  public heartImg = '../../assets/icons/tickets/heart.svg';
  public coins: any;

  @ViewChild('filePicker') filePickerRef: ElementRef<HTMLInputElement>;

  private isToday: boolean;
  private petId: string;
  private events = [];
  private subscription: Subscription;
  private selectedDate: Date;
  private actions: any;
  private alert: any;
  private offset = new Date().getTimezoneOffset();
  private tickets: any[];
  private currentEvent: any;
  private pet: any;

  constructor(
    private firebaseService: FirebaseService,
    private storage: AngularFireStorage,
    private router: Router,
    private commonService: CommonService,
    private alertCtr: AlertController,
    public userAuth: AuthService,
    private translateService: TranslateService
  ) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      date: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      time: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      text: new FormControl(null, {
        updateOn: 'change'
      }),
    });

    this.weightForm = new FormGroup({
      weight: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      })
    });
  }

  ionViewWillEnter() {
    this.currentDay = new Date().toISOString();
    this.language = this.commonService.language;
    this.translateService.use(this.language);

    let local;

    // ToDo Change this
    if (this.language === 'de') {
      local = 'de-DE';
    } else if (this.language === 'en') {
      local = 'en-EN';
    } else if (this.language === 'dk') {
      local = 'dk-DK';
    } else {
      local = 'de-DE';
    }

    this.calendar = {
      mode: 'month',
      locale: local,
      currentDate: new Date()
    };

    this.translateService.get('TICKETS_PAGE')
      .subscribe(values => {
        console.log('values', values);
        this.actions = {
          close: {
            msg: values.ACTIONS.CLOSE.MSG,
            btn: values.ACTIONS.CLOSE.BTN,
            handler: 'close'
          },
          delete: {
            msg: values.ACTIONS.DELETE.MSG,
            btn: values.ACTIONS.DELETE.BTN,
            handler: 'close'
          }
        };
      });

    if (this.alert) {
      this.alert.dismiss();
    }

    this.action = 'create';
    this.selectedDate = new Date();
    this.petId = localStorage.getItem('activePet');
    this.subscription = this.userAuth.user$
      .subscribe(user => {
        this.user = user;
        // console.log('user', user);
        if (!user || !this.petId) {
          this.router.navigateByUrl('/');
        } else {
          try {
            this.getPet(user.uid, this.petId);
            this.getTickets(user.uid, this.petId);
            this.getCoins(user.uid);
            // this.createTicket(this.user.uid, '1448', this.petId, 'earcare', this.language)
          } catch (e) {
          }
        }
      });
  }

  public onViewTitleChanged(title: string): void {
    this.viewTitle = title;
  }

  public onCurrentDateChanged(event: any) {
    console.log('event', event)
    this.selectedDate = event;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    event.setHours(0, 0, 0, 0);
    this.isToday = today.getTime() === event.getTime();
    console.log('today.getTime()', today.getTime())
    console.log('event.getTime()', event.getTime())

    this.getTodayEventsAmount();

  }

  public switchMonth(prefix: string): Date {
    let month;
    let year;
    const currentMonth = Number(this.calendar.currentDate.getMonth());
    const currentYear = Number(this.calendar.currentDate.getFullYear());
    const day = Number(this.calendar.currentDate.getDate());

    if (currentMonth === 0) {
      month = prefix === '+' ? 1 : 11;
      year = prefix === '+' ? currentYear : currentYear - 1;
    } else if (currentMonth === 11) {
      month = prefix === '+' ? 0 : currentMonth - 1;
      year = prefix === '+' ? currentYear + 1 : currentYear;
    } else {
      month = prefix === '+' ? currentMonth + 1 : currentMonth - 1;
      year = currentYear;
    }

    return this.calendar.currentDate = new Date(Date.UTC(year, month, day));
  }

  public onCreateTicket(): void {
    let ticket: any;
    const events = [];
    const eventTime = new Date(Date.UTC(
      new Date(this.form.value.date).getFullYear(),
      new Date(this.form.value.date).getMonth(),
      new Date(this.form.value.date).getDate(),
      new Date(this.form.value.time).getHours(),
      new Date(this.form.value.time).getMinutes() + this.offset
    ));

    const uid = this.commonService.createUID();

    const event = {
      startTime: eventTime,
      endTime: eventTime,
      id: uid,
      status: 'open'
    };

    events.push(event);
    ticket = {
      backgroundImageLink1: `${this.imagePath}/standard_1.png`,
      backgroundImageLink2: `${this.imagePath}/standard_2.png`,
      backgroundImageLink3: `${this.imagePath}/standard_3.png`,
      title: this.form.value.title,
      text: this.form.value.text,
      type: 'common',
      schedule: events
    };

    if (this.user && this.petId) {
      try {
        this.firebaseService.createTicket(this.user.uid, this.petId, ticket)
          .then(() => {
            this.getTickets(this.user.uid, this.petId);
            this.commonService.presentToast('Eintrag erfolgreich', 'primary');
          });
      } catch (e) {
        this.commonService.presentToast('Eintrag fehlgeschlagen', 'danger');
      }
    } else {
      this.commonService.presentToast('Eintrag fehlgeschlagen', 'danger');
    }

    this.form.reset();
    this.showTaskForm = false;
  }

  public toggleTaskForm(): void {
    if (!this.showTaskForm) {
      this.showTaskForm = true;
    } else {
      this.showTaskForm = false;
    }
  }

  public onClickLink(id: string, type: string, url: string, key: string, title: string): Promise<boolean> {
    if (url === 'guide' || url === 'info' || url === 'order') {
      return this.router.navigateByUrl(`tickets/ticket/${id}/${url}`);
    } else {
      return this.router.navigateByUrl(`tickets/ticket/${key}/${title}/${id}/questions`);
    }
  }

  public isCurrentDate(date): boolean {
    return date.getDate() === this.selectedDate.getDate() &&
      date.getMonth() === this.selectedDate.getMonth() &&
      date.getFullYear() === this.selectedDate.getFullYear();
  }

  public getTodayEventsAmount(): number {
    const todayEvents = [];
    for (const item of this.eventSource) {
      if (String(item.startTime) === String (this.selectedDate)) {
        todayEvents.push(item);
      }
    }
    return todayEvents.length;
  }

  public onCancelUpdate(): void {
    this.action = 'create';
    this.showTaskForm = false;
    this.form.reset();
  }

  public isOverdue(date: string): boolean {
    return Date.parse(date) + 60000 < Date.now();
  }

  public onClickTicket(id: string, date: string): Promise<any> {
    return this.router.navigateByUrl(`ticket/${id}/${date}`);
  }

  ionViewWillLeave() {
    this.eventSource = null;
    this.tickets = null;
    this.currentEvent = null;
    this.checkboxChecked = false;
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private getPet(userId: string, petId: string): void {
    this.firebaseService.getPetById(userId, petId)
      .subscribe(pet => {
        if (pet) {
          this.pet = pet.pet;
          this.petName = pet.pet.name;
          this.petImage = pet.pet.image;
          this.species = pet.pet.species.value;
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

  private getTickets(userId: string, petId: string): void {
    this.firebaseService.getTicketsByPet(userId, petId)
      .subscribe(data => {
        // console.log('data', data);
        if (data) {
          this.events = [];
          const tickets = [];
          this.tickets = data;

          data.map(ticket => {
            ticket.schedule.map(schedule => {
              if (schedule.status === 'open') {
                const obj: any = {};
                obj.dateId = schedule.id;
                obj.endTime = schedule.endTime;
                obj.startTime = schedule.startTime;
                obj.data = ticket;
                // delete obj.data.schedule;
                tickets.push(obj);
              }
            });
          });
          // console.log('tickets', tickets);
          this.createEvents(tickets);
        }
        this.isLoading = false;
      });
  }

  private createEvents(tickets: any[]) {
    // tickets.push(this.dummyTicket);
    if (tickets.length < 1) {
      this.eventSource = [];
      return;
    }

    let event: any = {};
    let start;
    let end;

    tickets.map(ticket => {
      // console.log('!!!!', ticket);
      const data = ticket.data;
      event = {};
      start = new Date(ticket.startTime.seconds * 1000);
      end = new Date(ticket.endTime.seconds * 1000);
      event.dateId = ticket.dateId;
      event = {
        data,
        dateId: ticket.dateId,
        startTime: new Date(Date.UTC(
          start.getFullYear(),
          start.getMonth(),
          start.getDate(),
          start.getHours(),
          start.getMinutes() + this.offset
        )),
        endTime: new Date(Date.UTC(
          end.getFullYear(),
          end.getMonth(),
          end.getDate(),
          end.getHours(),
          end.getMinutes() + this.offset
        ))
      };
      this.events.push(event);

      start = null;
      end = null;
    });
    this.eventSource = this.events;
    console.log('this.eventSource', this.eventSource);

  }

}
