import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonService } from '../../shared/services/common/common.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../user/auth.service';
import { FirebaseService } from '../../shared/services/firebase/firebase.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { last, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prescription',
  templateUrl: './prescription-page.component.html',
  styleUrls: ['./prescription-page.component.scss'],
})
export class PrescriptionPage {
  public user: any;
  public diseases: any[];
  public meds: any[];
  public showMedication: boolean;
  public medChoice: string;
  public uploadedImages = [];
  public showUploader: boolean;
  @ViewChild('filePicker') filePickerRef: ElementRef<HTMLInputElement>;

  private language: string;
  private subscription: Subscription;


  constructor(
    private commonService: CommonService,
    private userAuth: AuthService,
    private storage: AngularFireStorage,
    private firebaseService: FirebaseService,
    private translateService: TranslateService,
    private router: Router
  ) { }

  ionViewWillEnter() {
    this.showUploader = false;
    this.language = this.commonService.language;
    this.translateService.use(this.language);
    this.subscription = this.userAuth.user$
      .subscribe((user) => {
        if (user) {
          this.user = user;
          this.getDiseases(this.language);
        }
      });
  }

  public onFileChosen(event) {
    const file = (event.target as HTMLInputElement).files[0];
    const timestamp = Date.now();
    const id = this.commonService.createUID();
    const petId = localStorage.getItem('activePet');
    const filePath = `user-data/invoices/${this.user.uid}/${petId}/${id}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file); // upload img from file

    task.snapshotChanges().pipe(
      last(),
      switchMap(() => fileRef.getDownloadURL())
    ).subscribe(url => {
      if (url && this.uploadedImages.length <= 5) {
        this.uploadedImages.push(url);
      }
    });
  }

  public onPickDisease(event): void {
    this.meds = null;
    this.medChoice = null;
    this.firebaseService.getMedToDisease(this.language, 'dog', event.value)
      .subscribe(med => {
        this.meds = med;
      });
  }

  public onPickMedication(event): void {
    this.showUploader = true;
  }

  public onRemoveImage(index): void {
    if (this.uploadedImages.length > 0) {
      this.uploadedImages.splice(index, 1);
    }
  }


  public goBack(): void {
    this.router.navigateByUrl('/');
  }

  public onProgressInvoice(): void {}


  private getDiseases(language: string): void {
    this.firebaseService.getDiseases(language, 'foo')
      .subscribe(data => {
        this.diseases = data;
      });
  }

  ionViewWillLeave() {
    this.uploadedImages = null;
    this.showUploader = false;
    this.diseases = null;
    this.meds = null;
    this.showMedication = false;
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
