import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CommonService } from '../shared/services/common/common.service';
import { Router } from '@angular/router';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-walkthrough',
  templateUrl: './walkthrough.page.html',
  styleUrls: ['./walkthrough.page.scss'],
})
export class WalkthroughPage implements OnInit {
  public isLoading: boolean;
  public slides: any;
  public imagePath = '../../../assets/icons/walkthrough';
  @ViewChild('slider') slider: IonSlides;

  constructor(
    private translateService: TranslateService,
    private commonService: CommonService,
    private router: Router
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.translateService.setDefaultLang(this.commonService.language); // fallback
    this.translateService.use(this.translateService.getBrowserLang());
    this.translateService.get('WALKTHROUGH_PAGE')
      .subscribe(data => {
        this.slides = data.SLIDES;
        this.isLoading = false;
      });
  }

  public onLastSlide() {
    this.slider.isEnd().then(resp => {
      if (resp === true) {
        this.onClose();
      }
    });
  }

  public onClose(): void {
    const route = localStorage.getItem('activePet') ? 'home' : 'pets/pet-create';
    this.router.navigateByUrl(route);
  }

}
