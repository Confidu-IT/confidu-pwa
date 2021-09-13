import { Injectable } from '@angular/core';
import {AuthService} from '../../../user/auth.service';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {mergeMap, switchMap} from 'rxjs/operators';
import {environment} from '../../../../environments/environment';
import {TicketService} from '../../../tickets/ticket-service/ticket-service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor{
  private baseUrl = environment.baseUrl;

  constructor(
    private authService: AuthService,
    private ticketService: TicketService
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const url = request?.url;
    console.log('prev url', this.authService.getPreviousUrl());

    if (url.search('i18n') > -1) {
      return next.handle(request);
    }

    return this.authService.afAuth.idToken.pipe(
      mergeMap((token: any) => {
        if (token && url.search(this.baseUrl) > -1) { // req to own backend
          request = request.clone({
            setHeaders: { 'firebase-context-token': token }
          });

          // coming from ticket result page
          if (this.authService.getPreviousUrl() && localStorage.getItem('ticketResult') && localStorage.getItem('activePet')) {
            const prevUri = this.authService.getPreviousUrl().split('/');
            console.log('prevUri', prevUri);
            if (prevUri[prevUri.length - 1] === 'result') {
              const ticketObj = JSON.parse(localStorage.getItem('ticketResult'));
              this.ticketService.confirmSaveFetch(
                ticketObj.event,
                ticketObj.action,
                localStorage.getItem('activePet'),
                ticketObj.user,
                token,
                ticketObj.language
              ).then (data => {
                localStorage.removeItem('ticketResult');
              });

            }
          }

        }
        return next.handle(request);
      }));
  }
}
