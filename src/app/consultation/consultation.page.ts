import { Component } from '@angular/core';
import { AuthService } from '../user/auth.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CommonService } from '../shared/services/common/common.service';
import { Subscription } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-consultation',
  templateUrl: './consultation.page.html',
  styleUrls: ['./consultation.page.scss'],
})
export class ConsultationPage {
  private subscription: Subscription;
  private language: string;

  public user: any;
  public isLoading: boolean;
  public appointmentType: string;
  public appointments: any;
  public selectedType: any;

  constructor(
    private userAuth: AuthService,
    private router: Router,
    private translateService: TranslateService,
    private commonService: CommonService,
  ) { }

  ionViewWillEnter() {
    this.language = this.commonService.language;
    this.translateService.use(this.language);
    this.subscription = this.userAuth.user$.pipe(
      tap(user => user),
      switchMap(user => {
        if (user) {
          this.user = user;
          return this.commonService.getAppointmentTypes(user.za);
        } else {
          this.router.navigateByUrl('/');
        }
      })
    ).subscribe( response => {
      // console.log('response', response);
      this.appointments = response.appointmentTypes;
      this.isLoading = false;
    });
  }

  public onSelectAppointmentType(): Promise<boolean> {
    return this.router.navigateByUrl(`consultation/scheduler/${this.appointmentType}`);
  }

  ionViewWillLeave() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
