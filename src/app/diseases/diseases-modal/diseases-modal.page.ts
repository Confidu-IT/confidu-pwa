import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ActionSheetController, AlertController, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { CommonService } from '../../shared/services/common/common.service';
import { FirebaseService } from '../../shared/services/firebase/firebase.service';
import { last, map, startWith } from 'rxjs/operators';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { DiseasesService } from '../diseases.service';
import { CameraModalPage } from '../../shared/camera-modal/camera-modal.page';
import { Observable, Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-diseases-modal',
  templateUrl: './diseases-modal.page.html',
  styleUrls: ['./diseases-modal.page.scss'],
})
export class DiseasesModalPage {
  @Input() user;
  @Input() type;
  @Input() title;
  @Input() disease;

  private language: string;
  private dose: any[] = [];
  private days: string;
  private permanent: string;
  private delImageMsg: string;
  private docPosition: number;
  private imagePosition: number;
  private chosenDocList: string;
  private iconPath = '../../assets/icons/diseases';

  private autoCompSub: Subscription;

  public isLoading: boolean;
  public daily: string;
  public frequency: string[];
  public cancelText: string;
  public okText: string;
  public medTime: any[];
  public medUnit: any[];
  public medChoice: any;
  public timeAmount = 0;
  public showForm: boolean;
  public medNotes: string;
  public meds: any[];
  public pieces: any[];
  public parts: any[];
  public calculatedTreatmentTime: number | string;
  public currentMed: any = {};
  public enableProgress: boolean;
  public medPieceAmount: string;
  public medPartAmount: string;

  public documents: any[] = [];
  public currentDoc: any = {};
  public docRegions: any[];
  public docTypes: any[];
  public sizeWarning: boolean;
  public uploadedFiles: any[] = [];
  public docRegion: string;
  public docDate: string;
  public docType: string;
  public packUnit: string;
  public docs: any[] = [];
  public regions: any[] = [];
  public uploadResponse: any;
  public uploadImg = `${this.iconPath}/upload-img.svg`;
  public imageZoom: boolean;
  public enlargedImg: string;
  public enlargedPdf: string;

  public isImg: boolean;
  public isPdf: boolean;

  public filteredOptions: Observable<any[]>;
  public autoCompleteControl = new FormControl();
  public options: any[];
  public autoCompleteOptions: any[];

  @ViewChild('filePicker') filePickerRef: ElementRef<HTMLInputElement>;

  constructor(
    private modalCtrl: ModalController,
    private translateService: TranslateService,
    private firebaseService: FirebaseService,
    private storage: AngularFireStorage,
    private commonService: CommonService,
    private diseasesService: DiseasesService,
    private actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController
  ) {
  }

  ionViewWillEnter() {
    console.log('disease', this.disease);
    console.log('user', this.user);
    console.log('title', this.title);
    console.log('type', this.type);

    this.options = [];
    this.isLoading = true;
    this.enableProgress = false;
    this.meds = this.disease?.meds || [];
    this.regions = this.diseasesService.regions;
    this.language = this.commonService.language;
    this.translateService.setDefaultLang(this.language); // fallback
    this.translateService.use(this.translateService.getBrowserLang());
    this.translateService.get('DISEASE_MODAL_PAGE')
      .subscribe(values => {
        this.delImageMsg = values.DOC.DELETE;
        this.daily = values.MED.DAILY;
        this.days = values.MED.DAYS;
        this.permanent = values.MED.PERMANENT;
        this.frequency = [];
        for (let i = 1; i <= 5; i++) {
          this.frequency.push(`${i}x ${this.daily}`);
        }
        this.cancelText = values.CANCEL;
        this.okText = values.CONFIRM;
      });

    this.getAutoCompleteObject(this.language);

    // Change this
    this.packUnit = 'Tabl.';
    this.pieces = ['1', '2', '3', '4', '5'];
    this.parts = ['1/8', '1/4', '1/3', '1/2', '2/3', '3/4'];

    // if (this.autoCompleteControl) {
    //   this.filteredOptions = this.autoCompleteControl.valueChanges
    //     .pipe(
    //       startWith(''),
    //       map(value => typeof value === 'string' ? value : value?.name),
    //       map(name => name ? this._filter(name) : this.options.slice())
    //     );
    // }

    // this.filteredOptions = this.autoCompleteControl.valueChanges
    //   .pipe(
    //     startWith(''),
    //     map(value => typeof value === 'string' ? value : value?.name),
    //     map(name => name ? this._filter(name) : this.options.slice())
    //   );

    this.isLoading = false;

  }

  displayFn(data): string {
    return data && data.name ? data.name : '';
  }

