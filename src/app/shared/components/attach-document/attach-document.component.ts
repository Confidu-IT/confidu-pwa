import { Component, ElementRef, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FirebaseService } from '../../services/firebase/firebase.service';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { CommonService } from '../../services/common/common.service';
import { finalize, last, map } from 'rxjs/operators';
import { ModalController } from '@ionic/angular';
import { DocumentZoomModalPage } from '../../document-zoom-modal/document-zoom-modal.page';
import { Observable } from 'rxjs';
import { TicketService } from '../../../tickets/ticket-service/ticket-service';

@Component({
  selector: 'app-attach-document',
  templateUrl: './attach-document.component.html',
  styleUrls: ['./attach-document.component.scss'],
})
export class AttachDocumentComponent {
  private petId = localStorage.getItem('activePet');

  public uploadedFiles: any[] = [];
  public uploadImg = `../../assets/icons/hook2.svg`;
  public uploadProgress: Observable<number>;

  @Input() user: any;
  @Input() path;
  @Output() attachments = new EventEmitter<string[]>();
  @ViewChild('filePicker') filePickerRef: ElementRef<HTMLInputElement>;

  constructor(
    private translateService: TranslateService,
    private firebaseService: FirebaseService,
    private storage: AngularFireStorage,
    private commonService: CommonService,
    private ticketService: TicketService,
    private modalCtrl: ModalController
  ) {
    this.translateService.setDefaultLang(this.translateService.getBrowserLang()); // fallback
    this.translateService.use(this.translateService.getBrowserLang());

    this.ticketService.uploadDocs
      .subscribe(data => {
        if (data.length < 1) {
          this.uploadedFiles = [];
        }
      });
  }

  public onPickDocument(): void {
    if (!this.petId || !this.user.uid) {
      return;
    }
    this.filePickerRef.nativeElement.click();
  }

  public onZoomImage(imgLink: string) {
    this.presentModal(this.user, imgLink, this.path);
  }

  public onFileChosen(data): void {
    const file = (data.target as HTMLInputElement).files[0];
    const arr = file.type.split('/');
    const type = arr[1];
    const hash = `${this.commonService.createUID()}.${type}`;
    const filePath = `user-docs/${this.user.uid}/${this.petId}/${this.path}/${hash}`;
    const task: AngularFireUploadTask = this.storage.upload(filePath, file);

    this.uploadProgress = task.percentageChanges();

    task.snapshotChanges().pipe(
      last(),
    ).subscribe(response => {
      if (response) {
        this.uploadedFiles.push(response?.ref?.name);
        this.addAttachments(this.uploadedFiles);
        this.uploadProgress = null;
      }
    });
  }

  private addAttachments(files: string[]) {
    this.ticketService.setUploadDocs(files);
    this.attachments.emit(files);
  }

  private removeElementFromArray(el: string) {
   const filtered =  this.uploadedFiles.filter((value) => {
      return value !== el;
    });

   this.uploadedFiles = filtered;
  }

  private async presentModal(user: any, link: string, path: string) {
    const modal = await this.modalCtrl.create({
      component: DocumentZoomModalPage,
      componentProps: {
        user,
        link,
        path
      }
    });
    modal.onDidDismiss()
      .then((response: any) => {
        if (response.data) {
          this.removeElementFromArray(response.data);
        }
        // console.log('this.uploadedFiles', this.uploadedFiles);
        this.addAttachments(this.uploadedFiles);
      });
    return await modal.present();
  }


}
