import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from '../../user/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuard implements CanActivate {
  constructor(
    private router: Router,
    private userAuth: AuthService
  ) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!localStorage.getItem('sw-token')) {
      console.log('logout')
      this.userAuth.logOut();
      return false;
    // } else if (!localStorage.getItem('showWalkthrough')) {
    //   console.log('to walkthrough');
    //   this.router.parseUrl('walkthrough');
    //   return false;
    }
    else if (!localStorage.getItem('activePet')) {
      console.log('to pets/pet-create');
      return this.router.parseUrl('pets/pet-create');
    }
    console.log('to designated route');
    return true;
  }

}
