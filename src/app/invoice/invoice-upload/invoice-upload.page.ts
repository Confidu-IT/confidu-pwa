import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../user/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../shared/services/common/common.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-invoice-upload',
  templateUrl: './invoice-upload.page.html',
  styleUrls: ['./invoice-upload.page.scss'],
})
export class InvoiceUploadPage {
  public uploadImage = '../../../../assets/icons/care-card/upload_img.svg';
  public pages: string[];
  public user: any;
  public uploadPath: string;
  public showAttachmentComponent: boolean;
  public get hasFiles(): boolean {
    return this.pages?.length > 0;
  }

  private subscription: Subscription;
  private readonly routeSub: Subscription;
  private params: any;
  private random: any;
  private language: string;
  private label: string;


  constructor(
    private userAuth: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private commonService: CommonService,
    private translateService: TranslateService
    ) {
    this.routeSub = this.activatedRoute.params
      .subscribe(params => {
      this.params = params;
      });
  }

  ionViewWillEnter() {
    this.language = this.commonService.language;
    this.translateService.setDefaultLang(this.language); // fallback
    this.translateService.use(this.translateService.getBrowserLang());
    this.translateService.get('PRESCRIPTION_UPLOAD_PAGE')
      .subscribe(values => {
       this.label = values.LABEL;
      });
    this.subscription = this.userAuth.user$
      .subscribe(user => {
        this.showAttachmentComponent = true;
        this.user = user;
        this.random = Date.now();
        this.uploadPath = `invoice/${this.random}`;
      });
  }

  public receiveAddedFiles(event) {
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
    this.pages = undefined;
    this.showAttachmentComponent = false;
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }


}
