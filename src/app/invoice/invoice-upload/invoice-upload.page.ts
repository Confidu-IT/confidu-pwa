import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../user/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../shared/services/common/common.service';
import { TranslateService } from '@ngx-translate/core';
import {switchMap, tap} from 'rxjs/operators';

@Component({
  selector: 'app-invoice-upload',
  templateUrl: './invoice-upload.page.html',
  styleUrls: ['./invoice-upload.page.scss'],
})
export class InvoiceUploadPage {
  public uploadImage = '../../../../assets/icons/care-card/upload_img.svg';
  public replacementImage = '../../../../assets/icons/care-card/parasitenrisiko.svg';
  public pages: string[];
  public user: any;
  public uploadPath: string;
  public showAttachmentComponent: boolean;
  public get hasFiles(): boolean {
    return this.pages?.length > 0;
  }
  public showUploader: boolean;
  public isLoading: boolean;

  private subscription: Subscription;
  private readonly routeSub: Subscription;
  private params: any;
  private random: any;
  private language: string;
  private label: string;
  private routeLabel: string;


  constructor(
    private userAuth: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private commonService: CommonService,
    private translateService: TranslateService
    ) {
    this.routeSub = this.activatedRoute.params
      .subscribe(params => {
        console.log(params);
      this.params = params;
      });
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.language = this.commonService.language;
    this.translateService.use(this.language);
    this.translateService.get('PRESCRIPTION_UPLOAD_PAGE')
      .subscribe(values => {
        console.log('values', values)
       this.label = values.LABEL;
        this.routeLabel = values.ROUTE_LABEL;
      });
    this.subscription = this.userAuth.user$.pipe(
      tap(user => this.user = user),
      switchMap(() => {
        return this.commonService.getCarecardListContent(this.user.uid, this.params.petId, 'parasite', this.user.za);
      })
    ).subscribe(resp => {
      if (resp?.currentList.length > 0) {
        this.showUploader = true;
      }

      this.isLoading = false;

      this.showAttachmentComponent = true;
      this.random = Date.now();
      this.uploadPath = `invoice/${this.random}`;
    });
  }

  public onClickActionButton(): void {
    this.router.navigateByUrl(`tickets/ticket/es+esccap/${this.routeLabel}/null/questions`);
  }

  public receiveAddedFiles(event): void {
    this.pages = [];
    for (const page of event) {
      this.pages.push(`${this.uploadPath}/${page}`);
    }
  }

  public goBack(): void {
    this.router.navigateByUrl(`pets/pet-care-card/${this.params.petId}/${this.params.label}/${this.params.key}`);
  }

  public onProgress() {
    console.log('this.pages', this.pages);
    const petId = localStorage.getItem('activePet');
    console.log('petId', petId);
    // if (this.pages?.length > 0 || !petId) {
    //   return;
    // }
    this.commonService.sendInvoice(this.user.za, petId, this.pages)
      .subscribe(response => {
        this.pages = [];
        this.uploadPath = undefined;
        console.log('response', response);
        this.router.navigateByUrl(`invoice-result/${response.key}`);
      });


  }

  ionViewWillLeave() {
    this.isLoading = true;
    this.pages = undefined;
    this.showUploader = false;
    this.showAttachmentComponent = false;
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }


}
