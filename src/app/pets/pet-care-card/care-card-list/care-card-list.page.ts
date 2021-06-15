import { Component } from '@angular/core';
import { AuthService } from '../../../user/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { FirebaseService } from '../../../shared/services/firebase/firebase.service';
import { TranslateService } from '@ngx-translate/core';
import { CommonService } from '../../../shared/services/common/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { TicketService } from '../../../tickets/ticket-service/ticket-service';
import { switchMap, tap } from 'rxjs/operators';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { DiseasesModalPage } from '../../../diseases/diseases-modal/diseases-modal.page';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-care-card-list',
  templateUrl: './care-card-list.page.html',
  styleUrls: ['./care-card-list.page.scss'],
})
export class CareCardListPage {
  public isLoading: boolean;
  public iconPath = '../../../../assets/icons/care-card';
  public chevron = `${this.iconPath}/chevron-forward-outline.svg`;
  public paperclip = `${this.iconPath}/clip.svg`;
  public careCard: any;
  public listOpen = false;
  public imageZoom: boolean;
  public enlargedImg: string;
  public enlargedPdf: any;
  public isImg: boolean;
  public isPdf: boolean;
  public doUpload: string;
  public doManual: string;

  private subscription: Subscription;
  private readonly routeSub: Subscription;
  public user: any;
  private language: string;
  private petId: string;
  private key: string;
  private link: any;
  private hasTicket: boolean;
  private tickets: any[];
  private ticketSub: Subscription;
  private label: string;
  private modalTitle: {
    doc: string;
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    public userAuth: AuthService,
    private afAuth: AngularFireAuth,
    private firebaseService: FirebaseService,
    private translateService: TranslateService,
    private commonService: CommonService,
    private ticketService: TicketService,
    private router: Router,
    private http: HttpClient,
    private actionSheetCtrl: ActionSheetController,
    private modalCtrl: ModalController,
    private sanitizer: DomSanitizer
  ) {
    this.routeSub = this.activatedRoute.params
      .subscribe(params => {
        // console.log('params', params);
        this.petId = params.petId;
        this.key = params.key;
        this.label = params.label;
      });
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.language = this.commonService.language;
    this.translateService.use(this.language);
    this.translateService.get('CARE_CARD_LIST_PAGE')
      .subscribe(values => {
        this.modalTitle = {
          doc: values.ADD_DOC,
        };
        this.doUpload = values.UPLOAD;
        this.doManual = values.MANUAL;
      });
    this.subscription = this.userAuth.user$.pipe(
      tap(user => {
        this.user = user;
      }),
      switchMap(() => {
        return this.firebaseService.getTicketsByPet(this.user.uid, this.petId);
      }),
      switchMap(tickets => {
        this.tickets = tickets;
        return this.getContent();
      })
    ).subscribe(data => {
        console.log('data', data);
        // console.log('this.tickets', this.tickets);
        if (data.currentList) {
          data.currentList.sort((a, b) => {
            // @ts-ignore
            return new Date(b.eventDate) - new Date(a.eventDate);
          });
          }
        if (data.terminatedList) {
          data.terminatedList.sort((a, b) => {
            // @ts-ignore
            return new Date(b.eventDate) - new Date(a.eventDate);
          });
        }
        this.careCard = data;
        this.link = this.careCard.link;
        this.isLoading = false;
      }
    );
  }

  public onClickLink(list: string, key: string, venom: string, id: string): void {
    const url = `pets/pet-care-card-detail/${key}/${list}/${venom}/${id}/${this.label}`;
    // console.log('url', url);
    this.router.navigateByUrl(url);
  }

  public onClickButton(action: string): any {
    if (this.key === 'consultation_cc') {
      this.showActionSheet();
      return;
    }
    if (this.key === 'foodcheck_cc') {
      return this.router.navigateByUrl(`ration-check`);
    }
    if (action === 'update') {
      let ticketId;
      for (const ticket of this.tickets) {
        if (ticket.ticketKey === this.link) {
          console.log('Bingo');
          ticketId = ticket.id;
          this.hasTicket = true;
          break;
        }
      }
      this.manageTicket(ticketId);
    } else if (action !== 'update') {
      console.log(this.modalTitle);
      this.presentModal(this.user, 'doc', this.modalTitle.doc);
    }
  }

