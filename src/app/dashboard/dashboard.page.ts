import { Component } from '@angular/core';
import { AuthService } from '../user/auth.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CommonService } from '../shared/services/common/common.service';
import { Subscription } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage {
  private subscription: Subscription;
  private petId: string;

  public user: any;
  public isLoading: boolean;
  public cards: any[];
  public chartsImage = '../../assets/icons/dashboard/charts.svg';

  constructor(
    private userAuth: AuthService,
    private router: Router,
    private translateService: TranslateService,
    private commonService: CommonService
  ) { }

  ionViewWillEnter() {
    this.translateService.setDefaultLang(this.commonService.language); // fallback
    this.translateService.use(this.translateService.getBrowserLang());
    this.isLoading = true;
    this.subscription = this.userAuth.user$.pipe(
      tap(user => user),
      switchMap(user => {
        this.petId = localStorage.getItem('activePet');
        if (user && this.petId) {
          this.user = user;
          return this.commonService.getDashBoardContent(user.uid, this.petId, user.za);
        } else {
          this.router.navigateByUrl('/');
        }
      })
    ).subscribe( cards => {
      console.log('cards', cards);
      this.cards = cards.data;
      this.isLoading = false;
    });
  }

  public onClickLink(key: string, label: string): void {
    this.router.navigateByUrl(`pets/pet-care-card/${this.petId}/${label}/${key}`);
  }

  ionViewWillLeave() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
