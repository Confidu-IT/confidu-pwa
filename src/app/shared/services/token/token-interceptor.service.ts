import { Injectable } from '@angular/core';
import {AuthService} from '../../../user/auth.service';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {mergeMap} from 'rxjs/operators';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor{
  private baseUrl = environment.baseUrl;

  constructor(
    private authService: AuthService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const url = request?.url;

    if (url.search('i18n') > -1) {
      return next.handle(request);
    }

    return this.authService.afAuth.idToken.pipe(
      mergeMap((token: any) => {
        if (token && url.search(this.baseUrl) > -1) {
          request = request.clone({
            setHeaders: {
              'firebase-context-token': token
            }
          });
        }

        return next.handle(request);
      }));
  }



  // intercept(req: HttpRequest<any>, next: HttpHandler): any {
  //   console.log('req', req);
  //   this.authService.afAuth.idTokenResult
  //   return this.authService.user$.toPromise()
  //     .then(user => {
  //       const authReq = req.clone({
  //         headers: req.headers.set('firebase-context-token', user.za)
  //       });
  //       return next.handle(authReq);
  //     });
  //
  // }


}
