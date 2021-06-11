import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { CommonService } from '../../shared/services/common/common.service';

@Injectable({
  providedIn: 'root'
})
export class TelevetService {
  public televetSpotButtons: any;
  public buttonData$ = new BehaviorSubject<{ symptom: string; code: string; }>({ symptom: '', code: '' });
  public get buttonData(): Observable<{ symptom: string; code: string }> {
    return this.buttonData$.asObservable();
  }

  private language: string;

  constructor(
    private translateService: TranslateService,
    private commonService: CommonService
  ) {
    this.language = this.commonService.language;
    this.translateService.use(this.language);
    this.translateService.get('TELEVET_PET_PAGE')
      .subscribe(televet => {
        // console.log('televet', televet);
        const text = televet.PET_SPOT_TEXT;

        this.televetSpotButtons = {
          dog: {
            male: {
              uncastrated: {
                eye: [
                  {
                    text: text.EYES_IMPAIRED,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.EYES_IMPAIRED,
                        code: 'SEH'
                      });
                    }
                  },
                  {
                    text: text.EYES_CHANGES,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.EYES_CHANGES,
                        code: 'AUV'
                      });
                    }
                  },
                  {
                    text: text.EYES_INJURY,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.EYES_INJURY,
                        code: 'NOE'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                belly: [
                  {
                    text: text.STOMACH_PAIN,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.STOMACH_PAIN,
                        code: 'BAU'
                      });
                    }
                  },
                  {
                    text: text.HEAVY_STOMACH_PAIN,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.HEAVY_STOMACH_PAIN,
                        code: 'NOP'
                      });
                    }
                  },
                  {
                    text: text.GASTRIC_TORSION,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.GASTRIC_TORSION,
                        code: 'NOD'
                      });
                    }
                  },
                  {
                    text: text.VOMIT,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.VOMIT,
                        code: 'EB'
                      });
                    }
                  },
                  {
                    text: text.FLATULENCE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.FLATULENCE,
                        code: 'FL'
                      });
                    }
                  },
                  {
                    text: text.DIARRHAE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.DIARRHAE,
                        code: 'DF'
                      });
                    }
                  },
                  {
                    text: text.VOMITING_DIARRHAE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.VOMITING_DIARRHAE,
                        code: 'ED'
                      });
                    }
                  },
                  {
                    text: text.CONSTIPATION,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.CONSTIPATION,
                        code: 'VS'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                legs: [
                  {
                    text: text.SWELLING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SWELLING,
                        code: 'UVN'
                      });
                    }
                  },
                  {
                    text: text.LAMENESS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.LAMENESS,
                        code: 'LAH'
                      });
                    }
                  },
                  {
                    text: text.PARALYSIS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.PARALYSIS,
                        code: 'NOL'
                      });
                    }
                  },
                  {
                    text: text.BROKEN_BONE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.BROKEN_BONE,
                        code: 'NOO'
                      });
                    }
                  },
                  {
                    text: text.STIFFNESS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.STIFFNESS,
                        code: 'STE'
                      });
                    }
                  },
                  {
                    text: text.MUSCULAR_DYSTROPHY,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.MUSCULAR_DYSTROPHY,
                        code: 'MUS'
                      });
                    }
                  },
                  {
                    text: text.SWELLING_JOINT,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SWELLING_JOINT,
                        code: 'GSC'
                      });
                    }
                  },
                  {
                    text: text.INJURY_CLAW,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.INJURY_CLAW,
                        code: 'KRV'
                      });
                    }
                  },
                  {
                    text: text.INJURY_PAW,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.INJURY_PAW,
                        code: 'PFO'
                      });
                    }
                  },
                  {
                    text: text.BITE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.BITE,
                        code: 'BIS'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                chest: [
                  {
                    text: text.SWELLING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SWELLING,
                        code: 'UVV'
                      });
                    }
                  },
                  {
                    text: text.COUGH,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.COUGH,
                        code: 'HU'
                      });
                    }
                  },
                  {
                    text: text.SNORING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SNORING,
                        code: 'SC'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                general: [
                  {
                    text: text.FEVER,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.FEVER,
                        code: 'FIE'
                      });
                    }
                  },
                  {
                    text: text.TEMPERATURE_LOW,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.TEMPERATURE_LOW,
                        code: 'UNT'
                      });
                    }
                  },

                  {
                    text: text.BEHAVIOUR_CHANGE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.BEHAVIOUR_CHANGE,
                        code: 'VEH'
                      });
                    }
                  },
                  {
                    text: text.SEIZURE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SEIZURE,
                        code: 'NOK'
                      });
                    }
                  },
                  {
                    text: text.SHOCK,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SHOCK,
                        code: 'NOI'
                      });
                    }
                  },
                  {
                    text: text.UNCONSCIOUSNESS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.UNCONSCIOUSNESS,
                        code: 'NOS'
                      });
                    }
                  },
                  {
                    text: text.WEAKNESS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.WEAKNESS,
                        code: 'WEA'
                      });
                    }
                  },
                  {
                    text: text.WEIGHT_LOSS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.WEIGHT_LOSS,
                        code: 'AB'
                      });
                    }
                  },
                  {
                    text: text.WEIGHT_GAIN,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.WEIGHT_GAIN,
                        code: 'AD'
                      });
                    }
                  },
                  {
                    text: text.HEATSTROKE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.HEATSTROKE,
                        code: 'NOH'
                      });
                    }
                  },
                  {
                    text: text.APNEA,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.APNEA,
                        code: 'NOC'
                      });
                    }
                  },
                  {
                    text: text.POISONING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.POISONING,
                        code: 'NOT'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                abdomen: [
                  {
                    text: text.TESTICLES_CHANGES,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.TESTICLES_CHANGES,
                        code: 'HOD'
                      });
                    }
                  },
                  {
                    text: text.NO_URINE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.NO_URINE,
                        code: 'NOU'
                      });
                    }
                  },
                  {
                    text: text.PENIS_DISCHARGE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.PENIS_DISCHARGE,
                        code: 'PA'
                      });
                    }
                  },
                  {
                    text: text.PENIS_ISSUE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.PENIS_ISSUE,
                        code: 'PV'
                      });
                    }
                  },
                  {
                    text: text.URINATION_PAIN,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.URINATION_PAIN,
                        code: 'SHA'
                      });
                    }
                  },
                  {
                    text: text.URINATION_CHANGE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.URINATION_CHANGE,
                        code: 'VU'
                      });
                    }
                  },
                  {
                    text: text.URINATION_LOW,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.URINATION_LOW,
                        code: 'GHA'
                      });
                    }
                  },
                  {
                    text: text.URINATION_HIGH_DRINKING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.URINATION_HIGH_DRINKING,
                        code: 'VUT'
                      });
                    }
                  },
                  {
                    text: text.URINATION_HIGH,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.URINATION_HIGH,
                        code: 'HHA'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                throat: [
                  {
                    text: text.SWELLING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SWELLING,
                        code: 'UVV'
                      });
                    }
                  },
                  {
                    text: text.STIFFNESS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.STIFFNESS,
                        code: 'STE'
                      });
                    }
                  },
                  {
                    text: text.MUSCULAR_DYSTROPHY,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.MUSCULAR_DYSTROPHY,
                        code: 'MUS'
                      });
                    }
                  },
                  {
                    text: text.BITE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.BITE,
                        code: 'BIS'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                fur: [
                  {
                    text: text.FUR_SHAGGY,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.FUR_SHAGGY,
                        code: 'SSF'
                      });
                    }
                  },
                  {
                    text: text.ITCHING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.ITCHING,
                        code: 'JUC'
                      });
                    }
                  },
                  {
                    text: text.FLEA_INVESTATION,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.FLEA_INVESTATION,
                        code: 'FLO'
                      });
                    }
                  },
                  {
                    text: text.SKIN_STINKY,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SKIN_STINKY,
                        code: 'URH'
                      });
                    }
                  },
                  {
                    text: text.FUR_LOSS_ITCHING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.FUR_LOSS_ITCHING,
                        code: 'ALJ'
                      });
                    }
                  },
                  {
                    text: text.FUR_LOSS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.FUR_LOSS,
                        code: 'ANJ'
                      });
                    }
                  },
                  {
                    text: text.INJURY_SKIN,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.INJURY_SKIN,
                        code: 'HVE'
                      });
                    }
                  },
                  {
                    text: text.HEAVY_BLEEDING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.HEAVY_BLEEDING,
                        code: 'NOB'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                head: [
                  {
                    text: text.SWELLING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SWELLING,
                        code: 'UVV'
                      });
                    }
                  },
                  {
                    text: text.MUSCULAR_DYSTROPHY,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.MUSCULAR_DYSTROPHY,
                        code: 'MUS'
                      });
                    }
                  },
                  {
                    text: text.BITE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.BITE,
                        code: 'BIS'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                mouth: [
                  {
                    text: text.TRAVEL_SICKNESS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.TRAVEL_SICKNESS,
                        code: 'REI'
                      });
                    }
                  },
                  {
                    text: text.EAT_FECES,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.EAT_FECES,
                        code: 'KOT'
                      });
                    }
                  },
                  {
                    text: text.EAT_GRASS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.EAT_GRASS,
                        code: 'GRA'
                      });
                    }
                  },
                  {
                    text: text.EAT_NONE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.EAT_NONE,
                        code: 'FRI'
                      });
                    }
                  },
                  {
                    text: text.DRINKING_HIGH,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.DRINKING_HIGH,
                        code: 'VTR'
                      });
                    }
                  },
                  {
                    text: text.URINATION_HIGH_DRINKING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.URINATION_HIGH_DRINKING,
                        code: 'VUT'
                      });
                    }
                  },
                  {
                    text: text.SWELLING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SWELLING,
                        code: 'UVN'
                      });
                    }
                  },
                  {
                    text: text.VOICE_CHANGES,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.VOICE_CHANGES,
                        code: 'STI'
                      });
                    }
                  },
                  {
                    text: text.FOOT_ODOR,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.FOOT_ODOR,
                        code: 'MG'
                      });
                    }
                  },
                  {
                    text: text.COUGH,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.COUGH,
                        code: 'HU'
                      });
                    }
                  },
                  {
                    text: text.VOMIT,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.VOMIT,
                        code: 'EB'
                      });
                    }
                  },
                  {
                    text: text.VOMITING_DIARRHAE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.VOMITING_DIARRHAE,
                        code: 'ED'
                      });
                    }
                  },
                  {
                    text: text.SNORING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SNORING,
                        code: 'SC'
                      });
                    }
                  },
                  {
                    text: text.BREATH_SHORTNESS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.BREATH_SHORTNESS,
                        code: 'NOA'
                      });
                    }
                  },
                  {
                    text: text.APNEA,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.APNEA,
                        code: 'NOC'
                      });
                    }
                  },
                  {
                    text: text.POISONING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.POISONING,
                        code: 'NOT'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                nose: [
                  {
                    text: text.NOSE_DRY,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.NOSE_DRY,
                        code: 'NAS'
                      });
                    }
                  },
                  {
                    text: text.SWELLING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SWELLING,
                        code: 'UVN'
                      });
                    }
                  },
                  {
                    text: text.NOSE_BLEEDING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.NOSE_BLEEDING,
                        code: 'NBL'
                      });
                    }
                  },
                  {
                    text: text.NOSE_DISCHARGE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.NOSE_DISCHARGE,
                        code: 'NA'
                      });
                    }
                  },
                  {
                    text: text.SNORING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SNORING,
                        code: 'SC'
                      });
                    }
                  },
                  {
                    text: text.SNEEZE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SNEEZE,
                        code: 'NIE'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                ear: [
                  {
                    text: text.EARS_HEARING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.EARS_HEARING,
                        code: 'HOE'
                      });
                    }
                  },
                  {
                    text: text.SWELLING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SWELLING,
                        code: 'UVN'
                      });
                    }
                  },
                  {
                    text: text.EARS_SWOLLEN,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.EARS_SWOLLEN,
                        code: 'GO'
                      });
                    }
                  },
                  {
                    text: text.EARS_SCRATCH,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.EARS_SCRATCH,
                        code: 'KO'
                      });
                    }
                  },
                  {
                    text: text.EARS_DISCHARGE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.EARS_DISCHARGE,
                        code: 'AO'
                      });
                    }
                  },
                  {
                    text: text.EARS_STINKY,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.EARS_STINKY,
                        code: 'UO'
                      });
                    }
                  },
                  {
                    text: text.EARS_INJURY,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.EARS_INJURY,
                        code: 'VO'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                butt: [
                  {
                    text: text.SWELLING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SWELLING,
                        code: 'UVV'
                      });
                    }
                  },
                  {
                    text: text.STIFFNESS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.STIFFNESS,
                        code: 'STE'
                      });
                    }
                  },
                  {
                    text: text.MUSCULAR_DYSTROPHY,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.MUSCULAR_DYSTROPHY,
                        code: 'MUS'
                      });
                    }
                  },
                  {
                    text: text.FLATULENCE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.FLATULENCE,
                        code: 'FL'
                      });
                    }
                  },
                  {
                    text: text.DIARRHAE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.DIARRHAE,
                        code: 'DF'
                      });
                    }
                  },
                  {
                    text: text.VOMITING_DIARRHAE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.VOMITING_DIARRHAE,
                        code: 'ED'
                      });
                    }
                  },
                  {
                    text: text.ITCHING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.ITCHING,
                        code: 'AJ'
                      });
                    }
                  },
                  {
                    text: text.CONSTIPATION,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.CONSTIPATION,
                        code: 'VS'
                      });
                    }
                  },
                  {
                    text: text.BITE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.BITE,
                        code: 'BIS'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                poison: [
                  {
                    text: text.CHOCOLATE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.CHOCOLATE,
                        code: 'p+POIC'
                      });
                    }
                  },
                  {
                    text: text.MEDS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.MEDS,
                        code: 'p+POIM'
                      });
                    }
                  },
                  {
                    text: text.TOBACCO,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.TOBACCO,
                        code: 'p+POIT'
                      });
                    }
                  },
                  {
                    text: text.MISC,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.MISC,
                        code: 'POIN'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                tail: [
                  {
                    text: text.SWELLING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SWELLING,
                        code: 'UVV'
                      });
                    }
                  },
                  {
                    text: text.STIFFNESS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.STIFFNESS,
                        code: 'STE'
                      });
                    }
                  },
                  {
                    text: text.BITE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.BITE,
                        code: 'BIS'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                back: [
                  {
                    text: text.SWELLING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SWELLING,
                        code: 'UVV'
                      });
                    }
                  },
                  {
                    text: text.STIFFNESS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.STIFFNESS,
                        code: 'STE'
                      });
                    }
                  },
                  {
                    text: text.MUSCULAR_DYSTROPHY,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.MUSCULAR_DYSTROPHY,
                        code: 'VS'
                      });
                    }
                  },
                  {
                    text: text.BITE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.BITE,
                        code: 'BIS'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ]
              },
              castrated: {
                eye: [
                  {
                    text: text.EYES_IMPAIRED,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.EYES_IMPAIRED,
                        code: 'SEH'
                      });
                    }
                  },
                  {
                    text: text.EYES_CHANGES,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.EYES_CHANGES,
                        code: 'AUV'
                      });
                    }
                  },
                  {
                    text: text.EYES_INJURY,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.EYES_INJURY,
                        code: 'NOE'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                belly: [
                  {
                    text: text.STOMACH_PAIN,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.STOMACH_PAIN,
                        code: 'BAU'
                      });
                    }
                  },
                  {
                    text: text.HEAVY_STOMACH_PAIN,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.HEAVY_STOMACH_PAIN,
                        code: 'NOP'
                      });
                    }
                  },
                  {
                    text: text.GASTRIC_TORSION,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.GASTRIC_TORSION,
                        code: 'NOD'
                      });
                    }
                  },
                  {
                    text: text.VOMIT,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.VOMIT,
                        code: 'EB'
                      });
                    }
                  },
                  {
                    text: text.FLATULENCE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.FLATULENCE,
                        code: 'FL'
                      });
                    }
                  },
                  {
                    text: text.DIARRHAE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.DIARRHAE,
                        code: 'DF'
                      });
                    }
                  },
                  {
                    text: text.VOMITING_DIARRHAE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.VOMITING_DIARRHAE,
                        code: 'ED'
                      });
                    }
                  },
                  {
                    text: text.CONSTIPATION,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.CONSTIPATION,
                        code: 'VS'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                legs: [
                  {
                    text: text.SWELLING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SWELLING,
                        code: 'UVN'
                      });
                    }
                  },
                  {
                    text: text.LAMENESS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.LAMENESS,
                        code: 'LAH'
                      });
                    }
                  },
                  {
                    text: text.PARALYSIS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.PARALYSIS,
                        code: 'NOL'
                      });
                    }
                  },
                  {
                    text: text.BROKEN_BONE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.BROKEN_BONE,
                        code: 'NOO'
                      });
                    }
                  },
                  {
                    text: text.STIFFNESS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.STIFFNESS,
                        code: 'STE'
                      });
                    }
                  },
                  {
                    text: text.MUSCULAR_DYSTROPHY,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.MUSCULAR_DYSTROPHY,
                        code: 'MUS'
                      });
                    }
                  },
                  {
                    text: text.SWELLING_JOINT,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SWELLING_JOINT,
                        code: 'GSC'
                      });
                    }
                  },
                  {
                    text: text.INJURY_CLAW,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.INJURY_CLAW,
                        code: 'KRV'
                      });
                    }
                  },
                  {
                    text: text.INJURY_PAW,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.INJURY_PAW,
                        code: 'PFO'
                      });
                    }
                  },
                  {
                    text: text.BITE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.BITE,
                        code: 'BIS'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                chest: [
                  {
                    text: text.SWELLING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SWELLING,
                        code: 'UVV'
                      });
                    }
                  },
                  {
                    text: text.COUGH,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.COUGH,
                        code: 'HU'
                      });
                    }
                  },
                  {
                    text: text.SNORING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SNORING,
                        code: 'SC'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                general: [
                  {
                    text: text.FEVER,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.FEVER,
                        code: 'FIE'
                      });
                    }
                  },
                  {
                    text: text.TEMPERATURE_LOW,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.TEMPERATURE_LOW,
                        code: 'UNT'
                      });
                    }
                  },

                  {
                    text: text.BEHAVIOUR_CHANGE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.BEHAVIOUR_CHANGE,
                        code: 'VEH'
                      });
                    }
                  },
                  {
                    text: text.SEIZURE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SEIZURE,
                        code: 'NOK'
                      });
                    }
                  },
                  {
                    text: text.SHOCK,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SHOCK,
                        code: 'NOI'
                      });
                    }
                  },
                  {
                    text: text.UNCONSCIOUSNESS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.UNCONSCIOUSNESS,
                        code: 'NOS'
                      });
                    }
                  },
                  {
                    text: text.WEAKNESS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.WEAKNESS,
                        code: 'WEA'
                      });
                    }
                  },
                  {
                    text: text.WEIGHT_LOSS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.WEIGHT_LOSS,
                        code: 'AB'
                      });
                    }
                  },
                  {
                    text: text.WEIGHT_GAIN,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.WEIGHT_GAIN,
                        code: 'AD'
                      });
                    }
                  },
                  {
                    text: text.HEATSTROKE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.HEATSTROKE,
                        code: 'NOH'
                      });
                    }
                  },
                  {
                    text: text.APNEA,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.APNEA,
                        code: 'NOC'
                      });
                    }
                  },
                  {
                    text: text.POISONING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.POISONING,
                        code: 'NOT'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                abdomen: [
                  {
                    text: text.TESTICLES_CHANGES,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.TESTICLES_CHANGES,
                        code: 'HOD'
                      });
                    }
                  },
                  {
                    text: text.NO_URINE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.NO_URINE,
                        code: 'NOU'
                      });
                    }
                  },
                  {
                    text: text.PENIS_DISCHARGE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.PENIS_DISCHARGE,
                        code: 'PA'
                      });
                    }
                  },
                  {
                    text: text.PENIS_ISSUE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.PENIS_ISSUE,
                        code: 'PV'
                      });
                    }
                  },
                  {
                    text: text.URINATION_PAIN,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.URINATION_PAIN,
                        code: 'SHA'
                      });
                    }
                  },
                  {
                    text: text.URINATION_CHANGE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.URINATION_CHANGE,
                        code: 'VU'
                      });
                    }
                  },
                  {
                    text: text.URINATION_LOW,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.URINATION_LOW,
                        code: 'GHA'
                      });
                    }
                  },
                  {
                    text: text.URINATION_HIGH_DRINKING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.URINATION_HIGH_DRINKING,
                        code: 'VUT'
                      });
                    }
                  },
                  {
                    text: text.URINATION_HIGH,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.URINATION_HIGH,
                        code: 'HHA'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                throat: [
                  {
                    text: text.SWELLING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SWELLING,
                        code: 'UVV'
                      });
                    }
                  },
                  {
                    text: text.STIFFNESS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.STIFFNESS,
                        code: 'STE'
                      });
                    }
                  },
                  {
                    text: text.MUSCULAR_DYSTROPHY,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.MUSCULAR_DYSTROPHY,
                        code: 'MUS'
                      });
                    }
                  },
                  {
                    text: text.BITE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.BITE,
                        code: 'BIS'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                fur: [
                  {
                    text: text.FUR_SHAGGY,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.FUR_SHAGGY,
                        code: 'SSF'
                      });
                    }
                  },
                  {
                    text: text.ITCHING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.ITCHING,
                        code: 'JUC'
                      });
                    }
                  },
                  {
                    text: text.FLEA_INVESTATION,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.FLEA_INVESTATION,
                        code: 'FLO'
                      });
                    }
                  },
                  {
                    text: text.SKIN_STINKY,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SKIN_STINKY,
                        code: 'URH'
                      });
                    }
                  },
                  {
                    text: text.FUR_LOSS_ITCHING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.FUR_LOSS_ITCHING,
                        code: 'ALJ'
                      });
                    }
                  },
                  {
                    text: text.FUR_LOSS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.FUR_LOSS,
                        code: 'ANJ'
                      });
                    }
                  },
                  {
                    text: text.INJURY_SKIN,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.INJURY_SKIN,
                        code: 'HVE'
                      });
                    }
                  },
                  {
                    text: text.HEAVY_BLEEDING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.HEAVY_BLEEDING,
                        code: 'NOB'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                head: [
                  {
                    text: text.SWELLING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SWELLING,
                        code: 'UVV'
                      });
                    }
                  },
                  {
                    text: text.MUSCULAR_DYSTROPHY,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.MUSCULAR_DYSTROPHY,
                        code: 'MUS'
                      });
                    }
                  },
                  {
                    text: text.BITE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.BITE,
                        code: 'BIS'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                mouth: [
                  {
                    text: text.TRAVEL_SICKNESS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.TRAVEL_SICKNESS,
                        code: 'REI'
                      });
                    }
                  },
                  {
                    text: text.EAT_FECES,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.EAT_FECES,
                        code: 'KOT'
                      });
                    }
                  },
                  {
                    text: text.EAT_GRASS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.EAT_GRASS,
                        code: 'GRA'
                      });
                    }
                  },
                  {
                    text: text.EAT_NONE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.EAT_NONE,
                        code: 'FRI'
                      });
                    }
                  },
                  {
                    text: text.DRINKING_HIGH,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.DRINKING_HIGH,
                        code: 'VTR'
                      });
                    }
                  },
                  {
                    text: text.URINATION_HIGH_DRINKING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.URINATION_HIGH_DRINKING,
                        code: 'VUT'
                      });
                    }
                  },
                  {
                    text: text.SWELLING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SWELLING,
                        code: 'UVN'
                      });
                    }
                  },
                  {
                    text: text.VOICE_CHANGES,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.VOICE_CHANGES,
                        code: 'STI'
                      });
                    }
                  },
                  {
                    text: text.FOOT_ODOR,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.FOOT_ODOR,
                        code: 'MG'
                      });
                    }
                  },
                  {
                    text: text.COUGH,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.COUGH,
                        code: 'HU'
                      });
                    }
                  },
                  {
                    text: text.VOMIT,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.VOMIT,
                        code: 'EB'
                      });
                    }
                  },
                  {
                    text: text.VOMITING_DIARRHAE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.VOMITING_DIARRHAE,
                        code: 'ED'
                      });
                    }
                  },
                  {
                    text: text.SNORING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SNORING,
                        code: 'SC'
                      });
                    }
                  },
                  {
                    text: text.BREATH_SHORTNESS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.BREATH_SHORTNESS,
                        code: 'NOA'
                      });
                    }
                  },
                  {
                    text: text.APNEA,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.APNEA,
                        code: 'NOC'
                      });
                    }
                  },
                  {
                    text: text.POISONING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.POISONING,
                        code: 'NOT'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                nose: [
                  {
                    text: text.NOSE_DRY,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.NOSE_DRY,
                        code: 'NAS'
                      });
                    }
                  },
                  {
                    text: text.SWELLING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SWELLING,
                        code: 'UVN'
                      });
                    }
                  },
                  {
                    text: text.NOSE_BLEEDING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.NOSE_BLEEDING,
                        code: 'NBL'
                      });
                    }
                  },
                  {
                    text: text.NOSE_DISCHARGE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.NOSE_DISCHARGE,
                        code: 'NA'
                      });
                    }
                  },
                  {
                    text: text.SNORING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SNORING,
                        code: 'SC'
                      });
                    }
                  },
                  {
                    text: text.SNEEZE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SNEEZE,
                        code: 'NIE'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                ear: [
                  {
                    text: text.EARS_HEARING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.EARS_HEARING,
                        code: 'HOE'
                      });
                    }
                  },
                  {
                    text: text.SWELLING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SWELLING,
                        code: 'UVN'
                      });
                    }
                  },
                  {
                    text: text.EARS_SWOLLEN,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.EARS_SWOLLEN,
                        code: 'GO'
                      });
                    }
                  },
                  {
                    text: text.EARS_SCRATCH,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.EARS_SCRATCH,
                        code: 'KO'
                      });
                    }
                  },
                  {
                    text: text.EARS_DISCHARGE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.EARS_DISCHARGE,
                        code: 'AO'
                      });
                    }
                  },
                  {
                    text: text.EARS_STINKY,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.EARS_STINKY,
                        code: 'UO'
                      });
                    }
                  },
                  {
                    text: text.EARS_INJURY,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.EARS_INJURY,
                        code: 'VO'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                butt: [
                  {
                    text: text.SWELLING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SWELLING,
                        code: 'UVV'
                      });
                    }
                  },
                  {
                    text: text.STIFFNESS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.STIFFNESS,
                        code: 'STE'
                      });
                    }
                  },
                  {
                    text: text.MUSCULAR_DYSTROPHY,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.MUSCULAR_DYSTROPHY,
                        code: 'MUS'
                      });
                    }
                  },
                  {
                    text: text.FLATULENCE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.FLATULENCE,
                        code: 'FL'
                      });
                    }
                  },
                  {
                    text: text.DIARRHAE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.DIARRHAE,
                        code: 'DF'
                      });
                    }
                  },
                  {
                    text: text.VOMITING_DIARRHAE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.VOMITING_DIARRHAE,
                        code: 'ED'
                      });
                    }
                  },
                  {
                    text: text.ITCHING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.ITCHING,
                        code: 'AJ'
                      });
                    }
                  },
                  {
                    text: text.CONSTIPATION,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.CONSTIPATION,
                        code: 'VS'
                      });
                    }
                  },
                  {
                    text: text.BITE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.BITE,
                        code: 'BIS'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                poison: [
                  {
                    text: text.CHOCOLATE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.CHOCOLATE,
                        code: 'p+POIC'
                      });
                    }
                  },
                  {
                    text: text.MEDS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.MEDS,
                        code: 'p+POIM'
                      });
                    }
                  },
                  {
                    text: text.TOBACCO,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.TOBACCO,
                        code: 'p+POIT'
                      });
                    }
                  },
                  {
                    text: text.MISC,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.MISC,
                        code: 'POIN'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                tail: [
                  {
                    text: text.SWELLING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SWELLING,
                        code: 'UVV'
                      });
                    }
                  },
                  {
                    text: text.STIFFNESS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.STIFFNESS,
                        code: 'STE'
                      });
                    }
                  },
                  {
                    text: text.BITE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.BITE,
                        code: 'BIS'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                back: [
                  {
                    text: text.SWELLING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SWELLING,
                        code: 'UVV'
                      });
                    }
                  },
                  {
                    text: text.STIFFNESS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.STIFFNESS,
                        code: 'STE'
                      });
                    }
                  },
                  {
                    text: text.MUSCULAR_DYSTROPHY,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.MUSCULAR_DYSTROPHY,
                        code: 'VS'
                      });
                    }
                  },
                  {
                    text: text.BITE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.BITE,
                        code: 'BIS'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ]
              }
            },
            female: {
              uncastrated: {
                eye: [
                  {
                    text: text.EYES_IMPAIRED,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.EYES_IMPAIRED,
                        code: 'SEH'
                      });
                    }
                  },
                  {
                    text: text.EYES_CHANGES,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.EYES_CHANGES,
                        code: 'AUV'
                      });
                    }
                  },
                  {
                    text: text.EYES_INJURY,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.EYES_INJURY,
                        code: 'NOE'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                belly: [
                  {
                    text: text.STOMACH_PAIN,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.STOMACH_PAIN,
                        code: 'BAU'
                      });
                    }
                  },
                  {
                    text: text.HEAVY_STOMACH_PAIN,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.HEAVY_STOMACH_PAIN,
                        code: 'NOP'
                      });
                    }
                  },
                  {
                    text: text.GASTRIC_TORSION,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.GASTRIC_TORSION,
                        code: 'NOD'
                      });
                    }
                  },
                  {
                    text: text.VOMIT,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.VOMIT,
                        code: 'EB'
                      });
                    }
                  },
                  {
                    text: text.FLATULENCE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.FLATULENCE,
                        code: 'FL'
                      });
                    }
                  },
                  {
                    text: text.DIARRHAE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.DIARRHAE,
                        code: 'DF'
                      });
                    }
                  },
                  {
                    text: text.VOMITING_DIARRHAE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.VOMITING_DIARRHAE,
                        code: 'ED'
                      });
                    }
                  },
                  {
                    text: text.CONSTIPATION,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.CONSTIPATION,
                        code: 'VS'
                      });
                    }
                  },
                  {
                    text: text.SUCKLES,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SUCKLES,
                        code: 'GES'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                legs: [
                  {
                    text: text.SWELLING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SWELLING,
                        code: 'UVN'
                      });
                    }
                  },
                  {
                    text: text.LAMENESS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.LAMENESS,
                        code: 'LAH'
                      });
                    }
                  },
                  {
                    text: text.PARALYSIS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.PARALYSIS,
                        code: 'NOL'
                      });
                    }
                  },
                  {
                    text: text.BROKEN_BONE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.BROKEN_BONE,
                        code: 'NOO'
                      });
                    }
                  },
                  {
                    text: text.STIFFNESS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.STIFFNESS,
                        code: 'STE'
                      });
                    }
                  },
                  {
                    text: text.MUSCULAR_DYSTROPHY,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.MUSCULAR_DYSTROPHY,
                        code: 'MUS'
                      });
                    }
                  },
                  {
                    text: text.SWELLING_JOINT,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SWELLING_JOINT,
                        code: 'GSC'
                      });
                    }
                  },
                  {
                    text: text.INJURY_CLAW,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.INJURY_CLAW,
                        code: 'KRV'
                      });
                    }
                  },
                  {
                    text: text.INJURY_PAW,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.INJURY_PAW,
                        code: 'PFO'
                      });
                    }
                  },
                  {
                    text: text.BITE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.BITE,
                        code: 'BIS'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                chest: [
                  {
                    text: text.SWELLING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SWELLING,
                        code: 'UVV'
                      });
                    }
                  },
                  {
                    text: text.COUGH,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.COUGH,
                        code: 'HU'
                      });
                    }
                  },
                  {
                    text: text.SNORING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SNORING,
                        code: 'SC'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                general: [
                  {
                    text: text.FEVER,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.FEVER,
                        code: 'FIE'
                      });
                    }
                  },
                  {
                    text: text.TEMPERATURE_LOW,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.TEMPERATURE_LOW,
                        code: 'UNT'
                      });
                    }
                  },

                  {
                    text: text.BEHAVIOUR_CHANGE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.BEHAVIOUR_CHANGE,
                        code: 'VEH'
                      });
                    }
                  },
                  {
                    text: text.BUMPINESS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.BUMPINESS,
                        code: 'ROL'
                      });
                    }
                  },
                  {
                    text: text.HYPOCRISY,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.HYPOCRISY,
                        code: 'PSP'
                      });
                    }
                  },
                  {
                    text: text.SEIZURE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SEIZURE,
                        code: 'NOK'
                      });
                    }
                  },
                  {
                    text: text.SHOCK,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SHOCK,
                        code: 'NOI'
                      });
                    }
                  },
                  {
                    text: text.UNCONSCIOUSNESS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.UNCONSCIOUSNESS,
                        code: 'NOS'
                      });
                    }
                  },
                  {
                    text: text.WEAKNESS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.WEAKNESS,
                        code: 'WEA'
                      });
                    }
                  },
                  {
                    text: text.WEIGHT_LOSS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.WEIGHT_LOSS,
                        code: 'AB'
                      });
                    }
                  },
                  {
                    text: text.WEIGHT_GAIN,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.WEIGHT_GAIN,
                        code: 'AD'
                      });
                    }
                  },
                  {
                    text: text.HEATSTROKE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.HEATSTROKE,
                        code: 'NOH'
                      });
                    }
                  },
                  {
                    text: text.APNEA,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.APNEA,
                        code: 'NOC'
                      });
                    }
                  },
                  {
                    text: text.POISONING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.POISONING,
                        code: 'NOT'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                abdomen: [
                  {
                    text: text.HEAT,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.HEAT,
                        code: 'LAU'
                      });
                    }
                  },
                  {
                    text: text.SWELLING_VULVA,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SWELLING_VULVA,
                        code: 'VUL'
                      });
                    }
                  },
                  {
                    text: text.UNWANTED_PREGNANCY,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.UNWANTED_PREGNANCY,
                        code: 'UDE'
                      });
                    }
                  },
                  {
                    text: text.EMERGENCY_BIRTH,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.EMERGENCY_BIRTH,
                        code: 'NOG'
                      });
                    }
                  },
                  {
                    text: text.VAGINAL_DISCHARGE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.VAGINAL_DISCHARGE,
                        code: 'VAG'
                      });
                    }
                  },
                  {
                    text: text.NO_URINE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.NO_URINE,
                        code: 'NOU'
                      });
                    }
                  },
                  {
                    text: text.URINATION_PAIN,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.URINATION_PAIN,
                        code: 'SHA'
                      });
                    }
                  },
                  {
                    text: text.URINATION_CHANGE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.URINATION_CHANGE,
                        code: 'VU'
                      });
                    }
                  },
                  {
                    text: text.URINATION_LOW,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.URINATION_LOW,
                        code: 'GHA'
                      });
                    }
                  },
                  {
                    text: text.URINATION_HIGH_DRINKING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.URINATION_HIGH_DRINKING,
                        code: 'VUT'
                      });
                    }
                  },
                  {
                    text: text.URINATION_HIGH,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.URINATION_HIGH,
                        code: 'HHA'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                throat: [
                  {
                    text: text.SWELLING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SWELLING,
                        code: 'UVV'
                      });
                    }
                  },
                  {
                    text: text.STIFFNESS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.STIFFNESS,
                        code: 'STE'
                      });
                    }
                  },
                  {
                    text: text.MUSCULAR_DYSTROPHY,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.MUSCULAR_DYSTROPHY,
                        code: 'MUS'
                      });
                    }
                  },
                  {
                    text: text.BITE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.BITE,
                        code: 'BIS'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                fur: [
                  {
                    text: text.FUR_SHAGGY,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.FUR_SHAGGY,
                        code: 'SSF'
                      });
                    }
                  },
                  {
                    text: text.ITCHING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.ITCHING,
                        code: 'JUC'
                      });
                    }
                  },
                  {
                    text: text.FLEA_INVESTATION,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.FLEA_INVESTATION,
                        code: 'FLO'
                      });
                    }
                  },
                  {
                    text: text.SKIN_STINKY,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SKIN_STINKY,
                        code: 'URH'
                      });
                    }
                  },
                  {
                    text: text.FUR_LOSS_ITCHING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.FUR_LOSS_ITCHING,
                        code: 'ALJ'
                      });
                    }
                  },
                  {
                    text: text.FUR_LOSS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.FUR_LOSS,
                        code: 'ANJ'
                      });
                    }
                  },
                  {
                    text: text.INJURY_SKIN,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.INJURY_SKIN,
                        code: 'HVE'
                      });
                    }
                  },
                  {
                    text: text.HEAVY_BLEEDING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.HEAVY_BLEEDING,
                        code: 'NOB'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                head: [
                  {
                    text: text.SWELLING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SWELLING,
                        code: 'UVV'
                      });
                    }
                  },
                  {
                    text: text.MUSCULAR_DYSTROPHY,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.MUSCULAR_DYSTROPHY,
                        code: 'MUS'
                      });
                    }
                  },
                  {
                    text: text.BITE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.BITE,
                        code: 'BIS'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                mouth: [
                  {
                    text: text.TRAVEL_SICKNESS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.TRAVEL_SICKNESS,
                        code: 'REI'
                      });
                    }
                  },
                  {
                    text: text.EAT_FECES,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.EAT_FECES,
                        code: 'KOT'
                      });
                    }
                  },
                  {
                    text: text.EAT_GRASS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.EAT_GRASS,
                        code: 'GRA'
                      });
                    }
                  },
                  {
                    text: text.EAT_NONE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.EAT_NONE,
                        code: 'FRI'
                      });
                    }
                  },
                  {
                    text: text.DRINKING_HIGH,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.DRINKING_HIGH,
                        code: 'VTR'
                      });
                    }
                  },
                  {
                    text: text.URINATION_HIGH_DRINKING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.URINATION_HIGH_DRINKING,
                        code: 'VUT'
                      });
                    }
                  },
                  {
                    text: text.SWELLING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SWELLING,
                        code: 'UVN'
                      });
                    }
                  },
                  {
                    text: text.VOICE_CHANGES,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.VOICE_CHANGES,
                        code: 'STI'
                      });
                    }
                  },
                  {
                    text: text.FOOT_ODOR,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.FOOT_ODOR,
                        code: 'MG'
                      });
                    }
                  },
                  {
                    text: text.COUGH,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.COUGH,
                        code: 'HU'
                      });
                    }
                  },
                  {
                    text: text.VOMIT,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.VOMIT,
                        code: 'EB'
                      });
                    }
                  },
                  {
                    text: text.VOMITING_DIARRHAE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.VOMITING_DIARRHAE,
                        code: 'ED'
                      });
                    }
                  },
                  {
                    text: text.SNORING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SNORING,
                        code: 'SC'
                      });
                    }
                  },
                  {
                    text: text.BREATH_SHORTNESS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.BREATH_SHORTNESS,
                        code: 'NOA'
                      });
                    }
                  },
                  {
                    text: text.APNEA,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.APNEA,
                        code: 'NOC'
                      });
                    }
                  },
                  {
                    text: text.POISONING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.POISONING,
                        code: 'NOT'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                nose: [
                  {
                    text: text.NOSE_DRY,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.NOSE_DRY,
                        code: 'NAS'
                      });
                    }
                  },
                  {
                    text: text.SWELLING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SWELLING,
                        code: 'UVN'
                      });
                    }
                  },
                  {
                    text: text.NOSE_BLEEDING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.NOSE_BLEEDING,
                        code: 'NBL'
                      });
                    }
                  },
                  {
                    text: text.NOSE_DISCHARGE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.NOSE_DISCHARGE,
                        code: 'NA'
                      });
                    }
                  },
                  {
                    text: text.SNORING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SNORING,
                        code: 'SC'
                      });
                    }
                  },
                  {
                    text: text.SNEEZE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SNEEZE,
                        code: 'NIE'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                ear: [
                  {
                    text: text.EARS_HEARING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.EARS_HEARING,
                        code: 'HOE'
                      });
                    }
                  },
                  {
                    text: text.SWELLING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SWELLING,
                        code: 'UVN'
                      });
                    }
                  },
                  {
                    text: text.EARS_SWOLLEN,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.EARS_SWOLLEN,
                        code: 'GO'
                      });
                    }
                  },
                  {
                    text: text.EARS_SCRATCH,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.EARS_SCRATCH,
                        code: 'KO'
                      });
                    }
                  },
                  {
                    text: text.EARS_DISCHARGE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.EARS_DISCHARGE,
                        code: 'AO'
                      });
                    }
                  },
                  {
                    text: text.EARS_STINKY,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.EARS_STINKY,
                        code: 'UO'
                      });
                    }
                  },
                  {
                    text: text.EARS_INJURY,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.EARS_INJURY,
                        code: 'VO'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                butt: [
                  {
                    text: text.SWELLING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SWELLING,
                        code: 'UVV'
                      });
                    }
                  },
                  {
                    text: text.STIFFNESS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.STIFFNESS,
                        code: 'STE'
                      });
                    }
                  },
                  {
                    text: text.MUSCULAR_DYSTROPHY,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.MUSCULAR_DYSTROPHY,
                        code: 'MUS'
                      });
                    }
                  },
                  {
                    text: text.FLATULENCE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.FLATULENCE,
                        code: 'FL'
                      });
                    }
                  },
                  {
                    text: text.DIARRHAE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.DIARRHAE,
                        code: 'DF'
                      });
                    }
                  },
                  {
                    text: text.VOMITING_DIARRHAE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.VOMITING_DIARRHAE,
                        code: 'ED'
                      });
                    }
                  },
                  {
                    text: text.ITCHING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.ITCHING,
                        code: 'AJ'
                      });
                    }
                  },
                  {
                    text: text.CONSTIPATION,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.CONSTIPATION,
                        code: 'VS'
                      });
                    }
                  },
                  {
                    text: text.BITE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.BITE,
                        code: 'BIS'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                poison: [
                  {
                    text: text.CHOCOLATE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.CHOCOLATE,
                        code: 'p+POIC'
                      });
                    }
                  },
                  {
                    text: text.MEDS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.MEDS,
                        code: 'p+POIM'
                      });
                    }
                  },
                  {
                    text: text.TOBACCO,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.TOBACCO,
                        code: 'p+POIT'
                      });
                    }
                  },
                  {
                    text: text.MISC,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.MISC,
                        code: 'POIN'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                tail: [
                  {
                    text: text.SWELLING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SWELLING,
                        code: 'UVV'
                      });
                    }
                  },
                  {
                    text: text.STIFFNESS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.STIFFNESS,
                        code: 'STE'
                      });
                    }
                  },
                  {
                    text: text.BITE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.BITE,
                        code: 'BIS'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                back: [
                  {
                    text: text.SWELLING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SWELLING,
                        code: 'UVV'
                      });
                    }
                  },
                  {
                    text: text.STIFFNESS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.STIFFNESS,
                        code: 'STE'
                      });
                    }
                  },
                  {
                    text: text.MUSCULAR_DYSTROPHY,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.MUSCULAR_DYSTROPHY,
                        code: 'VS'
                      });
                    }
                  },
                  {
                    text: text.BITE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.BITE,
                        code: 'BIS'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ]
              },
              castrated: {
                eye: [
                  {
                    text: text.EYES_IMPAIRED,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.EYES_IMPAIRED,
                        code: 'SEH'
                      });
                    }
                  },
                  {
                    text: text.EYES_CHANGES,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.EYES_CHANGES,
                        code: 'AUV'
                      });
                    }
                  },
                  {
                    text: text.EYES_INJURY,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.EYES_INJURY,
                        code: 'NOE'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                belly: [
                  {
                    text: text.STOMACH_PAIN,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.STOMACH_PAIN,
                        code: 'BAU'
                      });
                    }
                  },
                  {
                    text: text.HEAVY_STOMACH_PAIN,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.HEAVY_STOMACH_PAIN,
                        code: 'NOP'
                      });
                    }
                  },
                  {
                    text: text.GASTRIC_TORSION,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.GASTRIC_TORSION,
                        code: 'NOD'
                      });
                    }
                  },
                  {
                    text: text.VOMIT,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.VOMIT,
                        code: 'EB'
                      });
                    }
                  },
                  {
                    text: text.FLATULENCE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.FLATULENCE,
                        code: 'FL'
                      });
                    }
                  },
                  {
                    text: text.DIARRHAE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.DIARRHAE,
                        code: 'DF'
                      });
                    }
                  },
                  {
                    text: text.VOMITING_DIARRHAE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.VOMITING_DIARRHAE,
                        code: 'ED'
                      });
                    }
                  },
                  {
                    text: text.CONSTIPATION,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.CONSTIPATION,
                        code: 'VS'
                      });
                    }
                  },
                  {
                    text: text.SUCKLES,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SUCKLES,
                        code: 'GES'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                legs: [
                  {
                    text: text.SWELLING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SWELLING,
                        code: 'UVN'
                      });
                    }
                  },
                  {
                    text: text.LAMENESS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.LAMENESS,
                        code: 'LAH'
                      });
                    }
                  },
                  {
                    text: text.PARALYSIS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.PARALYSIS,
                        code: 'NOL'
                      });
                    }
                  },
                  {
                    text: text.BROKEN_BONE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.BROKEN_BONE,
                        code: 'NOO'
                      });
                    }
                  },
                  {
                    text: text.STIFFNESS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.STIFFNESS,
                        code: 'STE'
                      });
                    }
                  },
                  {
                    text: text.MUSCULAR_DYSTROPHY,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.MUSCULAR_DYSTROPHY,
                        code: 'MUS'
                      });
                    }
                  },
                  {
                    text: text.SWELLING_JOINT,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SWELLING_JOINT,
                        code: 'GSC'
                      });
                    }
                  },
                  {
                    text: text.INJURY_CLAW,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.INJURY_CLAW,
                        code: 'KRV'
                      });
                    }
                  },
                  {
                    text: text.INJURY_PAW,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.INJURY_PAW,
                        code: 'PFO'
                      });
                    }
                  },
                  {
                    text: text.BITE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.BITE,
                        code: 'BIS'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                chest: [
                  {
                    text: text.SWELLING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SWELLING,
                        code: 'UVV'
                      });
                    }
                  },
                  {
                    text: text.COUGH,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.COUGH,
                        code: 'HU'
                      });
                    }
                  },
                  {
                    text: text.SNORING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SNORING,
                        code: 'SC'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                general: [
                  {
                    text: text.FEVER,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.FEVER,
                        code: 'FIE'
                      });
                    }
                  },
                  {
                    text: text.TEMPERATURE_LOW,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.TEMPERATURE_LOW,
                        code: 'UNT'
                      });
                    }
                  },

                  {
                    text: text.BEHAVIOUR_CHANGE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.BEHAVIOUR_CHANGE,
                        code: 'VEH'
                      });
                    }
                  },
                  {
                    text: text.SEIZURE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SEIZURE,
                        code: 'NOK'
                      });
                    }
                  },
                  {
                    text: text.SHOCK,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SHOCK,
                        code: 'NOI'
                      });
                    }
                  },
                  {
                    text: text.UNCONSCIOUSNESS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.UNCONSCIOUSNESS,
                        code: 'NOS'
                      });
                    }
                  },
                  {
                    text: text.WEAKNESS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.WEAKNESS,
                        code: 'WEA'
                      });
                    }
                  },
                  {
                    text: text.WEIGHT_LOSS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.WEIGHT_LOSS,
                        code: 'AB'
                      });
                    }
                  },
                  {
                    text: text.WEIGHT_GAIN,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.WEIGHT_GAIN,
                        code: 'AD'
                      });
                    }
                  },
                  {
                    text: text.HEATSTROKE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.HEATSTROKE,
                        code: 'NOH'
                      });
                    }
                  },
                  {
                    text: text.APNEA,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.APNEA,
                        code: 'NOC'
                      });
                    }
                  },
                  {
                    text: text.POISONING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.POISONING,
                        code: 'NOT'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                abdomen: [
                  {
                    text: text.SWELLING_VULVA,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SWELLING_VULVA,
                        code: 'VUL'
                      });
                    }
                  },
                  {
                    text: text.VAGINAL_DISCHARGE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.VAGINAL_DISCHARGE,
                        code: 'VAG'
                      });
                    }
                  },
                  {
                    text: text.NO_URINE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.NO_URINE,
                        code: 'NOU'
                      });
                    }
                  },
                  {
                    text: text.URINATION_PAIN,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.URINATION_PAIN,
                        code: 'SHA'
                      });
                    }
                  },
                  {
                    text: text.URINATION_CHANGE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.URINATION_CHANGE,
                        code: 'VU'
                      });
                    }
                  },
                  {
                    text: text.URINATION_LOW,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.URINATION_LOW,
                        code: 'GHA'
                      });
                    }
                  },
                  {
                    text: text.URINATION_HIGH_DRINKING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.URINATION_HIGH_DRINKING,
                        code: 'VUT'
                      });
                    }
                  },
                  {
                    text: text.URINATION_HIGH,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.URINATION_HIGH,
                        code: 'HHA'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                throat: [
                  {
                    text: text.SWELLING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SWELLING,
                        code: 'UVV'
                      });
                    }
                  },
                  {
                    text: text.STIFFNESS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.STIFFNESS,
                        code: 'STE'
                      });
                    }
                  },
                  {
                    text: text.MUSCULAR_DYSTROPHY,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.MUSCULAR_DYSTROPHY,
                        code: 'MUS'
                      });
                    }
                  },
                  {
                    text: text.BITE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.BITE,
                        code: 'BIS'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                fur: [
                  {
                    text: text.FUR_SHAGGY,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.FUR_SHAGGY,
                        code: 'SSF'
                      });
                    }
                  },
                  {
                    text: text.ITCHING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.ITCHING,
                        code: 'JUC'
                      });
                    }
                  },
                  {
                    text: text.FLEA_INVESTATION,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.FLEA_INVESTATION,
                        code: 'FLO'
                      });
                    }
                  },
                  {
                    text: text.SKIN_STINKY,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SKIN_STINKY,
                        code: 'URH'
                      });
                    }
                  },
                  {
                    text: text.FUR_LOSS_ITCHING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.FUR_LOSS_ITCHING,
                        code: 'ALJ'
                      });
                    }
                  },
                  {
                    text: text.FUR_LOSS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.FUR_LOSS,
                        code: 'ANJ'
                      });
                    }
                  },
                  {
                    text: text.INJURY_SKIN,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.INJURY_SKIN,
                        code: 'HVE'
                      });
                    }
                  },
                  {
                    text: text.HEAVY_BLEEDING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.HEAVY_BLEEDING,
                        code: 'NOB'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                head: [
                  {
                    text: text.SWELLING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SWELLING,
                        code: 'UVV'
                      });
                    }
                  },
                  {
                    text: text.MUSCULAR_DYSTROPHY,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.MUSCULAR_DYSTROPHY,
                        code: 'MUS'
                      });
                    }
                  },
                  {
                    text: text.BITE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.BITE,
                        code: 'BIS'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                mouth: [
                  {
                    text: text.TRAVEL_SICKNESS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.TRAVEL_SICKNESS,
                        code: 'REI'
                      });
                    }
                  },
                  {
                    text: text.EAT_FECES,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.EAT_FECES,
                        code: 'KOT'
                      });
                    }
                  },
                  {
                    text: text.EAT_GRASS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.EAT_GRASS,
                        code: 'GRA'
                      });
                    }
                  },
                  {
                    text: text.EAT_NONE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.EAT_NONE,
                        code: 'FRI'
                      });
                    }
                  },
                  {
                    text: text.DRINKING_HIGH,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.DRINKING_HIGH,
                        code: 'VTR'
                      });
                    }
                  },
                  {
                    text: text.URINATION_HIGH_DRINKING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.URINATION_HIGH_DRINKING,
                        code: 'VUT'
                      });
                    }
                  },
                  {
                    text: text.SWELLING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SWELLING,
                        code: 'UVN'
                      });
                    }
                  },
                  {
                    text: text.VOICE_CHANGES,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.VOICE_CHANGES,
                        code: 'STI'
                      });
                    }
                  },
                  {
                    text: text.FOOT_ODOR,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.FOOT_ODOR,
                        code: 'MG'
                      });
                    }
                  },
                  {
                    text: text.COUGH,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.COUGH,
                        code: 'HU'
                      });
                    }
                  },
                  {
                    text: text.VOMIT,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.VOMIT,
                        code: 'EB'
                      });
                    }
                  },
                  {
                    text: text.VOMITING_DIARRHAE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.VOMITING_DIARRHAE,
                        code: 'ED'
                      });
                    }
                  },
                  {
                    text: text.SNORING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SNORING,
                        code: 'SC'
                      });
                    }
                  },
                  {
                    text: text.BREATH_SHORTNESS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.BREATH_SHORTNESS,
                        code: 'NOA'
                      });
                    }
                  },
                  {
                    text: text.APNEA,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.APNEA,
                        code: 'NOC'
                      });
                    }
                  },
                  {
                    text: text.POISONING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.POISONING,
                        code: 'NOT'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                nose: [
                  {
                    text: text.NOSE_DRY,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.NOSE_DRY,
                        code: 'NAS'
                      });
                    }
                  },
                  {
                    text: text.SWELLING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SWELLING,
                        code: 'UVN'
                      });
                    }
                  },
                  {
                    text: text.NOSE_BLEEDING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.NOSE_BLEEDING,
                        code: 'NBL'
                      });
                    }
                  },
                  {
                    text: text.NOSE_DISCHARGE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.NOSE_DISCHARGE,
                        code: 'NA'
                      });
                    }
                  },
                  {
                    text: text.SNORING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SNORING,
                        code: 'SC'
                      });
                    }
                  },
                  {
                    text: text.SNEEZE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SNEEZE,
                        code: 'NIE'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                ear: [
                  {
                    text: text.EARS_HEARING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.EARS_HEARING,
                        code: 'HOE'
                      });
                    }
                  },
                  {
                    text: text.SWELLING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SWELLING,
                        code: 'UVN'
                      });
                    }
                  },
                  {
                    text: text.EARS_SWOLLEN,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.EARS_SWOLLEN,
                        code: 'GO'
                      });
                    }
                  },
                  {
                    text: text.EARS_SCRATCH,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.EARS_SCRATCH,
                        code: 'KO'
                      });
                    }
                  },
                  {
                    text: text.EARS_DISCHARGE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.EARS_DISCHARGE,
                        code: 'AO'
                      });
                    }
                  },
                  {
                    text: text.EARS_STINKY,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.EARS_STINKY,
                        code: 'UO'
                      });
                    }
                  },
                  {
                    text: text.EARS_INJURY,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.EARS_INJURY,
                        code: 'VO'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                butt: [
                  {
                    text: text.SWELLING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SWELLING,
                        code: 'UVV'
                      });
                    }
                  },
                  {
                    text: text.STIFFNESS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.STIFFNESS,
                        code: 'STE'
                      });
                    }
                  },
                  {
                    text: text.MUSCULAR_DYSTROPHY,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.MUSCULAR_DYSTROPHY,
                        code: 'MUS'
                      });
                    }
                  },
                  {
                    text: text.FLATULENCE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.FLATULENCE,
                        code: 'FL'
                      });
                    }
                  },
                  {
                    text: text.DIARRHAE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.DIARRHAE,
                        code: 'DF'
                      });
                    }
                  },
                  {
                    text: text.VOMITING_DIARRHAE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.VOMITING_DIARRHAE,
                        code: 'ED'
                      });
                    }
                  },
                  {
                    text: text.ITCHING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.ITCHING,
                        code: 'AJ'
                      });
                    }
                  },
                  {
                    text: text.CONSTIPATION,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.CONSTIPATION,
                        code: 'VS'
                      });
                    }
                  },
                  {
                    text: text.BITE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.BITE,
                        code: 'BIS'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                poison: [
                  {
                    text: text.CHOCOLATE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.CHOCOLATE,
                        code: 'p+POIC'
                      });
                    }
                  },
                  {
                    text: text.MEDS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.MEDS,
                        code: 'p+POIM'
                      });
                    }
                  },
                  {
                    text: text.TOBACCO,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.TOBACCO,
                        code: 'p+POIT'
                      });
                    }
                  },
                  {
                    text: text.MISC,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.MISC,
                        code: 'POIN'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                tail: [
                  {
                    text: text.SWELLING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SWELLING,
                        code: 'UVV'
                      });
                    }
                  },
                  {
                    text: text.STIFFNESS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.STIFFNESS,
                        code: 'STE'
                      });
                    }
                  },
                  {
                    text: text.BITE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.BITE,
                        code: 'BIS'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                back: [
                  {
                    text: text.SWELLING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SWELLING,
                        code: 'UVV'
                      });
                    }
                  },
                  {
                    text: text.STIFFNESS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.STIFFNESS,
                        code: 'STE'
                      });
                    }
                  },
                  {
                    text: text.MUSCULAR_DYSTROPHY,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.MUSCULAR_DYSTROPHY,
                        code: 'VS'
                      });
                    }
                  },
                  {
                    text: text.BITE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.BITE,
                        code: 'BIS'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ]
              }
            }
          },
          cat: {
            male: {
              uncastrated:  {
                eye: [
                  {
                    text: text.EYES_IMPAIRED,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.EYES_IMPAIRED,
                        code: 'SEH'
                      });
                    }
                  },
                  {
                    text: text.EYES_CHANGES,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.EYES_CHANGES,
                        code: 'AUV'
                      });
                    }
                  },
                  {
                    text: text.EYES_INJURY,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.EYES_INJURY,
                        code: 'NOE'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                belly: [
                  {
                    text: text.STOMACH_PAIN,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.STOMACH_PAIN,
                        code: 'BAU'
                      });
                    }
                  },
                  {
                    text: text.HEAVY_STOMACH_PAIN,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.HEAVY_STOMACH_PAIN,
                        code: 'NOP'
                      });
                    }
                  },
                  {
                    text: text.VOMIT,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.VOMIT,
                        code: 'EB'
                      });
                    }
                  },
                  {
                    text: text.FLATULENCE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.FLATULENCE,
                        code: 'FL'
                      });
                    }
                  },
                  {
                    text: text.DIARRHAE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.DIARRHAE,
                        code: 'DF'
                      });
                    }
                  },
                  {
                    text: text.VOMITING_DIARRHAE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.VOMITING_DIARRHAE,
                        code: 'ED'
                      });
                    }
                  },
                  {
                    text: text.CONSTIPATION,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.CONSTIPATION,
                        code: 'VS'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                legs: [
                  {
                    text: text.SWELLING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SWELLING,
                        code: 'UVN'
                      });
                    }
                  },
                  {
                    text: text.LAMENESS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.LAMENESS,
                        code: 'LAH'
                      });
                    }
                  },
                  {
                    text: text.PARALYSIS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.PARALYSIS,
                        code: 'NOL'
                      });
                    }
                  },
                  {
                    text: text.BROKEN_BONE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.BROKEN_BONE,
                        code: 'NOO'
                      });
                    }
                  },
                  {
                    text: text.STIFFNESS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.STIFFNESS,
                        code: 'STE'
                      });
                    }
                  },
                  {
                    text: text.MUSCULAR_DYSTROPHY,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.MUSCULAR_DYSTROPHY,
                        code: 'MUS'
                      });
                    }
                  },
                  {
                    text: text.SWELLING_JOINT,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SWELLING_JOINT,
                        code: 'GSC'
                      });
                    }
                  },
                  {
                    text: text.INJURY_CLAW,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.INJURY_CLAW,
                        code: 'KRV'
                      });
                    }
                  },
                  {
                    text: text.INJURY_PAW,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.INJURY_PAW,
                        code: 'PFO'
                      });
                    }
                  },
                  {
                    text: text.BITE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.BITE,
                        code: 'BIS'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                chest: [
                  {
                    text: text.SWELLING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SWELLING,
                        code: 'UVV'
                      });
                    }
                  },
                  {
                    text: text.COUGH,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.COUGH,
                        code: 'HU'
                      });
                    }
                  },
                  {
                    text: text.SNORING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SNORING,
                        code: 'SC'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                general: [
                  {
                    text: text.FEVER,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.FEVER,
                        code: 'FIE'
                      });
                    }
                  },
                  {
                    text: text.TEMPERATURE_LOW,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.TEMPERATURE_LOW,
                        code: 'UNT'
                      });
                    }
                  },

                  {
                    text: text.BEHAVIOUR_CHANGE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.BEHAVIOUR_CHANGE,
                        code: 'VEH'
                      });
                    }
                  },
                  {
                    text: text.BUMPINESS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.BUMPINESS,
                        code: 'ROL'
                      });
                    }
                  },
                  {
                    text: text.SEIZURE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SEIZURE,
                        code: 'NOK'
                      });
                    }
                  },
                  {
                    text: text.SHOCK,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SHOCK,
                        code: 'NOI'
                      });
                    }
                  },
                  {
                    text: text.UNCONSCIOUSNESS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.UNCONSCIOUSNESS,
                        code: 'NOS'
                      });
                    }
                  },
                  {
                    text: text.WEAKNESS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.WEAKNESS,
                        code: 'WEA'
                      });
                    }
                  },
                  {
                    text: text.WEIGHT_LOSS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.WEIGHT_LOSS,
                        code: 'AB'
                      });
                    }
                  },
                  {
                    text: text.WEIGHT_GAIN,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.WEIGHT_GAIN,
                        code: 'AD'
                      });
                    }
                  },
                  {
                    text: text.HEATSTROKE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.HEATSTROKE,
                        code: 'NOH'
                      });
                    }
                  },
                  {
                    text: text.APNEA,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.APNEA,
                        code: 'NOC'
                      });
                    }
                  },
                  {
                    text: text.POISONING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.POISONING,
                        code: 'NOT'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                abdomen: [
                  {
                    text: text.TESTICLES_CHANGES,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.TESTICLES_CHANGES,
                        code: 'HOD'
                      });
                    }
                  },
                  {
                    text: text.NO_URINE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.NO_URINE,
                        code: 'NOU'
                      });
                    }
                  },
                  {
                    text: text.PENIS_DISCHARGE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.PENIS_DISCHARGE,
                        code: 'PA'
                      });
                    }
                  },
                  {
                    text: text.PENIS_ISSUE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.PENIS_ISSUE,
                        code: 'PV'
                      });
                    }
                  },
                  {
                    text: text.URINATION_PAIN,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.URINATION_PAIN,
                        code: 'SHA'
                      });
                    }
                  },
                  {
                    text: text.URINATION_CHANGE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.URINATION_CHANGE,
                        code: 'VU'
                      });
                    }
                  },
                  {
                    text: text.URINATION_LOW,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.URINATION_LOW,
                        code: 'GHA'
                      });
                    }
                  },
                  {
                    text: text.URINATION_HIGH_DRINKING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.URINATION_HIGH_DRINKING,
                        code: 'VUT'
                      });
                    }
                  },
                  {
                    text: text.URINATION_HIGH,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.URINATION_HIGH,
                        code: 'HHA'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                throat: [
                  {
                    text: text.SWELLING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SWELLING,
                        code: 'UVV'
                      });
                    }
                  },
                  {
                    text: text.STIFFNESS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.STIFFNESS,
                        code: 'STE'
                      });
                    }
                  },
                  {
                    text: text.MUSCULAR_DYSTROPHY,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.MUSCULAR_DYSTROPHY,
                        code: 'MUS'
                      });
                    }
                  },
                  {
                    text: text.BITE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.BITE,
                        code: 'BIS'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                fur: [
                  {
                    text: text.FUR_SHAGGY,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.FUR_SHAGGY,
                        code: 'SSF'
                      });
                    }
                  },
                  {
                    text: text.ITCHING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.ITCHING,
                        code: 'JUC'
                      });
                    }
                  },
                  {
                    text: text.FLEA_INVESTATION,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.FLEA_INVESTATION,
                        code: 'FLO'
                      });
                    }
                  },
                  {
                    text: text.SKIN_STINKY,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SKIN_STINKY,
                        code: 'URH'
                      });
                    }
                  },
                  {
                    text: text.FUR_LOSS_ITCHING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.FUR_LOSS_ITCHING,
                        code: 'ALJ'
                      });
                    }
                  },
                  {
                    text: text.FUR_LOSS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.FUR_LOSS,
                        code: 'ANJ'
                      });
                    }
                  },
                  {
                    text: text.INJURY_SKIN,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.INJURY_SKIN,
                        code: 'HVE'
                      });
                    }
                  },
                  {
                    text: text.HEAVY_BLEEDING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.HEAVY_BLEEDING,
                        code: 'NOB'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                head: [
                  {
                    text: text.SWELLING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SWELLING,
                        code: 'UVV'
                      });
                    }
                  },
                  {
                    text: text.MUSCULAR_DYSTROPHY,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.MUSCULAR_DYSTROPHY,
                        code: 'MUS'
                      });
                    }
                  },
                  {
                    text: text.BITE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.BITE,
                        code: 'BIS'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                mouth: [
                  {
                    text: text.EAT_GRASS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.EAT_GRASS,
                        code: 'GRA'
                      });
                    }
                  },
                  {
                    text: text.EAT_NONE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.EAT_NONE,
                        code: 'FRI'
                      });
                    }
                  },
                  {
                    text: text.DRINKING_HIGH,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.DRINKING_HIGH,
                        code: 'VTR'
                      });
                    }
                  },
                  {
                    text: text.URINATION_HIGH_DRINKING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.URINATION_HIGH_DRINKING,
                        code: 'VUT'
                      });
                    }
                  },
                  {
                    text: text.SWELLING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SWELLING,
                        code: 'UVN'
                      });
                    }
                  },
                  {
                    text: text.VOICE_CHANGES,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.VOICE_CHANGES,
                        code: 'STI'
                      });
                    }
                  },
                  {
                    text: text.FOOT_ODOR,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.FOOT_ODOR,
                        code: 'MG'
                      });
                    }
                  },
                  {
                    text: text.COUGH,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.COUGH,
                        code: 'HU'
                      });
                    }
                  },
                  {
                    text: text.VOMIT,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.VOMIT,
                        code: 'EB'
                      });
                    }
                  },
                  {
                    text: text.VOMITING_DIARRHAE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.VOMITING_DIARRHAE,
                        code: 'ED'
                      });
                    }
                  },
                  {
                    text: text.SNORING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SNORING,
                        code: 'SC'
                      });
                    }
                  },
                  {
                    text: text.BREATH_SHORTNESS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.BREATH_SHORTNESS,
                        code: 'NOA'
                      });
                    }
                  },
                  {
                    text: text.APNEA,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.APNEA,
                        code: 'NOC'
                      });
                    }
                  },
                  {
                    text: text.POISONING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.POISONING,
                        code: 'NOT'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                nose: [
                  {
                    text: text.NOSE_DRY,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.NOSE_DRY,
                        code: 'NAS'
                      });
                    }
                  },
                  {
                    text: text.SWELLING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SWELLING,
                        code: 'UVN'
                      });
                    }
                  },
                  {
                    text: text.NOSE_BLEEDING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.NOSE_BLEEDING,
                        code: 'NBL'
                      });
                    }
                  },
                  {
                    text: text.NOSE_DISCHARGE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.NOSE_DISCHARGE,
                        code: 'NA'
                      });
                    }
                  },
                  {
                    text: text.SNORING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SNORING,
                        code: 'SC'
                      });
                    }
                  },
                  {
                    text: text.SNEEZE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SNEEZE,
                        code: 'NIE'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                ear: [
                  {
                    text: text.EARS_HEARING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.EARS_HEARING,
                        code: 'HOE'
                      });
                    }
                  },
                  {
                    text: text.SWELLING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SWELLING,
                        code: 'UVN'
                      });
                    }
                  },
                  {
                    text: text.EARS_SWOLLEN,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.EARS_SWOLLEN,
                        code: 'GO'
                      });
                    }
                  },
                  {
                    text: text.EARS_SCRATCH,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.EARS_SCRATCH,
                        code: 'KO'
                      });
                    }
                  },
                  {
                    text: text.EARS_DISCHARGE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.EARS_DISCHARGE,
                        code: 'AO'
                      });
                    }
                  },
                  {
                    text: text.EARS_STINKY,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.EARS_STINKY,
                        code: 'UO'
                      });
                    }
                  },
                  {
                    text: text.EARS_INJURY,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.EARS_INJURY,
                        code: 'VO'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                butt: [
                  {
                    text: text.SWELLING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SWELLING,
                        code: 'UVV'
                      });
                    }
                  },
                  {
                    text: text.STIFFNESS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.STIFFNESS,
                        code: 'STE'
                      });
                    }
                  },
                  {
                    text: text.MUSCULAR_DYSTROPHY,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.MUSCULAR_DYSTROPHY,
                        code: 'MUS'
                      });
                    }
                  },
                  {
                    text: text.FLATULENCE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.FLATULENCE,
                        code: 'FL'
                      });
                    }
                  },
                  {
                    text: text.DIARRHAE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.DIARRHAE,
                        code: 'DF'
                      });
                    }
                  },
                  {
                    text: text.VOMITING_DIARRHAE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.VOMITING_DIARRHAE,
                        code: 'ED'
                      });
                    }
                  },
                  {
                    text: text.ITCHING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.ITCHING,
                        code: 'AJ'
                      });
                    }
                  },
                  {
                    text: text.CONSTIPATION,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.CONSTIPATION,
                        code: 'VS'
                      });
                    }
                  },
                  {
                    text: text.BITE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.BITE,
                        code: 'BIS'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                poison: [
                  {
                    text: text.CHOCOLATE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.CHOCOLATE,
                        code: 'p+POIC'
                      });
                    }
                  },
                  {
                    text: text.MEDS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.MEDS,
                        code: 'p+POIM'
                      });
                    }
                  },
                  {
                    text: text.TOBACCO,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.TOBACCO,
                        code: 'p+POIT'
                      });
                    }
                  },
                  {
                    text: text.MISC,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.MISC,
                        code: 'POIN'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                tail: [
                  {
                    text: text.SWELLING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SWELLING,
                        code: 'UVV'
                      });
                    }
                  },
                  {
                    text: text.STIFFNESS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.STIFFNESS,
                        code: 'STE'
                      });
                    }
                  },
                  {
                    text: text.BITE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.BITE,
                        code: 'BIS'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                back: [
                  {
                    text: text.SWELLING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SWELLING,
                        code: 'UVV'
                      });
                    }
                  },
                  {
                    text: text.STIFFNESS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.STIFFNESS,
                        code: 'STE'
                      });
                    }
                  },
                  {
                    text: text.MUSCULAR_DYSTROPHY,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.MUSCULAR_DYSTROPHY,
                        code: 'VS'
                      });
                    }
                  },
                  {
                    text: text.BITE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.BITE,
                        code: 'BIS'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ]
              },
              castrated:  {
                eye: [
                  {
                    text: text.EYES_IMPAIRED,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.EYES_IMPAIRED,
                        code: 'SEH'
                      });
                    }
                  },
                  {
                    text: text.EYES_CHANGES,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.EYES_CHANGES,
                        code: 'AUV'
                      });
                    }
                  },
                  {
                    text: text.EYES_INJURY,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.EYES_INJURY,
                        code: 'NOE'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                belly: [
                  {
                    text: text.STOMACH_PAIN,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.STOMACH_PAIN,
                        code: 'BAU'
                      });
                    }
                  },
                  {
                    text: text.HEAVY_STOMACH_PAIN,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.HEAVY_STOMACH_PAIN,
                        code: 'NOP'
                      });
                    }
                  },
                  {
                    text: text.VOMIT,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.VOMIT,
                        code: 'EB'
                      });
                    }
                  },
                  {
                    text: text.FLATULENCE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.FLATULENCE,
                        code: 'FL'
                      });
                    }
                  },
                  {
                    text: text.DIARRHAE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.DIARRHAE,
                        code: 'DF'
                      });
                    }
                  },
                  {
                    text: text.VOMITING_DIARRHAE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.VOMITING_DIARRHAE,
                        code: 'ED'
                      });
                    }
                  },
                  {
                    text: text.CONSTIPATION,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.CONSTIPATION,
                        code: 'VS'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                legs: [
                  {
                    text: text.SWELLING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SWELLING,
                        code: 'UVN'
                      });
                    }
                  },
                  {
                    text: text.LAMENESS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.LAMENESS,
                        code: 'LAH'
                      });
                    }
                  },
                  {
                    text: text.PARALYSIS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.PARALYSIS,
                        code: 'NOL'
                      });
                    }
                  },
                  {
                    text: text.BROKEN_BONE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.BROKEN_BONE,
                        code: 'NOO'
                      });
                    }
                  },
                  {
                    text: text.STIFFNESS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.STIFFNESS,
                        code: 'STE'
                      });
                    }
                  },
                  {
                    text: text.MUSCULAR_DYSTROPHY,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.MUSCULAR_DYSTROPHY,
                        code: 'MUS'
                      });
                    }
                  },
                  {
                    text: text.SWELLING_JOINT,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SWELLING_JOINT,
                        code: 'GSC'
                      });
                    }
                  },
                  {
                    text: text.INJURY_CLAW,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.INJURY_CLAW,
                        code: 'KRV'
                      });
                    }
                  },
                  {
                    text: text.INJURY_PAW,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.INJURY_PAW,
                        code: 'PFO'
                      });
                    }
                  },
                  {
                    text: text.BITE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.BITE,
                        code: 'BIS'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                chest: [
                  {
                    text: text.SWELLING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SWELLING,
                        code: 'UVV'
                      });
                    }
                  },
                  {
                    text: text.COUGH,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.COUGH,
                        code: 'HU'
                      });
                    }
                  },
                  {
                    text: text.SNORING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SNORING,
                        code: 'SC'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                general: [
                  {
                    text: text.FEVER,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.FEVER,
                        code: 'FIE'
                      });
                    }
                  },
                  {
                    text: text.TEMPERATURE_LOW,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.TEMPERATURE_LOW,
                        code: 'UNT'
                      });
                    }
                  },

                  {
                    text: text.BEHAVIOUR_CHANGE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.BEHAVIOUR_CHANGE,
                        code: 'VEH'
                      });
                    }
                  },
                  {
                    text: text.SEIZURE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SEIZURE,
                        code: 'NOK'
                      });
                    }
                  },
                  {
                    text: text.SHOCK,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SHOCK,
                        code: 'NOI'
                      });
                    }
                  },
                  {
                    text: text.UNCONSCIOUSNESS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.UNCONSCIOUSNESS,
                        code: 'NOS'
                      });
                    }
                  },
                  {
                    text: text.WEAKNESS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.WEAKNESS,
                        code: 'WEA'
                      });
                    }
                  },
                  {
                    text: text.WEIGHT_LOSS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.WEIGHT_LOSS,
                        code: 'AB'
                      });
                    }
                  },
                  {
                    text: text.WEIGHT_GAIN,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.WEIGHT_GAIN,
                        code: 'AD'
                      });
                    }
                  },
                  {
                    text: text.HEATSTROKE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.HEATSTROKE,
                        code: 'NOH'
                      });
                    }
                  },
                  {
                    text: text.APNEA,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.APNEA,
                        code: 'NOC'
                      });
                    }
                  },
                  {
                    text: text.POISONING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.POISONING,
                        code: 'NOT'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                abdomen: [
                  {
                    text: text.TESTICLES_CHANGES,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.TESTICLES_CHANGES,
                        code: 'HOD'
                      });
                    }
                  },
                  {
                    text: text.NO_URINE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.NO_URINE,
                        code: 'NOU'
                      });
                    }
                  },
                  {
                    text: text.PENIS_DISCHARGE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.PENIS_DISCHARGE,
                        code: 'PA'
                      });
                    }
                  },
                  {
                    text: text.PENIS_ISSUE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.PENIS_ISSUE,
                        code: 'PV'
                      });
                    }
                  },
                  {
                    text: text.URINATION_PAIN,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.URINATION_PAIN,
                        code: 'SHA'
                      });
                    }
                  },
                  {
                    text: text.URINATION_CHANGE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.URINATION_CHANGE,
                        code: 'VU'
                      });
                    }
                  },
                  {
                    text: text.URINATION_LOW,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.URINATION_LOW,
                        code: 'GHA'
                      });
                    }
                  },
                  {
                    text: text.URINATION_HIGH_DRINKING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.URINATION_HIGH_DRINKING,
                        code: 'VUT'
                      });
                    }
                  },
                  {
                    text: text.URINATION_HIGH,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.URINATION_HIGH,
                        code: 'HHA'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                throat: [
                  {
                    text: text.SWELLING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SWELLING,
                        code: 'UVV'
                      });
                    }
                  },
                  {
                    text: text.STIFFNESS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.STIFFNESS,
                        code: 'STE'
                      });
                    }
                  },
                  {
                    text: text.MUSCULAR_DYSTROPHY,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.MUSCULAR_DYSTROPHY,
                        code: 'MUS'
                      });
                    }
                  },
                  {
                    text: text.BITE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.BITE,
                        code: 'BIS'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                fur: [
                  {
                    text: text.FUR_SHAGGY,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.FUR_SHAGGY,
                        code: 'SSF'
                      });
                    }
                  },
                  {
                    text: text.ITCHING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.ITCHING,
                        code: 'JUC'
                      });
                    }
                  },
                  {
                    text: text.FLEA_INVESTATION,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.FLEA_INVESTATION,
                        code: 'FLO'
                      });
                    }
                  },
                  {
                    text: text.SKIN_STINKY,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SKIN_STINKY,
                        code: 'URH'
                      });
                    }
                  },
                  {
                    text: text.FUR_LOSS_ITCHING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.FUR_LOSS_ITCHING,
                        code: 'ALJ'
                      });
                    }
                  },
                  {
                    text: text.FUR_LOSS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.FUR_LOSS,
                        code: 'ANJ'
                      });
                    }
                  },
                  {
                    text: text.INJURY_SKIN,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.INJURY_SKIN,
                        code: 'HVE'
                      });
                    }
                  },
                  {
                    text: text.HEAVY_BLEEDING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.HEAVY_BLEEDING,
                        code: 'NOB'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                head: [
                  {
                    text: text.SWELLING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SWELLING,
                        code: 'UVV'
                      });
                    }
                  },
                  {
                    text: text.MUSCULAR_DYSTROPHY,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.MUSCULAR_DYSTROPHY,
                        code: 'MUS'
                      });
                    }
                  },
                  {
                    text: text.BITE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.BITE,
                        code: 'BIS'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                mouth: [
                  {
                    text: text.EAT_GRASS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.EAT_GRASS,
                        code: 'GRA'
                      });
                    }
                  },
                  {
                    text: text.EAT_NONE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.EAT_NONE,
                        code: 'FRI'
                      });
                    }
                  },
                  {
                    text: text.DRINKING_HIGH,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.DRINKING_HIGH,
                        code: 'VTR'
                      });
                    }
                  },
                  {
                    text: text.URINATION_HIGH_DRINKING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.URINATION_HIGH_DRINKING,
                        code: 'VUT'
                      });
                    }
                  },
                  {
                    text: text.SWELLING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SWELLING,
                        code: 'UVN'
                      });
                    }
                  },
                  {
                    text: text.VOICE_CHANGES,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.VOICE_CHANGES,
                        code: 'STI'
                      });
                    }
                  },
                  {
                    text: text.FOOT_ODOR,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.FOOT_ODOR,
                        code: 'MG'
                      });
                    }
                  },
                  {
                    text: text.COUGH,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.COUGH,
                        code: 'HU'
                      });
                    }
                  },
                  {
                    text: text.VOMIT,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.VOMIT,
                        code: 'EB'
                      });
                    }
                  },
                  {
                    text: text.VOMITING_DIARRHAE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.VOMITING_DIARRHAE,
                        code: 'ED'
                      });
                    }
                  },
                  {
                    text: text.SNORING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SNORING,
                        code: 'SC'
                      });
                    }
                  },
                  {
                    text: text.BREATH_SHORTNESS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.BREATH_SHORTNESS,
                        code: 'NOA'
                      });
                    }
                  },
                  {
                    text: text.APNEA,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.APNEA,
                        code: 'NOC'
                      });
                    }
                  },
                  {
                    text: text.POISONING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.POISONING,
                        code: 'NOT'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                nose: [
                  {
                    text: text.NOSE_DRY,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.NOSE_DRY,
                        code: 'NAS'
                      });
                    }
                  },
                  {
                    text: text.SWELLING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SWELLING,
                        code: 'UVN'
                      });
                    }
                  },
                  {
                    text: text.NOSE_BLEEDING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.NOSE_BLEEDING,
                        code: 'NBL'
                      });
                    }
                  },
                  {
                    text: text.NOSE_DISCHARGE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.NOSE_DISCHARGE,
                        code: 'NA'
                      });
                    }
                  },
                  {
                    text: text.SNORING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SNORING,
                        code: 'SC'
                      });
                    }
                  },
                  {
                    text: text.SNEEZE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SNEEZE,
                        code: 'NIE'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                ear: [
                  {
                    text: text.EARS_HEARING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.EARS_HEARING,
                        code: 'HOE'
                      });
                    }
                  },
                  {
                    text: text.SWELLING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SWELLING,
                        code: 'UVN'
                      });
                    }
                  },
                  {
                    text: text.EARS_SWOLLEN,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.EARS_SWOLLEN,
                        code: 'GO'
                      });
                    }
                  },
                  {
                    text: text.EARS_SCRATCH,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.EARS_SCRATCH,
                        code: 'KO'
                      });
                    }
                  },
                  {
                    text: text.EARS_DISCHARGE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.EARS_DISCHARGE,
                        code: 'AO'
                      });
                    }
                  },
                  {
                    text: text.EARS_STINKY,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.EARS_STINKY,
                        code: 'UO'
                      });
                    }
                  },
                  {
                    text: text.EARS_INJURY,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.EARS_INJURY,
                        code: 'VO'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                butt: [
                  {
                    text: text.SWELLING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SWELLING,
                        code: 'UVV'
                      });
                    }
                  },
                  {
                    text: text.STIFFNESS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.STIFFNESS,
                        code: 'STE'
                      });
                    }
                  },
                  {
                    text: text.MUSCULAR_DYSTROPHY,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.MUSCULAR_DYSTROPHY,
                        code: 'MUS'
                      });
                    }
                  },
                  {
                    text: text.FLATULENCE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.FLATULENCE,
                        code: 'FL'
                      });
                    }
                  },
                  {
                    text: text.DIARRHAE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.DIARRHAE,
                        code: 'DF'
                      });
                    }
                  },
                  {
                    text: text.VOMITING_DIARRHAE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.VOMITING_DIARRHAE,
                        code: 'ED'
                      });
                    }
                  },
                  {
                    text: text.ITCHING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.ITCHING,
                        code: 'AJ'
                      });
                    }
                  },
                  {
                    text: text.CONSTIPATION,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.CONSTIPATION,
                        code: 'VS'
                      });
                    }
                  },
                  {
                    text: text.BITE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.BITE,
                        code: 'BIS'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                poison: [
                  {
                    text: text.CHOCOLATE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.CHOCOLATE,
                        code: 'p+POIC'
                      });
                    }
                  },
                  {
                    text: text.MEDS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.MEDS,
                        code: 'p+POIM'
                      });
                    }
                  },
                  {
                    text: text.TOBACCO,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.TOBACCO,
                        code: 'p+POIT'
                      });
                    }
                  },
                  {
                    text: text.MISC,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.MISC,
                        code: 'POIN'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                tail: [
                  {
                    text: text.SWELLING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SWELLING,
                        code: 'UVV'
                      });
                    }
                  },
                  {
                    text: text.STIFFNESS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.STIFFNESS,
                        code: 'STE'
                      });
                    }
                  },
                  {
                    text: text.BITE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.BITE,
                        code: 'BIS'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                back: [
                  {
                    text: text.SWELLING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SWELLING,
                        code: 'UVV'
                      });
                    }
                  },
                  {
                    text: text.STIFFNESS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.STIFFNESS,
                        code: 'STE'
                      });
                    }
                  },
                  {
                    text: text.MUSCULAR_DYSTROPHY,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.MUSCULAR_DYSTROPHY,
                        code: 'VS'
                      });
                    }
                  },
                  {
                    text: text.BITE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.BITE,
                        code: 'BIS'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ]
              }
            },
            female: {
              uncastrated: {
                eye: [
                  {
                    text: text.EYES_IMPAIRED,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.EYES_IMPAIRED,
                        code: 'SEH'
                      });
                    }
                  },
                  {
                    text: text.EYES_CHANGES,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.EYES_CHANGES,
                        code: 'AUV'
                      });
                    }
                  },
                  {
                    text: text.EYES_INJURY,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.EYES_INJURY,
                        code: 'NOE'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                belly: [
                  {
                    text: text.STOMACH_PAIN,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.STOMACH_PAIN,
                        code: 'BAU'
                      });
                    }
                  },
                  {
                    text: text.HEAVY_STOMACH_PAIN,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.HEAVY_STOMACH_PAIN,
                        code: 'NOP'
                      });
                    }
                  },
                  {
                    text: text.VOMIT,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.VOMIT,
                        code: 'EB'
                      });
                    }
                  },
                  {
                    text: text.FLATULENCE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.FLATULENCE,
                        code: 'FL'
                      });
                    }
                  },
                  {
                    text: text.DIARRHAE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.DIARRHAE,
                        code: 'DF'
                      });
                    }
                  },
                  {
                    text: text.VOMITING_DIARRHAE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.VOMITING_DIARRHAE,
                        code: 'ED'
                      });
                    }
                  },
                  {
                    text: text.CONSTIPATION,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.CONSTIPATION,
                        code: 'VS'
                      });
                    }
                  },
                  {
                    text: text.SUCKLES,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SUCKLES,
                        code: 'GES'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                legs: [
                  {
                    text: text.SWELLING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SWELLING,
                        code: 'UVN'
                      });
                    }
                  },
                  {
                    text: text.LAMENESS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.LAMENESS,
                        code: 'LAH'
                      });
                    }
                  },
                  {
                    text: text.PARALYSIS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.PARALYSIS,
                        code: 'NOL'
                      });
                    }
                  },
                  {
                    text: text.BROKEN_BONE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.BROKEN_BONE,
                        code: 'NOO'
                      });
                    }
                  },
                  {
                    text: text.STIFFNESS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.STIFFNESS,
                        code: 'STE'
                      });
                    }
                  },
                  {
                    text: text.MUSCULAR_DYSTROPHY,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.MUSCULAR_DYSTROPHY,
                        code: 'MUS'
                      });
                    }
                  },
                  {
                    text: text.SWELLING_JOINT,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SWELLING_JOINT,
                        code: 'GSC'
                      });
                    }
                  },
                  {
                    text: text.INJURY_CLAW,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.INJURY_CLAW,
                        code: 'KRV'
                      });
                    }
                  },
                  {
                    text: text.INJURY_PAW,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.INJURY_PAW,
                        code: 'PFO'
                      });
                    }
                  },
                  {
                    text: text.BITE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.BITE,
                        code: 'BIS'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                chest: [
                  {
                    text: text.SWELLING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SWELLING,
                        code: 'UVV'
                      });
                    }
                  },
                  {
                    text: text.COUGH,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.COUGH,
                        code: 'HU'
                      });
                    }
                  },
                  {
                    text: text.SNORING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SNORING,
                        code: 'SC'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                general: [
                  {
                    text: text.FEVER,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.FEVER,
                        code: 'FIE'
                      });
                    }
                  },
                  {
                    text: text.TEMPERATURE_LOW,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.TEMPERATURE_LOW,
                        code: 'UNT'
                      });
                    }
                  },

                  {
                    text: text.BEHAVIOUR_CHANGE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.BEHAVIOUR_CHANGE,
                        code: 'VEH'
                      });
                    }
                  },
                  {
                    text: text.BUMPINESS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.BUMPINESS,
                        code: 'ROL'
                      });
                    }
                  },
                  {
                    text: text.HYPOCRISY,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.HYPOCRISY,
                        code: 'PSP'
                      });
                    }
                  },
                  {
                    text: text.SEIZURE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SEIZURE,
                        code: 'NOK'
                      });
                    }
                  },
                  {
                    text: text.SHOCK,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SHOCK,
                        code: 'NOI'
                      });
                    }
                  },
                  {
                    text: text.UNCONSCIOUSNESS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.UNCONSCIOUSNESS,
                        code: 'NOS'
                      });
                    }
                  },
                  {
                    text: text.WEAKNESS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.WEAKNESS,
                        code: 'WEA'
                      });
                    }
                  },
                  {
                    text: text.WEIGHT_LOSS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.WEIGHT_LOSS,
                        code: 'AB'
                      });
                    }
                  },
                  {
                    text: text.WEIGHT_GAIN,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.WEIGHT_GAIN,
                        code: 'AD'
                      });
                    }
                  },
                  {
                    text: text.HEATSTROKE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.HEATSTROKE,
                        code: 'NOH'
                      });
                    }
                  },
                  {
                    text: text.APNEA,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.APNEA,
                        code: 'NOC'
                      });
                    }
                  },
                  {
                    text: text.POISONING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.POISONING,
                        code: 'NOT'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                abdomen: [
                  {
                    text: text.BUMPINESS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.BUMPINESS,
                        code: 'ROL'
                      });
                    }
                  },
                  {
                    text: text.SWELLING_VULVA,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SWELLING_VULVA,
                        code: 'VUL'
                      });
                    }
                  },
                  {
                    text: text.UNWANTED_PREGNANCY,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.UNWANTED_PREGNANCY,
                        code: 'UDE'
                      });
                    }
                  },
                  {
                    text: text.EMERGENCY_BIRTH,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.EMERGENCY_BIRTH,
                        code: 'NOG'
                      });
                    }
                  },
                  {
                    text: text.VAGINAL_DISCHARGE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.VAGINAL_DISCHARGE,
                        code: 'VAG'
                      });
                    }
                  },
                  {
                    text: text.URINATION_PAIN,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.URINATION_PAIN,
                        code: 'SHA'
                      });
                    }
                  },
                  {
                    text: text.URINATION_CHANGE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.URINATION_CHANGE,
                        code: 'VU'
                      });
                    }
                  },
                  {
                    text: text.URINATION_LOW,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.URINATION_LOW,
                        code: 'GHA'
                      });
                    }
                  },
                  {
                    text: text.URINATION_HIGH_DRINKING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.URINATION_HIGH_DRINKING,
                        code: 'VUT'
                      });
                    }
                  },
                  {
                    text: text.URINATION_HIGH,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.URINATION_HIGH,
                        code: 'HHA'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                throat: [
                  {
                    text: text.SWELLING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SWELLING,
                        code: 'UVV'
                      });
                    }
                  },
                  {
                    text: text.STIFFNESS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.STIFFNESS,
                        code: 'STE'
                      });
                    }
                  },
                  {
                    text: text.MUSCULAR_DYSTROPHY,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.MUSCULAR_DYSTROPHY,
                        code: 'MUS'
                      });
                    }
                  },
                  {
                    text: text.BITE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.BITE,
                        code: 'BIS'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                fur: [
                  {
                    text: text.FUR_SHAGGY,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.FUR_SHAGGY,
                        code: 'SSF'
                      });
                    }
                  },
                  {
                    text: text.ITCHING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.ITCHING,
                        code: 'JUC'
                      });
                    }
                  },
                  {
                    text: text.FLEA_INVESTATION,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.FLEA_INVESTATION,
                        code: 'FLO'
                      });
                    }
                  },
                  {
                    text: text.SKIN_STINKY,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SKIN_STINKY,
                        code: 'URH'
                      });
                    }
                  },
                  {
                    text: text.FUR_LOSS_ITCHING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.FUR_LOSS_ITCHING,
                        code: 'ALJ'
                      });
                    }
                  },
                  {
                    text: text.FUR_LOSS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.FUR_LOSS,
                        code: 'ANJ'
                      });
                    }
                  },
                  {
                    text: text.INJURY_SKIN,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.INJURY_SKIN,
                        code: 'HVE'
                      });
                    }
                  },
                  {
                    text: text.HEAVY_BLEEDING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.HEAVY_BLEEDING,
                        code: 'NOB'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                head: [
                  {
                    text: text.SWELLING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SWELLING,
                        code: 'UVV'
                      });
                    }
                  },
                  {
                    text: text.MUSCULAR_DYSTROPHY,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.MUSCULAR_DYSTROPHY,
                        code: 'MUS'
                      });
                    }
                  },
                  {
                    text: text.BITE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.BITE,
                        code: 'BIS'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                mouth: [
                  {
                    text: text.EAT_GRASS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.EAT_GRASS,
                        code: 'GRA'
                      });
                    }
                  },
                  {
                    text: text.EAT_NONE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.EAT_NONE,
                        code: 'FRI'
                      });
                    }
                  },
                  {
                    text: text.DRINKING_HIGH,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.DRINKING_HIGH,
                        code: 'VTR'
                      });
                    }
                  },
                  {
                    text: text.URINATION_HIGH_DRINKING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.URINATION_HIGH_DRINKING,
                        code: 'VUT'
                      });
                    }
                  },
                  {
                    text: text.SWELLING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SWELLING,
                        code: 'UVN'
                      });
                    }
                  },
                  {
                    text: text.VOICE_CHANGES,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.VOICE_CHANGES,
                        code: 'STI'
                      });
                    }
                  },
                  {
                    text: text.FOOT_ODOR,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.FOOT_ODOR,
                        code: 'MG'
                      });
                    }
                  },
                  {
                    text: text.COUGH,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.COUGH,
                        code: 'HU'
                      });
                    }
                  },
                  {
                    text: text.VOMIT,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.VOMIT,
                        code: 'EB'
                      });
                    }
                  },
                  {
                    text: text.VOMITING_DIARRHAE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.VOMITING_DIARRHAE,
                        code: 'ED'
                      });
                    }
                  },
                  {
                    text: text.SNORING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SNORING,
                        code: 'SC'
                      });
                    }
                  },
                  {
                    text: text.BREATH_SHORTNESS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.BREATH_SHORTNESS,
                        code: 'NOA'
                      });
                    }
                  },
                  {
                    text: text.APNEA,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.APNEA,
                        code: 'NOC'
                      });
                    }
                  },
                  {
                    text: text.POISONING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.POISONING,
                        code: 'NOT'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                nose: [
                  {
                    text: text.NOSE_DRY,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.NOSE_DRY,
                        code: 'NAS'
                      });
                    }
                  },
                  {
                    text: text.SWELLING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SWELLING,
                        code: 'UVN'
                      });
                    }
                  },
                  {
                    text: text.NOSE_BLEEDING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.NOSE_BLEEDING,
                        code: 'NBL'
                      });
                    }
                  },
                  {
                    text: text.NOSE_DISCHARGE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.NOSE_DISCHARGE,
                        code: 'NA'
                      });
                    }
                  },
                  {
                    text: text.SNORING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SNORING,
                        code: 'SC'
                      });
                    }
                  },
                  {
                    text: text.SNEEZE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SNEEZE,
                        code: 'NIE'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                ear: [
                  {
                    text: text.EARS_HEARING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.EARS_HEARING,
                        code: 'HOE'
                      });
                    }
                  },
                  {
                    text: text.SWELLING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SWELLING,
                        code: 'UVN'
                      });
                    }
                  },
                  {
                    text: text.EARS_SWOLLEN,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.EARS_SWOLLEN,
                        code: 'GO'
                      });
                    }
                  },
                  {
                    text: text.EARS_SCRATCH,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.EARS_SCRATCH,
                        code: 'KO'
                      });
                    }
                  },
                  {
                    text: text.EARS_DISCHARGE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.EARS_DISCHARGE,
                        code: 'AO'
                      });
                    }
                  },
                  {
                    text: text.EARS_STINKY,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.EARS_STINKY,
                        code: 'UO'
                      });
                    }
                  },
                  {
                    text: text.EARS_INJURY,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.EARS_INJURY,
                        code: 'VO'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                butt: [
                  {
                    text: text.SWELLING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SWELLING,
                        code: 'UVV'
                      });
                    }
                  },
                  {
                    text: text.STIFFNESS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.STIFFNESS,
                        code: 'STE'
                      });
                    }
                  },
                  {
                    text: text.MUSCULAR_DYSTROPHY,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.MUSCULAR_DYSTROPHY,
                        code: 'MUS'
                      });
                    }
                  },
                  {
                    text: text.FLATULENCE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.FLATULENCE,
                        code: 'FL'
                      });
                    }
                  },
                  {
                    text: text.DIARRHAE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.DIARRHAE,
                        code: 'DF'
                      });
                    }
                  },
                  {
                    text: text.VOMITING_DIARRHAE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.VOMITING_DIARRHAE,
                        code: 'ED'
                      });
                    }
                  },
                  {
                    text: text.ITCHING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.ITCHING,
                        code: 'AJ'
                      });
                    }
                  },
                  {
                    text: text.CONSTIPATION,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.CONSTIPATION,
                        code: 'VS'
                      });
                    }
                  },
                  {
                    text: text.BITE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.BITE,
                        code: 'BIS'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                poison: [
                  {
                    text: text.CHOCOLATE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.CHOCOLATE,
                        code: 'p+POIC'
                      });
                    }
                  },
                  {
                    text: text.MEDS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.MEDS,
                        code: 'p+POIM'
                      });
                    }
                  },
                  {
                    text: text.TOBACCO,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.TOBACCO,
                        code: 'p+POIT'
                      });
                    }
                  },
                  {
                    text: text.MISC,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.MISC,
                        code: 'POIN'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                tail: [
                  {
                    text: text.SWELLING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SWELLING,
                        code: 'UVV'
                      });
                    }
                  },
                  {
                    text: text.STIFFNESS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.STIFFNESS,
                        code: 'STE'
                      });
                    }
                  },
                  {
                    text: text.BITE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.BITE,
                        code: 'BIS'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                back: [
                  {
                    text: text.SWELLING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SWELLING,
                        code: 'UVV'
                      });
                    }
                  },
                  {
                    text: text.STIFFNESS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.STIFFNESS,
                        code: 'STE'
                      });
                    }
                  },
                  {
                    text: text.MUSCULAR_DYSTROPHY,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.MUSCULAR_DYSTROPHY,
                        code: 'VS'
                      });
                    }
                  },
                  {
                    text: text.BITE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.BITE,
                        code: 'BIS'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ]
              },
              castrated:  {
                eye: [
                  {
                    text: text.EYES_IMPAIRED,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.EYES_IMPAIRED,
                        code: 'SEH'
                      });
                    }
                  },
                  {
                    text: text.EYES_CHANGES,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.EYES_CHANGES,
                        code: 'AUV'
                      });
                    }
                  },
                  {
                    text: text.EYES_INJURY,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.EYES_INJURY,
                        code: 'NOE'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                belly: [
                  {
                    text: text.STOMACH_PAIN,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.STOMACH_PAIN,
                        code: 'BAU'
                      });
                    }
                  },
                  {
                    text: text.HEAVY_STOMACH_PAIN,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.HEAVY_STOMACH_PAIN,
                        code: 'NOP'
                      });
                    }
                  },
                  {
                    text: text.VOMIT,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.VOMIT,
                        code: 'EB'
                      });
                    }
                  },
                  {
                    text: text.FLATULENCE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.FLATULENCE,
                        code: 'FL'
                      });
                    }
                  },
                  {
                    text: text.DIARRHAE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.DIARRHAE,
                        code: 'DF'
                      });
                    }
                  },
                  {
                    text: text.VOMITING_DIARRHAE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.VOMITING_DIARRHAE,
                        code: 'ED'
                      });
                    }
                  },
                  {
                    text: text.CONSTIPATION,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.CONSTIPATION,
                        code: 'VS'
                      });
                    }
                  },
                  {
                    text: text.SUCKLES,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SUCKLES,
                        code: 'GES'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                legs: [
                  {
                    text: text.SWELLING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SWELLING,
                        code: 'UVN'
                      });
                    }
                  },
                  {
                    text: text.LAMENESS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.LAMENESS,
                        code: 'LAH'
                      });
                    }
                  },
                  {
                    text: text.PARALYSIS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.PARALYSIS,
                        code: 'NOL'
                      });
                    }
                  },
                  {
                    text: text.BROKEN_BONE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.BROKEN_BONE,
                        code: 'NOO'
                      });
                    }
                  },
                  {
                    text: text.STIFFNESS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.STIFFNESS,
                        code: 'STE'
                      });
                    }
                  },
                  {
                    text: text.MUSCULAR_DYSTROPHY,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.MUSCULAR_DYSTROPHY,
                        code: 'MUS'
                      });
                    }
                  },
                  {
                    text: text.SWELLING_JOINT,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SWELLING_JOINT,
                        code: 'GSC'
                      });
                    }
                  },
                  {
                    text: text.INJURY_CLAW,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.INJURY_CLAW,
                        code: 'KRV'
                      });
                    }
                  },
                  {
                    text: text.INJURY_PAW,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.INJURY_PAW,
                        code: 'PFO'
                      });
                    }
                  },
                  {
                    text: text.BITE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.BITE,
                        code: 'BIS'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                chest: [
                  {
                    text: text.SWELLING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SWELLING,
                        code: 'UVV'
                      });
                    }
                  },
                  {
                    text: text.COUGH,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.COUGH,
                        code: 'HU'
                      });
                    }
                  },
                  {
                    text: text.SNORING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SNORING,
                        code: 'SC'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                general: [
                  {
                    text: text.FEVER,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.FEVER,
                        code: 'FIE'
                      });
                    }
                  },
                  {
                    text: text.TEMPERATURE_LOW,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.TEMPERATURE_LOW,
                        code: 'UNT'
                      });
                    }
                  },

                  {
                    text: text.BEHAVIOUR_CHANGE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.BEHAVIOUR_CHANGE,
                        code: 'VEH'
                      });
                    }
                  },
                  {
                    text: text.BUMPINESS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.BUMPINESS,
                        code: 'ROL'
                      });
                    }
                  },
                  {
                    text: text.HYPOCRISY,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.HYPOCRISY,
                        code: 'PSP'
                      });
                    }
                  },
                  {
                    text: text.SEIZURE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SEIZURE,
                        code: 'NOK'
                      });
                    }
                  },
                  {
                    text: text.SHOCK,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SHOCK,
                        code: 'NOI'
                      });
                    }
                  },
                  {
                    text: text.UNCONSCIOUSNESS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.UNCONSCIOUSNESS,
                        code: 'NOS'
                      });
                    }
                  },
                  {
                    text: text.WEAKNESS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.WEAKNESS,
                        code: 'WEA'
                      });
                    }
                  },
                  {
                    text: text.WEIGHT_LOSS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.WEIGHT_LOSS,
                        code: 'AB'
                      });
                    }
                  },
                  {
                    text: text.WEIGHT_GAIN,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.WEIGHT_GAIN,
                        code: 'AD'
                      });
                    }
                  },
                  {
                    text: text.HEATSTROKE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.HEATSTROKE,
                        code: 'NOH'
                      });
                    }
                  },
                  {
                    text: text.APNEA,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.APNEA,
                        code: 'NOC'
                      });
                    }
                  },
                  {
                    text: text.POISONING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.POISONING,
                        code: 'NOT'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                abdomen: [
                  {
                    text: text.SWELLING_VULVA,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SWELLING_VULVA,
                        code: 'VUL'
                      });
                    }
                  },
                  {
                    text: text.VAGINAL_DISCHARGE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.VAGINAL_DISCHARGE,
                        code: 'VAG'
                      });
                    }
                  },
                  {
                    text: text.URINATION_PAIN,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.URINATION_PAIN,
                        code: 'SHA'
                      });
                    }
                  },
                  {
                    text: text.URINATION_CHANGE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.URINATION_CHANGE,
                        code: 'VU'
                      });
                    }
                  },
                  {
                    text: text.URINATION_LOW,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.URINATION_LOW,
                        code: 'GHA'
                      });
                    }
                  },
                  {
                    text: text.URINATION_HIGH_DRINKING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.URINATION_HIGH_DRINKING,
                        code: 'VUT'
                      });
                    }
                  },
                  {
                    text: text.URINATION_HIGH,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.URINATION_HIGH,
                        code: 'HHA'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                throat: [
                  {
                    text: text.SWELLING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SWELLING,
                        code: 'UVV'
                      });
                    }
                  },
                  {
                    text: text.STIFFNESS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.STIFFNESS,
                        code: 'STE'
                      });
                    }
                  },
                  {
                    text: text.MUSCULAR_DYSTROPHY,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.MUSCULAR_DYSTROPHY,
                        code: 'MUS'
                      });
                    }
                  },
                  {
                    text: text.BITE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.BITE,
                        code: 'BIS'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                fur: [
                  {
                    text: text.FUR_SHAGGY,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.FUR_SHAGGY,
                        code: 'SSF'
                      });
                    }
                  },
                  {
                    text: text.ITCHING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.ITCHING,
                        code: 'JUC'
                      });
                    }
                  },
                  {
                    text: text.FLEA_INVESTATION,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.FLEA_INVESTATION,
                        code: 'FLO'
                      });
                    }
                  },
                  {
                    text: text.SKIN_STINKY,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SKIN_STINKY,
                        code: 'URH'
                      });
                    }
                  },
                  {
                    text: text.FUR_LOSS_ITCHING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.FUR_LOSS_ITCHING,
                        code: 'ALJ'
                      });
                    }
                  },
                  {
                    text: text.FUR_LOSS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.FUR_LOSS,
                        code: 'ANJ'
                      });
                    }
                  },
                  {
                    text: text.INJURY_SKIN,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.INJURY_SKIN,
                        code: 'HVE'
                      });
                    }
                  },
                  {
                    text: text.HEAVY_BLEEDING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.HEAVY_BLEEDING,
                        code: 'NOB'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                head: [
                  {
                    text: text.SWELLING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SWELLING,
                        code: 'UVV'
                      });
                    }
                  },
                  {
                    text: text.MUSCULAR_DYSTROPHY,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.MUSCULAR_DYSTROPHY,
                        code: 'MUS'
                      });
                    }
                  },
                  {
                    text: text.BITE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.BITE,
                        code: 'BIS'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                mouth: [
                  {
                    text: text.EAT_GRASS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.EAT_GRASS,
                        code: 'GRA'
                      });
                    }
                  },
                  {
                    text: text.EAT_NONE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.EAT_NONE,
                        code: 'FRI'
                      });
                    }
                  },
                  {
                    text: text.DRINKING_HIGH,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.DRINKING_HIGH,
                        code: 'VTR'
                      });
                    }
                  },
                  {
                    text: text.URINATION_HIGH_DRINKING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.URINATION_HIGH_DRINKING,
                        code: 'VUT'
                      });
                    }
                  },
                  {
                    text: text.SWELLING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SWELLING,
                        code: 'UVN'
                      });
                    }
                  },
                  {
                    text: text.VOICE_CHANGES,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.VOICE_CHANGES,
                        code: 'STI'
                      });
                    }
                  },
                  {
                    text: text.FOOT_ODOR,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.FOOT_ODOR,
                        code: 'MG'
                      });
                    }
                  },
                  {
                    text: text.COUGH,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.COUGH,
                        code: 'HU'
                      });
                    }
                  },
                  {
                    text: text.VOMIT,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.VOMIT,
                        code: 'EB'
                      });
                    }
                  },
                  {
                    text: text.VOMITING_DIARRHAE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.VOMITING_DIARRHAE,
                        code: 'ED'
                      });
                    }
                  },
                  {
                    text: text.SNORING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SNORING,
                        code: 'SC'
                      });
                    }
                  },
                  {
                    text: text.BREATH_SHORTNESS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.BREATH_SHORTNESS,
                        code: 'NOA'
                      });
                    }
                  },
                  {
                    text: text.APNEA,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.APNEA,
                        code: 'NOC'
                      });
                    }
                  },
                  {
                    text: text.POISONING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.POISONING,
                        code: 'NOT'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                nose: [
                  {
                    text: text.NOSE_DRY,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.NOSE_DRY,
                        code: 'NAS'
                      });
                    }
                  },
                  {
                    text: text.SWELLING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SWELLING,
                        code: 'UVN'
                      });
                    }
                  },
                  {
                    text: text.NOSE_BLEEDING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.NOSE_BLEEDING,
                        code: 'NBL'
                      });
                    }
                  },
                  {
                    text: text.NOSE_DISCHARGE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.NOSE_DISCHARGE,
                        code: 'NA'
                      });
                    }
                  },
                  {
                    text: text.SNORING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SNORING,
                        code: 'SC'
                      });
                    }
                  },
                  {
                    text: text.SNEEZE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SNEEZE,
                        code: 'NIE'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                ear: [
                  {
                    text: text.EARS_HEARING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.EARS_HEARING,
                        code: 'HOE'
                      });
                    }
                  },
                  {
                    text: text.SWELLING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SWELLING,
                        code: 'UVN'
                      });
                    }
                  },
                  {
                    text: text.EARS_SWOLLEN,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.EARS_SWOLLEN,
                        code: 'GO'
                      });
                    }
                  },
                  {
                    text: text.EARS_SCRATCH,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.EARS_SCRATCH,
                        code: 'KO'
                      });
                    }
                  },
                  {
                    text: text.EARS_DISCHARGE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.EARS_DISCHARGE,
                        code: 'AO'
                      });
                    }
                  },
                  {
                    text: text.EARS_STINKY,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.EARS_STINKY,
                        code: 'UO'
                      });
                    }
                  },
                  {
                    text: text.EARS_INJURY,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.EARS_INJURY,
                        code: 'VO'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                butt: [
                  {
                    text: text.SWELLING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SWELLING,
                        code: 'UVV'
                      });
                    }
                  },
                  {
                    text: text.STIFFNESS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.STIFFNESS,
                        code: 'STE'
                      });
                    }
                  },
                  {
                    text: text.MUSCULAR_DYSTROPHY,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.MUSCULAR_DYSTROPHY,
                        code: 'MUS'
                      });
                    }
                  },
                  {
                    text: text.FLATULENCE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.FLATULENCE,
                        code: 'FL'
                      });
                    }
                  },
                  {
                    text: text.DIARRHAE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.DIARRHAE,
                        code: 'DF'
                      });
                    }
                  },
                  {
                    text: text.VOMITING_DIARRHAE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.VOMITING_DIARRHAE,
                        code: 'ED'
                      });
                    }
                  },
                  {
                    text: text.ITCHING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.ITCHING,
                        code: 'AJ'
                      });
                    }
                  },
                  {
                    text: text.CONSTIPATION,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.CONSTIPATION,
                        code: 'VS'
                      });
                    }
                  },
                  {
                    text: text.BITE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.BITE,
                        code: 'BIS'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                poison: [
                  {
                    text: text.CHOCOLATE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.CHOCOLATE,
                        code: 'p+POIC'
                      });
                    }
                  },
                  {
                    text: text.MEDS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.MEDS,
                        code: 'p+POIM'
                      });
                    }
                  },
                  {
                    text: text.TOBACCO,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.TOBACCO,
                        code: 'p+POIT'
                      });
                    }
                  },
                  {
                    text: text.MISC,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.MISC,
                        code: 'POIN'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                tail: [
                  {
                    text: text.SWELLING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SWELLING,
                        code: 'UVV'
                      });
                    }
                  },
                  {
                    text: text.STIFFNESS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.STIFFNESS,
                        code: 'STE'
                      });
                    }
                  },
                  {
                    text: text.BITE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.BITE,
                        code: 'BIS'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ],
                back: [
                  {
                    text: text.SWELLING,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.SWELLING,
                        code: 'UVV'
                      });
                    }
                  },
                  {
                    text: text.STIFFNESS,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.STIFFNESS,
                        code: 'STE'
                      });
                    }
                  },
                  {
                    text: text.MUSCULAR_DYSTROPHY,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.MUSCULAR_DYSTROPHY,
                        code: 'VS'
                      });
                    }
                  },
                  {
                    text: text.BITE,
                    cssClass: 'petspot-actionsheet-button',
                    handler: () => {
                      this.buttonData$.next({
                        symptom: text.BITE,
                        code: 'BIS'
                      });
                    }
                  },
                  {
                    text: text.CANCEL_BUTTON,
                    role: 'cancel'
                  }
                ]
              }
            }
          }
        };
      });
  }
}
