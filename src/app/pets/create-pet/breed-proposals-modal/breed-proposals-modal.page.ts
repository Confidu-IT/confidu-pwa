import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { map, startWith } from 'rxjs/operators';
import { FormControl, FormGroup } from '@angular/forms';
import { CommonService } from '../../../shared/services/common/common.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-breed-proposals-modal',
  templateUrl: './breed-proposals-modal.page.html',
  styleUrls: ['./breed-proposals-modal.page.scss'],
})
export class BreedProposalsModalPage implements OnInit {
  public isLoading: boolean;
  public form: FormGroup;
  public selectedBreed; any;
  @Input() breeds: any;
  @Input() proposals: any;

  public filteredOptions: any;
  private breed: any;

  constructor(
    private modalCtrl: ModalController,
    private commonService: CommonService,
    private translateService: TranslateService
  ) { }

  ngOnInit() {
    // console.log('this.breeds', this.breeds);
    // console.log('this.proposals', this.proposals);
    this.translateService.setDefaultLang(this.commonService.language); // fallback
    this.translateService.use(this.translateService.getBrowserLang());
    this.form = new FormGroup({
      breedList: new FormControl(null, {
        updateOn: 'change'
      }),
      proposalList: new FormControl(null, {
        updateOn: 'change'
      })
    });
    this.createBreedList(this.breeds);
  }

  public closeModal(): void {
    this.selectedBreed = null;
    this.modalCtrl.dismiss(null);
  }

  public passSelection() {
    console.log('click', this.selectedBreed);
    this.modalCtrl.dismiss(this.selectedBreed);
  }

  public raceLabel(race?: any): any {
    return race ? race.data.name_de : undefined;
  }

  private createBreedList(races: any[]) {
    // console.log('races', races);
    this.filteredOptions = this.form.get('breedList').valueChanges
      .pipe(
        startWith(''),
        map(value => {
          this.breed = value;
          return this.filterRace(races, value);
        })
      );
  }

  private filterRace(racesList: any, value: string) {
    let filterValue;
    if (typeof value === 'string') {
      filterValue = value.toLowerCase();
    }
    return racesList.filter(option => {
      return option.data.name_de.toLowerCase().includes(filterValue);
    });
  }

}
