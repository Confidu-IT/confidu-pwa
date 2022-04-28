import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {AuthService} from '../../../user/auth.service';
import {ToastController} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})

export class HttpErrorInterceptor implements HttpInterceptor {
  private globalErrors: any;

  constructor(
    private router: Router,
    private authService: AuthService,
    private translateService: TranslateService,
    private toastController: ToastController
  ) {
    this.translateService.get('COMMON')
      .subscribe(values => {
        this.globalErrors = values.GLOBAL_ERRORS;
      });
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMsg = '';
          if (error.error instanceof ErrorEvent) {
            errorMsg = `Error: ${error.error.message}`;
          }
          else {
            console.log('err', error);
            errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
            switch (error.status) {
              case 400:
                this.router.navigateByUrl(`/`);
                break;
              case 403:
                this.authService.logOut();
                break;
              case 406:
                // this.presentErrorToast(error.error);
                this.router.navigateByUrl(`error`);
                break;
              case 451:
                this.authService.logOut();
                break;
              case 504:
                this.router.navigateByUrl(`/`);
                break;
              case 500:
                this.router.navigateByUrl(`error`);
                break;
              default:
                this.router.navigateByUrl(`error`);
                break;
            }
          }
          console.log(errorMsg);
          return throwError(errorMsg);
        })
      )
  }

  private async presentErrorToast(errCode: any): Promise<void> {
    let msg: string;

    if (errCode?.errors[0]?.code) {
      const code = errCode.errors[0].code;

      switch (code) {
        case 'questions_empty':
          msg = this.globalErrors.QUESTIONS_EMPTY;
          break;
        case 'activationKey':
          msg = this.globalErrors.KEY_NOT_FOUND;
          break;
        case 'species':
          msg = this.globalErrors.SPECIES;
          break;
        case 'activated':
          msg = this.globalErrors.ACTIVATED;
          break;
        default:
          msg = this.globalErrors.DEFAULT;
          break;
      }

      const toast = await this.toastController.create({
        message: msg,
        position: 'top',
        duration: 10000,
        color: 'danger'
      });
      return toast.present();
    } else {
      return;
    }
  }
}
