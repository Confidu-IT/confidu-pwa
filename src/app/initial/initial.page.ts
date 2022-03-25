import { Component } from '@angular/core';
import {AuthService} from '../user/auth.service';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {FirebaseService} from '../shared/services/firebase/firebase.service';
import {TranslateService} from '@ngx-translate/core';
import {CommonService} from '../shared/services/common/common.service';
import {Subscription} from 'rxjs';
import {switchMap, tap} from 'rxjs/operators';

@Component({
  selector: 'app-initial',
  templateUrl: './initial.page.html',
  styleUrls: ['./initial.page.scss'],
})
export class InitialPage {
  public language: string;
  public user: any;
  public isLoading = true;
  public panels: any[];

  private petId: string;
  private subscription: Subscription;

  constructor(
    public userAuth: AuthService,
    private router: Router,
    private afAuth: AngularFireAuth,
    private firebaseService: FirebaseService,
    private translateService: TranslateService,
    private commonService: CommonService,
  ) { }

  ionViewWillEnter() {
    this.language = this.commonService.language;
    this.translateService.use(this.language);
    this.subscription = this.userAuth.user$.pipe(
      tap(user => {
        this.user = user;
      }),
      switchMap(user => {
        this.petId = localStorage.getItem('activePet');
        if (this.user && this.petId) {
          try {
            return this.firebaseService.getIntro(this.language);
          } catch (e) {
            this.router.navigateByUrl('/');
          }
        } else {
          this.router.navigateByUrl('/');
        }
      }),
    ).subscribe(content => {
      console.log('resp', content);
      this.panels = content;
      this.isLoading = false;
    });
  }

  public onClickLink(key: string) {
    console.log('key', key);
    switch (key) {
      case 'intro_all':
        this.router.navigateByUrl('/');
        break;
      case 'intro_carecard':
        this.router.navigateByUrl(`pets/pet-care-card/${this.petId}`);
        break;
      case 'intro_cook':
        break;
      case 'intro_diag':
        this.router.navigateByUrl(`tickets/televet-pet`);
        break;
      case 'intro_fd':
        break;
      case 'intro_med':
        this.router.navigateByUrl(`follow-up-prescription`);
        break;
      case 'intro_plan':
        this.router.navigateByUrl(`tickets`);
        break;
      case 'intro_read':
        break;
      case 'intro_tests':
        this.router.navigateByUrl(`lab`);
        break;
      case 'intro_video':
        this.router.navigateByUrl(`consultation`);
        break;
    }
  }

  ionViewWillLeave() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
