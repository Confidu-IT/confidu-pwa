import {Component, Input, OnInit} from '@angular/core';
import { AuthService } from '../../../user/auth.service';
import { environment } from '../../../../environments/environment';
import { ShopwareService } from '../../services/shopware/shopware.service';
import { Subscription } from 'rxjs';
import {Router} from '@angular/router';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  @Input() backButton: boolean;
  @Input() menu: boolean;
  @Input() logo: boolean;
  @Input() title: string;
  @Input() settings: boolean;
  @Input() cart: boolean;
  @Input() createPet: boolean;

  public confidu = environment.logo;
  public backButtonText = '';
  // public cart: boolean;
  // public cartSubscription: Subscription;
  public cartIcon: string;
  public accountIcon = '../../assets/icons/navi/konto.svg';
  public get isAndroidMobile(): boolean {
    const platforms: string[] = this.platform.platforms();
    return platforms.includes('android') && platforms.includes('mobile');
  }

  private pristineCartIcon = '../../assets/icons/shop/cart_empty.svg';
  private dirtyCartIcon = '../../assets/icons/shop/cart_items.svg';

  constructor(
    private userAuth: AuthService,
    private router: Router,
    private shopwareService: ShopwareService,
    private platform: Platform
  ) {
  }

  ngOnInit() {
    this.cartIcon = this.pristineCartIcon;
  }
}
