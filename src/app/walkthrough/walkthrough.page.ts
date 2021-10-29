import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CommonService } from '../shared/services/common/common.service';
import { Router } from '@angular/router';
import { IonSlides, Platform } from '@ionic/angular';

@Component({
  selector: 'app-walkthrough',
  templateUrl: './walkthrough.page.html',
  styleUrls: ['./walkthrough.page.scss'],
})
export class WalkthroughPage implements OnInit {
  public isLoading: boolean;
  public slides: any;
  public buttonText: string;
  public imagePath = '../../../assets/icons/walkthrough';
  @ViewChild('slider') slider: IonSlides;

  private language: string;
  private cancelText: string;
  private progressText: string;
  private device: string;

  constructor(
    private translateService: TranslateService,
    private commonService: CommonService,
    private platform: Platform,
    private router: Router
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.language = this.commonService.language;
    this.translateService.use(this.language);
    this.translateService.get('WALKTHROUGH_PAGE')
      .subscribe(values => {
        this.cancelText = values.CANCEL;
        this.progressText = values.PROGRESS;
        this.buttonText = this.cancelText;
      });

    if (this.platform.platforms().includes('mobile')) {
      if (this.platform.platforms().includes('ios')) {
        this.device = 'iphone';
      } else if (this.platform.platforms().includes('android')) {
        this.device = 'android';
      }
    }

    this.slides = [
      `${this.imagePath}/${this.language}/${this.language}_start.svg`,
      `${this.imagePath}/${this.language}/${this.language}_televet.svg`,
      `${this.imagePath}/${this.language}/${this.language}_carecard.svg`,
      `${this.imagePath}/${this.language}/${this.language}_scan.svg`,
      `${this.imagePath}/${this.language}/${this.language}_planer.svg`,
      `${this.imagePath}/${this.language}/${this.language}_test.svg`,
      `${this.imagePath}/${this.language}/${this.device}_${this.language}.svg`,
    ];

    this.isLoading = false;
  }



  public onLastSlide() {
    this.slider.isEnd().then(resp => {
      if (resp === true) {
        this.buttonText = this.progressText;
      }
    });
  }

  public onClose(): void {
    const route = localStorage.getItem('activePet') ? 'home' : 'pets/pet-create';
    this.router.navigateByUrl(route);
  }

}
