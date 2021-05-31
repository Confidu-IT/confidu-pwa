import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CommonService } from '../../shared/services/common/common.service';
import { AuthService } from '../../user/auth.service';
import { FirebaseService } from '../../shared/services/firebase/firebase.service';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-ticket-info',
  templateUrl: './ticket-info.page.html',
  styleUrls: ['./ticket-info.page.scss'],
})
export class TicketInfoPage {
  private readonly routeSub: Subscription;
  private params: any;
  private subscription: Subscription;
  private petId: string;
  private user: any;
  public language: string;
  public data: any;
  public species: any;
  public isLoading: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private translateService: TranslateService,
    private commonService: CommonService,
    private firebaseService: FirebaseService,
    private userAuth: AuthService,
    private router: Router
  ) {
    this.routeSub = this.activatedRoute.params
      .subscribe(params => {
        this.params = params;
      });
  }

  ionViewWillEnter(): void {
    this.isLoading = true;
    this.language = this.commonService.language;
    this.translateService.setDefaultLang(this.language); // fallback
    this.translateService.use(this.translateService.getBrowserLang());

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
      if (!this.params.ticketKey) {
        this.getTicket(this.user.uid, this.petId, this.params.id);
      } else {
        // this.getDefaultTicket(this.user.uid, '1448', this.petId, this.params.ticketKey, this.language);
        this.getFirebaseTicket(this.language, this.species, this.params.ticketKey);
      }
    });
  }

  private getTicket(user, pet, ticket): void {
    this.firebaseService.getTicketById(user, pet, ticket)
      .subscribe(resp => {
        if (resp) {
          this.data = resp.info;
          this.isLoading = false;
        } else {
          this.router.navigateByUrl('tickets');
        }
      });
  }

  private getFirebaseTicket(
    language: string,
    species: string,
    ticketId: string,
  ): void {
    this.firebaseService.getDefaultTicket(language, species, ticketId)
      .subscribe(data => {
        if (data) {
          this.data = data.info;
          this.isLoading = false;
        } else {
          this.router.navigateByUrl('lab-page');
        }
      });
  }

  // private getDefaultTicket(
  //   userID: string,
  //   token: string,
  //   petID: string,
  //   ticketId: string,
  //   language: string,
  // ): void {
  //   this.ticketService.getTicket(userID, token, petID, ticketId, language)
  //     .subscribe(data => {
  //       if (data) {
  //         this.data = data.info;
  //         this.isLoading = false;
  //       } else {
  //         this.router.navigateByUrl('lab-page');
  //       }
  //     });
  // }

  ionViewWillLeave() {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
