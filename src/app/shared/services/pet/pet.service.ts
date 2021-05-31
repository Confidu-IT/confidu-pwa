import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PetService {

  private pet$ = new BehaviorSubject<any>(null);

  public get pet(): Observable<any> {
    return this.pet$.asObservable();
  }

  public setPet(data): void {
    this.pet$.next(data);
  }
}
