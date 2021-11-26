import { Component, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../user/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { CommonService } from '../../../shared/services/common/common.service';
import { switchMap, tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { AlertController, IonSlides, ModalController } from '@ionic/angular';
import { DiseasesModalPage } from '../../../diseases/diseases-modal/diseases-modal.page';
import { ProductModalPage } from '../../../shop/product-modal/product-modal.page';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-care-card-detail',
  templateUrl: './care-card-detail.page.html',
  styleUrls: ['./care-card-detail.page.scss'],
})
export class CareCardDetailPage {
  public isLoading: boolean;
  public result: any;
  public iconPath = '../../../../assets/icons/care-card';
  public chevron = `${this.iconPath}/chevron-forward-outline.svg`;
  public paperclip = `${this.iconPath}/clip.svg`;
  public eyeIcon = `${this.iconPath}/eye.svg`;
  public cartCheckIcon = `${this.iconPath}/product-check.svg`;
  public medications: any[];
  public docDownloadLink: any;
  public pdfZoom: boolean;
  public listOpenVaccines = [];
  public listOpenMedication = [];
  public listOpenMedicalTests = [];
  public explSliderOpen = false;
  public listOpen: any[];
  public isChecked: boolean;

  public slideOptions = {
    initialSlide: 0,
    slidesPerView: 2,
    spaceBetween: 5
  };

  // @ViewChild(IonSlides) slides: IonSlides;

  // change this
  public pillImg = `${this.iconPath}/pill.svg`;

  private subscription: Subscription;
  private readonly routeSub: Subscription;
  private params: any;
  private language: string;
  public user: any;
  private baseUrL: string;
  private modalTitle: {
    med: string;
    doc: string;
  };
  private confirmText: string;
  private cancelText: string;
  private alertText: string;

  constructor(
    private router: Router,
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    public userAuth: AuthService,
    private translateService: TranslateService,
    private commonService: CommonService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private sanitizer: DomSanitizer,
  ) {
    this.routeSub = this.activatedRoute.params
      .subscribe(params => {
        this.params = params;
        console.log('params', this.params);
      });
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.baseUrL = environment.baseUrl;
    this.language = this.commonService.language;
    this.translateService.use(this.language);
    this.translateService.get('DISEASE_PAGE')
      .subscribe(values => {
        this.modalTitle = {
          med: values.MED.ADD,
          doc: values.DOC.ADD
        };
      });
    this.translateService.get('CARE_CARD_DETAIL_PAGE')
      .subscribe(values => {
        console.log('values',values)
        this.confirmText = values.CLOSE.YES;
        this.cancelText = values.CLOSE.NO;
        this.alertText = values.CLOSE.TEXT;
      });
    this.subscription = this.userAuth.user$.pipe(
      tap(user => {
        this.user = user;
      }),
      switchMap(() => {
        return this.getContent();
      })
    ).subscribe((data: any) => {
      if (data) {
        console.log('data', data);
        // change this
        // if (!data.prep) {
        //   data.prep = {
        //     list: []
        //   };
        // }


        this.result = data;

        // data.products = data.prep;
        this.createChevrons();
        console.log('this.result', this.result);
        // console.log('listOpenVaccines', this.listOpenVaccines);
        // console.log('listOpenMedication', this.listOpenMedication);
        // console.log('listOpenMedicalTests', this.listOpenMedicalTests);
        // this.medications = data.medications ?? [];
      } else {
        this.router.navigateByUrl('/');
      }
      this.isLoading = false;

      // const disease = {
      //   key: '1111'
      // };
      //
      // this.presentModal(this.user, 'med', this.modalTitle.med, disease);
    });
  }

  public openIngredientsList(index) {
    this.listOpen[index].val = this.listOpen[index].val === false;
  }

  public hasRecovered(): void {
    if (this.isChecked) {
      this.presentAlert(this.alertText);
    }
  }

  public onOpenModal(type: string): void {
    // console.log('user', this.user);
    let title;
    if (type === 'med') {
      title = this.modalTitle.med;
    } else if (type === 'doc') {
      title = this.modalTitle.doc;
    }

    // Change This
    const disease = {
      key: '1111'
    };

    this.presentModal(this.user, type, title, disease);
  }

  public onDeleteItem(index, el, data) {
    this.result[el].list.splice(index, 1);
    console.log('data', data);
    // this.updateResult();
    this.updateList('findings', 'delete',  data).subscribe( resp => {
      // console.log('resp', resp);
    });
  }

  public onZoomDocument(path: string): void {
    this.commonService.getSecureLink(
      path,
      `user-docs`,
      localStorage.getItem('activePet'),
      this.user.za
    ).subscribe(link => {
      // this.docDownloadLink = link.url;
      console.log('docDownloadLink', this.docDownloadLink);
      this.docDownloadLink = this.sanitizer.bypassSecurityTrustResourceUrl(link.url);
      this.pdfZoom = true;
    });
  }

  public unZoom(): void {
    this.pdfZoom = false;
  }

