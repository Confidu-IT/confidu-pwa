import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private baseUrl = environment.baseUrl;
  private iconPath = '../../../assets/icons/urine-stick';
  private answers$ = new BehaviorSubject<any>({});

  private uploadDocs$ = new BehaviorSubject<any>([]);

  constructor(private http: HttpClient) {
  }

  public getQuestions(
    type: string,
    symptom: string,
    userID: string,
    token: string,
    petID: string,
    language: string
  ): Observable<any> {
    const url = `${this.baseUrl}/${language}/event/questions`;

    const headers = {
      'Content-Type': 'application/json',
      // 'firebase-context-token': token,
      'sw-context-token': localStorage.getItem('sw-token') || null
    };

    const body = {
      key: symptom,
      event: type,
      petId: petID,
      uid: userID
    };
    return this.http.post(url, body, { headers });
  }

  public get answers(): Observable<any> {
    return this.answers$.asObservable();
  }

  public setAnswers(data): void {
    this.answers$.next(data);
  }

  public get uploadDocs(): Observable<any> {
    return this.uploadDocs$.asObservable();
  }

  public setUploadDocs(data): void {
    this.uploadDocs$.next(data);
  }

  public getResult(
    userID: string,
    token: string,
    petID: string,
    symptom: string | null,
    type: string,
    language: string,
    tId: string | null,
    answers: any
  ): Observable<any> {
    const url = `${this.baseUrl}/${language}/event/results`;
    const headers = {
      'Content-Type': 'application/json',
      // 'firebase-context-token': token,
      'sw-context-token': localStorage.getItem('sw-token') || null
    };

    const body = {
      event: type,
      petId: petID,
      questions: answers,
      key: symptom,
      uid: userID,
      ticketId: tId
    };
    return this.http.post(url, body, { headers });
  }

  public confirmSaveRequest(
    eventID: string,
    action: string,
    petID: string,
    userID: string,
    token: string,
    language: string
  ) {
    const headers = {
      'Content-Type': 'application/json',
      'firebase-context-token': token,
      'sw-context-token': localStorage.getItem('sw-token')
    };
    const url = `${this.baseUrl}/${language}/event/results/save-content`;
    const body = JSON.stringify({
      eventId: eventID,
      petId: petID,
      uid: userID,
      type: action
    });
    return fetch(url, { method: 'POST', headers, body})
      .then((resp) => {
        if (!resp.ok) {
          throw resp.json();
        }
        return resp.json();
      })
      .catch(e => {
        return e;
      });
  }

  public getTicket(
    userID: string,
    token: string,
    petID: string,
    ticketId: string,
    language: string,
    def: boolean
  ): Observable<any> {
    const url = `${this.baseUrl}/${language}/tickets/ticket`;
    const headers = {
      'Content-Type': 'application/json',
      // 'firebase-context-token': token,
      'sw-context-token': localStorage.getItem('sw-token') || null
    };

    const body = {
      petId: petID,
      ticketKey: ticketId,
      uid: userID,
      defaultTicket: def
    };

    return this.http.post(url, body, { headers });
  }

  // Delete THIS

  public product = {};

  public foo = {};


  public baz = {}

  public blah = {
    "image": null,
    "nextDate": null,
    "recipeKeys": [],
    "initial": {
      "type": "par",
      "visibility": true,
      "body": [
        "Bei einem Flohbefall saugen die springenden Parasiten das Blut unserer Haustiere. Flöhe können starken Juckreiz und Blutarmut verursachen und Bandwürmer übertragen. Sie können auch auf den Menschen übergehen."
      ],
      "header": "Was ist das?"
    },
    "headerHeadlineH1": "Diagnose:",
    "backgroundImageLink": "https://firebasestorage.googleapis.com/v0/b/confidu-app.appspot.com/o/evaluations%2Fpattern%2Ftelevet_seamless.svg?alt=media&token=d18e9d04-076c-46b9-b68a-8a647b05a5ed",
    "iconImageLink": "https://firebasestorage.googleapis.com/v0/b/confidu-app.appspot.com/o/evaluations%2Fevaluation_plus_neg%2Fevaluation_diseases_negative.svg?alt=media&token=8e62362d-af80-4296-9ed6-89f1e88198f1",
    "therapy": "Self-Care möglich",
    "isPdf": true,
    "findings": {
      "body": {
        "text": null,
        "legend": null,
        "answers": [
          {
            "name": "FLO_Q1",
            "values": {
              "answer": {
                "answerValue": null,
                "subject": null,
                "answerUnit": null,
                "venomKey": null,
                "minSpecifics": 0,
                "imageLinkDetailAnswer": null,
                "answerLongtext": [
                  "ja"
                ],
                "ccEntry": null,
                "value": "FLO_Q1_Y",
                "imageLinkAnswer": null
              }
            },
            "questionText": "Sind Flöhe oder Flohkot im Fell von Wautz zu sehen? ",
            "questionType": "R"
          },
          {
            "name": "FLO_Q2",
            "values": {
              "answer": {
                "answerUnit": null,
                "venomKey": null,
                "ccEntry": null,
                "subject": null,
                "imageLinkAnswer": null,
                "answerValue": null,
                "answerLongtext": [
                  "ja"
                ],
                "value": "FLO_Q2_Y",
                "minSpecifics": 0,
                "imageLinkDetailAnswer": null
              }
            },
            "questionText": "Zeigt Wautz starken Juckreiz und punktförmige Einstichstellen sowie eventuell Hautrötungen?",
            "questionType": "R"
          },
          {
            "name": "FLO_Q4",
            "values": {
              "answer": {
                "imageLinkAnswer": null,
                "minSpecifics": 0,
                "answerUnit": null,
                "answerValue": null,
                "venomKey": null,
                "answerLongtext": [
                  "nein"
                ],
                "value": "FLO_Q4_N",
                "subject": null,
                "ccEntry": null,
                "imageLinkDetailAnswer": null
              }
            },
            "questionText": "Leidet Wautz unter Epilepsie?",
            "questionType": "R"
          },
          {
            "name": "AJ_Q7",
            "values": {
              "answer": {
                "subject": null,
                "answerValue": null,
                "imageLinkDetailAnswer": null,
                "value": "AJ_Q7_N",
                "ccEntry": null,
                "imageLinkAnswer": null,
                "venomKey": null,
                "minSpecifics": 0,
                "answerLongtext": [
                  "nein"
                ],
                "answerUnit": null
              }
            },
            "questionText": "Wurde Wautz vor kurzem medikamentös gegen Endoparasiten behandelt?",
            "questionType": "R"
          },
          {
            "name": "AJ_Q8",
            "values": {
              "answer": {
                "value": "AJ_Q8_N",
                "answerUnit": null,
                "answerLongtext": [
                  "nein"
                ],
                "minSpecifics": 0,
                "imageLinkAnswer": null,
                "imageLinkDetailAnswer": null,
                "venomKey": null,
                "answerValue": null,
                "ccEntry": null,
                "subject": null
              }
            },
            "questionText": "Liegt bei Wautz eine Unverträglichkeit oder Allergie gegen bestimmte Medikamente gegen Endoparasiten vor?",
            "questionType": "R"
          },
          {
            "name": "AJ_Q9",
            "values": {
              "answer": {
                "subject": null,
                "venomKey": null,
                "imageLinkAnswer": null,
                "answerValue": null,
                "ccEntry": null,
                "minSpecifics": 0,
                "answerUnit": null,
                "answerLongtext": [
                  "nein"
                ],
                "value": "AJ_Q9_N",
                "imageLinkDetailAnswer": null
              }
            },
            "questionText": "Hat Wautz kürzlich Medikamente gegen Ektoparasiten verabreicht oder aufgetropft bekommen?",
            "questionType": "R"
          },
          {
            "name": "AJ_Q10",
            "values": {
              "answer": {
                "ccEntry": null,
                "minSpecifics": 0,
                "venomKey": null,
                "subject": null,
                "answerUnit": null,
                "imageLinkAnswer": null,
                "value": "AJ_Q10_N",
                "imageLinkDetailAnswer": null,
                "answerValue": null,
                "answerLongtext": [
                  "nein"
                ]
              }
            },
            "questionText": "Verträgt Wautz manche Ektoparasitenmittel nicht?",
            "questionType": "R"
          },
          {
            "name": "SHA_Q19",
            "values": {
              "answer": {
                "minSpecifics": 0,
                "answerLongtext": null,
                "imageLinkDetailAnswer": null,
                "subject": null,
                "imageLinkAnswer": null,
                "ccEntry": "W",
                "answerValue": 33,
                "answerUnit": "kg",
                "value": "*pet_weight*",
                "venomKey": null
              }
            },
            "questionText": "Gib das aktuelle Gewicht von Wautz an.",
            "questionType": "Z"
          },
          {
            "name": "DIS_Q1",
            "values": {
              "answer": {
                "answerValue": null,
                "venomKey": null,
                "value": "DIS_Q1_N",
                "imageLinkAnswer": null,
                "answerLongtext": [
                  "nein"
                ],
                "answerUnit": null,
                "subject": null,
                "ccEntry": null,
                "imageLinkDetailAnswer": null,
                "minSpecifics": 0
              }
            },
            "questionText": "Hat Wautz weitere gesundheitliche Probleme oder Symptome, die nicht abgefragt wurden?",
            "questionType": "R"
          }
        ],
        "param": null
      },
      "header": "Deine Angaben",
      "visibility": null
    },
    "magazinKeys": [
      "MPRE0002_DC"
    ],
    "eventDate": null,
    "textA4": null,
    "products": [
      {
        "info": null,
        "body": [
          "Wir haben dir die Präparate zusammengestellt, die Wautz benötigt. Für verschreibungspflichtige Medikamente stellen wir dir gegen eine Gebühr ein Rezept aus. Lege deine Auswahl in den Warenkorb."
        ],
        "list": [
          {
            "ticket_type": [],
            "feeding": false,
            "indication": {
              "body": {
                "indicationTeaser": null,
                "indicationFirst": {
                  "body": null,
                  "header": [
                    "Um verschreibungspflichtige Medikamente für die Therapie deines Haustieres erhalten zu können, benötigst du ein Rezept. Deine Angaben und die benötigte Dosierung werden von unseren Tierärzt:innen vor der Rezepterstellung genau geprüft, sodass eine Gebühr hierfür entsteht.",
                    "Das Rezept bekommst du anschließend auf dem Postweg in zwei Ausfertigungen. Lege diese einer niedergelassenen Apotheke vor. Sie ist verpflichtet, dir die benötigten Präparate zur Verfügung zu stellen. Um längere Lieferzeiten zu vermeiden, empfehlen wir dir eine Apotheke zu wählen, die Tierarzneimittel wie Floh- und Zeckenpräparate anbietet. Nach dem Kauf bekommst du ein Rezept abgestempelt zurück, das andere behält die Apotheke.",
                    "Wenn du die Medikamente erhalten hast, kannst du sie manuell in der CareCard bei den Tierarztbesuchen erfassen. Wenn du möchtest, wird auch eine Erinnerung im Planer eintragen."
                  ]
                },
                "indicationSecond": null,
                "indicationProduct": null,
                "indicactionCaution": null,
                "indicationOther": null,
                "indicationDeclaration": null,
                "indicationThird": null
              },
              "header": "Hinweis"
            },
            "prescription": true,
            "med_unit": null,
            "med_image_link": null,
            "med_doses": null,
            "med_frequency": null,
            "pharmacy": false,
            "med_amountdose": null,
            "durationEffect": 0,
            "med_name": "Rezept inkl. Rezeptgebühr",
            "product_pdf_dokument": "",
            "med_amount": 1,
            "med_type": null,
            "med_duration_pd": null,
            "med_category": "Verordnung",
            "diagnosis": null,
            "med_delivery": "confidu Vets ApS",
            "medication": "Rezept inkl. Rezeptgebühr",
            "Wiederholung_Freq": null,
            "med_header": null,
            "id": "MEDDC000000020",
            "maxWeight": 100,
            "carecard": [
              {
                "level1_cc_key": "medication_cc",
                "Level2_cc_status": "filled",
                "l0_cc_key": "diseases_cc",
                "key": "MEDDC000000020"
              }
            ],
            "minWeight": 0,
            "categoryKeys": [
              "equip"
            ],
            "key": "PRESCR",
            "med_package_ges": "1 Stück",
            "med_duration_length": null,
            "swKey": "MEDDC000000020",
            "data": {
              "calculatedListingPrice": {
                "from": {
                  "unitPrice": 8.99,
                  "quantity": 1,
                  "totalPrice": 8.99,
                  "calculatedTaxes": [
                    {
                      "tax": 1.44,
                      "taxRate": 19,
                      "price": 8.99,
                      "apiAlias": "cart_tax_calculated"
                    }
                  ],
                  "taxRules": [
                    {
                      "taxRate": 19,
                      "percentage": 100,
                      "apiAlias": "cart_tax_rule"
                    }
                  ],
                  "referencePrice": null,
                  "listPrice": null,
                  "apiAlias": "calculated_price"
                },
                "to": {
                  "unitPrice": 8.99,
                  "quantity": 1,
                  "totalPrice": 8.99,
                  "calculatedTaxes": [
                    {
                      "tax": 1.44,
                      "taxRate": 19,
                      "price": 8.99,
                      "apiAlias": "cart_tax_calculated"
                    }
                  ],
                  "taxRules": [
                    {
                      "taxRate": 19,
                      "percentage": 100,
                      "apiAlias": "cart_tax_rule"
                    }
                  ],
                  "referencePrice": null,
                  "listPrice": null,
                  "apiAlias": "calculated_price"
                },
                "apiAlias": "calculated_listing_price"
              },
              "calculatedPrices": [],
              "calculatedPrice": {
                "unitPrice": 8.99,
                "quantity": 1,
                "totalPrice": 8.99,
                "calculatedTaxes": [
                  {
                    "tax": 1.44,
                    "taxRate": 19,
                    "price": 8.99,
                    "apiAlias": "cart_tax_calculated"
                  }
                ],
                "taxRules": [
                  {
                    "taxRate": 19,
                    "percentage": 100,
                    "apiAlias": "cart_tax_rule"
                  }
                ],
                "referencePrice": null,
                "listPrice": null,
                "apiAlias": "calculated_price"
              },
              "sortedProperties": [],
              "isNew": false,
              "calculatedMaxPurchase": 100,
              "configurator": null,
              "seoCategory": null,
              "parentId": null,
              "childCount": 0,
              "taxId": "4693fa9192e24fc895079b6f68a41cea",
              "manufacturerId": "ee4868a7cc2449358aec639e11a2152c",
              "unitId": null,
              "active": true,
              "displayGroup": "33608b86955da56830f2607728a3347b",
              "manufacturerNumber": null,
              "ean": null,
              "sales": 14,
              "productNumber": "MEDDC000000020",
              "stock": 999984,
              "availableStock": 999975,
              "available": true,
              "deliveryTimeId": "16cd2c37bb154f06a71167175ffbf191",
              "deliveryTime": {
                "name": "1-3 Tage",
                "min": 1,
                "max": 3,
                "unit": "day",
                "customFields": null,
                "_uniqueIdentifier": "16cd2c37bb154f06a71167175ffbf191",
                "versionId": null,
                "translated": {
                  "name": "1-3 Tage",
                  "customFields": []
                },
                "createdAt": "2021-05-25T10:59:18.000+00:00",
                "updatedAt": null,
                "extensions": {
                  "internal_mapping_storage": {
                    "apiAlias": "array_struct"
                  },
                  "foreignKeys": {
                    "apiAlias": "array_struct"
                  }
                },
                "id": "16cd2c37bb154f06a71167175ffbf191",
                "apiAlias": "delivery_time"
              },
              "restockTime": null,
              "isCloseout": false,
              "purchaseSteps": 1,
              "maxPurchase": null,
              "minPurchase": 1,
              "purchaseUnit": null,
              "referenceUnit": 0,
              "shippingFree": false,
              "markAsTopseller": null,
              "weight": null,
              "width": null,
              "height": null,
              "length": null,
              "releaseDate": null,
              "categoryTree": [
                "8650d519f4fb4d5a9a8759181965e82b"
              ],
              "optionIds": null,
              "propertyIds": null,
              "name": "Rezept inkl. Bearbeitungsgebühr",
              "keywords": null,
              "description": null,
              "metaDescription": null,
              "metaTitle": null,
              "packUnit": null,
              "packUnitPlural": null,
              "grouped": false,
              "mainVariantId": null,
              "variation": [],
              "tax": {
                "taxRate": 19,
                "name": "19%",
                "customFields": null,
                "_uniqueIdentifier": "4693fa9192e24fc895079b6f68a41cea",
                "versionId": null,
                "translated": [],
                "createdAt": "2021-05-25T10:59:18.734+00:00",
                "updatedAt": "2022-01-05T09:14:10.668+00:00",
                "extensions": {
                  "internal_mapping_storage": {
                    "apiAlias": "array_struct"
                  },
                  "foreignKeys": {
                    "apiAlias": "array_struct"
                  }
                },
                "id": "4693fa9192e24fc895079b6f68a41cea",
                "apiAlias": "tax"
              },
              "manufacturer": null,
              "unit": null,
              "cover": {
                "productId": "b1cbc8d31bfd453294f5aed9a765a6a5",
                "mediaId": "e40f3e7ff79a4959b0e0beb29aa28389",
                "position": 1,
                "media": {
                  "mimeType": "image/jpeg",
                  "fileExtension": "jpeg",
                  "fileSize": 50238,
                  "title": null,
                  "metaData": {
                    "width": 600,
                    "height": 600,
                    "type": 2
                  },
                  "uploadedAt": "2022-01-06T12:50:02.053+00:00",
                  "alt": null,
                  "url": "https://shop.confidu.com/media/50/b5/ea/1641473402/rezeptgebuehr.jpeg",
                  "fileName": "rezeptgebuehr",
                  "translations": null,
                  "thumbnails": [
                    {
                      "width": 400,
                      "height": 400,
                      "url": "https://shop.confidu.com/thumbnail/50/b5/ea/1641473402/rezeptgebuehr_400x400.jpeg",
                      "mediaId": "e40f3e7ff79a4959b0e0beb29aa28389",
                      "customFields": null,
                      "_uniqueIdentifier": "56f4f2a156b94a4c8d409600c7ce7b79",
                      "versionId": null,
                      "translated": [],
                      "createdAt": "2022-01-06T12:50:10.607+00:00",
                      "updatedAt": null,
                      "extensions": {
                        "foreignKeys": {
                          "apiAlias": "array_struct"
                        }
                      },
                      "id": "56f4f2a156b94a4c8d409600c7ce7b79",
                      "apiAlias": "media_thumbnail"
                    },
                    {
                      "width": 800,
                      "height": 800,
                      "url": "https://shop.confidu.com/thumbnail/50/b5/ea/1641473402/rezeptgebuehr_800x800.jpeg",
                      "mediaId": "e40f3e7ff79a4959b0e0beb29aa28389",
                      "customFields": null,
                      "_uniqueIdentifier": "810b7ee9e33e4c93950616a0320abdbc",
                      "versionId": null,
                      "translated": [],
                      "createdAt": "2022-01-06T12:50:10.608+00:00",
                      "updatedAt": null,
                      "extensions": {
                        "foreignKeys": {
                          "apiAlias": "array_struct"
                        }
                      },
                      "id": "810b7ee9e33e4c93950616a0320abdbc",
                      "apiAlias": "media_thumbnail"
                    },
                    {
                      "width": 1920,
                      "height": 1920,
                      "url": "https://shop.confidu.com/thumbnail/50/b5/ea/1641473402/rezeptgebuehr_1920x1920.jpeg",
                      "mediaId": "e40f3e7ff79a4959b0e0beb29aa28389",
                      "customFields": null,
                      "_uniqueIdentifier": "bcc18ef066604fd9aeea67188fb22bb6",
                      "versionId": null,
                      "translated": [],
                      "createdAt": "2022-01-06T12:50:10.607+00:00",
                      "updatedAt": null,
                      "extensions": {
                        "foreignKeys": {
                          "apiAlias": "array_struct"
                        }
                      },
                      "id": "bcc18ef066604fd9aeea67188fb22bb6",
                      "apiAlias": "media_thumbnail"
                    }
                  ],
                  "hasFile": true,
                  "private": false,
                  "customFields": null,
                  "_uniqueIdentifier": "e40f3e7ff79a4959b0e0beb29aa28389",
                  "versionId": null,
                  "translated": {
                    "alt": null,
                    "title": null,
                    "customFields": []
                  },
                  "createdAt": "2022-01-06T12:50:01.921+00:00",
                  "updatedAt": "2022-01-06T12:50:10.608+00:00",
                  "extensions": {
                    "internal_mapping_storage": {
                      "apiAlias": "array_struct"
                    },
                    "foreignKeys": {
                      "apiAlias": "array_struct"
                    }
                  },
                  "id": "e40f3e7ff79a4959b0e0beb29aa28389",
                  "apiAlias": "media"
                },
                "customFields": null,
                "_uniqueIdentifier": "1c2176a9afc0428ca172e705f1024017",
                "versionId": "0fa91ce3e96a4bc2be4bd9ce752c3425",
                "translated": [],
                "createdAt": "2022-01-25T12:25:47.982+00:00",
                "updatedAt": null,
                "extensions": {
                  "foreignKeys": {
                    "apiAlias": "array_struct"
                  }
                },
                "id": "1c2176a9afc0428ca172e705f1024017",
                "productVersionId": "0fa91ce3e96a4bc2be4bd9ce752c3425",
                "apiAlias": "product_media"
              },
              "parent": null,
              "children": null,
              "media": null,
              "cmsPageId": null,
              "cmsPage": null,
              "translations": null,
              "categories": null,
              "properties": null,
              "options": null,
              "configuratorSettings": null,
              "categoriesRo": null,
              "coverId": "1c2176a9afc0428ca172e705f1024017",
              "customFields": {
                "product_prescription": true,
                "product_pharmacy": false,
                "product_feeding": false,
                "product_med_category": "Verordnung",
                "productMedicationKey": "PRESCR"
              },
              "productReviews": null,
              "ratingAverage": null,
              "mainCategories": null,
              "seoUrls": null,
              "crossSellings": null,
              "canonicalProductId": null,
              "canonicalProduct": null,
              "_uniqueIdentifier": "b1cbc8d31bfd453294f5aed9a765a6a5",
              "versionId": "0fa91ce3e96a4bc2be4bd9ce752c3425",
              "translated": {
                "metaDescription": null,
                "name": "Rezept inkl. Bearbeitungsgebühr",
                "keywords": null,
                "description": null,
                "metaTitle": null,
                "packUnit": null,
                "packUnitPlural": null,
                "customFields": {
                  "product_prescription": true,
                  "product_pharmacy": false,
                  "product_feeding": false,
                  "product_med_category": "Verordnung",
                  "productMedicationKey": "PRESCR"
                },
                "customSearchKeywords": null
              },
              "createdAt": "2022-01-05T10:12:30.198+00:00",
              "updatedAt": "2022-01-25T12:31:27.740+00:00",
              "extensions": {
                "foreignKeys": {
                  "apiAlias": "array_struct"
                }
              },
              "id": "b1cbc8d31bfd453294f5aed9a765a6a5",
              "parentVersionId": "0fa91ce3e96a4bc2be4bd9ce752c3425",
              "productManufacturerVersionId": "0fa91ce3e96a4bc2be4bd9ce752c3425",
              "productMediaVersionId": null,
              "apiAlias": "product"
            }
          }
        ],
        "headline": "Was du brauchst"
      },
      {
        "info": null,
        "body": [
          "Hier findest du weitere Produkte, die helfen, die Flöhe loszuwerden."
        ],
        "list": [
          {
            "durationEffect": 0,
            "med_delivery": "confidu GmbH",
            "med_header": null,
            "medication": "Flohkamm",
            "carecard": [
              {
                "level1_cc_key": "medication_cc",
                "Level2_cc_status": "filled",
                "l0_cc_key": "diseases_cc",
                "key": "TXKDC0010000140"
              }
            ],
            "feeding": false,
            "swKey": "TXKDC0010000140",
            "indication": {
              "body": {
                "indicationSecond": null,
                "indicationThird": null,
                "indicationOther": null,
                "indicactionCaution": null,
                "indicationProduct": "Engzahniger Kamm zum Entfernen von Parasiten",
                "indicationTeaser": "Flohkamm",
                "indicationFirst": {
                  "body": [
                    "zur Entfernung von Staub und Parasiten",
                    "zum problemlosen Ausfindigmachen von Flöhen und Läusen",
                    "zum Auskämmen anderer Schädlinge wie beispielsweise Milben oder Haarlinge"
                  ],
                  "header": [
                    "Der Kamm wird angewendet bei Hunden und Katzen"
                  ]
                },
                "indicationDeclaration": "Der Kamm dient zur Diagnose von Flöhen und Läusen."
              },
              "header": "Anwendungsgebiet"
            },
            "med_amountdose": null,
            "maxWeight": 100,
            "id": "TXKDC0010000140",
            "med_name": "Trixie Kleintier Floh- und Staubkamm",
            "med_doses": null,
            "key": "FLO",
            "med_duration_length": null,
            "diagnosis": [
              "Fellpflege",
              "Flohbefall"
            ],
            "pharmacy": false,
            "minWeight": 0,
            "med_duration_pd": null,
            "Wiederholung_Freq": null,
            "med_category": "Haut- und Fellpflegeprodukt",
            "med_frequency": null,
            "med_image_link": null,
            "product_pdf_dokument": "https://firebasestorage.googleapis.com/v0/b/confidu-app.appspot.com/o/shop%2Fpackage_insert%2Ff_g%2Fflohkamm_dog_cat_product_information_de.pdf?alt=media&token=4752d4c4-a2e6-49cc-9530-96a9ba298292",
            "med_unit": null,
            "prescription": false,
            "categoryKeys": [
              "furprod"
            ],
            "med_type": null,
            "med_amount": 1,
            "ticket_type": [
              "furcare"
            ],
            "med_package_ges": "1 Flohkamm",
            "data": {
              "calculatedListingPrice": {
                "from": {
                  "unitPrice": 2.5,
                  "quantity": 1,
                  "totalPrice": 2.5,
                  "calculatedTaxes": [
                    {
                      "tax": 0.4,
                      "taxRate": 19,
                      "price": 2.5,
                      "apiAlias": "cart_tax_calculated"
                    }
                  ],
                  "taxRules": [
                    {
                      "taxRate": 19,
                      "percentage": 100,
                      "apiAlias": "cart_tax_rule"
                    }
                  ],
                  "referencePrice": null,
                  "listPrice": null,
                  "apiAlias": "calculated_price"
                },
                "to": {
                  "unitPrice": 2.5,
                  "quantity": 1,
                  "totalPrice": 2.5,
                  "calculatedTaxes": [
                    {
                      "tax": 0.4,
                      "taxRate": 19,
                      "price": 2.5,
                      "apiAlias": "cart_tax_calculated"
                    }
                  ],
                  "taxRules": [
                    {
                      "taxRate": 19,
                      "percentage": 100,
                      "apiAlias": "cart_tax_rule"
                    }
                  ],
                  "referencePrice": null,
                  "listPrice": null,
                  "apiAlias": "calculated_price"
                },
                "apiAlias": "calculated_listing_price"
              },
              "calculatedPrices": [],
              "calculatedPrice": {
                "unitPrice": 2.5,
                "quantity": 1,
                "totalPrice": 2.5,
                "calculatedTaxes": [
                  {
                    "tax": 0.4,
                    "taxRate": 19,
                    "price": 2.5,
                    "apiAlias": "cart_tax_calculated"
                  }
                ],
                "taxRules": [
                  {
                    "taxRate": 19,
                    "percentage": 100,
                    "apiAlias": "cart_tax_rule"
                  }
                ],
                "referencePrice": null,
                "listPrice": null,
                "apiAlias": "calculated_price"
              },
              "sortedProperties": [],
              "isNew": false,
              "calculatedMaxPurchase": 100,
              "configurator": null,
              "seoCategory": null,
              "parentId": null,
              "childCount": 0,
              "taxId": "4693fa9192e24fc895079b6f68a41cea",
              "manufacturerId": "a4dfaf69e42645e7801f92374468b54a",
              "unitId": null,
              "active": true,
              "displayGroup": "fb2603fb8cfda6694bdac96d25069fd0",
              "manufacturerNumber": null,
              "ean": null,
              "sales": 0,
              "productNumber": "TXKDC0010000140",
              "stock": 100,
              "availableStock": 100,
              "available": true,
              "deliveryTimeId": "16cd2c37bb154f06a71167175ffbf191",
              "deliveryTime": {
                "name": "1-3 Tage",
                "min": 1,
                "max": 3,
                "unit": "day",
                "customFields": null,
                "_uniqueIdentifier": "16cd2c37bb154f06a71167175ffbf191",
                "versionId": null,
                "translated": {
                  "name": "1-3 Tage",
                  "customFields": []
                },
                "createdAt": "2021-05-25T10:59:18.000+00:00",
                "updatedAt": null,
                "extensions": {
                  "internal_mapping_storage": {
                    "apiAlias": "array_struct"
                  },
                  "foreignKeys": {
                    "apiAlias": "array_struct"
                  }
                },
                "id": "16cd2c37bb154f06a71167175ffbf191",
                "apiAlias": "delivery_time"
              },
              "restockTime": null,
              "isCloseout": false,
              "purchaseSteps": 1,
              "maxPurchase": null,
              "minPurchase": 1,
              "purchaseUnit": null,
              "referenceUnit": 0,
              "shippingFree": false,
              "markAsTopseller": null,
              "weight": null,
              "width": null,
              "height": null,
              "length": null,
              "releaseDate": null,
              "categoryTree": [
                "c282bcdcdc144534a240be08fd1168f4"
              ],
              "optionIds": null,
              "propertyIds": null,
              "name": "Trixie Kleintier Floh- und Staubkamm",
              "keywords": null,
              "description": null,
              "metaDescription": null,
              "metaTitle": null,
              "packUnit": null,
              "packUnitPlural": null,
              "grouped": false,
              "mainVariantId": null,
              "variation": [],
              "tax": {
                "taxRate": 19,
                "name": "19%",
                "customFields": null,
                "_uniqueIdentifier": "4693fa9192e24fc895079b6f68a41cea",
                "versionId": null,
                "translated": [],
                "createdAt": "2021-05-25T10:59:18.734+00:00",
                "updatedAt": "2022-01-05T09:14:10.668+00:00",
                "extensions": {
                  "internal_mapping_storage": {
                    "apiAlias": "array_struct"
                  },
                  "foreignKeys": {
                    "apiAlias": "array_struct"
                  }
                },
                "id": "4693fa9192e24fc895079b6f68a41cea",
                "apiAlias": "tax"
              },
              "manufacturer": null,
              "unit": null,
              "cover": {
                "productId": "3f3e30930b1542c2a433ffd9a5c47fff",
                "mediaId": "643b4d476b804957a29d4b1f15274882",
                "position": 1,
                "media": {
                  "mimeType": "image/jpeg",
                  "fileExtension": "jpeg",
                  "fileSize": 91355,
                  "title": null,
                  "metaData": {
                    "width": 1400,
                    "height": 1400,
                    "type": 2
                  },
                  "uploadedAt": "2022-01-05T10:05:24.796+00:00",
                  "alt": null,
                  "url": "https://shop.confidu.com/media/f6/4e/cf/1641377124/random_box_de.jpeg",
                  "fileName": "random_box_de",
                  "translations": null,
                  "thumbnails": [],
                  "hasFile": true,
                  "private": false,
                  "customFields": null,
                  "_uniqueIdentifier": "643b4d476b804957a29d4b1f15274882",
                  "versionId": null,
                  "translated": {
                    "alt": null,
                    "title": null,
                    "customFields": []
                  },
                  "createdAt": "2022-01-05T10:05:24.655+00:00",
                  "updatedAt": "2022-01-05T10:17:01.863+00:00",
                  "extensions": {
                    "internal_mapping_storage": {
                      "apiAlias": "array_struct"
                    },
                    "foreignKeys": {
                      "apiAlias": "array_struct"
                    }
                  },
                  "id": "643b4d476b804957a29d4b1f15274882",
                  "apiAlias": "media"
                },
                "customFields": null,
                "_uniqueIdentifier": "0192868d10b349d88872964e5f936d77",
                "versionId": "0fa91ce3e96a4bc2be4bd9ce752c3425",
                "translated": [],
                "createdAt": "2022-01-05T10:13:47.787+00:00",
                "updatedAt": null,
                "extensions": {
                  "foreignKeys": {
                    "apiAlias": "array_struct"
                  }
                },
                "id": "0192868d10b349d88872964e5f936d77",
                "productVersionId": "0fa91ce3e96a4bc2be4bd9ce752c3425",
                "apiAlias": "product_media"
              },
              "parent": null,
              "children": null,
              "media": null,
              "cmsPageId": null,
              "cmsPage": null,
              "translations": null,
              "categories": null,
              "properties": null,
              "options": null,
              "configuratorSettings": null,
              "categoriesRo": null,
              "coverId": "0192868d10b349d88872964e5f936d77",
              "customFields": {
                "product_prescription": false,
                "product_pharmacy": false,
                "product_feeding": false,
                "product_ticket_type": "furcare",
                "product_med_category": "Haut- und Fellpflegeprodukt",
                "productMedicationKey": "FLO"
              },
              "productReviews": null,
              "ratingAverage": null,
              "mainCategories": null,
              "seoUrls": null,
              "crossSellings": null,
              "canonicalProductId": null,
              "canonicalProduct": null,
              "_uniqueIdentifier": "3f3e30930b1542c2a433ffd9a5c47fff",
              "versionId": "0fa91ce3e96a4bc2be4bd9ce752c3425",
              "translated": {
                "metaDescription": null,
                "name": "Trixie Kleintier Floh- und Staubkamm",
                "keywords": null,
                "description": null,
                "metaTitle": null,
                "packUnit": null,
                "packUnitPlural": null,
                "customFields": {
                  "product_prescription": false,
                  "product_pharmacy": false,
                  "product_feeding": false,
                  "product_ticket_type": "furcare",
                  "product_med_category": "Haut- und Fellpflegeprodukt",
                  "productMedicationKey": "FLO"
                },
                "customSearchKeywords": null
              },
              "createdAt": "2022-01-05T10:13:47.788+00:00",
              "updatedAt": null,
              "extensions": {
                "foreignKeys": {
                  "apiAlias": "array_struct"
                }
              },
              "id": "3f3e30930b1542c2a433ffd9a5c47fff",
              "parentVersionId": "0fa91ce3e96a4bc2be4bd9ce752c3425",
              "productManufacturerVersionId": "0fa91ce3e96a4bc2be4bd9ce752c3425",
              "productMediaVersionId": null,
              "apiAlias": "product"
            }
          },
          {
            "carecard": [
              {
                "key": "PRFDC2010000084",
                "Level2_cc_status": "filled",
                "l0_cc_key": "diseases_cc",
                "level1_cc_key": "medication_cc"
              }
            ],
            "feeding": false,
            "med_amountdose": null,
            "Wiederholung_Freq": null,
            "swKey": "PRFDC2010000084",
            "med_image_link": null,
            "key": "FOG",
            "med_amount": 1,
            "diagnosis": [
              "Flohbefall - Umgebungsbehandlung"
            ],
            "pharmacy": false,
            "med_name": "INDOREX Mini-Fogger Aerosol-Vernebler",
            "product_pdf_dokument": "https://firebasestorage.googleapis.com/v0/b/confidu-app.appspot.com/o/shop%2Fpackage_insert%2Ff_g%2Ffogger_dog_cat_product_information_de%20(1).pdf?alt=media&token=f91a5929-c941-4028-8b38-04efd0049fb9",
            "medication": "Fogger Flohbekämpfung",
            "durationEffect": 0,
            "med_header": null,
            "maxWeight": 100,
            "med_doses": "Vernebler",
            "id": "PRFDC2010000084",
            "med_type": "Gas",
            "med_duration_pd": null,
            "med_unit": "ml",
            "med_delivery": "confidu GmbH",
            "med_frequency": null,
            "med_category": "Antiparasitikum",
            "prescription": false,
            "indication": {
              "header": "Anwendungsgebiet",
              "body": {
                "indicationTeaser": "INDOREX Defence Mini-Fogger Aerosol-Vernebler",
                "indicationSecond": null,
                "indicationOther": "Mit 6 Monaten Langzeitwirkung.",
                "indicationThird": null,
                "indicactionCaution": null,
                "indicationFirst": {
                  "body": null,
                  "header": [
                    "Der Vernebler wird angewendet zur Parasitenbekämpfung in Wohnung und Haus."
                  ]
                },
                "indicationProduct": "Vernebler zur Parasitenbekämpfung",
                "indicationDeclaration": "Der INDOREX® DEFENCE FOGGER enthält die Wirkstoffe Permethrin und Pyrethrum sowie den Insektenwachstumshemmer Pyriproxifen. Permethrin und Pyrethrum töten schnell und zuverlässig alle Flöhe ab, während Pyriproxifen die Entwicklung von Floheiern und -larven biologisch unterbricht. Somit werden alle Stadien der Flohentwicklung erfasst und bis zu 6 Monate wirksam bekämpft. Die Wirkstoffe sind außerdem wirksam gegen Zecken, Milben, Schaben und anderes Ungeziefer."
              }
            },
            "med_duration_length": null,
            "ticket_type": [
              "med_take"
            ],
            "minWeight": 0,
            "categoryKeys": [
              "antipar"
            ],
            "med_package_ges": "75 ml Vernebler",
            "data": {
              "calculatedListingPrice": {
                "from": {
                  "unitPrice": 18.29,
                  "quantity": 1,
                  "totalPrice": 18.29,
                  "calculatedTaxes": [
                    {
                      "tax": 2.92,
                      "taxRate": 19,
                      "price": 18.29,
                      "apiAlias": "cart_tax_calculated"
                    }
                  ],
                  "taxRules": [
                    {
                      "taxRate": 19,
                      "percentage": 100,
                      "apiAlias": "cart_tax_rule"
                    }
                  ],
                  "referencePrice": null,
                  "listPrice": null,
                  "apiAlias": "calculated_price"
                },
                "to": {
                  "unitPrice": 18.29,
                  "quantity": 1,
                  "totalPrice": 18.29,
                  "calculatedTaxes": [
                    {
                      "tax": 2.92,
                      "taxRate": 19,
                      "price": 18.29,
                      "apiAlias": "cart_tax_calculated"
                    }
                  ],
                  "taxRules": [
                    {
                      "taxRate": 19,
                      "percentage": 100,
                      "apiAlias": "cart_tax_rule"
                    }
                  ],
                  "referencePrice": null,
                  "listPrice": null,
                  "apiAlias": "calculated_price"
                },
                "apiAlias": "calculated_listing_price"
              },
              "calculatedPrices": [],
              "calculatedPrice": {
                "unitPrice": 18.29,
                "quantity": 1,
                "totalPrice": 18.29,
                "calculatedTaxes": [
                  {
                    "tax": 2.92,
                    "taxRate": 19,
                    "price": 18.29,
                    "apiAlias": "cart_tax_calculated"
                  }
                ],
                "taxRules": [
                  {
                    "taxRate": 19,
                    "percentage": 100,
                    "apiAlias": "cart_tax_rule"
                  }
                ],
                "referencePrice": null,
                "listPrice": null,
                "apiAlias": "calculated_price"
              },
              "sortedProperties": [],
              "isNew": false,
              "calculatedMaxPurchase": 100,
              "configurator": null,
              "seoCategory": null,
              "parentId": null,
              "childCount": 0,
              "taxId": "4693fa9192e24fc895079b6f68a41cea",
              "manufacturerId": "a4dfaf69e42645e7801f92374468b54a",
              "unitId": null,
              "active": true,
              "displayGroup": "7225208f46f6577f482e0cafa6963746",
              "manufacturerNumber": null,
              "ean": null,
              "sales": 2,
              "productNumber": "PRFDC2010000084",
              "stock": 98,
              "availableStock": 98,
              "available": true,
              "deliveryTimeId": "16cd2c37bb154f06a71167175ffbf191",
              "deliveryTime": {
                "name": "1-3 Tage",
                "min": 1,
                "max": 3,
                "unit": "day",
                "customFields": null,
                "_uniqueIdentifier": "16cd2c37bb154f06a71167175ffbf191",
                "versionId": null,
                "translated": {
                  "name": "1-3 Tage",
                  "customFields": []
                },
                "createdAt": "2021-05-25T10:59:18.000+00:00",
                "updatedAt": null,
                "extensions": {
                  "internal_mapping_storage": {
                    "apiAlias": "array_struct"
                  },
                  "foreignKeys": {
                    "apiAlias": "array_struct"
                  }
                },
                "id": "16cd2c37bb154f06a71167175ffbf191",
                "apiAlias": "delivery_time"
              },
              "restockTime": null,
              "isCloseout": false,
              "purchaseSteps": 1,
              "maxPurchase": null,
              "minPurchase": 1,
              "purchaseUnit": null,
              "referenceUnit": 0,
              "shippingFree": false,
              "markAsTopseller": null,
              "weight": null,
              "width": null,
              "height": null,
              "length": null,
              "releaseDate": null,
              "categoryTree": [
                "c282bcdcdc144534a240be08fd1168f4"
              ],
              "optionIds": null,
              "propertyIds": null,
              "name": "INDOREX Mini-Fogger Aerosol-Vernebler",
              "keywords": null,
              "description": null,
              "metaDescription": null,
              "metaTitle": null,
              "packUnit": null,
              "packUnitPlural": null,
              "grouped": false,
              "mainVariantId": null,
              "variation": [],
              "tax": {
                "taxRate": 19,
                "name": "19%",
                "customFields": null,
                "_uniqueIdentifier": "4693fa9192e24fc895079b6f68a41cea",
                "versionId": null,
                "translated": [],
                "createdAt": "2021-05-25T10:59:18.734+00:00",
                "updatedAt": "2022-01-05T09:14:10.668+00:00",
                "extensions": {
                  "internal_mapping_storage": {
                    "apiAlias": "array_struct"
                  },
                  "foreignKeys": {
                    "apiAlias": "array_struct"
                  }
                },
                "id": "4693fa9192e24fc895079b6f68a41cea",
                "apiAlias": "tax"
              },
              "manufacturer": null,
              "unit": null,
              "cover": {
                "productId": "5918bbeeebf74b7b8e2d5f92834c33e4",
                "mediaId": "643b4d476b804957a29d4b1f15274882",
                "position": 1,
                "media": {
                  "mimeType": "image/jpeg",
                  "fileExtension": "jpeg",
                  "fileSize": 91355,
                  "title": null,
                  "metaData": {
                    "width": 1400,
                    "height": 1400,
                    "type": 2
                  },
                  "uploadedAt": "2022-01-05T10:05:24.796+00:00",
                  "alt": null,
                  "url": "https://shop.confidu.com/media/f6/4e/cf/1641377124/random_box_de.jpeg",
                  "fileName": "random_box_de",
                  "translations": null,
                  "thumbnails": [],
                  "hasFile": true,
                  "private": false,
                  "customFields": null,
                  "_uniqueIdentifier": "643b4d476b804957a29d4b1f15274882",
                  "versionId": null,
                  "translated": {
                    "alt": null,
                    "title": null,
                    "customFields": []
                  },
                  "createdAt": "2022-01-05T10:05:24.655+00:00",
                  "updatedAt": "2022-01-05T10:17:01.863+00:00",
                  "extensions": {
                    "internal_mapping_storage": {
                      "apiAlias": "array_struct"
                    },
                    "foreignKeys": {
                      "apiAlias": "array_struct"
                    }
                  },
                  "id": "643b4d476b804957a29d4b1f15274882",
                  "apiAlias": "media"
                },
                "customFields": null,
                "_uniqueIdentifier": "02d62b43ab654eff9ec561ff25e7d6c1",
                "versionId": "0fa91ce3e96a4bc2be4bd9ce752c3425",
                "translated": [],
                "createdAt": "2022-01-05T10:13:33.043+00:00",
                "updatedAt": null,
                "extensions": {
                  "foreignKeys": {
                    "apiAlias": "array_struct"
                  }
                },
                "id": "02d62b43ab654eff9ec561ff25e7d6c1",
                "productVersionId": "0fa91ce3e96a4bc2be4bd9ce752c3425",
                "apiAlias": "product_media"
              },
              "parent": null,
              "children": null,
              "media": null,
              "cmsPageId": null,
              "cmsPage": null,
              "translations": null,
              "categories": null,
              "properties": null,
              "options": null,
              "configuratorSettings": null,
              "categoriesRo": null,
              "coverId": "02d62b43ab654eff9ec561ff25e7d6c1",
              "customFields": {
                "product_prescription": false,
                "product_pharmacy": false,
                "product_feeding": false,
                "product_ticket_type": "med_take",
                "product_med_category": "Antiparasitikum",
                "productMedicationKey": "FOG"
              },
              "productReviews": null,
              "ratingAverage": null,
              "mainCategories": null,
              "seoUrls": null,
              "crossSellings": null,
              "canonicalProductId": null,
              "canonicalProduct": null,
              "_uniqueIdentifier": "5918bbeeebf74b7b8e2d5f92834c33e4",
              "versionId": "0fa91ce3e96a4bc2be4bd9ce752c3425",
              "translated": {
                "metaDescription": null,
                "name": "INDOREX Mini-Fogger Aerosol-Vernebler",
                "keywords": null,
                "description": null,
                "metaTitle": null,
                "packUnit": null,
                "packUnitPlural": null,
                "customFields": {
                  "product_prescription": false,
                  "product_pharmacy": false,
                  "product_feeding": false,
                  "product_ticket_type": "med_take",
                  "product_med_category": "Antiparasitikum",
                  "productMedicationKey": "FOG"
                },
                "customSearchKeywords": null
              },
              "createdAt": "2022-01-05T10:13:33.044+00:00",
              "updatedAt": null,
              "extensions": {
                "foreignKeys": {
                  "apiAlias": "array_struct"
                }
              },
              "id": "5918bbeeebf74b7b8e2d5f92834c33e4",
              "parentVersionId": "0fa91ce3e96a4bc2be4bd9ce752c3425",
              "productManufacturerVersionId": "0fa91ce3e96a4bc2be4bd9ce752c3425",
              "productMediaVersionId": null,
              "apiAlias": "product"
            }
          },
          {
            "durationEffect": 0,
            "med_header": null,
            "id": "PRFDC2020000084",
            "med_image_link": null,
            "swKey": "PRFDC2020000084",
            "med_doses": "Vernebler",
            "carecard": [
              {
                "key": "PRFDC2020000084",
                "level1_cc_key": "medication_cc",
                "l0_cc_key": "diseases_cc",
                "Level2_cc_status": "filled"
              }
            ],
            "med_unit": "ml",
            "minWeight": 0,
            "key": "FOG2",
            "ticket_type": [
              "med_take"
            ],
            "med_frequency": null,
            "maxWeight": 100,
            "Wiederholung_Freq": null,
            "med_duration_pd": null,
            "med_category": "Antiparasitikum",
            "med_amount": 1,
            "med_amountdose": null,
            "med_duration_length": null,
            "feeding": false,
            "prescription": false,
            "med_package_ges": "150 ml Vernebler",
            "med_type": "Gas",
            "diagnosis": [
              "Flohbefall - Umgebungsbehandlung"
            ],
            "pharmacy": false,
            "med_name": "INDOREX Fogger Aerosol-Vernebler",
            "med_delivery": "confidu GmbH",
            "product_pdf_dokument": "https://firebasestorage.googleapis.com/v0/b/confidu-app.appspot.com/o/shop%2Fpackage_insert%2Ff_g%2Ffogger_dog_cat_product_information_de%20(1).pdf?alt=media&token=f91a5929-c941-4028-8b38-04efd0049fb9",
            "medication": "Fogger Flohbekämpfung",
            "categoryKeys": [
              "antipar"
            ],
            "indication": {
              "header": "Anwendungsgebiet",
              "body": {
                "indicactionCaution": null,
                "indicationTeaser": "INDOREX Defence Mini-Fogger Aerosol-Vernebler",
                "indicationThird": null,
                "indicationSecond": null,
                "indicationDeclaration": "Der INDOREX® DEFENCE FOGGER enthält die Wirkstoffe Permethrin und Pyrethrum sowie den Insektenwachstumshemmer Pyriproxifen. Permethrin und Pyrethrum töten schnell und zuverlässig alle Flöhe ab, während Pyriproxifen die Entwicklung von Floheiern und -larven biologisch unterbricht. Somit werden alle Stadien der Flohentwicklung erfasst und bis zu 6 Monate wirksam bekämpft. Die Wirkstoffe sind außerdem wirksam gegen Zecken, Milben, Schaben und anderes Ungeziefer.",
                "indicationFirst": {
                  "header": [
                    "Der Vernebler wird angewendet zur Parasitenbekämpfung in Wohnung und Haus."
                  ],
                  "body": null
                },
                "indicationOther": "Mit 6 Monaten Langzeitwirkung.",
                "indicationProduct": "Vernebler zur Parasitenbekämpfung"
              }
            },
            "data": {
              "calculatedListingPrice": {
                "from": {
                  "unitPrice": 23.7,
                  "quantity": 1,
                  "totalPrice": 23.7,
                  "calculatedTaxes": [
                    {
                      "tax": 3.78,
                      "taxRate": 19,
                      "price": 23.7,
                      "apiAlias": "cart_tax_calculated"
                    }
                  ],
                  "taxRules": [
                    {
                      "taxRate": 19,
                      "percentage": 100,
                      "apiAlias": "cart_tax_rule"
                    }
                  ],
                  "referencePrice": null,
                  "listPrice": null,
                  "apiAlias": "calculated_price"
                },
                "to": {
                  "unitPrice": 23.7,
                  "quantity": 1,
                  "totalPrice": 23.7,
                  "calculatedTaxes": [
                    {
                      "tax": 3.78,
                      "taxRate": 19,
                      "price": 23.7,
                      "apiAlias": "cart_tax_calculated"
                    }
                  ],
                  "taxRules": [
                    {
                      "taxRate": 19,
                      "percentage": 100,
                      "apiAlias": "cart_tax_rule"
                    }
                  ],
                  "referencePrice": null,
                  "listPrice": null,
                  "apiAlias": "calculated_price"
                },
                "apiAlias": "calculated_listing_price"
              },
              "calculatedPrices": [],
              "calculatedPrice": {
                "unitPrice": 23.7,
                "quantity": 1,
                "totalPrice": 23.7,
                "calculatedTaxes": [
                  {
                    "tax": 3.78,
                    "taxRate": 19,
                    "price": 23.7,
                    "apiAlias": "cart_tax_calculated"
                  }
                ],
                "taxRules": [
                  {
                    "taxRate": 19,
                    "percentage": 100,
                    "apiAlias": "cart_tax_rule"
                  }
                ],
                "referencePrice": null,
                "listPrice": null,
                "apiAlias": "calculated_price"
              },
              "sortedProperties": [],
              "isNew": false,
              "calculatedMaxPurchase": 100,
              "configurator": null,
              "seoCategory": null,
              "parentId": null,
              "childCount": 0,
              "taxId": "4693fa9192e24fc895079b6f68a41cea",
              "manufacturerId": "a4dfaf69e42645e7801f92374468b54a",
              "unitId": null,
              "active": true,
              "displayGroup": "b69679a16f5216f25e832b25e3e28141",
              "manufacturerNumber": null,
              "ean": null,
              "sales": 0,
              "productNumber": "PRFDC2020000084",
              "stock": 100,
              "availableStock": 100,
              "available": true,
              "deliveryTimeId": "16cd2c37bb154f06a71167175ffbf191",
              "deliveryTime": {
                "name": "1-3 Tage",
                "min": 1,
                "max": 3,
                "unit": "day",
                "customFields": null,
                "_uniqueIdentifier": "16cd2c37bb154f06a71167175ffbf191",
                "versionId": null,
                "translated": {
                  "name": "1-3 Tage",
                  "customFields": []
                },
                "createdAt": "2021-05-25T10:59:18.000+00:00",
                "updatedAt": null,
                "extensions": {
                  "internal_mapping_storage": {
                    "apiAlias": "array_struct"
                  },
                  "foreignKeys": {
                    "apiAlias": "array_struct"
                  }
                },
                "id": "16cd2c37bb154f06a71167175ffbf191",
                "apiAlias": "delivery_time"
              },
              "restockTime": null,
              "isCloseout": false,
              "purchaseSteps": 1,
              "maxPurchase": null,
              "minPurchase": 1,
              "purchaseUnit": null,
              "referenceUnit": 0,
              "shippingFree": false,
              "markAsTopseller": null,
              "weight": null,
              "width": null,
              "height": null,
              "length": null,
              "releaseDate": null,
              "categoryTree": [
                "c282bcdcdc144534a240be08fd1168f4"
              ],
              "optionIds": null,
              "propertyIds": null,
              "name": "INDOREX Fogger Aerosol-Vernebler",
              "keywords": null,
              "description": null,
              "metaDescription": null,
              "metaTitle": null,
              "packUnit": null,
              "packUnitPlural": null,
              "grouped": false,
              "mainVariantId": null,
              "variation": [],
              "tax": {
                "taxRate": 19,
                "name": "19%",
                "customFields": null,
                "_uniqueIdentifier": "4693fa9192e24fc895079b6f68a41cea",
                "versionId": null,
                "translated": [],
                "createdAt": "2021-05-25T10:59:18.734+00:00",
                "updatedAt": "2022-01-05T09:14:10.668+00:00",
                "extensions": {
                  "internal_mapping_storage": {
                    "apiAlias": "array_struct"
                  },
                  "foreignKeys": {
                    "apiAlias": "array_struct"
                  }
                },
                "id": "4693fa9192e24fc895079b6f68a41cea",
                "apiAlias": "tax"
              },
              "manufacturer": null,
              "unit": null,
              "cover": {
                "productId": "7249d9a4cbbc4b9fa03b6741c86ba613",
                "mediaId": "643b4d476b804957a29d4b1f15274882",
                "position": 1,
                "media": {
                  "mimeType": "image/jpeg",
                  "fileExtension": "jpeg",
                  "fileSize": 91355,
                  "title": null,
                  "metaData": {
                    "width": 1400,
                    "height": 1400,
                    "type": 2
                  },
                  "uploadedAt": "2022-01-05T10:05:24.796+00:00",
                  "alt": null,
                  "url": "https://shop.confidu.com/media/f6/4e/cf/1641377124/random_box_de.jpeg",
                  "fileName": "random_box_de",
                  "translations": null,
                  "thumbnails": [],
                  "hasFile": true,
                  "private": false,
                  "customFields": null,
                  "_uniqueIdentifier": "643b4d476b804957a29d4b1f15274882",
                  "versionId": null,
                  "translated": {
                    "alt": null,
                    "title": null,
                    "customFields": []
                  },
                  "createdAt": "2022-01-05T10:05:24.655+00:00",
                  "updatedAt": "2022-01-05T10:17:01.863+00:00",
                  "extensions": {
                    "internal_mapping_storage": {
                      "apiAlias": "array_struct"
                    },
                    "foreignKeys": {
                      "apiAlias": "array_struct"
                    }
                  },
                  "id": "643b4d476b804957a29d4b1f15274882",
                  "apiAlias": "media"
                },
                "customFields": null,
                "_uniqueIdentifier": "4d8e1dd30c8b4474972c42a6633a478c",
                "versionId": "0fa91ce3e96a4bc2be4bd9ce752c3425",
                "translated": [],
                "createdAt": "2022-01-05T10:13:33.549+00:00",
                "updatedAt": null,
                "extensions": {
                  "foreignKeys": {
                    "apiAlias": "array_struct"
                  }
                },
                "id": "4d8e1dd30c8b4474972c42a6633a478c",
                "productVersionId": "0fa91ce3e96a4bc2be4bd9ce752c3425",
                "apiAlias": "product_media"
              },
              "parent": null,
              "children": null,
              "media": null,
              "cmsPageId": null,
              "cmsPage": null,
              "translations": null,
              "categories": null,
              "properties": null,
              "options": null,
              "configuratorSettings": null,
              "categoriesRo": null,
              "coverId": "4d8e1dd30c8b4474972c42a6633a478c",
              "customFields": {
                "product_prescription": false,
                "product_pharmacy": false,
                "product_feeding": false,
                "product_ticket_type": "med_take",
                "product_med_category": "Antiparasitikum",
                "productMedicationKey": "FOG2"
              },
              "productReviews": null,
              "ratingAverage": null,
              "mainCategories": null,
              "seoUrls": null,
              "crossSellings": null,
              "canonicalProductId": null,
              "canonicalProduct": null,
              "_uniqueIdentifier": "7249d9a4cbbc4b9fa03b6741c86ba613",
              "versionId": "0fa91ce3e96a4bc2be4bd9ce752c3425",
              "translated": {
                "metaDescription": null,
                "name": "INDOREX Fogger Aerosol-Vernebler",
                "keywords": null,
                "description": null,
                "metaTitle": null,
                "packUnit": null,
                "packUnitPlural": null,
                "customFields": {
                  "product_prescription": false,
                  "product_pharmacy": false,
                  "product_feeding": false,
                  "product_ticket_type": "med_take",
                  "product_med_category": "Antiparasitikum",
                  "productMedicationKey": "FOG2"
                },
                "customSearchKeywords": null
              },
              "createdAt": "2022-01-05T10:13:33.550+00:00",
              "updatedAt": null,
              "extensions": {
                "foreignKeys": {
                  "apiAlias": "array_struct"
                }
              },
              "id": "7249d9a4cbbc4b9fa03b6741c86ba613",
              "parentVersionId": "0fa91ce3e96a4bc2be4bd9ce752c3425",
              "productManufacturerVersionId": "0fa91ce3e96a4bc2be4bd9ce752c3425",
              "productMediaVersionId": null,
              "apiAlias": "product"
            }
          }
        ],
        "headline": "Was zusätzlich hilft"
      }
    ],
    "fupKeys": [],
    "textA5": null,
    "popup": {
      "buttonCancel": {
        "label": "VERWERFEN",
        "type": "cancel"
      },
      "buttonConfirm": {
        "type": "confirm",
        "label": "SPEICHERN"
      },
      "popupOptionText": "Möchtest du die Diagnose in der CareCard ablegen? Dort kannst du sie jederzeit wieder einsehen. Klicke hierzu auf speichern. Wenn nicht, wird die Auswertung automatisch verworfen."
    },
    "textA2": null,
    "headerHeadlineH2": "Flohbefall",
    "actions": [
      {
        "header": "Du möchtest persönlich mit einem/einer Tierärzt:in sprechen?",
        "label": "VIDEOANRUF VEREINBAREN",
        "visibility": true,
        "event": null,
        "body": "Wähle bequem einen Termin aus.",
        "key": null,
        "link": "consultation"
      }
    ],
    "textA3": {
      "type": "keys",
      "header": "Wie du helfen kannst",
      "visibility": true,
      "body": [
        {
          "textblockList": [],
          "textblockHeadline": "Medikation",
          "textblockText": null
        },
        {
          "textblockText": "Wautz benötigt ein verschreibungspflichtiges Medikament gegen Flohbefall. Da Flöhe häufig Bandwürmer übertragen, entwurme Wautz zusätzlich.",
          "textblockList": [],
          "textblockHeadline": null
        },
        {
          "textblockHeadline": null,
          "textblockText": "Behandle auch alle Partnertiere von Wautz mit einem Antiparasitikum, da eine (Wieder-) Ansteckung sehr wahrscheinlich ist. Nutze hierzu gesondert den Diagnose Finder von confidu für jedes Tier. Sind keine Symptome vorhanden, kannst du das benötigte Präparat über Medikamente nachbestellen --> Parasitenprophylaxe erhalten. Und bitte bedenke: Medikamente müssen immer ausdrücklich für die jeweilige Tierart zugelassen sein. Nicht alles, was für Hunde verträglich ist, vertragen auch Katzen.",
          "textblockList": []
        },
        {
          "textblockHeadline": "Diagnostik und Monitoring",
          "textblockText": null,
          "textblockList": []
        },
        {
          "textblockHeadline": null,
          "textblockList": [],
          "textblockText": "Wenn sich die Symptome trotz Maßnahmen verschlimmern oder nach einer Woche keine Besserung eintritt, suche mit Wautz eine Tierarztpraxis oder -klinik auf."
        },
        {
          "textblockText": null,
          "textblockHeadline": "Management",
          "textblockList": []
        },
        {
          "textblockText": "Kämme Wautz regelmäßig (anfänglich am besten täglich) mit einem Flohkamm durch, um tote und neu geschlüpfte Flöhe sofort zu entfernen.",
          "textblockList": [],
          "textblockHeadline": null
        },
        {
          "textblockList": [],
          "textblockHeadline": null,
          "textblockText": "Die meisten Flöhe leben nicht auf dem Tier, sondern in dessen Umfeld. Deshalb ist bei einem Befall auch die Umgebungsbehandlung besonders wichtig."
        },
        {
          "textblockList": [],
          "textblockHeadline": null,
          "textblockText": "Sauge die Wohnung gründlich und entsorge den Staubsaugerbeutel. Wasche alle Decken von Liegeplätzen und Spielzeuge bei mindestens 60°C. Wende ein Umgebungsspray an, um alle verbleibenden Flohstadien abzutöten. Sauge danach erneut gründlich und entsorge den Beutel."
        },
        {
          "textblockHeadline": null,
          "textblockText": "Um einen Flohbefall zu verhindern, hilft eine regelmäßige Flohprophylaxe. Wie und wie häufig du diese durchführen solltest, findest du in der CareCard unter Ektoparasitenrisiko.",
          "textblockList": []
        }
      ]
    },
    "urgency": "hoch",
    "textA1": {
      "visibility": null,
      "body": [
        "Kontakt mit befallenen Tieren",
        "Einbringen von Floheiern oder -larven mit den Schuhen oder der Kleidung"
      ],
      "header": "Häufige Ursachen",
      "type": "list"
    },
    "venomList": [
      "1620_D",
      "1620_CC_D_NDF",
      "w+weightac_variable_ob"
    ],
    "ticketKeys": [
      "televetcheck"
    ],
    "slider": null,
    "carecard": [
      {
        "level3Id": "6502fe7f-3b6d-4c9e-b018-765914e8cdea",
        "resultKey": "TEL_HAI_FLEAI_HIG_SEL_1",
        "level1_valA": "33",
        "level1_valB": null,
        "valA": "33",
        "valB": null,
        "venomKey": "w+weightac_variable_ob",
        "level0_cc_key": "prevention_cc",
        "level1_cc_key": "w+weightac",
        "cc_status": "variable_ob",
        "priority": 9,
        "param": null,
        "downloadPath": null,
        "eventDate": "2022-01-28T14:23:48.531213+01:00",
        "nextDate": null,
        "isTerminated": false,
        "currentDate": "2022-01-28T14:23:48.801229+01:00",
        "eventId": "a43bfd5d-23eb-44e3-8a8e-4ef772f0018a",
        "findings": [
          {
            "currentDate": "2022-01-28T14:23:48.801229+01:00",
            "docs": [
              "findings/a43bfd5d-23eb-44e3-8a8e-4ef772f0018a.pdf"
            ],
            "id": null,
            "name": "name",
            "image": null,
            "region": {
              "name": null,
              "value": null
            },
            "type": "pdf"
          }
        ],
        "currentWeight": 33,
        "event": "televet"
      },
      {
        "level3Id": "716db6a1-2e11-440c-8c22-034a88fd119e",
        "resultKey": "TEL_HAI_FLEAI_HIG_SEL_1",
        "level1_valA": null,
        "level1_valB": null,
        "valA": null,
        "valB": null,
        "venomKey": "1620_CC_D_NDF",
        "level0_cc_key": "diseases_cc",
        "level1_cc_key": "consultation_cc",
        "cc_status": "available",
        "priority": 3,
        "param": null,
        "downloadPath": null,
        "eventDate": "2022-01-28T14:23:48.531213+01:00",
        "nextDate": "2022-01-28T14:23:48.531289+01:00",
        "isTerminated": false,
        "currentDate": "2022-01-28T14:23:48.801229+01:00",
        "eventId": "a43bfd5d-23eb-44e3-8a8e-4ef772f0018a",
        "findings": [
          {
            "currentDate": "2022-01-28T14:23:48.801229+01:00",
            "docs": [
              "findings/a43bfd5d-23eb-44e3-8a8e-4ef772f0018a.pdf"
            ],
            "id": null,
            "name": "name",
            "image": null,
            "region": {
              "name": null,
              "value": null
            },
            "type": "image"
          }
        ],
        "currentWeight": 33,
        "event": "televet"
      },
      {
        "level3Id": "aadc074d-e1de-41ba-adbc-d647cf53d977",
        "resultKey": "TEL_HAI_FLEAI_HIG_SEL_1",
        "level1_valA": null,
        "level1_valB": null,
        "valA": null,
        "valB": null,
        "venomKey": "1620_D",
        "level0_cc_key": "diseases_cc",
        "level1_cc_key": "healthstatus_cc",
        "cc_status": "sick",
        "priority": 2,
        "param": null,
        "downloadPath": null,
        "eventDate": "2022-01-28T14:23:48.531213+01:00",
        "nextDate": "2022-01-28T14:23:48.531289+01:00",
        "isTerminated": false,
        "currentDate": "2022-01-28T14:23:48.801229+01:00",
        "eventId": "a43bfd5d-23eb-44e3-8a8e-4ef772f0018a",
        "findings": [
          {
            "currentDate": "2022-01-28T14:23:48.801229+01:00",
            "docs": [
              "findings/a43bfd5d-23eb-44e3-8a8e-4ef772f0018a.pdf"
            ],
            "id": null,
            "name": "name",
            "image": null,
            "region": {
              "name": null,
              "value": null
            },
            "type": "pdf"
          }
        ],
        "currentWeight": 33,
        "event": "televet"
      }
    ],
    "internal": {
      "diseaseKey": "TEL_HAI_FLEAI_HIG_SEL_1",
      "eventDate": "2022-01-28T14:23:48.531213+01:00"
    },
    "currentDate": "2022-01-28T14:23:48.801229+01:00",
    "eventId": "a43bfd5d-23eb-44e3-8a8e-4ef772f0018a",
    "ticketId": null,
    "ticketCoins": null
  }

}
