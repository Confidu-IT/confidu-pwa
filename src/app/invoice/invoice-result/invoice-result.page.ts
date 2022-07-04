import { Component } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../../user/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../shared/services/common/common.service';
import { TranslateService } from '@ngx-translate/core';
import { map, startWith, switchMap, tap } from 'rxjs/operators';
import { FirebaseService } from '../../shared/services/firebase/firebase.service';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-invoice-result',
  templateUrl: './invoice-result.page.html',
  styleUrls: ['./invoice-result.page.scss'],
})
export class InvoiceResultPage {
  private subscription: Subscription;
  private routeSub: Subscription;
  private params: any;
  private language: string;
  private petId: string;
  private vetVisit: string;
  private routeLabel: string;

  public replacementImage = '../../../../assets/icons/care-card/upload_img.svg';
  public showReplacer: boolean;

  public user: any;
  public isLoading: boolean;
  public result: any;
  public pet: any;
  public vet: any;

  public medForm: FormGroup;
  public meds: any[];
  public filteredMeds: Observable<any[]>;
  public medications: any;
  public selectedMedication: any;

  public diagnosisForm: FormGroup;
  public diags: any[];
  public filteredDiagnosis: Observable<any[]>;
  public diagnosis: any;
  public selectedDiagnosis: any;

  public therapyForm: FormGroup;
  public theraps: any[];
  public filteredTherapy: Observable<any[]>;
  public therapy: any;
  public selectedTherapy: any;

  public findingsForm: FormGroup;
  public finds: any[];
  public filteredFinding: Observable<any[]>;
  public findings: any;
  public selectedFinding: any;

