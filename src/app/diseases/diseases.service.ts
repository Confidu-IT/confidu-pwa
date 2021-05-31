import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CommonService } from '../shared/services/common/common.service';

@Injectable({
  providedIn: 'root'
})
export class DiseasesService {
  public regions: any;

  constructor(
    private translateService: TranslateService,
    private commonService: CommonService
  ) {
    this.translateService.setDefaultLang(this.commonService.language); // fallback
    this.translateService.use(this.translateService.getBrowserLang());
    this.translateService.get('DISEASE_MODAL_PAGE')
      .subscribe(val => {
        this.regions = [
          {
            label: val.DOC?.TYPES?.PHOTO,
            value: {
              image: 'https://firebasestorage.googleapis.com/v0/b/confidu-app.appspot.com/o/carecard%2Ffindings%2Fxray.svg?alt=media&token=d1c32870-eb04-4e17-b0e8-95e4c27e7e48',
              name: val.DOC?.TYPES?.PHOTO,
              type: 'photo'
            },
            bodyParts: [
              {
                label: val.DOC?.BODY_REGIONS?.ITEMS?.TEETH,
                value: 'teeth'
              },
              {
                label: val.DOC?.BODY_REGIONS?.ITEMS?.HEAD,
                value: 'head'
              },
              {
                label: val.DOC?.BODY_REGIONS?.ITEMS?.THROAT,
                value: 'throat'
              },
              {
                label: val.DOC?.BODY_REGIONS?.ITEMS?.BREAST,
                value: 'breast'
              },
              {
                label: val.DOC?.BODY_REGIONS?.ITEMS?.BACK,
                value: 'back'
              },
              {
                label: val.DOC?.BODY_REGIONS?.ITEMS?.STOMACH,
                value: 'stomach'
              },
              {
                label: val.DOC?.BODY_REGIONS?.ITEMS?.PELVIS,
                value: 'pelvis'
              },
              {
                label: val.DOC?.BODY_REGIONS?.ITEMS?.TAIL,
                value: 'tail'
              },
              {
                label: val.DOC?.BODY_REGIONS?.ITEMS?.LEFT_FRONTLEG,
                value: 'left_frontleg'
              },
              {
                label: val.DOC?.BODY_REGIONS?.ITEMS?.RIGHT_FRONTLEG,
                value: 'right_frontleg'
              },
              {
                label: val.DOC?.BODY_REGIONS?.ITEMS?.LEFT_HINDLEG,
                value: 'left_hindleg'
              },
              {
                label: val.DOC?.BODY_REGIONS?.ITEMS?.RIGHT_HINDLEG,
                value: 'right_hindleg'
              }
            ]
          },
          {
            label: val.DOC?.TYPES?.X_RAY,
            value: {
              image: 'https://firebasestorage.googleapis.com/v0/b/confidu-app.appspot.com/o/carecard%2Ffindings%2Fxray.svg?alt=media&token=d1c32870-eb04-4e17-b0e8-95e4c27e7e48',
              name: val.DOC?.TYPES?.X_RAY,
              type: 'x_ray'
            },
            bodyParts: [
              {
                label: val.DOC?.BODY_REGIONS?.ITEMS?.TEETH,
                value: 'teeth'
              },
              {
                label: val.DOC?.BODY_REGIONS?.ITEMS?.HEAD,
                value: 'head'
              },
              {
                label: val.DOC?.BODY_REGIONS?.ITEMS?.THROAT,
                value: 'throat'
              },
              {
                label: val.DOC?.BODY_REGIONS?.ITEMS?.BREAST,
                value: 'breast'
              },
              {
                label: val.DOC?.BODY_REGIONS?.ITEMS?.BACK,
                value: 'back'
              },
              {
                label: val.DOC?.BODY_REGIONS?.ITEMS?.STOMACH,
                value: 'stomach'
              },
              {
                label: val.DOC?.BODY_REGIONS?.ITEMS?.PELVIS,
                value: 'pelvis'
              },
              {
                label: val.DOC?.BODY_REGIONS?.ITEMS?.TAIL,
                value: 'tail'
              },
              {
                label: val.DOC?.BODY_REGIONS?.ITEMS?.LEFT_FRONTLEG,
                value: 'left_frontleg'
              },
              {
                label: val.DOC?.BODY_REGIONS?.ITEMS?.RIGHT_FRONTLEG,
                value: 'right_frontleg'
              },
              {
                label: val.DOC?.BODY_REGIONS?.ITEMS?.LEFT_HINDLEG,
                value: 'left_hindleg'
              },
              {
                label: val.DOC?.BODY_REGIONS?.ITEMS?.RIGHT_HINDLEG,
                value: 'right_hindleg'
              }
            ]
          },
          {
            label: val.DOC?.TYPES?.ULTRASONIC,
            value: {
              image: 'https://firebasestorage.googleapis.com/v0/b/confidu-app.appspot.com/o/carecard%2Ffindings%2Fultrasound.svg?alt=media&token=f494fd7e-4867-4652-889c-d98f4b97b3d4',
              name: val.DOC?.TYPES?.ULTRASONIC,
              type: 'ultrasonic'
            },
            bodyParts: [
              {
                label: val.DOC?.BODY_REGIONS?.ITEMS?.TEETH,
                value: 'teeth'
              },
              {
                label: val.DOC?.BODY_REGIONS?.ITEMS?.HEAD,
                value: 'head'
              },
              {
                label: val.DOC?.BODY_REGIONS?.ITEMS?.THROAT,
                value: 'throat'
              },
              {
                label: val.DOC?.BODY_REGIONS?.ITEMS?.BREAST,
                value: 'breast'
              },
              {
                label: val.DOC?.BODY_REGIONS?.ITEMS?.BACK,
                value: 'back'
              },
              {
                label: val.DOC?.BODY_REGIONS?.ITEMS?.STOMACH,
                value: 'stomach'
              },
              {
                label: val.DOC?.BODY_REGIONS?.ITEMS?.PELVIS,
                value: 'pelvis'
              },
              {
                label: val.DOC?.BODY_REGIONS?.ITEMS?.TAIL,
                value: 'tail'
              },
              {
                label: val.DOC?.BODY_REGIONS?.ITEMS?.LEFT_FRONTLEG,
                value: 'left_frontleg'
              },
              {
                label: val.DOC?.BODY_REGIONS?.ITEMS?.RIGHT_FRONTLEG,
                value: 'right_frontleg'
              },
              {
                label: val.DOC?.BODY_REGIONS?.ITEMS?.LEFT_HINDLEG,
                value: 'left_hindleg'
              },
              {
                label: val.DOC?.BODY_REGIONS?.ITEMS?.RIGHT_HINDLEG,
                value: 'right_hindleg'
              }
            ]
          },
          {
            label: val.DOC?.TYPES?.MRT,
            value: {
              image: 'https://firebasestorage.googleapis.com/v0/b/confidu-app.appspot.com/o/carecard%2Ffindings%2Fmri.svg?alt=media&token=c62e0cbf-237e-43d9-9c04-670a8e94b8af',
              name: val.DOC?.TYPES?.MRT,
              type: 'mrt'
            },
            bodyParts: [
              {
                label: val.DOC?.BODY_REGIONS?.ITEMS?.HEAD,
                value: 'head'
              },
              {
                label: val.DOC?.BODY_REGIONS?.ITEMS?.THROAT,
                value: 'throat'
              },
              {
                label: val.DOC?.BODY_REGIONS?.ITEMS?.BREAST,
                value: 'breast'
              },
              {
                label: val.DOC?.BODY_REGIONS?.ITEMS?.BACK,
                value: 'back'
              },
              {
                label: val.DOC?.BODY_REGIONS?.ITEMS?.STOMACH,
                value: 'stomach'
              },
              {
                label: val.DOC?.BODY_REGIONS?.ITEMS?.PELVIS,
                value: 'pelvis'
              },
              {
                label: val.DOC?.BODY_REGIONS?.ITEMS?.TAIL,
                value: 'tail'
              },
              {
                label: val.DOC?.BODY_REGIONS?.ITEMS?.LEFT_FRONTLEG,
                value: 'left_frontleg'
              },
              {
                label: val.DOC?.BODY_REGIONS?.ITEMS?.RIGHT_FRONTLEG,
                value: 'right_frontleg'
              },
              {
                label: val.DOC?.BODY_REGIONS?.ITEMS?.LEFT_HINDLEG,
                value: 'left_hindleg'
              },
              {
                label: val.DOC?.BODY_REGIONS?.ITEMS?.RIGHT_HINDLEG,
                value: 'right_hindleg'
              }
            ]
          },
          {
            label: val.DOC?.TYPES?.CT,
            value: {
              image: 'https://firebasestorage.googleapis.com/v0/b/confidu-app.appspot.com/o/carecard%2Ffindings%2Fct.svg?alt=media&token=33c23320-6cee-4c6d-9eb5-f4e01c8de53d',
              name: val.DOC?.TYPES?.CT,
              type: 'ct'
            },
            bodyParts: [
              {
                label: val.DOC?.BODY_REGIONS?.ITEMS?.HEAD,
                value: 'head'
              },
              {
                label: val.DOC?.BODY_REGIONS?.ITEMS?.THROAT,
                value: 'throat'
              },
              {
                label: val.DOC?.BODY_REGIONS?.ITEMS?.BREAST,
                value: 'breast'
              },
              {
                label: val.DOC?.BODY_REGIONS?.ITEMS?.BACK,
                value: 'back'
              },
              {
                label: val.DOC?.BODY_REGIONS?.ITEMS?.STOMACH,
                value: 'stomach'
              },
              {
                label: val.DOC?.BODY_REGIONS?.ITEMS?.PELVIS,
                value: 'pelvis'
              },
              {
                label: val.DOC?.BODY_REGIONS?.ITEMS?.TAIL,
                value: 'tail'
              },
              {
                label: val.DOC?.BODY_REGIONS?.ITEMS?.LEFT_FRONTLEG,
                value: 'left_frontleg'
              },
              {
                label: val.DOC?.BODY_REGIONS?.ITEMS?.RIGHT_FRONTLEG,
                value: 'right_frontleg'
              },
              {
                label: val.DOC?.BODY_REGIONS?.ITEMS?.LEFT_HINDLEG,
                value: 'left_hindleg'
              },
              {
                label: val.DOC?.BODY_REGIONS?.ITEMS?.RIGHT_HINDLEG,
                value: 'right_hindleg'
              }
            ]
          },
          {
            label: val.DOC?.TYPES?.LAB_RESULT,
            value: {
              type: 'lab_result',
              name: val.DOC?.TYPES?.LAB_RESULT,
              image: 'https://firebasestorage.googleapis.com/v0/b/confidu-app.appspot.com/o/carecard%2Ffindings%2Flab_results.svg?alt=media&token=2e71e351-06fb-4dfb-bfc5-d14284308b82',
            },
            bodyParts: [
              {
                label: val.DOC?.BODY_REGIONS?.ITEMS?.BLOOD,
                value: 'blood'
              },
              {
                label: val.DOC?.BODY_REGIONS?.ITEMS?.URINE,
                value: 'urine'
              },
              {
                label: val.DOC?.BODY_REGIONS?.ITEMS?.FECES,
                value: 'feces'
              },
              {
                label: val.DOC?.BODY_REGIONS?.ITEMS?.BODY_TISSUE,
                value: 'body_tissue'
              },
              {
                label: val.DOC?.BODY_REGIONS?.ITEMS?.OTHER,
                value: 'other'
              }
            ]
          }
        ];
      });
  }
}
