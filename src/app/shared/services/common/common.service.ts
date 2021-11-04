import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../user/auth.service';
import {BehaviorSubject, Observable} from 'rxjs';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private errorMessages: any;
  private baseUrl = environment.baseUrl;
  private appLanguage$ = new BehaviorSubject<any>('');

  public get language(): string {
    if (localStorage.getItem('country')) {
      return localStorage.getItem('country');
    } else {
      const browserLanguage = this.translateService.getBrowserLang();
      if (
        browserLanguage === 'de' || browserLanguage === 'dk' || browserLanguage === 'en' ||
        browserLanguage === 'fr' || browserLanguage === 'it' || browserLanguage === 'es' ||
        browserLanguage === 'pl'
      ) {
        return browserLanguage;
      }
    }
    return 'en';
  }
  public languages: any[];


  constructor(
    private toastController: ToastController,
    private translateService: TranslateService,
    private router: Router,
    private authService: AuthService,
    private http: HttpClient
  ) {
    this.translateService.setDefaultLang(this.language); // fallback
    // this.translateService.use(this.translateService.getBrowserLang());

    this.translateService.use(this.language);
    this.translateService.get('COMMON')
      .subscribe(common => {
        this.errorMessages = common.HTTP_ERRORS;
      });
  }

  public get appLanguage(): Observable<any> {
    return this.appLanguage$.asObservable();
  }

  public setAppLanguage(locale): void {
    this.appLanguage$.next(locale);
  }

  public clearCache(reloadAfterClear = true) {
    if ('caches' in window) {
      caches.keys().then((names) => {
        names.forEach(async (name) => {
          await caches.delete(name);
        });
      });

      if (reloadAfterClear) {
        // localStorage.setItem('refreshCount', '0');
        // console.log('storage', localStorage);
        // const refreshCount = localStorage.getItem('refreshCount');
        // let val: number;
        // if  (Number(refreshCount) < 3) {
        //   console.log(Number(refreshCount))
        //   val = Number(refreshCount) + 1;
        //   console.log('val', val)
        //
        //   localStorage.setItem('refreshCount', String(val));
        //   window.location.reload();
        //   console.log('localStorage', localStorage);
        // }
        window.location.reload();
      }

    }
  }

  public getInvoiceResult(
    token: string,
    petID: string,
    uID: string,
    resultKey: string
  ): Observable<any> {
    const url = `${this.baseUrl}/${this.language}/scan`;
    const headers = {
      'Content-Type': 'application/json',
      // 'firebase-context-token': token,
      'sw-context-token': localStorage.getItem('sw-token') || null
    };
    const body = {
      key: resultKey,
      petId: petID,
      uid: uID
    };
    return this.http.post(url, body, { headers });
  }

  public getKeyFromInvoiceData(
    token: string,
    petID: string,
    uID: string,
    data: any
  ): Observable<any> {
    const url = `${this.baseUrl}/${this.language}/scan/get-scan-key`;
    const headers = {
      'Content-Type': 'application/json',
      // 'firebase-context-token': token,
      // 'sw-context-token': localStorage.getItem('sw-token')
    };
    const body = {
      petId: petID,
      uid: uID,
      scanData: data
    };
    return this.http.post(url, body, { headers });
  }

  public notifyBackend(petId: string, uid: string, userToken: string): Promise<any> {
    const headers = {
      "Content-Type": "application/json",
      "firebase-context-token": userToken,
      "sw-context-token": localStorage.getItem('sw-token')
    };
    const body = JSON.stringify({petId, uid});
    const url = `${environment.baseUrl}/${this.language}/pet-registration`;
    return fetch(url, { method: 'POST', headers, body })
      .then((resp) => {
        if (!resp.ok) {
          throw resp.json();
        }
        return resp.json();
      })
      .catch(e => {
        return e;
      });
  }

  public sendInvoice(
    token: string,
    petID: string,
    pages: string[]
  ): Observable<any> {
    const url = `${this.baseUrl}/${this.language}/user-docs/get-key-from-path`;
    const headers = {
      'Content-Type': 'application/json',
      // 'firebase-context-token': token,
      'sw-context-token': localStorage.getItem('sw-token') || null
    };
    const body = {
      pathIds: pages,
      petId: petID
    };
    return this.http.post(url, body, { headers });
  }

  public addAttachmentsToAppointment(
    token: string,
    appointmentId: string,
    uID: string,
    petID: string,
    annos?: string,
    img?: string[]
  ): Observable<any> {
    const url = `${this.baseUrl}/${this.language}/acuity/appointments/${appointmentId}`;
    const headers = {
      'Content-Type': 'application/json',
      // 'firebase-context-token': token,
      'sw-context-token': localStorage.getItem('sw-token') || null
    };
    const body = {
      uid: uID,
      petId: petID,
      notes: annos || null,
      images: img || null
    };
    return this.http.patch(url, body, { headers });
  }

  public getAppointmentTypes(
    token: string
  ): Observable<any> {
    const url = `${this.baseUrl}/${this.language}/acuity/appointment-types`;
    const headers = {
      'Content-Type': 'application/json',
      // 'firebase-context-token': token,
      'sw-context-token': localStorage.getItem('sw-token') || null
    };
    return this.http.get(url, {headers});
  }

  public bookAppointment(
    token: string,
    appointmentTypeID: string,
    datetime: string,
    petId: string
  ): Observable<any> {
    const url = `${this.baseUrl}/${this.language}/acuity/appointments`;
    const headers = {
      'Content-Type': 'application/json',
      // 'firebase-context-token': token,
      'sw-context-token': localStorage.getItem('sw-token') || null
    };
    const body = {
      appointmentTypeID,
      datetime,
      petId
    };
    return this.http.post(url, body, { headers });
  }

  public getAvailableAppointments(
    token: string,
    appointmentTypeID: string
  ): Observable<any> {
    const url = `${this.baseUrl}/${this.language}/acuity/available-time`;
    const headers = {
      'Content-Type': 'application/json',
      // 'firebase-context-token': token,
      'sw-context-token': localStorage.getItem('sw-token') || null
    };
    const body = {
      appointmentTypeID
    };
    return this.http.post(url, body, { headers });
  }

  public getSecureLink(
    path: string,
    dir: string,
    petId: string,
    token: string
  ): Observable<any> {
    const url = `${this.baseUrl}/${this.language}/${dir}/get-url-from-path`;
    console.log('url', url);
    const headers = {
      'Content-Type': 'application/json',
      // 'firebase-context-token': token
    };
    const body = {
      path,
      petId
    };
    return this.http.post(url, body, { headers });
  }

  public getArticleById(
    token: string,
    articleId: string
  ): Observable<any> {
    const url = `${this.baseUrl}/${this.language}/magazine/${articleId}`;
    const headers = {
      'Content-Type': 'application/json',
      // 'firebase-context-token': token
    };
    return this.http.get(url, { headers });
  }

  public getRecipeById(
    token: string,
    articleId: string
  ): Observable<any> {
    const url = `${this.baseUrl}/${this.language}/cooking/${articleId}`;
    const headers = {
      'Content-Type': 'application/json',
      // 'firebase-context-token': token
    };
    return this.http.get(url, { headers });
  }

  public getArticles(
    petId: string,
    uid: string,
    token: string
  ): Observable<any> {
    const url = `${this.baseUrl}/${this.language}/home-page`;
    const headers = {
      'Content-Type': 'application/json',
      // 'firebase-context-token': token
    };
    const body = {
      petId,
      uid
    };
    return this.http.post(url, body, { headers });
  }

  public getDashBoardContent(
    userID: string,
    petID: string,
    token: string
  ): Observable<any> {
    const url = `${this.baseUrl}/${this.language}/dashboard`;
    const headers = {
      'Content-Type': 'application/json',
      // 'firebase-context-token': token,
      'sw-context-token': localStorage.getItem('sw-token') || null
    };
    const body = {
      petId: petID,
      uid: userID
    };
    return this.http.post(url, body, { headers });
  }

  public registerProductKey(
    productKey: string,
    userID: string,
    petID: string,
    token: string
  ): Observable<any> {
    const url = `${this.baseUrl}/${this.language}/lab/qr-activation-key`;
    const headers = {
      'Content-Type': 'application/json',
      // 'firebase-context-token': token,
      'sw-context-token': localStorage.getItem('sw-token') || null
    };
    const body = {
      key: productKey,
      petId: petID,
      uid: userID
    };
    return this.http.post(url, body, { headers });
  }

  // We need a promise
  public sendCoinsUpdate(pet: string, user: string, ticket: string, token) {
    const headers = {
      'Content-Type': 'application/json',
      'firebase-context-token': token,
      'sw-context-token': localStorage.getItem('sw-token') || null
    };
    const data = {
      petId: pet,
      ticketId: ticket,
      uid: user
    };
    const body = JSON.stringify(data);
    const url = `${this.baseUrl}/${this.language}/tickets/coins`;

    return fetch(url, { method: 'POST', headers, body })
      .then((resp) => {
        if (!resp.ok) {
          throw resp.json();
        }
        return resp;
      })
      .then((resp) => resp.text())
      .catch(e => e);
  }

  public async presentToast(msg: string, col: string): Promise<void> {

    if (col === 'primary') {
      col = 'secondary';
    }
    const toast = await this.toastController.create({
      message: msg,
      color: col,
      position: 'top',
      duration: 2000
    });
    return toast.present();
  }

  public dataURItoBlob(dataURI): Blob {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], {type: mimeString});
  }

  public createUID(): string {
    let dt = new Date().getTime();
    return 'xxxxxxxx-xxxx-xxxx-yxxx-xxxxxx-xxxxxx-xyxyxxxxxy'.replace(/[xy]/g, (c) => {
      const r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
  }

  public createShortID(): string {
    return Math.floor(Math.random() * 10000).toString();
  }

  // ToDo: Cleanup this

  public handleResponseErrors(statusCode: string): void {
    const message = this.errorMessages.PRODUCTS[statusCode];
    // this.presentToast(message, 'danger');
    // switch (statusCode) {
    //   case '400':
    //     this.presentToast(message, 'danger');
    //     this.router.navigateByUrl(`/`);
    //     break;
    //   case '403':
    //     this.authService.logOut();
    //     break;
    //   case '406':
    //     this.presentToast(message, 'danger');
    //     this.router.navigateByUrl(`/`);
    //     break;
    //   case '451':
    //     this.authService.logOut();
    //     break;
    //   case '500':
    //     this.router.navigateByUrl(`/`);
    //     break;
    // }
  }

  public handleLoginErrors(statusCode: string): void {
    const message = this.errorMessages.LOGIN[statusCode];
    this.presentToast(message, 'danger');
  }

}