  private _filter(name: string) {
    const filterValue = name.toLowerCase();
    return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  public closeModal() {
    this.modalCtrl.dismiss(null);
  }

  public onConfirm() {
    this.modalCtrl.dismiss(this.disease);
  }

  public onPickMed(): void {
    this.currentMed = this.medChoice;
    this.showForm = true;
    // console.log('currentMed', this.currentMed);
    // console.log('meds', this.meds);
  }

  public onPickFrequency(event): void {
    this.currentMed.frequency = event.value;
    this.timeAmount = parseInt(event.value.charAt(0), 10);
  }

  public onPickMedAmount(event, type, index): void {
    let val;

    if (type === 'medPiece') {
      this.medPieceAmount = event.value;
    } else if (type === 'medPart') {
      this.medPartAmount = event.value;
    }

    if (this.medPieceAmount && this.medPartAmount) {
      val = `${this.medPieceAmount} ${this.medPartAmount} ${this.packUnit}`;
    } else if (this.medPieceAmount && !this.medPartAmount) {
      val = `${this.medPieceAmount} ${this.packUnit}`;
    } else if (!this.medPieceAmount && this.medPartAmount) {
      val = `${this.medPartAmount} ${this.packUnit}`;
    } else {
      return;
    }

    if (!this.dose[index]) {
      this.dose[index] = { amount: val };
    } else {
      this.dose[index].amount = val;
    }
    // console.log('this.dose', this.dose);
  }

  public onPickMedTime(event, index): void {
    if (!this.dose[index]) {
      this.dose[index] = { time: event.detail.value };
    } else {
      this.dose[index].time = event.detail.value;
    }
  }

  public onMedDateStart(event): void {
    this.currentMed.startDate = event.detail.value;
  }

  public onMedDateEnd(event): void {
    this.currentMed.endDate = event.detail.value;
  }

  public onAddMedication(): void {
    if (this.medNotes) {
      this.currentMed.notes = this.medNotes;
    }

    if (this.dose.length > 0) {
      this.currentMed.dose = this.dose;
    }
    this.currentMed.treatmentPeriod = this.calculateTime();
    this.meds.push(this.currentMed);
    this.calculatedTreatmentTime = this.calculateTime();
    this.resetMedForm();
    this.enableProgress = true;
  }

  public onDeleteMedication(index) {
    this.meds.splice(index, 1);
  }

  public onPickBodyRegion(event) {
    this.currentDoc.region = event.value;
    // console.log('currentDoc', this.currentDoc);
  }

  public onPickDocDate(event) {
    this.currentDoc.date = event.detail.value;
    // console.log('currentDoc', this.currentDoc);
  }

  public onPickDocType(event) {
    this.currentDoc = event.value;
    this.regions.filter(item => {
      if (item.value.type === event.value.type) {
        this.docRegions = item.bodyParts;
      }
    });
  }

  public onZoomImage(link, doc, image, list) {
    console.log('link', link);
    this.commonService.getSecureLink(
      `findings/${link}`,
      `user-docs`,
      localStorage.getItem('activePet'),
      this.user.za
    ).subscribe(data => {
      if (data) {
        console.log('data', data);
        const str = data.url;
        const x = str.search('pdf');
        if (x !== -1) {
          console.log('pdf');
          this.isPdf = true;
          this.enlargedPdf = data.url;
        } else {
          console.log('img');
          this.isImg = true;
          this.enlargedImg = data.url;
        }
        // console.log('doc', doc);
        // console.log('image', image);
        this.chosenDocList = list;
        this.docPosition = Number(doc);
        this.imagePosition = Number(image);
        // this.enlargedImg = data.url;
        this.imageZoom = true;
      }
    });

  }

  public closeImage(): void {
    this.imageZoom = false;
    this.enlargedImg = null;
    this.enlargedPdf = null;
    this.isImg = false;
    this.isPdf = false;
  }

  public onAddDocument(): void {
    if (this.uploadResponse) {
      this.currentDoc.id = this.commonService.createUID();
      this.docs.push(this.currentDoc);
      console.log('docs', this.docs);
    }
    this.uploadResponse = null;
    // console.log('this.currentDoc', this.currentDoc);
    // console.log('this.docs', this.docs);
    // console.log('this.uploadedFiles', this.uploadedFiles);
    this.resetDocForm();
  }

  public onDeleteDocument(index): void {
    if (this.docs.length > 0) {
      this.docs.splice(index, 1);
    }
  }

  public onRemoveSingleFile() {
    this.deleteAlert(this.docPosition, this.imagePosition);
  }

  public onFileChosen(data) {
    let hash = this.commonService.createUID();
    let file;
    if (!this.currentDoc.type || !this.currentDoc.date || !this.currentDoc.region) {
      return;
    }
    this.uploadResponse = null;

    if (data.target) { // file
      file = (data.target as HTMLInputElement).files[0];
    } else { // img str
      file = data;
    }

    if (file.type === 'application/pdf') {
      hash = `${hash}-pdf`;
    } else {
      hash = `${hash}-image`;
    }
    // console.log('hash', hash);
    const petId = localStorage.getItem('activePet');
    const filePath = `user-docs/${this.user.uid}/${petId}/findings/${hash}`;
    let task: AngularFireUploadTask;
    const fileRef = this.storage.ref(filePath);

    if (typeof file === 'string') {
      task = fileRef.putString(file, 'data_url'); // upload cam img
    } else {
      task = this.storage.upload(filePath, file); // upload img from file
    }

    task.snapshotChanges().pipe(
      last(),
    ).subscribe(response => {
      this.sizeWarning = false;
      // console.log('response', response);
      if (response) {
        this.uploadResponse = response;
        this.uploadImg = this.currentDoc.image;
        this.uploadedFiles.push(response?.ref?.name);
        this.currentDoc.docs = this.uploadedFiles;
        // console.log('this.currentDoc', this.currentDoc);
        // console.log('this.docs', this.docs);
      }
    });
  }

  public numbers(n: number): number[] {
    return Array(n);
  }

  public validateMedForm(): boolean {
    return !((this.timeAmount === 0 || this.timeAmount !== this.dose.length) || !this.currentMed.startDate);

  }

  public onProgress() {
    // console.log('this.disease', this.disease);
    // console.log('this.meds', this.meds);

    if (this.type === 'med') {
      if (!this.disease.meds) {
        this.disease.meds = this.meds;
      } else {
        for (const med of this.meds) {
          this.disease.meds.push(med);
        }
      }
    }

    if (this.type === 'doc') {
      if (!this.disease) {
        return;
      }
      if (!this.disease.docs) {
        this.disease.docs = this.docs;
      } else {
        for (const doc of this.docs) {
          this.disease.docs.push(doc);
        }
      }
    }

    console.log('this.disease', this.disease);
    this.modalCtrl.dismiss(this.disease);
  }

  // private validateMedDoses(): boolean {
  //   let val: boolean;
  //   for (const item of this.dose) {
  //     val = 'amount' in item;
  //   }
  //   return val;
  // }

  public calculateTime(): number | string {
    const start = Date.parse(this.currentMed.startDate);
    const end = Date.parse(this.currentMed.endDate);
    const day = 1000 * 60 * 60 * 24;
    const result = Math.floor((end - start) / day);
    if (result === 0) {
      return `1 ${this.days}`;
    } else if (isNaN(result)) {
      return `${this.permanent}`;
    }
    return `${result} ${this.days}`;
  }

  public onChooseCam(): void {
    if (!('mediaDevices' in navigator) || !('getUserMedia' in navigator.mediaDevices)) {
      console.log('cam not working');
    } else {
      this.presentCamModal();
    }
  }

  public showActionSheet(): void {
    console.log('addPicture');
    this.actionSheetCtrl
      .create({
        header: 'Foto hinzufügen',
        buttons: [
          {
            text: 'Galerie',
            handler: () => {
              this.filePickerRef.nativeElement.click();
            }
          },
          {
            text: 'Kamera',
            handler: () => this.onChooseCam()
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

  private getAutoCompleteObject(lang: string): void {
    console.log('this.type', this.type);
    if (this.type === 'med') {
      this.autoCompSub = this.firebaseService.getMedication(lang)
      .subscribe(data => {
        console.log('data', data);
        // this.availableMeds = data;
        this.options = data;
        console.log('this.options', this.options);

        this.filteredOptions = this.autoCompleteControl.valueChanges
          .pipe(
            startWith(''),
            map(value => typeof value === 'string' ? value : value?.name),
            map(name => name ? this._filter(name) : this.options.slice())
          );

      });
    }
  }

  private async presentCamModal() {
    const modal = await this.modalCtrl.create({
      component: CameraModalPage
    });
    modal.onDidDismiss()
      .then((response: any) => {
        if (response?.data) {
          this.onFileChosen(response.data);
        }
      });
    return await modal.present();
  }

  async deleteAlert(docPos, imgPos) {
    const alert = await this.alertCtrl.create({
      message: this.delImageMsg,
      buttons: [
        {
          text: 'Abbrechen',
          role: 'cancel',
          cssClass: 'disease-doc-delete-cancel',
        }, {
          text: 'Löschen',
          cssClass: 'disease-doc-delete-action',
          handler: () => {
            if (this.chosenDocList === 'list') {
              this.docs[docPos].docs.splice(imgPos, 1);
            } else if (this.chosenDocList === 'current') {
              this.currentDoc.docs.splice(imgPos, 1);
            }
            this.closeImage();
          }
        }
      ]
    });
    await alert.present();
  }

  private resetMedForm(): void {
    this.timeAmount = 0;
    this.showForm = false;
    this.currentMed = {};
    this.dose = [];
    this.medChoice = undefined;
  }

  private resetDocForm() {
    this.docDate = null;
    this.docType = null;
    this.docRegion = null;
    this.dose = null;
    this.currentDoc = {};
    this.uploadedFiles = [];
    // this.docs = [];
  }

  ionViewWillLeave() {
    this.resetMedForm();
    this.resetDocForm();
    this.options = null;

    if (this.autoCompSub) {
      this.autoCompSub.unsubscribe();
    }
  }

}