  public openVaccinesIngredientsList(index) {
    this.listOpenVaccines[index].val = this.listOpenVaccines[index].val === false;
  }

  public openMedicationIngredientsList(index) {
    this.listOpenMedication[index].val = this.listOpenMedication[index].val === false;
  }

  public openMedicalTestsList(index) {
    this.listOpenMedicalTests[index].val = this.listOpenMedicalTests[index].val === false;
  }

  public openExplSlider() {
    console.log('click slider', this.explSliderOpen);
    this.explSliderOpen = this.explSliderOpen === false;
  }

  private createChevrons() {
    if (this.result?.vaccines?.param) {
      this.listOpenVaccines = [];
      const arr = this.result?.vaccines?.param;
      arr.map((value, index) => {
        if (value.expandable) {
          if (value.body || value.list) {
            const obj = {
              val: false
            };
            this.listOpenVaccines.push(obj);
          }
        }
      });
    }
    if (this.result?.medication?.interaction?.param) {
      this.listOpenMedication = [];
      const arr = this.result?.medication?.interaction?.param;
      arr.map((value, index) => {
        if (value.expandable) {
          if (value.body || value.list) {
            const obj = {
              val: false
            };
            this.listOpenMedication.push(obj);
          }
        }
      });
    }
    if (this.result?.medicaltests?.param) {
      this.listOpenMedication = [];
      const arr = this.result?.medicaltests?.param;
      arr.map((value, index) => {
        if (value.expandable) {
          if (value.body || value.list) {
            const obj = {
              val: false
            };
            this.listOpenMedicalTests.push(obj);
          }
        }
      });
    }
  }

  private updateList(prop: string, action: string, data: any): Observable<any> {
    let url = `${environment.baseUrl}/${this.language}/carecard/${this.params.key}/${this.params.venom}`;
    const headers = {
      'Content-Type': 'application/json',
      'firebase-context-token': this.user.za,
    };
    const body: any = {
      uid: this.user.uid,
      petId: localStorage.getItem('activePet')
      };

    if (prop === 'findings' && action === 'add') {
      body.findingsList = data;
      url = `${url}/findings`;
    } else if (prop === 'findings' && action === 'delete') {
      body.id = data.id;
      url = `${url}/findings/delete`;
    }

    return this.http.post(url, body, { headers });
  }

  private petRecovered(): Observable<any> {
    const url = `${this.baseUrL}/${this.language}/carecard/terminate-event/${this.params.key}`;
    const headers = {
      'Content-Type': 'application/json',
      'firebase-context-token': this.user.za
    };
    const body = {
      level3Id: this.params.id,
      petId: localStorage.getItem('activePet'),
      uid: this.user.uid,
    };
    return this.http.post(url, body, { headers });
  }

  private getContent(): Observable<any> {
    const url = `${this.baseUrL}/${this.language}/carecard/${this.params.key}/${this.params.list}`;
    console.log(url);
    const headers = {
      'Content-Type': 'application/json',
      'firebase-context-token': this.user.za
    };
    const body = {
      petId: localStorage.getItem('activePet'),
      uid: this.user.uid,
      venomKey: this.params.venom,
      level3Id: this.params.id
    };
    return this.http.post(url, body, { headers });
  }

  private async presentModal(user: any, type: string, title: string, disease: any) {
    const modal = await this.modalCtrl.create({
      component: DiseasesModalPage,
      componentProps: {
        user,
        type,
        title,
        disease
      }
    });
    modal.onDidDismiss()
      .then((response: any) => {
        console.log('modal dismissed', response);

        if (response?.data?.meds) {
          // change this
          for (const med of response.data.meds) {
            // this.medications.push(med);
            this.result.prep.list.push(med);
          }
          // console.log('this.medications', this.medications);
        }

        if (response?.data?.docs && this.result?.findings) {
          for (const doc of response.data.docs) {
            this.result.findings.list.push(doc);
          }
          this.updateList('findings', 'add',  response.data.docs).subscribe( resp => {
            // console.log('resp', resp);
          });
        }
      });
    return await modal.present();
  }

  async presentAlert(msg: string) {
    const alert = await this.alertCtrl.create({
      message: msg,
      buttons: [
        {
          text: this.cancelText,
          role: 'cancel',
          cssClass: 'recover-cancel-button',
          handler: () => {
            this.isChecked = false;
          }
        }, {
          text: this.confirmText,
          cssClass: 'recover-action-button',
          handler: () => {
            this.petRecovered()
              .subscribe( data => {
                const petId = localStorage.getItem('activePet');
                const url = `pets/pet-care-card/${petId}/${this.params.label}/${this.params.key}`;
                this.router.navigateByUrl(url);
            });
          }
        }
      ]
    });
    await alert.present();
  }

  ionViewWillLeave() {
    this.isChecked = false;
    this.listOpenVaccines = [];
    this.listOpenMedication = [];
    this.listOpenMedicalTests = [];
    this.listOpen = [];
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.routeSub) {
      this.subscription.unsubscribe();
    }
  }

}
