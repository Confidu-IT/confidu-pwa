import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { ToolbarModalPage } from '../toolbar-modal/toolbar-modal.page';
import { ModalController } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { FirebaseService } from '../../services/firebase/firebase.service';
import { CommonService } from '../../services/common/common.service';
import { AuthService } from '../../../user/auth.service';
import { QrScannerModalPage } from '../../qr-scanner-modal/qr-scanner-modal.page';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-toolbar-footer',
  templateUrl: './toolbar-footer.component.html',
  styleUrls: ['./toolbar-footer.component.scss'],
})
export class ToolbarFooterComponent implements OnInit, OnDestroy {
  private snoutIcon = '../../assets/icons/toolbar-footer/notifications_disabled.svg';
  private pageIcon = '../../assets/icons/toolbar-footer/carecard_disabled.svg';
  private homeIcon = '../../assets/icons/toolbar-footer/home_disabled.svg';

  private activeSnoutIcon = '../../assets/icons/toolbar-footer/notifications_active.svg';
  private activePageIcon = '../../assets/icons/toolbar-footer/carecard_active.svg';
  private activeHomeIcon = '../../assets/icons/toolbar-footer/home_active.svg';

  public camImg = '../../assets/icons/toolbar-footer/cam.svg';
  public snoutImg: string;
  public pageImg: string;
  public homeImg: string;

  public usePicker = false;
  public isLoading: boolean;
  public successText: string;
  public validated: boolean;
  public regNr: string;

  @Input() user: any;
  @ViewChild('filePicker') filePickerRef: ElementRef<HTMLInputElement>;

  private subscription: Subscription;
  private notificationsSubscription: Subscription;
  private action: string;
  private invalidCode: string;
  private usedCode: string;
  private assignment: any;
  private regSuccess: string;
  private readonly language: string;

  get isHomePage() {
    return this.router.url.indexOf('home') > -1;
  }
  get isCarecardPage() {
    return this.router.url.indexOf('pet-care-card') > -1;
  }
  get isNotificationPage() {
    return this.router.url.indexOf('notifications-list') > -1;
  }

  constructor(
    private router: Router,
    private modalCtrl: ModalController,
    private commonService: CommonService,
    private firebaseService: FirebaseService,
    private storage: AngularFireStorage,
    private translateService: TranslateService,
    public userAuth: AuthService,
    private http: HttpClient
  ) {
    this.language = commonService.language;
    translateService.use(this.language);
    this.translateService.get('REGISTER_CODE')
      .subscribe(values => {
        this.invalidCode = values.INVALID_CODE;
        this.usedCode = values.USED_CODE;
        this.assignment = values.ASSIGNMENT;
        this.regSuccess = values.REG_SUCCESS;
      });
  }

  ngOnInit(): void {
    this.homeImg = this.isHomePage ? this.activeHomeIcon : this.homeIcon;
    this.pageImg = this.isCarecardPage ? this.activePageIcon : this.pageIcon;
    this.snoutImg = this.isNotificationPage ? this.activeSnoutIcon : this.snoutIcon;

    if (this.user) {
      this.checkForNotifications();
    }

  }

  public goToNotifications() {
    this.router.navigateByUrl(`user/notifications-list`);
  }

  public goToCareCard(): void {
    if (!localStorage.getItem('activePet')) {
      return;
    }
    this.router.navigateByUrl(`pets/pet-care-card/${localStorage.getItem('activePet')}`);
  }

  public handleImage(): void {
    if (!localStorage.getItem('activePet')) {
      return;
    }
    this.presentModal();
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
      'firebase-context-token': this.user.za,
      'sw-context-token': localStorage.getItem('sw-token')
    };

    const reader = new FileReader();

    if (!isTypeFile) {
      reader.readAsDataURL(this.commonService.dataURItoBlob(file));
    } else {
      reader.readAsDataURL(file);
    }

    if (this.action === 'profile') {
      reader.onload = (success) => {
        let result = reader.result;
        const url = `${environment.baseUrl}/${this.language}/label_detection`;

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
              this.updatePetImage(res.image);
            });
        }
      };
    } else if (this.action === 'invoice') {
      reader.onload = (success) => {
        let result = reader.result;
        const url = `${environment.baseUrl}/${this.language}/invoice/data-extraction`;

        if (typeof result === 'string') {
          if (result.indexOf('image/jpeg;base64') > -1) {
            result = result.replace('data:image/jpeg;base64,', '');
          } else if (result.indexOf('image/png;base64') > -1) {
            result = result.replace('data:image/png;base64,', '');
          }

          const body = {
            base64: [result],
            petId: localStorage.getItem('activePet'),
            uid: this.user.uid
          };

          this.http.post(url, body, { headers })
            .subscribe((res: any) => {
              // console.log('res', res);
            });
        }
      };

    }
  }

  public async presentModal() {
    const modal = await this.modalCtrl.create({
      component: ToolbarModalPage
    });
    modal.onDidDismiss()
      .then((response: any) => {
        if (response.data) {

          this.action = response.data.action;
          if (this.action === 'profile') {
            this.filePickerRef.nativeElement.click();
          } else if (this.action === 'lab') {
            this.qrScannerModal();
          }
        }
      });
    return await modal.present();
  }

  private checkForNotifications() {
    this.notificationsSubscription = this.firebaseService.checkForNewNotifications(this.user.uid)
      .subscribe((response: any) => {
        if (!response.read) {
          this.snoutImg = '../../assets/icons/toolbar-footer/notifications_receive_animated.gif';
        }
      })
  }

  private updatePetImage(imageUrl: string): void {
    this.subscription = this.firebaseService.getPetById(this.user.uid, localStorage.getItem('activePet'))
      .subscribe(pet => {
        pet.pet.image = imageUrl;
        this.firebaseService.updatePet(this.user.uid, localStorage.getItem('activePet'), pet);
      });
  }

  private registerCode() {
    this.commonService.registerProductKey(this.regNr, this.user.uid, localStorage.getItem('activePet'), this.user.za)
      .subscribe(response => {
        this.regNr = null;
        this.validated = false;
        let message: string;
        let color: string;

        if (response.message === 0) {
          this.validated = true;
          message = this.regSuccess;
          color = 'secondary';
          this.successText = `
          ${this.assignment[0]} ${response.product} ${this.assignment[1]} ${this.assignment[2]}
          `;
        } else if (response.message === 1) {
          message = this.usedCode;
          color = 'danger';
        } else if (response.message === 2) {
          message = this.invalidCode;
          color = 'danger';
        }
        this.commonService.presentToast(message, color);
      });
  }

  private async qrScannerModal() {
    const modal = await this.modalCtrl.create({
      component: QrScannerModalPage
    });
    modal.onDidDismiss()
      .then((response: any) => {
        console.log('modal dismissed', response);
        if (response.data) {
          console.log('r', response.data);
          this.regNr = response.data.uri;
          this.registerCode();
        }
      });
    return await modal.present();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    if (this.notificationsSubscription) {
      this.notificationsSubscription.unsubscribe();
    }
  }
}
