import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {NavigationEnd, Router} from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { ShopwareService } from '../shared/services/shopware/shopware.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<any | null>;
  private baseUrl = environment.baseUrl;
  private previousUrl: string;
  private currentUrl: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    public afAuth: AngularFireAuth,
    private shopwareService: ShopwareService
  ) {
    this.user$ = this.afAuth.authState;
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
      }
    });
  }

  public logOut(): void {
    this.router.navigateByUrl('/signin')
      .then(() => {
        this.afAuth.signOut()
          .then(() => {
            this.shopwareService.signout();
            localStorage.clear();
          });
      });
  }

  private createToken(id: string) {
    const body = new FormData();
    const url = `${this.baseUrl}/postmethod_custom_token`;
    body.append('shopwareId', id);
    body.append('shopwareToken', localStorage.getItem('sw-token'));
    body.append('SECRET_KEY', '12345');
    return fetch(url, { method: 'POST', body })
      .then(resp => resp.json())
      .then(data => data);
  }

  public getPreviousUrl(): string {
    return this.previousUrl;
  }

  public async createOrGetFirebaseUser(obj: any) {
    let token = await this.createToken(obj.id);
    await this.afAuth.signInWithCustomToken(token.customToken);
  }
}
