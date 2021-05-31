import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TicketResultPage } from './ticket-result/ticket-result.page';

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateGuard implements CanDeactivate<TicketResultPage> {

  constructor() { }

  canDeactivate(
    component: TicketResultPage,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return component.canDeactivate ? component.canDeactivate() : true;
  }

}
