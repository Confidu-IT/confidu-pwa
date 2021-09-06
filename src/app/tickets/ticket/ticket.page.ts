import { Component, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertController, IonSlides } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CommonService } from '../../shared/services/common/common.service';
import { FirebaseService } from '../../shared/services/firebase/firebase.service';
import { AuthService } from '../../user/auth.service';
import { switchMap, tap } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.page.html',
  styleUrls: ['./ticket.page.scss'],
})
export class TicketPage {
  private readonly routeSub: Subscription;
  private params: any;
  private species: string;
  private petId: string;
  private actions: any;
  private alert: any;
  private option: any;
  private offset = new Date().getTimezoneOffset();
  private subscription: Subscription;
  private pet: any;
  private closeTask: any;

  public user: any;
  public language: string;
  public ticket: any;
  public isLoading: boolean;
  public hasExecute: boolean;
  public hasGuide: boolean;
  public hasInfo: boolean;
  public radioChecked: any;
  public form: FormGroup;
  public weightForm: FormGroup;
  public listOpen = [];
  public linkList: any[];
  public showTaskForm = false;
  public currentDay: string;
  public eventTime: Date;
  public isGif = false;
  public confiImg = '../../assets/icons/tickets/confi.svg';
  public noCard: string;

  @ViewChild(IonSlides) slides: IonSlides;
  public pages: {
    image: string;
    title: string;
    text: string;
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private translateService: TranslateService,
    private commonService: CommonService,
    private firebaseService: FirebaseService,
    private userAuth: AuthService,
    private alertCtr: AlertController,
    private router: Router
  ) {
    this.routeSub = this.activatedRoute.params
      .subscribe(params => {
        this.params = params;
        // console.log('this.params', this.params);
      });

    this.form = new FormGroup({
      date: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      time: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
    });

    this.weightForm = new FormGroup({
      weight: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      })
    });
  }

  ionViewWillEnter(): void {
    this.isLoading = true;
    this.noCard = 'no-card';
    this.currentDay = new Date().toISOString();
    this.language = this.commonService.language;
    this.translateService.use(this.language);
    this.translateService.get('TICKET_PAGE')
      .subscribe(values => {
        this.closeTask = values.CLOSE_TASK;
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

    this.subscription = this.userAuth.user$.pipe(
      tap(user => user),
      switchMap(user => {
        this.user = user;
        this.petId = localStorage.getItem('activePet');
        if (!user || !this.petId) {
          this.isLoading = false;
          this.router.navigateByUrl('/');
        }
        return this.firebaseService.getPetById(user.uid, this.petId);
      })
    ).subscribe(pet => {
      this.pet = pet;
      this.species = pet.pet.species.value;
      if (this.params.ticketId && this.params.dateId) {
        this.getTicket(this.user.uid, this.petId, this.params.ticketId);
      } // else {
      //   this.router.navigateByUrl('/');
      // }
    });
  }

  public onCancelUpdate(): void {
    this.showTaskForm = false;
    this.form.reset();
  }

  public onPostPoneEvent(): void {
    if (!this.user || !this.petId) {
      return;
    }

    this.showTaskForm = true;
  }

  public onUpdateWeight(): void {
    this.pet.pet.currentWeight = this.weightForm.value.weight;
    this.firebaseService.updatePet(this.user.uid, this.petId, this.pet)
      .then(() => {
        this.commonService.presentToast('Eintrag erfolgreich', 'primary');
        this.weightForm.reset();
        this.closeEvent('accomplished');
      })
      .catch(error => this.commonService.presentToast('Eintrag fehlgeschlagen', 'danger'));
  }

  public postPoneEvent(): void {
    this.eventTime = new Date(Date.UTC(
      new Date(this.form.value.date).getFullYear(),
      new Date(this.form.value.date).getMonth(),
      new Date(this.form.value.date).getDate(),
      new Date(this.form.value.time).getHours(),
      new Date(this.form.value.time).getMinutes() + this.offset
    ));

    this.ticket.schedule.map(item => {
      if (this.params.dateId === item.id) {
        item.endTime = this.eventTime;
        item.startTime = this.eventTime;
      }
    });

    try {
      this.firebaseService.updateTicket(this.user.uid, this.petId, this.params.ticketId, this.ticket)
        .then(() => {
          this.form.reset();
          this.router.navigateByUrl('tickets');
        });
    } catch (e) {
      this.showTaskForm = false;

      this.form.reset();
      this.commonService.presentToast('Update fehlgeschlagen', 'danger');
    }
  }

  public onClickRadiobutton(event, item, option) {
    console.log('option', option)
    this.option = option;
    const popup = 'popupOption1';
    this.radioButtonAlert(event, item, option[popup]);
  }

  public openLinkContent(index) {
    this.linkList[index].showContent = this.linkList[index].showContent === false;
  }

  public onExecute(id: string, type: string, key: string, title: string) {
    if (this.ticket?.type === 'questionnaire' || this.ticket?.type === 'timer') {
      if (this.ticket?.ticketKey === 'foodplan') {
        this.router.navigateByUrl('ration-check');
      } else {
        console.log('url', `tickets/ticket/${key}/${title}/${id}/questions`)
        this.router.navigateByUrl(`tickets/ticket/${key}/${title}/${id}/questions`);
      }
    } else if (this.ticket?.type === 'redirect') {

    }

  }

  public goToCall(link: string) {
    console.log(link)
    window.open(link, 'blank');
  }

  public onDeleteEvent(): void {
    this.presentAlert(this.actions.delete.msg, this.actions.delete.btn, 'deleted');
  }

  public createDate(): number {
    if (!this.ticket?.schedule) {
      return;
    }

    for (const item of this.ticket?.schedule) {
      if (item.id === this.params.dateId) {
        return parseInt(item.endTime?.seconds) * 1000;
      }
    }
  }

  private checkForGIF(arr: any[]): any {
    for (const el of arr) {
      if (el?.image.indexOf('.gif')) {
        return this.isGif = true;
      }
    }
    return false;
  }

  private getTicket(userId: string, petId: string, ticketId: string): void {
    this.firebaseService.getTicketById(userId, petId, ticketId)
      .subscribe(data => {
        console.log('data', data);
        if (data) {
          this.ticket = data;
          if (data?.guide?.value) {
            this.checkForGIF(data.guide.value);
          }
          // console.log('this.ticket', this.ticket);
          this.createLinkList(data.links);
          this.isLoading = false;
        } else {
          this.isLoading = false;
          // this.router.navigateByUrl('/');
        }
      });
  }

  private createLinkList(links: any[]): void {
    if (!links) {
      return;
    }
    this.linkList = [];
    for (const link of links) {
      if (link.label === 'Durchführen') {
        this.hasExecute = true;
      }
      if (link.label !== 'Durchführen') {
        link.showContent = false;
        this.linkList.push(link);
      }
    }
    console.log('this.linkList', this.linkList);
  }

  async radioButtonAlert(event: any, item: any, option: any) {
    this.alert = await this.alertCtr.create({
      message: option?.popupOptionText || this.closeTask.POPUP.TEXT,
      buttons: [
        {
          text: option?.button[0]?.label || this.closeTask.POPUP.BUTTON.CANCEL.LABEL,
          role: 'cancel',
          cssClass: 'ticket-cancel-button',
          handler: () => event.target.checked = false
        }, {
          text: option?.button[1]?.label || this.closeTask.POPUP.BUTTON.CONFIRM.LABEL,
          cssClass: 'ticket-action-button',
          handler: () => {
            event.target.checked = false;
            const action = option?.button[1]?.action || this.closeTask.POPUP.BUTTON.CONFIRM.ACTION;
            console.log('action', action);
            if (action === 'save') {
              this.closeEvent('accomplished');
            } else if (action === 'save2') {
              this.closeEvent('accomplished');
              this.openRadioAlert2(item);
            } else if (action === 'consultation') {
              // this.router.navigateByUrl('/ticket/televet-pet');
              this.router.navigateByUrl('/consultation');
            } else if (action === 'share') {

            }
          }
        }
      ]
    });
    await this.alert.present();
  }

  private closeEvent(action: string): void {
    const status = [];
    this.ticket.schedule.map(item => {

      if (this.params.dateId === item.id) {
        item.status = action;
      }
      status.push(item.status);
    });

    if (status.includes('open')) { // open schedule in ticket
      try {
        this.firebaseService.updateTicket(this.user.uid, this.petId, this.params.ticketId, this.ticket)
          .then(resp => {
            this.commonService.presentToast('Aktion erfolgreich', 'primary');
            this.router.navigateByUrl('tickets');
          });
      } catch (e) {
        this.commonService.presentToast('Aktion fehlgeschlagen', 'danger');
      }
    } else { // no open schedule left
      try {
        this.moveTicket(this.user.uid, this.petId, this.params.ticketId, this.ticket)
          .then(resp => {
            this.router.navigateByUrl('tickets');
          });
      } catch (e) {
        this.commonService.presentToast('Aktion fehlgeschlagen', 'danger');
      }
    }
  }

  private async moveTicket(userId: string, petId: string, ticketId: string, ticket: string): Promise<any> {
    await this.firebaseService.deleteTicket(userId, petId, ticketId);
    return await this.firebaseService.shelveTicket(userId, petId, ticket);
  }

  private openRadioAlert2(item) {
    const popup = 'popupOption2';
    this.radioButtonAlert(event, item, this.option[popup]);
  }

  async presentAlert(msg: string, btn: string, action: string) {
    this.alert = await this.alertCtr.create({
      message: msg,
      buttons: [
        {
          text: 'Abbrechen',
          role: 'cancel',
          cssClass: 'ticket-cancel-button',
        }, {
          text: btn,
          cssClass: 'ticket-action-button',
          handler: () => {
            this.closeEvent(action);
          }
        }
      ]
    });
    await this.alert.present();
  }

  ionViewWillLeave() {
    this.linkList = [];
    this.listOpen = [];
    this.showTaskForm = false;
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
