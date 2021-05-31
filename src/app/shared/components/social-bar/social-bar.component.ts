import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-social-bar',
  templateUrl: './social-bar.component.html',
  styleUrls: ['./social-bar.component.scss'],
})
export class SocialBarComponent {
  private imagePath = `../../assets/icons/socials`;

  public fbImage = `${this.imagePath}/facebook.svg`;
  public twitterImage = `${this.imagePath}/twitter.svg`;
  public mailImage = `${this.imagePath}/mail.svg`;
  @Input() socials;

  public onclick(id: string): void {
    console.log('click', id);
  }

}
