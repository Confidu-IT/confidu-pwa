import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-question-info-modal',
  templateUrl: './question-info-modal.page.html',
  styleUrls: ['./question-info-modal.page.scss'],
})
export class QuestionInfoModalPage implements OnInit {
  @Input() content: any;
  @Input() img: string;
  private iconPath = '../../../../assets/icons/tickets';
  public infoIcon = `${this.iconPath}/shipment-modal-info.svg`;

  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    console.log('content', this.content);
    console.log('img', this.img);
  }

  public closeModal(): void {
    this.modalCtrl.dismiss(null);
  }

}
