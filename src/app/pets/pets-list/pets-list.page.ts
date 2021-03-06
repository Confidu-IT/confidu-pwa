import { Component } from '@angular/core';
import { FirebaseService } from '../../shared/services/firebase/firebase.service';
import { AuthService } from '../../user/auth.service';
import { IonItemSliding } from '@ionic/angular';
import { switchMap, map } from 'rxjs/operators';
import { CommonService } from '../../shared/services/common/common.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-pets-list',
  templateUrl: './pets-list.page.html',
  styleUrls: ['./pets-list.page.scss'],
})
export class PetsListPage {
  public isLoading = false;
  public pets: any[] = [];
  public activePet: string;
  public race: any;
  public user$: any;
  private subscription: Subscription;
  private language: string;

  constructor(
    private firebaseService: FirebaseService,
    private userAuth: AuthService,
    private commonService: CommonService,
    private translateService: TranslateService,
    private router: Router
  ) {
  }

  ionViewWillEnter(): void {
    this.language = this.commonService.language;
    this.translateService.use(this.language);
    this.activePet = localStorage.getItem('activePet');
    // console.log('this.activePet', this.activePet);
    this.subscription = this.userAuth.user$.pipe(
      map(user => {
        this.user$ = user;
      }),
      switchMap (() => {
        if (this.user$) {
          return this.firebaseService.getAllPets(this.user$.uid);
        }
      })
    ).subscribe(pets => {
      console.log('pets', pets);
      this.pets = pets;
      this.isLoading = false;
    });

  }

  // public onNavigate(petId: string, slidingItem: IonItemSliding) {
  //   slidingItem.close();
  //   this.router.navigateByUrl(`pets/pet-care-card/${petId}`);
  // }

  public onDelete(petId, slidingItem: IonItemSliding) {
    console.log('pets', this.pets.length);
    this.deleteFireBasePet(this.user$.uid, petId)
      .then(() => {
        this.commonService.presentToast('Profil erfolgreich gel??scht', 'primary');
        console.log('pets', this.pets.length);
        if (this.pets.length > 0) {
          const id = this.pets[0].id;
          this.firebaseService.createActivePetId(this.user$.uid, id)
            .then(() => {
              localStorage.setItem('activePet', id);
              this.activePet = id;
            });
        }
        slidingItem.closeOpened();
      })
      .catch(err => {
        console.log('error', err);
        this.commonService.presentToast('L??schung fehlgeschlagen', 'danger');
        slidingItem.closeOpened();
      });
  }

  public onSetActive(petId: string, slidingItem: IonItemSliding) {
    localStorage.setItem('activePet', petId);
    this.firebaseService.createActivePetId(this.user$.uid, petId)
      .then(() => {
        slidingItem.closeOpened();
        this.activePet = petId;
        // this.router.navigateByUrl('/');
      });
  }

  private async deleteFireBasePet(userId: string, petId: string): Promise<any> {
    await this.firebaseService.deletePet(this.user$.uid, petId);
    await this.firebaseService.deleteActivePetId(userId);
    return localStorage.removeItem('activePet');
  }


  ionViewWillLeave() {
    this.pets = [];
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

  }


}
