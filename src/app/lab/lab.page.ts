import { Component } from '@angular/core';
import { AuthService } from '../user/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { FirebaseService } from '../shared/services/firebase/firebase.service';
import { TranslateService } from '@ngx-translate/core';
import { CommonService } from '../shared/services/common/common.service';
import { Subscription } from 'rxjs';
import {Router} from '@angular/router';
import {switchMap, tap} from 'rxjs/operators';

@Component({
  selector: 'app-lab',
  templateUrl: './lab.page.html',
  styleUrls: ['./lab.page.scss'],
})
export class LabPage {
  private subscription: Subscription;

  public user: any;
  public products: any[];
  public language: string;
  public isLoading: boolean;
  public regNr: string;
  public labIcon = '../../assets/icons/lab-page/lab.svg';
  public chevron = '../../assets/icons/lab-page/chevron-forward-outline.svg';

  constructor(
    public userAuth: AuthService,
    private afAuth: AngularFireAuth,
    private firebaseService: FirebaseService,
    private translateService: TranslateService,
    private commonService: CommonService,
    private router: Router,
  ) {
  }

  ionViewWillEnter() {
    this.language = this.commonService.language;
    this.translateService.use(this.language);

    // Barf Profil
    // barfprof
    //
    // this.subscription = this.userAuth.user$
    //   .subscribe(user => {
    //     this.user = user;
    //   });

    this.subscription = this.userAuth.user$.pipe(
      tap(user => user),
      switchMap(user => {
        if (user && localStorage.getItem('activePet')) {
          return this.firebaseService.getPetById(user.uid, localStorage.getItem('activePet'));
        } else {
          return this.router.navigateByUrl('/');
        }
      }),
      switchMap(pet => {
        return this.firebaseService.getLabProducts(this.language, pet.pet.species.value)
      })
    ).subscribe(data => {
      console.log('data', data)
      this.products = data;
    });
  }

  public onClickLink(url: string, key: string): void {
    this.router.navigateByUrl(`tickets/ticket/default/${url}/${key}`);
  }

  ionViewWillLeave() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
