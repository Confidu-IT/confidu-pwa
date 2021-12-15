import { Component } from '@angular/core';
import { FirebaseService } from '../shared/services/firebase/firebase.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../shared/services/common/common.service';
import { AuthService } from '../user/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-lab-detail',
  templateUrl: './lab-detail.page.html',
  styleUrls: ['./lab-detail.page.scss'],
})
export class LabDetailPage {
  public title: string;
  public content: any;
  public isLoading: boolean;
  public chevron = '../../assets/icons/lab-page/chevron-forward-outline.svg';

  private readonly routeSub: Subscription;
  private params: any;
  private subscription: Subscription;
  private language: string;
  public user: any;
  private petId: string;
  private species: string;

  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    private commonService: CommonService,
    public userAuth: AuthService,
    private translateService: TranslateService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.routeSub = this.activatedRoute.params
      .subscribe(params => {
        this.params = params;
        console.log(this.params);
      });
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.language = this.commonService.language;
    this.translateService.use(this.language);
    this.translateService.get('LAB_PAGE')
      .subscribe(values => {
        switch (this.params.type) {
          case 'partest':
            this.title = values.PARASITES;
            break;
          case 'diatest':
            this.title = values.DIARRHEA;
            break;
          case 'diatestplus':
            this.title = values.DIARRHEA_PLUS;
            break;
          case 'giacon':
            this.title = values.GIARDIA;
            break;
          case 'flora':
            this.title = values.FLORA;
            break;
          case 'barfprof':
            this.title = values.BARF;
            break;
          case 'labtest':
            this.title = values.PREVENTION;
            break;
          case 'labstick':
            this.title = values.PREVENTION_PLUS;
            break;
        }
      });

    this.subscription = this.userAuth.user$.pipe(
      tap(user => user),
      switchMap(user => {
        this.user = user;
        this.petId = localStorage.getItem('activePet');
        if (!user || !this.petId) {
          this.isLoading = false;
          this.router.navigateByUrl('/');
        }
        return this.firebaseService.getPetById(user.uid, this.petId);
      })
    ).subscribe(pet => {
      this.species = pet.pet.species.value;
      this.getFirebaseTicket(this.language, this.species, this.params.type);
    });
  }

  public onClickLink(url: string, key: string): void {
    this.router.navigateByUrl(`tickets/ticket/default/${url}/${key}`);
  }

  private getFirebaseTicket(
    language: string,
    species: string,
    ticketId: string,
  ): void {
    this.firebaseService.getDefaultTicket(language, species, ticketId)
      .subscribe(data => {
        if (data) {
          this.content = data;
          this.isLoading = false;
        } else {
          this.router.navigateByUrl('lab');
        }
      });
  }

  ionViewWillLeave() {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
