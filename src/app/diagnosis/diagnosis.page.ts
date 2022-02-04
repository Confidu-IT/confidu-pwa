import { Component } from '@angular/core';
import {Subscription} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
import {CommonService} from '../shared/services/common/common.service';
import {AuthService} from '../user/auth.service';
import {FirebaseService} from '../shared/services/firebase/firebase.service';
import {switchMap, tap} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'app-diagnosis',
  templateUrl: './diagnosis.page.html',
  styleUrls: ['./diagnosis.page.scss'],
})
export class DiagnosisPage {
  public user: any;
  public isLoading: boolean;
  public iconPath = '../../../../assets/icons/diagnosis';
  public crossImg = `${this.iconPath}/cross.svg`;
  public diags: any;
  public diag: string;
  public questionnaireKey: string;

  private subscription: Subscription;
  private pet: any;
  private language: string;

  constructor(
    private translateService: TranslateService,
    private commonService: CommonService,
    private userAuth: AuthService,
    private firebaseService: FirebaseService,
    private router: Router,
  ) { }

  ionViewWillEnter() {
    this.isLoading = true;
    this.language = this.commonService.language;
    this.translateService.use(this.language);
    this.subscription = this.userAuth.user$.pipe(
      tap(user => user),
      switchMap(pet => {
        this.pet = pet;
        return this.firebaseService.getDiagnosis(this.language);
      })
    ).subscribe(diags => {
      console.log('diags', diags);
      this.diags = diags.data;
      this.isLoading = false;

    });
  }

  public onPickDiagnosis(event): void {
    this.diag = event.value.label;
    this.questionnaireKey = event.value.key;
  }

  public onProgress(): void {
    const uri = `/tickets/televet/${this.questionnaireKey}/${this.diag}/questions`;
    this.router.navigateByUrl(uri);
  }

  ionViewWillLeave() {
    this.diag = null;
    this.questionnaireKey = null;
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }


}
