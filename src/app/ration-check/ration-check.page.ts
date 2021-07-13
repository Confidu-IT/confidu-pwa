import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../user/auth.service';
import { FirebaseService } from '../shared/services/firebase/firebase.service';
import { CommonService } from '../shared/services/common/common.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
// import { TicketService } from '../tickets/ticket-service/ticket-service';

@Component({
  selector: 'app-ration-check',
  templateUrl: './ration-check.page.html',
  styleUrls: ['./ration-check.page.scss'],
})

export class RationCheckPage {
  private subscription: Subscription;
  private tickets: any;
  private iconPath = '../../../../assets/icons/ration-check';
  private hasTicket: boolean;
  private link = 'foodcheck';
  private language: string;

  public label = 'Futter Rechner';
  public petId: string;
  public key = 'foodcheck_cc';
  public rationImg = `https://firebasestorage.googleapis.com/v0/b/confidu-app.appspot.com/o/Ticket_grafics%2FRationscheck%2Fmahlzeiten-min.png?alt=media&token=787235a4-e9c7-43ca-a6b9-abe3284e8821`;
  public user: any;
  public isLoading: boolean;
  public pet: any;
  public ration: any;
  public rations: any[];

  constructor(
    private userAuth: AuthService,
    private afAuth: AngularFireAuth,
    private firebaseService: FirebaseService,
    private translateService: TranslateService,
    private commonService: CommonService,
    private router: Router,
    // private ticketService: TicketService
  ) { }

  ionViewWillEnter() {
    this.isLoading = true;

    // change this

    this.language = this.commonService.language;
    this.translateService.use(this.language);
    this.translateService.get('RATION_CHECK_PAGE')
      .subscribe(values => {
        const meal = values.MEAL;
        const meals = values.MEALS;

        this.rations = [
          { key: 'foodcheck', label: `1 ${meal}` },
          { key: 'foodcheck2', label: `2 ${meals}` },
          { key: 'foodcheck3', label: `3 ${meals}` },
          { key: 'foodcheck4', label: `4 ${meals}` },
          { key: 'foodcheck5', label: `5 ${meals}` },
          { key: 'foodcheck6', label: `6 ${meals}` }
        ];
      });

    this.subscription = this.userAuth.user$.pipe(
      tap(user => {
        this.user = user;
      }),
      switchMap(() => {
        this.petId = localStorage.getItem('activePet');
        return this.firebaseService.getPetById(this.user.uid, this.petId);
      }),
      switchMap(pet => {
        this.pet = pet;
        return this.firebaseService.getTicketsByPet(this.user.uid, this.petId);
      })
    ).subscribe(tickets => {
      this.tickets = tickets;
      console.log('tickets', this.tickets);
      this.isLoading = false;
    });
  }

  public onProgress(): void {
    // console.log(this.ration);
    let ticketId;
    for (const ticket of this.tickets) {
      if (ticket.ticketKey === this.link) {
        ticketId = ticket.id;
        this.hasTicket = true;
        break;
      }
    }
    this.manageTicket(ticketId);
  }

  private manageTicket(id: string): Promise<any> {
    if (this.hasTicket) {
      // console.log('has ticket', `tickets/ticket/${this.link}/${label}/${id}/questions`);
      return this.router.navigateByUrl(`tickets/ticket/${this.ration}/${this.label}/${id}/questions`);
    } else {
      return this.router.navigateByUrl(`tickets/ticket/${this.ration}/${this.label}/null/questions`);
      // this.ticketService.getTicket(this.user.uid, this.user.za, this.petId, this.link, this.language, false)
      //   .subscribe(ticket => {
      //     // console.log('ticket', ticket);
      //     return this.router.navigateByUrl(`tickets/ticket/${this.link}/${this.label}/${ticket.id}/questions`);
      //   });
    }
  }

  ionViewWillLeave() {
    this.ration = null;
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