  public openList() {
    this.listOpen = this.listOpen !== true;
  }

  public onOpenDocument(link: string) {
    console.log('link', link);
    this.commonService.getSecureLink(
      link,
      `user-docs`,
      localStorage.getItem('activePet'),
      this.user.za
    ).subscribe(data => {
      if (data) {
        const str = data.url;
        const x = str.search('pdf');
        if (x !== -1) {
          this.isPdf = true;
          // this.enlargedPdf = data.url;
          this.enlargedPdf = this.sanitizer.bypassSecurityTrustResourceUrl(data.url);
        } else {
          this.isImg = true;
          this.enlargedImg = data.url;
        }
        this.imageZoom = true;
      }
    });

  }

  public closeImage(): void {
    this.imageZoom = false;
    this.enlargedImg = null;
  }

  private manageTicket(id: string): Promise<any> {
    if (this.hasTicket) {
      return this.router.navigateByUrl(`tickets/ticket/${this.link}/${this.label}/${id}/questions`);
    } else {
      return this.router.navigateByUrl(`tickets/ticket/${this.link}/${this.label}/null/questions`);
      // this.ticketService.getTicket(this.user.uid, this.user.za, this.petId, this.link, this.language, false)
      //   .subscribe(ticket => {
      //     return this.router.navigateByUrl(`tickets/ticket/${this.link}/${this.label}/${ticket.id}/questions`);
      //   });
    }
  }

  private getContent(): Observable<any> {
    const baseUrl = environment.baseUrl;
    const url = `${baseUrl}/${this.language}/carecard/${this.key}`;
    const headers = {
      'Content-Type': 'application/json',
      'firebase-context-token': this.user.za,
      'sw-context-token': localStorage.getItem('sw-token') || null
    };
    const body = {
      petId: this.petId,
      uid: this.user.uid
    };
    return this.http.post(url, body, { headers });
  }

  private async presentModal(user: any, type: string, title: string): Promise<any> {
    const modal = await this.modalCtrl.create({
      component: DiseasesModalPage,
      componentProps: {
        user,
        type,
        title
      }
    });
    modal.onDidDismiss()
      .then((response: any) => {
       if (response?.data) {
         console.log(response);
       }
      });
    return await modal.present();
  }

  private showActionSheet(): void {
    this.actionSheetCtrl
      .create({
        buttons: [
          {
            text: this.doUpload,
            handler: () => {

              // http://localhost:8100/invoice-upload/128W4dJHV4Q8gyU2RoUI/Tierarztbesuche/consultation_cc
              // return this.router.navigateByUrl(`prescription-upload/${this.petId}/${this.label}/${this.key}`);
              return this.router.navigateByUrl(`invoice-upload/${this.petId}/Tierarztbesuche/consultation_cc`);
            }
          },
          {
            text: this.doManual,
            handler: () => {
              // http://localhost:8100/invoice-result/VKpWFikjaCbDbM1
              // return this.router.navigateByUrl(`tickets/invoice/invoice_man/${this.label}/questions`);
              return this.router.navigateByUrl(`invoice-result/null`);
            }
          },
          {
            text: 'Abbrechen',
            role: 'cancel'
          }
        ]
      })
      .then(actionSheetEl => {
        actionSheetEl.present();
      });
  }

  ionViewWillLeave() {
    this.imageZoom = false;
    this.enlargedImg = null;
    this.enlargedPdf = null;
    this.isImg = false;
    this.isPdf = false;
    this.listOpen = false;
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.ticketSub) {
      this.ticketSub.unsubscribe();
    }
    if (this.routeSub) {
      this.subscription.unsubscribe();
    }
  }


}
