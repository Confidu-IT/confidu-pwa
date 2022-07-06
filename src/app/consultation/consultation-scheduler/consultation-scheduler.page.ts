import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../user/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CommonService } from '../../shared/services/common/common.service';
import { switchMap, tap } from 'rxjs/operators';
import { FirebaseService } from '../../shared/services/firebase/firebase.service';
import { ShopwareService } from '../../shared/services/shopware/shopware.service';
import {LoadingController, ModalController} from '@ionic/angular';
import { ConsultationModalPage } from '../consultation-modal/consultation-modal.page';

@Component({
  selector: 'app-consultation-scheduler',
  templateUrl: './consultation-scheduler.page.html',
  styleUrls: ['./consultation-scheduler.page.scss'],
})
export class ConsultationSchedulerPage {
  private subscription: Subscription;
  private readonly routeSub: Subscription;
  private params: any;
  private language: string;
  private petId: string;
  private appointmentTypeID: string;
  private bookDate: string;
  private wait: string;

  public user: any;
  public pet: any;
  public isLoading: boolean;
  public dateLists: any;
  public today: any;
  public tomorrow: any;
  public dayAfterTomorrow: any;
  public selectedDate: string;
  public activeList: string;
  public nextAvTime: any;
  public selectedAvTime: any;
  public invalid = false;

  constructor(
    private userAuth: AuthService,
    private router: Router,
    private translateService: TranslateService,
    private commonService: CommonService,
    private modalCtrl: ModalController,
    private activatedRoute: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private firebaseService: FirebaseService,
    private shopwareService: ShopwareService
  ) {
    this.routeSub = this.activatedRoute.params
      .subscribe((params: any) => {
        this.params = params;
      });
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.language = this.commonService.language;
    this.translateService.setDefaultLang(this.language); // fallback
    this.translateService.use(this.translateService.getBrowserLang());
    this.translateService.get('CONSULTATION_SCHEDULER_PAGE')
      .subscribe( values => {
        this.wait = values.WAIT;
      });
    this.subscription = this.userAuth.user$.pipe(
      tap(user => user),
      switchMap(user => {
        this.petId = localStorage.getItem('activePet');
        if (user && this.petId) {
        this.user = user;
        return this.firebaseService.getPetById(user.uid, this.petId);
        } else {
        this.router.navigateByUrl('consultation');
        }
      }),
      switchMap(pet => {
        this.pet = pet;
        console.log('pet', this.pet);
        return this.commonService.getAvailableAppointments(this.user.za, this.params.id);
      })
    ).subscribe( response => {
      console.log('response', response);
      this.appointmentTypeID = response.appointmentTypeID;
      this.nextAvTime = response.nextAvailableTime;
      this.dateLists = [
        { name: 'today', val: response.today},
        { name: 'tomorrow', val: response.tomorrow },
        { name: 'dayAfterTomorrow', val: response.dayAfterTomorrow }
      ];
      console.log('this.dateLists', this.dateLists);
      this.isLoading = false;
    });
  }

  public onSelectDate(index, selectedList): void {
    this.resetSelectedItem(this.activeList);
    this.activeList = selectedList;

    for (const list of this.dateLists) {
      if (list.name === selectedList) {
        list.val[index].active = true;
        this.selectedDate = list.val[index].time;
        // console.log('this.selectedDate', this.selectedDate);
        break;
      }
    }
  }

  public onBook(): void {
    this.invalid = true;
    this.bookDate = !this.selectedDate ? this.nextAvTime.time : this.selectedDate;
    // this.shopwareService.headers['firebase-context-token'] = this.user.za;
    this.shopwareService.getProfile()
      .then(response => {
        console.log('response', response);
        if (
          (response?.firstName.length < 2) ||
          (response?.lastName.length < 2) ||
          (!response?.customFields?.custom_customers_tel)
        ) {
          this.presentModal();
          this.invalid = false;
        } else {
          this.progressBooking();
        }
      });
  }

  private resetSelectedItem(selectedList: string): void {
    if (!this.dateLists || !selectedList) {
      return;
    }
    for (const list of this.dateLists) {
      if (list.name === selectedList) {
        for (const item of list.val) {
          delete item.active;
        }
      }
    }
  }

  private updateAccount(data: any): void {
    // this.shopwareService.headers['firebase-context-token'] = this.user.za;
    this.shopwareService.updateSWUser(data)
      .then(response => {
        console.log('response', response);
        if (response?.errors) {
          this.commonService.presentToast(response.errors[0].detail, 'danger');
        } else {
          this.progressBooking();
        }
      });
  }

  private progressBooking(): void {
    this.presentLoading();

    this.commonService.bookAppointment(
      this.user.za,
      this.appointmentTypeID,
      this.bookDate,
      this.petId
    ).subscribe(response => {
      console.log('response', response);
      this.loadingCtrl.dismiss();
      this.resetSelectedItem(this.activeList);
      this.selectedDate = null;
      this.bookDate = null;
      this.router.navigateByUrl(`consultation-booking/${response.id}`);
    });


  }

  private async presentLoading() {
    const loading = await this.loadingCtrl.create({
      message: this.wait
    });
    return await loading.present();
  }

  private async presentModal() {
    const modal = await this.modalCtrl.create({
      component: ConsultationModalPage
    });
    modal.onDidDismiss()
      .then((response: any) => {
        if (response.data) {
          const obj: any = {
            firstName: response.data.value.firstName,
            lastName: response.data.value.lastName,
          };

          if (response.data.value.phone) {
            obj.tel = String(response.data.value.phone);
          }
          this.updateAccount(obj);
        }
      });
    return await modal.present();
  }


  ionViewWillLeave() {
    this.loadingCtrl.dismiss();
    this.invalid = false;
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }
}
