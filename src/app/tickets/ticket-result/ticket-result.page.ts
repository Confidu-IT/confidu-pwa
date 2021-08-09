import { Component } from '@angular/core';
import { AuthService } from '../../user/auth.service';
import { CommonService } from '../../shared/services/common/common.service';
import { TicketService } from '../ticket-service/ticket-service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
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
  private params: any;
  private eventId: string;
  private petId: string;
  private language: string;

  public user: any;

  public isLoading: boolean;
  public result: any;
  public warningIcon: string;
  public okIcon: string;
  public pet: any;
  public eyeIcon = `${this.iconPath}/eye.svg`;
  public cartCheckIcon = `${this.iconPath}/product-check.svg`;
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
  }

  ionViewWillEnter() {
    this.isLoading = true;

    this.language = this.commonService.language;
    this.translateService.use(this.language);
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
      this.isFoodCheck = this.params.symptom === 'foodcheck';
      this.result = data;
      this.createChevrons();
      console.log('data', data);

      this.eventId = this.result.eventId;

      // Delete THIS
      // this.presentProductModal(this.result.products[0]);
      // this.presentInfoModal();
      this.isLoading = false;

    },
      (err: any) => {
        this.isLoading = false;
        this.commonService.handleShopErrors(err.status);
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
      this.router.navigateByUrl(`tickets/${el.event}/${el.key}/null/null/questions`);
    }
  }

  public openIngredientsList(index) {
    this.listOpen[index].val = this.listOpen[index].val === false;
  }

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

  canDeactivate(): Promise<boolean> | boolean {
    if (this.result && this.result.popup) {
      const data = this.result.popup;
      return new Promise(async resolve => {
        const [alert] = await Promise.all([this.alertCtrl.create({
          message: data.popupOptionText,
          cssClass: 'popup-alert',
          buttons: [
            {
              text: data.buttonCancel.label,
              role: 'cancel',
              cssClass: 'popup-cancel-button',
              handler: () => {
                this.ticketService.confirmSave(
                  this.eventId, 'cancel',
                  this.petId,
                  this.user.uid, this.user.za,
                  this.commonService.language
                ).subscribe( () => {
                });
                resolve(true);
              }
            }, {
              text: data.buttonConfirm.label,
              cssClass: 'popup-action-button',
              handler: () => {
                this.ticketService.confirmSave(
                  this.eventId, 'confirm',
                  this.petId,
                  this.user.uid, this.user.za,
                  this.commonService.language
                ).subscribe( () => {

                });
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
    this.ticketService.setAnswers({});
    this.listOpen = [];
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

}
