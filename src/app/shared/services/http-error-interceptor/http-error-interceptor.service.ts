import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {AuthService} from '../../../user/auth.service';

@Injectable({
  providedIn: 'root'
})

export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {
  }

  // constructor(private router: Router) {
  // }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMsg = '';
          if (error.error instanceof ErrorEvent) {
            errorMsg = `Error: ${error.error.message}`;
          }
          else {
            errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
            switch (error.status) {
              case 400:
                this.router.navigateByUrl(`/`);
                break;
              case 403:
                this.authService.logOut();
                break;
              case 406:
                this.router.navigateByUrl(`error`);
                break;
              case 451:
                this.authService.logOut();
                break;
              case 500:
                this.router.navigateByUrl(`error`);
                break;
            }
          }
          console.log(errorMsg);
          return throwError(errorMsg);
        })
      )
  }
}
