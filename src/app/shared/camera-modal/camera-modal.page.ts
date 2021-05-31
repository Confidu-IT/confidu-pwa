import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-camera-modal',
  templateUrl: './camera-modal.page.html',
  styleUrls: ['./camera-modal.page.scss'],
})
export class CameraModalPage implements OnInit {
  @ViewChild('video') public video: ElementRef;
  @ViewChild('canvas') public canvas: ElementRef;
  private stream: any;

  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    if (!('mediaDevices' in navigator) || !('getUserMedia' in navigator.mediaDevices)) {
      this.closeModal(null);
    } else {
      const constraints = {
        audio: false,
        video: {
          facingMode: 'environment',
          width: { min: 600, ideal: 1440},
          height: { min: 480, ideal: 2560 },
        }
      };

      navigator.mediaDevices.getUserMedia(constraints)
        .then((stream) => {
          this.stream = stream;
          this.video.nativeElement.srcObject = this.stream;
        })
        .catch((error) => {
          console.log('navigator.MediaDevices.getUserMedia error: ', error.message, error.name);
        });
    }
  }

  public takePhoto(): void {
    const width = this.video.nativeElement.clientWidth * 2;
    const height = this.video.nativeElement.clientHeight * 2;
    this.canvas.nativeElement.setAttribute('width', width);
    this.canvas.nativeElement.setAttribute('height', height);
    this.canvas.nativeElement.getContext('2d').drawImage(this.video.nativeElement, 0, 0, width, height);
    const dataURL = this.canvas.nativeElement.toDataURL();
    this.closeModal(dataURL);
  }

  public closeModal(data): void {
    if (this.stream) {
      this.stream.getTracks().map(track => {
        track.stop();
      });
    }
    this.modalCtrl.dismiss(data);
  }

}
