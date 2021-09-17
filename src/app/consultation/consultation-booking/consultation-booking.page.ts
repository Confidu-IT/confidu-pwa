import { Component } from '@angular/core';
import { ShopwareService } from '../../shared/services/shopware/shopware.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CommonService } from '../../shared/services/common/common.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../user/auth.service';
import { switchMap, tap } from 'rxjs/operators';
import { FirebaseService } from '../../shared/services/firebase/firebase.service';

@Component({
  selector: 'app-consultation-booking',
  templateUrl: './consultation-booking.page.html',
  styleUrls: ['./consultation-booking.page.scss'],
})
export class ConsultationBookingPage {
  public isLoading: boolean;
  public user: any;
  public careCard: any;
  public agb: any;
  public appointmentText: string;
  public uploadPath: string;
  public pet: any;
  // change this
  public privacyLink = `https://firebasestorage.googleapis.com/v0/b/confidu-app.appspot.com/o/pdf%2Famoxitab_dog_cat_50mg_pil_de.pdf?alt=media&token=80f09b0f-871b-425f-9f7a-2260b499d8ff`;
  public conditionsLink = `https://firebasestorage.googleapis.com/v0/b/confidu-app.appspot.com/o/pdf%2Famoxitab_dog_cat_50mg_pil_de.pdf?alt=media&token=80f09b0f-871b-425f-9f7a-2260b499d8ff`;
  public get isChecked(): boolean {
    return this.careCard;
  }

  private subscription: Subscription;
  private readonly routeSub: Subscription;
  private params: any;
  private addedFiles: string[];
  private language: string;

  constructor(
    private userAuth: AuthService,
    private shopwareService: ShopwareService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private translateService: TranslateService,
    private firebaseService: FirebaseService,
    private commonService: CommonService
  ) {
    this.routeSub = this.activatedRoute.params
      .subscribe(params => {
        this.params = params;
        this.uploadPath = `appointments/${this.params.id}`;
      });
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.language = this.commonService.language;
    this.translateService.use(this.language);
    this.subscription = this.userAuth.user$.pipe(
      tap(user => user),
      switchMap(user => {
        const petId = localStorage.getItem('activePet');
        if (!user || !petId) {
          return this.router.navigateByUrl('/');
        }
        this.user = user;
        return this.firebaseService.getPetById(this.user.uid, petId);
      })
    ).subscribe(pet => {
      this.pet = pet;
      this.isLoading = false;
    });
  }

  public onProgress(): void {
    const petId = localStorage.getItem('activePet');
    let files;
    const annotations = this.appointmentText || null;

    if (!petId && !this.user.uid) {
      return;
    }

    if (this.addedFiles?.length > 0) {
      files = [];

      for (const file of this.addedFiles) {
        const str = `appointments/${this.params.id}/${file}`;
        files.push(str);
      }
    } else {
      files = null;
    }

    if (this.appointmentText || this.addedFiles) {
      this.commonService.addAttachmentsToAppointment(
        this.user.za,
        this.params.id,
        this.user.uid,
        petId,
        annotations,
        files
      ).subscribe(response => {
        console.log('response', response);
        this.progressBooking();
      });
    } else {
      this.progressBooking();
    }
  }

  public receiveAddedFiles(event) {
    this.addedFiles = event;
  }

  private progressBooking(): void {
    this.shopwareService.headers['firebase-context-token'] = this.user.za;
    this.shopwareService.getProfile()
      .then(response => {
        if (response.errors?.length > 0) {
          this.commonService.handleResponseErrors(response.errors[0].status);
        } else {
          let route;
          if (!response.defaultBillingAddress) {
            route = '/shop/address/rechnungsadresse';
          }
          if (!route) {
            route = '/shop/order';
          }
          this.router.navigateByUrl(route);
        }
      });
  }

  ionViewWillLeave() {
    this.addedFiles = null;
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }
}