  public get maxDate(): string {
    const today = new Date().toISOString();
    const event = new Date(today);
    const year = event.getFullYear();
    const month = String(event.getMonth() + 1).padStart(2, '0');
    const day = String(event.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  constructor(
    private userAuth: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private commonService: CommonService,
    private firebaseService: FirebaseService,
    private translateService: TranslateService
  ) {
    this.routeSub = this.activatedRoute.params
      .subscribe(params => {
        console.log('params', params);
        this.params = params;
      });

    this.medForm = new FormGroup({
      med: new FormControl(null, {
        updateOn: 'change'
      })
    });
    this.diagnosisForm = new FormGroup({
      diagnosis: new FormControl(null, {
        updateOn: 'change'
      })
    });
    this.therapyForm = new FormGroup({
      therapy: new FormControl(null, {
        updateOn: 'change'
      })
    });
    this.findingsForm = new FormGroup({
      finding: new FormControl(null, {
        updateOn: 'change'
      })
    });
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.language = this.commonService.language;
    this.translateService.use(this.language);
    this.translateService.get('PRESCRIPTION_RESULT_PAGE')
      .subscribe(values => {
        this.vetVisit = values.VET_VISIT;
        this.routeLabel = values.ROUTE_LABEL
      });
    this.subscription = this.userAuth.user$.pipe(
      tap(user => user),
      switchMap(user => {
        this.user = user;
        this.petId = localStorage.getItem('activePet');
        if (!this.user || !this.petId) {
          this.router.navigateByUrl('/');
        }
        return this.firebaseService.getPetById(user.uid, this.petId);
      }),
      switchMap(pet => {
        this.pet = pet;
        return this.commonService.getCarecardListContent(this.user.uid, this.petId, 'ectopar_cc', this.user.za);
      }),
      switchMap(content => {
        if (content?.currentList.length < 1) {
          this.showReplacer = true;
        }

        let key = this.params.key === 'null' ? null : this.params.key;
        return this.commonService.getInvoiceResult(this.user.za, this.petId, this.user.uid, key);
      })
    ).subscribe(result => {
      console.log('result', result);
      if (!result) {
        this.router.navigateByUrl('/');
      }

      this.meds = [];
      this.diags = [];
      this.theraps = [];
      this.finds = [];

      if (result?.medication?.list) {
        for (const med of result.medication.list) {
          this.meds.push(med);
        }
      }

      if (result?.diagnosis?.list) {
        for (const diag of result.diagnosis.list) {
          this.diags.push(diag);
        }
      }

      if (result?.therapy?.list) {
        for (const therap of result.therapy.list) {
          this.theraps.push(therap);
        }
      }

      if (result?.findings?.list) {
        for (const find of result.findings.list) {
          this.finds.push(find);
        }
      }

      if (result?.vet) {
        this.vet = result.vet;
      }

      this.fetchMedications();
      this.fetchDiagnosis();
      this.fetchTherapy();
      this.fetchFindings();
      this.result = result;
      this.isLoading = false;
    });
  }

  public onClickActionButton(): void {
    this.router.navigateByUrl(`tickets/ticket/e+ecto/${this.routeLabel}/null/questions`);
  }

  public onRepeat(): void {
    this.router.navigateByUrl(`invoice-upload/${this.petId}/Tierarztbesuche/consultation_cc`);
  }

  public onProgress() {
    this.result.diagnosis.list = this.diags;
    this.result.findings.list = this.finds;
    this.result.medication.list = this.meds;
    this.result.therapy.list = this.theraps;
    // console.log('result', this.result);
    this.commonService.getKeyFromInvoiceData(this.user.za, this.petId, this.user.uid, this.result)
      .subscribe(data => {
        if (data.scanKey) {
          this.router.navigateByUrl(`tickets/invoice/${data.scanKey}/${this.vetVisit}/null/questions`);
        }
      });
  }

  public removeVet(): void {
    this.result.vet.data = null;
  }

  public removeEl(el: string, type: string) {
    if (type === 'med') {
      this.meds = this.meds.filter((value) => {
        return value !== el;
      });
    }
    if (type === 'diag') {
      this.diags = this.diags.filter((value) => {
        return value !== el;
      });
    }
    if (type === 'therapy') {
      this.theraps = this.theraps.filter((value) => {
        return value !== el;
      });
    }
    if (type === 'findings') {
      this.finds = this.finds.filter((value) => {
        return value !== el;
      });
    }
  }

  public onAddElement(type: string): void {
    if (type === 'med') {
      this.meds.push(this.selectedMedication);
      this.selectedMedication = undefined;
      this.medForm.patchValue({ med: '' });
      console.log('meds', this.meds);
    }

    if (type === 'diag') {
      this.diags.push(this.selectedDiagnosis);
      this.selectedDiagnosis = undefined;
      this.diagnosisForm.patchValue({ diagnosis: '' });
      // console.log('diags', this.diags);
    }

    if (type === 'therapy') {
      this.theraps.push(this.selectedTherapy);
      this.selectedTherapy = undefined;
      this.therapyForm.patchValue({ therapy: '' });
      // console.log('theraps', this.theraps);
    }

    if (type === 'findings') {
      this.finds.push(this.selectedFinding);
      this.selectedFinding = undefined;
      this.findingsForm.patchValue({ finding: '' });
      // console.log('finds', this.finds);
    }

  }

  public displayLabel(el?: any): any {
    return el ? el.name : undefined;
  }

  public onValueChange(event: any, list: string): void {
    if (!event.isUserInput) {
      return;
    }
    if (list === 'medication') {
      this.selectedMedication = event.source.value;
    }
    if (list === 'diagnosis') {
      this.selectedDiagnosis = event.source.value;
    }
    if (list === 'therapy') {
      this.selectedTherapy = event.source.value;
    }
    if (list === 'findings') {
      this.selectedFinding = event.source.value;
    }
  }

  private filterMedications(name: string) {
    const filterValue = name.toLowerCase();
    return this.medications.filter(option => {
      return option.name.toLowerCase().includes(filterValue);
    });
  }

  private filterDiagnosis(name: string) {
    const filterValue = name.toLowerCase();
    return this.diagnosis.filter(option => {
      return option.name.toLowerCase().includes(filterValue);
    });
  }

  private filterTherapy(name: string) {
    const filterValue = name.toLowerCase();
    return this.therapy.filter(option => {
      return option.name.toLowerCase().includes(filterValue);
    });
  }

  private filterFindings(name: string) {
    const filterValue = name.toLowerCase();
    return this.findings.filter(option => {
      return option.name.toLowerCase().includes(filterValue);
    });
  }

  private fetchMedications(): void {
    this.firebaseService.getScanDB(this.language, 'medication', this.pet.pet.species.value)
      .subscribe(med => {
        this.medications = med;
        if (this.medications?.length > 0) {
          this.filteredMeds = this.medForm.get('med').valueChanges
            .pipe(
              startWith(''),
              map(value => typeof value === 'string' ? value : value.name),
              map(name => name ? this.filterMedications(name) : this.medications.slice())
            );
        }
      });
  }


  private fetchDiagnosis(): void {
    this.firebaseService.getScanDB(this.language, 'diagnosis', this.pet.pet.species.value)
      .subscribe(data => {
        this.diagnosis = data;
        if (this.diagnosis?.length > 0) {
          this.filteredDiagnosis = this.diagnosisForm.get('diagnosis').valueChanges
            .pipe(
              startWith(''),
              map(value => typeof value === 'string' ? value : value.name),
              map(name => name ? this.filterDiagnosis(name) : this.diagnosis.slice())
            );
        }
      });
  }

  private fetchTherapy(): void {
    this.firebaseService.getScanDB(this.language, 'therapy', this.pet.pet.species.value)
      .subscribe(data => {
        this.therapy = data;
        if (this.therapy?.length > 0) {
          this.filteredTherapy = this.therapyForm.get('therapy').valueChanges
            .pipe(
              startWith(''),
              map(value => typeof value === 'string' ? value : value.name),
              map(name => name ? this.filterTherapy(name) : this.therapy.slice())
            );
        }
      });
  }
  private fetchFindings(): void {
    this.firebaseService.getScanDB(this.language, 'findings', this.pet.pet.species.value)
      .subscribe(data => {
        this.findings = data;
        if (this.findings?.length > 0) {
          this.filteredFinding = this.findingsForm.get('finding').valueChanges
            .pipe(
              startWith(''),
              map(value => typeof value === 'string' ? value : value.name),
              map(name => name ? this.filterFindings(name) : this.findings.slice())
            );
        }
      });
  }

  ionViewWillLeave() {
    this.meds = undefined;
    this.diags = undefined;
    this.theraps = undefined;
    this.finds = undefined;
    this.showReplacer = false;

    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }


}
