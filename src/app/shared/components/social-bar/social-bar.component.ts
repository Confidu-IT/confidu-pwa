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
  public whatsAppImage = `${this.imagePath}/whatsapp.svg`;

  @Input() link;
  @Input() title;

  public onclick(provider: string): void {
    console.log('click', provider);
    console.log(this.link);
    console.log(this.title)

    switch (provider) {
      case 'facebook':
        window.open("https://www.facebook.com/share.php?u=" + this.link + "&title=" + this.title, '_blank');
        break;
      case 'twitter':
        window.open("http://twitter.com/intent/tweet?original_referer=" + this.link + "&url=" + this.link + "&text=" + this.title, '_blank');
        break;
      case 'whatsapp':
        window.open("whatsapp://send?text=" + this.link, '_blank');
        break;
      case 'mail':
        window.open("mailto:?subject=" + this.title + "&body=" + this.link, '_blank');
        break;
    }
  }

}
