import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import { AuthService } from '../../../user/auth.service';
import { environment } from '../../../../environments/environment';
import { ShopwareService } from '../../services/shopware/shopware.service';
import { Subscription } from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit, OnDestroy {
  @Input() backButton: boolean;
  @Input() menu: boolean;
  @Input() logo: boolean;
  @Input() title: string;
  @Input() settings: boolean;
  @Input() cart: boolean;

  public confidu = environment.logo;
  public backButtonText = '';
  // public cart: boolean;
  // public cartSubscription: Subscription;
  public cartIcon: string;

  private pristineCartIcon = '../../assets/icons/shop/cart_empty.svg';
  private dirtyCartIcon = '../../assets/icons/shop/cart_items.svg';

  constructor(
    private userAuth: AuthService,
    private router: Router,
    private shopwareService: ShopwareService
  ) {
  }


  ngOnInit() {
    console.log('init');
    this.cartIcon = this.pristineCartIcon;

  }

  ionViewWillEnter() {
    console.log('enter');
  }

  inViewWillLeave() {
    console.log('leave');
  }

  ngOnDestroy(): void {
    console.log('destroy');
  }
}
