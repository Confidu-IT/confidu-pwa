import { Component } from '@angular/core';
import { AuthService } from '../../user/auth.service';
import { CommonService } from '../../shared/services/common/common.service';
import { TicketService } from '../ticket-service/ticket-service';
import { TranslateService } from '@ngx-translate/core';
import {Subscription} from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import {ActivatedRoute, ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { CanDeactivateGuard } from '../can-deactivate-guard.service';

@Component({
  selector: 'app-ticket-result',
  templateUrl: './ticket-result.page.html',
  styleUrls: ['./ticket-result.page.scss'],
})
export class TicketResultPage implements CanDeactivateGuard {
  private subscription: Subscription;
  private iconPath = '../../../../assets/icons/tickets/result';
  private readonly routeSub: Subscription;
  private routerSub: Subscription;
  private confirmSub: Subscription;
  private params: any;
  private eventId: string;
  private petId: string;
  private language: string;
  private coins: string;
  routingDestination: string;

  public user: any;

  public isLoading: boolean;
  public result: any;
  public warningIcon: string;
  public okIcon: string;
  public pet: any;
  public eyeIcon = `${this.iconPath}/eye.svg`;
  public noResultImage = `${this.iconPath}/no_result.svg`;
  // public cartCheckIcon = `${this.iconPath}/product-check.svg`;
  public infoButton = `${this.iconPath}/info-button.svg`;

  public listOpen: any[];
  public isFoodCheck: boolean;

  constructor(
    public userAuth: AuthService,
    private commonService: CommonService,
    private ticketService: TicketService,
    private translateService: TranslateService,
    private activatedRoute: ActivatedRoute,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private router: Router
  ) {
    this.routeSub = this.activatedRoute.params
      .subscribe((params: any) => {
        this.params = params;
      });

    this.routerSub = this.router.events
      .subscribe((el: any) => {
        // console.log('el', el);
        this.routingDestination = el.url;
      })

  }

  ionViewWillEnter() {
    this.isLoading = true;

    this.language = this.commonService.language;
    this.translateService.use(this.language);
    this.translateService.get('TICKET_RESULT_PAGE')
      .subscribe(values => {
        console.log('values', values);
        this.coins = values.RECEIVED_COINS;
      });
    this.subscription = this.userAuth.user$.pipe(
      tap(user => user),
      switchMap(user => {
        this.user = user;
        return this.ticketService.answers;
      }),
      switchMap(answers => {
        this.petId = localStorage.getItem('activePet');

        // delete this
        // this.result = this.ticketService.blah;
        // console.log('this.result', this.result);
        // this.createChevrons();

        if (this.user && this.petId) {
          const id = this.params.id === 'null' ? null : this.params.id;
          return this.ticketService.getResult(
            this.user.uid,
            // this.user.refreshToken,
            this.user.za,
            this.petId,
            this.params.symptom,
            this.params.type,
            this.commonService.language,
            id,
            answers
          );
        } else {
          this.isLoading = false;
          this.router.navigateByUrl('/ticket/televet-pet');
        }
      })
    ).subscribe(data => {
      this.isFoodCheck = this.params.symptom === 'foodcheck' || this.params.symptom === 'foodplan';
      this.result = data;
      console.log('this.result', this.result);
      this.createChevrons();
      this.eventId = this.result.eventId;

      // Delete THIS
      // this.presentProductModal(this.result.products[0]);
      // this.presentInfoModal();
      this.isLoading = false;

    },
      (err: any) => {
        this.isLoading = false;
        this.commonService.handleResponseErrors(err.status);
        // this.userAuth.logOut();
      });
  }

  public isEmergency(): boolean {
    const emergencySymptoms = [
      'NOA', 'NOE', 'NOT', 'NOG', 'NOF', 'NOH', 'NOU', 'NOK', 'NOL', 'NOO', 'NOP', 'NOB', 'NOC', 'AUV', 'GES', 'VUL', 'UDE',
      'LAU', 'ROL', 'VUT', 'HOD', 'VAG', 'PSP', 'VTR', 'BAU', 'SSF', 'LAH', 'STE', 'STI', 'MUS', 'GSC', 'NBL', 'GO', 'NAS',
      'HOE', 'FIE', 'UNT', 'SEH', 'GRA', 'KOT', 'FRI', 'WEA', 'VEH', 'NIE'
    ];
    return emergencySymptoms.includes(this.params.symptom);
  }

  public onClickActionButton(el: any): void {
    if (!el) {
      return;
    }
    if (el.link === 'consultation') {
      this.router.navigateByUrl('consultation');
    } else if (el.link === 'fup') {
      this.router.navigateByUrl('follow-up-prescription');
    } else {
      console.log(`tickets/${el.event}/${el.key}/${el.label}/null/questions`)
      this.router.navigateByUrl(`tickets/${el.event}/${el.key}/${el.label}/null/questions`);
    }
  }

  public openIngredientsList(index) {
    this.listOpen[index].val = this.listOpen[index].val === false;
  }

  // private createChevrons() {
  //   if (this.result?.findings?.body?.param) {
  //     this.listOpen = [];
  //     const arr = this.result?.findings?.body?.param;
  //     arr.map((value, index) => {
  //       if (value.visibility && (value.body || value.list)) {
  //         let obj: any = {};
  //
  //         if (value.expandable) {
  //           obj.val = true;
  //         } else {
  //           obj.val = false;
  //         }
  //
  //         this.listOpen.push(obj);
  //       }
  //     });
  //   }
  //   console.log('this.listOpen', this.listOpen)
  // }

  private createChevrons() {
    if (this.result?.findings?.body?.param) {
      this.listOpen = [];
      const arr = this.result?.findings?.body?.param;
      arr.map((value, index) => {
        if (value.expandable) {
          if (value.body || value.list) {
            const obj = {
              val: false
            };
            this.listOpen.push(obj);
          }
        }
      });
    }
  }

  private createResultObj(type: string): void {
    const obj = {
      action: type,
      event: this.eventId,
      language: this.language,
      user: this.user.uid
    };
    localStorage.setItem('ticketResult', JSON.stringify(obj));
  }

  private coinsHandler() {
    if (!this.result.ticketCoins) {
      return;
    }
    this.commonService.presentToast(this.coins, 'primary');
  }

  canDeactivate(): Promise<boolean> | boolean {
    if (
      // this.routingDestination?.search('cart') > -1 ||
      this.routingDestination?.search('consultation') > -1 ||
      this.routingDestination?.search('follow-up-prescription') > -1
    ) {
      this.createResultObj('confirm');
    } else if (this.result && this.result.popup) {
      const data = this.result.popup;

      return new Promise(async resolve => {
        const [alert] = await Promise.all([this.alertCtrl.create({
          message: data.popupOptionText,
          cssClass: 'popup-alert',
          buttons: [
            {
              text: data?.buttonCancel?.label,
              role: 'cancel',
              cssClass: 'popup-cancel-button',
              handler: () => {
                this.createResultObj('cancel');
                resolve(true);
              }
            },
            {
              text: data?.buttonConfirm?.label,
              cssClass: 'popup-action-button',
              handler: () => {
              this.createResultObj('confirm');
                this.coinsHandler();
                resolve(true);
              }
            }
          ]
        })]);
        return await alert.present();
      });
    }
    return true;
  }

  ionViewWillLeave() {
    this.routingDestination = undefined;
    this.router.navigate([], {
      replaceUrl: true,
    });
    this.ticketService.setAnswers({});
    this.listOpen = [];
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.confirmSub) {
      this.confirmSub.unsubscribe();
    }
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
    if (this.routerSub) {
      this.routerSub.unsubscribe();
    }
  }

}
