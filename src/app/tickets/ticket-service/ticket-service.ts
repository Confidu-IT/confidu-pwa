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
      'firebase-context-token': token,
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
      'firebase-context-token': token,
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

  public confirmSave(
    eventID: string,
    action: string,
    petID: string,
    userID: string,
    token: string,
    language: string
  ): Observable<any> {
    const headers = {
      'Content-Type': 'application/json',
      'firebase-context-token': token,
      'sw-context-token': localStorage.getItem('sw-token')
    };
    const url = `${this.baseUrl}/${language}/event/results/save-content`;
    const body = {
      eventId: eventID,
      petId: petID,
      uid: userID,
      type: action
    };
    return this.http.post(url, body, { headers });
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
      'firebase-context-token': token,
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

  public blah = {
    "actions": [
      {
        "label": "VIDEOANRUF VEREINBAREN",
        "visibility": true,
        "event": null,
        "link": "consultation",
        "key": null,
        "header": "Du möchtest persönlich mit einem/einer Tierärzt:in sprechen?",
        "body": "Wähle bequem einen Termin aus."
      }
    ],
    "headerHeadlineH2": "Blähungen",
    "image": null,
    "therapy": "tierärztliche Konsultation nötig",
    "textA1": {
      "visibility": null,
      "type": "list",
      "header": "Häufige Ursachen",
      "body": [
        "Futtermittelunverträglichkeit",
        "Störung der Nahrungsaufnahme im Darmtrakt",
        "unzureichende Aufspaltung der Nahrungsbestandteile im Magen-Darm-Trakt",
        "exokrine Bauchspeicheldrüseninsuffizienz",
        "Darmmotilitätsstörungen"
      ]
    },
    "initial": {
      "visibility": true,
      "body": [
        "Deine Angaben führen leider nicht zu einer eindeutigen Diagnose, der Fall von Wuffel scheint etwas komplexer zu sein und muss weiter aufgearbeitet werden.",
        "Blähungen entstehen durch eine übermäßige Gasbildung durch Mikroorganismen im Dickdarm. In den meisten Fällen sind sie durch eine ungünstig zusammengesetzte Ernährung bedingt."
      ],
      "header": "Was heißt das?",
      "type": "par"
    },
    "slider": null,
    "textA3": {
      "body": [
        {
          "textblockText": null,
          "textblockList": [],
          "textblockHeadline": "Diagnostik und Monitoring"
        },
        {
          "textblockHeadline": null,
          "textblockList": [],
          "textblockText": "Blähungen können viele Ursachen haben, denen du auf den Grund gehen solltest."
        },
        {
          "textblockText": "Möglicherweise ist die Darmflora aus dem Gleichgewicht geraten. Lass eine Kotuntersuchung durchführen, um passende Maßnahmen ergreifen zu können.",
          "textblockHeadline": null,
          "textblockList": []
        },
        {
          "textblockList": [],
          "textblockText": null,
          "textblockHeadline": "Fütterung"
        },
        {
          "textblockList": [],
          "textblockHeadline": null,
          "textblockText": "Je nach Ergebnis können verschiedene Ergänzungsfuttermittel gegen die Blähungen helfen."
        }
      ],
      "header": "Wie du helfen kannst",
      "visibility": true,
      "type": "keys"
    },
    "nextDate": null,
    "venomList": [
      "19812_CC_NO",
      "19812_CC_NO_NDF"
    ],
    "iconImageLink": "https://firebasestorage.googleapis.com/v0/b/confidu-app.appspot.com/o/evaluations%2Fevaluation_medical_negative.svg?alt=media&token=96756222-d842-4c82-a19a-e551e4d0d75e",
    "fupKeys": [],
    "isPdf": true,
    "popup": {
      "buttonCancel": {
        "label": "VERWERFEN",
        "type": "cancel"
      },
      "buttonConfirm": {
        "type": "confirm",
        "label": "SPEICHERN"
      },
      "popupOptionText": "Möchtest du das Symptom in der CareCard ablegen? Dort kannst du es jederzeit wieder einsehen. Klicke hierzu auf speichern. Wenn nicht, wird die Auswertung automatisch verworfen."
    },
    "findings": {
      "header": "Deine Angaben",
      "body": {
        "answers": [
          {
            "name": "FL_Q1",
            "values": {
              "answer": {
                "answerLongtext": [
                  "ja"
                ],
                "answerUnit": null,
                "venomKey": null,
                "answerValue": null,
                "minSpecifics": 0,
                "imageLinkAnswer": null,
                "imageLinkDetailAnswer": null,
                "subject": null,
                "ccEntry": null,
                "value": "FL_Q1_Y"
              }
            },
            "questionText": "Frisst Wuffel vermehrt Getreideprodukte, Obst oder Gemüse?",
            "questionType": "R"
          },
          {
            "name": "FL_Q4",
            "values": {
              "answer": {
                "venomKey": null,
                "answerValue": null,
                "value": "FL_Q4_N",
                "imageLinkDetailAnswer": null,
                "answerUnit": null,
                "answerLongtext": [
                  "nein"
                ],
                "ccEntry": null,
                "subject": null,
                "minSpecifics": 0,
                "imageLinkAnswer": null
              }
            },
            "questionText": "Hat Wuffel kürzlich Futter mit blähenden Zutaten gefressen?",
            "questionType": "R"
          },
          {
            "name": "FL_Q5",
            "values": {
              "answer": {
                "answerLongtext": [
                  "ja"
                ],
                "imageLinkAnswer": null,
                "imageLinkDetailAnswer": null,
                "answerUnit": null,
                "minSpecifics": 0,
                "answerValue": null,
                "ccEntry": null,
                "venomKey": null,
                "value": "FL_Q5_Y",
                "subject": null
              }
            },
            "questionText": "Bekommt Wuffel Kauartikel oder Innereien?",
            "questionType": "R"
          },
          {
            "name": "DF_Q5",
            "values": {
              "answer": {
                "ccEntry": null,
                "subject": null,
                "imageLinkAnswer": null,
                "answerUnit": null,
                "value": "DF_Q5_N",
                "answerValue": null,
                "answerLongtext": [
                  "nein"
                ],
                "venomKey": null,
                "minSpecifics": 0,
                "imageLinkDetailAnswer": null
              }
            },
            "questionText": "Gab es in den letzten Tagen eine Futterumstellung?",
            "questionType": "R"
          },
          {
            "name": "FL_Q2",
            "values": {
              "answer": {
                "imageLinkDetailAnswer": null,
                "imageLinkAnswer": null,
                "subject": null,
                "answerUnit": null,
                "answerLongtext": [
                  "nein"
                ],
                "ccEntry": null,
                "venomKey": null,
                "minSpecifics": 0,
                "value": "FL_Q2_N",
                "answerValue": null
              }
            },
            "questionText": "Zeigt Wuffel zusätzlich Erbrechen oder Durchfall?",
            "questionType": "R"
          },
          {
            "name": "GHA_Q3",
            "values": {
              "answer": {
                "value": "GHA_Q3_Y",
                "minSpecifics": 0,
                "answerUnit": null,
                "subject": null,
                "imageLinkDetailAnswer": null,
                "venomKey": null,
                "answerLongtext": [
                  "ja"
                ],
                "imageLinkAnswer": null,
                "ccEntry": null,
                "answerValue": null
              }
            },
            "questionText": "Hat Wuffel trotz unveränderter Fütterung in den letzten Wochen Gewicht verloren ?",
            "questionType": "R"
          },
          {
            "name": "FL_Q3",
            "values": {
              "answer": {
                "answerLongtext": [
                  "nein"
                ],
                "answerValue": null,
                "venomKey": null,
                "imageLinkAnswer": null,
                "ccEntry": null,
                "answerUnit": null,
                "minSpecifics": 0,
                "value": "FL_Q3_N",
                "subject": null,
                "imageLinkDetailAnswer": null
              }
            },
            "questionText": "Uriniert und trinkt Wuffel vermehrt?",
            "questionType": "R"
          },
          {
            "name": "FL_Q6",
            "values": {
              "answer": {
                "ccEntry": null,
                "venomKey": null,
                "imageLinkDetailAnswer": null,
                "answerValue": null,
                "subject": null,
                "answerUnit": null,
                "answerLongtext": [
                  "nein"
                ],
                "value": "FL_Q6_N",
                "imageLinkAnswer": null,
                "minSpecifics": 0
              }
            },
            "questionText": "Frisst Wuffel derzeit eine spezielle Diät aufgrund einer anderen Erkrankung?",
            "questionType": "R"
          },
          {
            "name": "DF_Q8",
            "values": {
              "answer": {
                "answerValue": null,
                "venomKey": null,
                "answerLongtext": [
                  "nein"
                ],
                "ccEntry": null,
                "answerUnit": null,
                "minSpecifics": 0,
                "imageLinkDetailAnswer": null,
                "value": "DF_Q8_N",
                "imageLinkAnswer": null,
                "subject": null
              }
            },
            "questionText": "Leidet Wuffel an vermehrtem Juckreiz oder treten häufiger Ohrenentzündungen auf?",
            "questionType": "R"
          },
          {
            "name": "SHA_Q13",
            "values": {
              "answer": {
                "subject": null,
                "answerValue": null,
                "value": "SHA_Q13_N",
                "imageLinkDetailAnswer": null,
                "minSpecifics": 0,
                "ccEntry": null,
                "answerUnit": null,
                "venomKey": null,
                "imageLinkAnswer": null,
                "answerLongtext": [
                  "nein"
                ]
              }
            },
            "questionText": "Wird Wuffel aktuell mit Antibiotika behandelt?",
            "questionType": "R"
          },
          {
            "name": "SHA_Q19",
            "values": {
              "answer": {
                "answerUnit": null,
                "ccEntry": "W",
                "venomKey": null,
                "subject": null,
                "answerLongtext": null,
                "imageLinkAnswer": null,
                "imageLinkDetailAnswer": null,
                "answerValue": 33,
                "minSpecifics": 0,
                "value": "*pet_weight*"
              }
            },
            "questionText": "Gib das aktuelle Gewicht von Wuffel an.",
            "questionType": "Z"
          },
          {
            "name": "DIS_Q1",
            "values": {
              "answer": {
                "minSpecifics": 0,
                "venomKey": null,
                "ccEntry": null,
                "subject": null,
                "answerValue": null,
                "imageLinkDetailAnswer": null,
                "imageLinkAnswer": null,
                "answerLongtext": [
                  "nein"
                ],
                "answerUnit": null,
                "value": "DIS_Q1_N"
              }
            },
            "questionText": "Hat Wuffel weitere gesundheitliche Probleme oder Symptome, die nicht abgefragt wurden?",
            "questionType": "R"
          },
          {
            "name": "DIS_Q2",
            "values": {
              "answer": {
                "ccEntry": null,
                "value": "DIS_Q2_true",
                "imageLinkDetailAnswer": null,
                "imageLinkAnswer": null,
                "subject": null,
                "answerUnit": null,
                "minSpecifics": 0,
                "answerLongtext": [
                  "Ich bestätige, dass ich alle Fragen nach bestem Wissen, wahrheitsgemäß und vollständig beantwortet habe und dass ich das/die Medikament(e) nur zur Behandlung der oben genannten Erkrankung meines Tieres Wuffel verwende."
                ],
                "answerValue": null,
                "venomKey": null
              }
            },
            "questionText": "Wichtige Informationen!",
            "questionType": "CH2"
          }
        ],
        "text": null,
        "legend": null,
        "param": null
      },
      "visibility": null
    },
    "textA5": null,
    "textA4": null,
    "ticketKeys": [],
    "products": [
      {
        "list": [
          {
            "pharmacy": false,
            "med_type": "Suspension ",
            "feeding": true,
            "med_amount": 1,
            "med_package_ges": "60 ml Tube",
            "key": "CAN",
            "med_duration_pd": 2,
            "prescription": false,
            "med_doses": "Milliliter",
            "med_unit": "ml",
            "med_name": "Canikur Pro Paste",
            "med_frequency": null,
            "minWeight": 25.1,
            "med_header": null,
            "diagnosis": [
              "verschobene Darmflora"
            ],
            "med_image_link": "https://console.firebase.google.com/u/0/project/confidu-app/storage/confidu-app.appspot.com/files~2Fcarecard~2Fmedication",
            "med_delivery": "confidu GmbH",
            "ticket_type": [
              "med_take"
            ],
            "medication": "Canikur Pro Paste",
            "med_duration_length": 3,
            "indication": {
              "body": {
                "indicationThird": null,
                "indicactionCaution": "Zusammensetzung: Sojaöl, inaktivierte Hefe, pflanzliches Proteinhydrolysat, Glukose, Natriumchlorid;Analytische Bestandteile: Rohöle und -fette 43,6 %, Rohasche 21,1%, salzsäureunlösliche Asche 13,0 %, Rohprotein 6,0 %, Rohfaser 1,5 %;Zusatzstoffe pro kg: Enterococcus faecium (DSM 10663/NCIMB 10415) (Darmflora-Stabilisator) 2x10^12 KBE, Bentonit 1m5581i (Montmorillonit, Adsorptionsmittel) 17%",
                "indicationDeclaration": "Canikur® Pro Paste ist leicht zu verabreichen, schmackhaft und enthält Prä- und Probiotika sowie das viren- und toxinbindende Mineral Montmorillonit, welches die Darmfunktion bei unkomplizierten Darmerkrankungen regulieren kann. Canikur® Pro unterstützt den Darm außerdem in Stressphasen.",
                "indicationTeaser": "Canikur",
                "indicationFirst": {
                  "header": "Das Ergänzungsfuttermittel wird angewendet bei Hunden und Katzen",
                  "body": [
                    "zur Unterstützung von vorbeugenden Maßnahmen",
                    "zur Entfernung der pathogenen Bakterien aus dem Darmtrakt",
                    "zur Wiederherstellung des natürlichen Wasser- und Elektrolythaushaltes",
                    "zum Schutz der Darmschleimhaut und Normalisierung der Kotkonsistenz",
                    "zur Wiederherstellung der natürlichen Darmflora",
                    "zur Unterstützung des Immunsystems"
                  ]
                },
                "indicationOther": null,
                "indicationSecond": null,
                "indicationProduct": "Diät-Ergänzungsfuttermittel zur Unterstützung der Darmflora"
              },
              "header": "Anwendungsgebiet"
            },
            "product_pdf_dokument": "https://firebasestorage.googleapis.com/v0/b/confidu-app.appspot.com/o/shop%2Fpackage_insert%2Fcanikur_pro_paste_dog_cat_product_information_de.pdf?alt=media&token=ccb10cd7-784f-4780-bbf6-371d5715d0d1",
            "id": "CPPDC6010000036",
            "Wiederholung_Freq": null,
            "med_amountdose": 6,
            "maxWeight": 40,
            "med_category": "Ergänzungsfuttermittel",
            "data": {
              "calculatedListingPrice": {
                "from": {
                  "unitPrice": 20.65,
                  "quantity": 1,
                  "totalPrice": 20.65,
                  "calculatedTaxes": [
                    {
                      "tax": 1.35,
                      "taxRate": 7,
                      "price": 20.65,
                      "apiAlias": "cart_tax_calculated"
                    }
                  ],
                  "taxRules": [
                    {
                      "taxRate": 7,
                      "percentage": 100,
                      "apiAlias": "cart_tax_rule"
                    }
                  ],
                  "referencePrice": null,
                  "listPrice": null,
                  "apiAlias": "calculated_price"
                },
                "to": {
                  "unitPrice": 20.65,
                  "quantity": 1,
                  "totalPrice": 20.65,
                  "calculatedTaxes": [
                    {
                      "tax": 1.35,
                      "taxRate": 7,
                      "price": 20.65,
                      "apiAlias": "cart_tax_calculated"
                    }
                  ],
                  "taxRules": [
                    {
                      "taxRate": 7,
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
                "unitPrice": 20.65,
                "quantity": 1,
                "totalPrice": 20.65,
                "calculatedTaxes": [
                  {
                    "tax": 1.35,
                    "taxRate": 7,
                    "price": 20.65,
                    "apiAlias": "cart_tax_calculated"
                  }
                ],
                "taxRules": [
                  {
                    "taxRate": 7,
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
              "taxId": "3cea8a974b474689a879e6f1a37ee83a",
              "manufacturerId": "274629470ad64062a04a84a2e5cd17b0",
              "unitId": null,
              "active": true,
              "displayGroup": "f35045d685dc10e55feb65892292f82e",
              "manufacturerNumber": null,
              "ean": null,
              "sales": 0,
              "productNumber": "CPPDC6010000036",
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
                "b25b377b2568469c863baa8479c16314"
              ],
              "optionIds": null,
              "propertyIds": null,
              "name": "Canikur Pro Paste",
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
                "taxRate": 7,
                "name": "7%",
                "customFields": null,
                "_uniqueIdentifier": "3cea8a974b474689a879e6f1a37ee83a",
                "versionId": null,
                "translated": [],
                "createdAt": "2021-05-25T10:59:18.739+00:00",
                "updatedAt": "2021-08-17T10:04:17.736+00:00",
                "extensions": {
                  "internal_mapping_storage": {
                    "apiAlias": "array_struct"
                  },
                  "foreignKeys": {
                    "apiAlias": "array_struct"
                  }
                },
                "id": "3cea8a974b474689a879e6f1a37ee83a",
                "apiAlias": "tax"
              },
              "manufacturer": null,
              "unit": null,
              "cover": {
                "productId": "af65e063431a4784b9a9798c96052c78",
                "mediaId": "fbbdd33290f745329730a852fec8793e",
                "position": 1,
                "media": {
                  "mimeType": "image/jpeg",
                  "fileExtension": "jpg",
                  "fileSize": 193076,
                  "title": null,
                  "metaData": {
                    "width": 2126,
                    "height": 2126,
                    "type": 2
                  },
                  "uploadedAt": "2021-08-17T11:49:53.482+00:00",
                  "alt": null,
                  "url": "https://demo-shop.tierversicherung.click/staging/media/1d/2b/f1/1629200993/canikur.jpg",
                  "fileName": "canikur",
                  "translations": null,
                  "thumbnails": [
                    {
                      "width": 400,
                      "height": 400,
                      "url": "https://demo-shop.tierversicherung.click/staging/thumbnail/1d/2b/f1/1629200993/canikur_400x400.jpg",
                      "mediaId": "fbbdd33290f745329730a852fec8793e",
                      "customFields": null,
                      "_uniqueIdentifier": "4b484c20eef74a76945264ea54ce0b2e",
                      "versionId": null,
                      "translated": [],
                      "createdAt": "2021-08-17T11:49:59.827+00:00",
                      "updatedAt": null,
                      "extensions": {
                        "foreignKeys": {
                          "apiAlias": "array_struct"
                        }
                      },
                      "id": "4b484c20eef74a76945264ea54ce0b2e",
                      "apiAlias": "media_thumbnail"
                    },
                    {
                      "width": 800,
                      "height": 800,
                      "url": "https://demo-shop.tierversicherung.click/staging/thumbnail/1d/2b/f1/1629200993/canikur_800x800.jpg",
                      "mediaId": "fbbdd33290f745329730a852fec8793e",
                      "customFields": null,
                      "_uniqueIdentifier": "b3965fe83b4544e4912993ca18a230cd",
                      "versionId": null,
                      "translated": [],
                      "createdAt": "2021-08-17T11:49:59.827+00:00",
                      "updatedAt": null,
                      "extensions": {
                        "foreignKeys": {
                          "apiAlias": "array_struct"
                        }
                      },
                      "id": "b3965fe83b4544e4912993ca18a230cd",
                      "apiAlias": "media_thumbnail"
                    },
                    {
                      "width": 1920,
                      "height": 1920,
                      "url": "https://demo-shop.tierversicherung.click/staging/thumbnail/1d/2b/f1/1629200993/canikur_1920x1920.jpg",
                      "mediaId": "fbbdd33290f745329730a852fec8793e",
                      "customFields": null,
                      "_uniqueIdentifier": "b49ac316955e4125af6d8bb1d841f421",
                      "versionId": null,
                      "translated": [],
                      "createdAt": "2021-08-17T11:49:59.826+00:00",
                      "updatedAt": null,
                      "extensions": {
                        "foreignKeys": {
                          "apiAlias": "array_struct"
                        }
                      },
                      "id": "b49ac316955e4125af6d8bb1d841f421",
                      "apiAlias": "media_thumbnail"
                    }
                  ],
                  "hasFile": true,
                  "private": false,
                  "customFields": null,
                  "_uniqueIdentifier": "fbbdd33290f745329730a852fec8793e",
                  "versionId": null,
                  "translated": {
                    "alt": null,
                    "title": null,
                    "customFields": []
                  },
                  "createdAt": "2021-08-17T11:49:49.108+00:00",
                  "updatedAt": "2021-08-17T11:49:59.827+00:00",
                  "extensions": {
                    "internal_mapping_storage": {
                      "apiAlias": "array_struct"
                    },
                    "foreignKeys": {
                      "apiAlias": "array_struct"
                    }
                  },
                  "id": "fbbdd33290f745329730a852fec8793e",
                  "apiAlias": "media"
                },
                "customFields": null,
                "_uniqueIdentifier": "40e646de7a894ac5b0b23f715d9a3bf4",
                "versionId": "0fa91ce3e96a4bc2be4bd9ce752c3425",
                "translated": [],
                "createdAt": "2021-08-17T11:58:00.429+00:00",
                "updatedAt": null,
                "extensions": {
                  "foreignKeys": {
                    "apiAlias": "array_struct"
                  }
                },
                "id": "40e646de7a894ac5b0b23f715d9a3bf4",
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
              "coverId": "40e646de7a894ac5b0b23f715d9a3bf4",
              "customFields": {
                "product_prescription": false,
                "product_pharmacy": false,
                "product_feeding": true,
                "product_ticket_type": "med_take",
                "product_med_category": "Ergänzungsfuttermittel",
                "product_medication_key": "CAN"
              },
              "productReviews": null,
              "ratingAverage": null,
              "mainCategories": null,
              "seoUrls": null,
              "crossSellings": null,
              "canonicalProductId": null,
              "canonicalProduct": null,
              "_uniqueIdentifier": "af65e063431a4784b9a9798c96052c78",
              "versionId": "0fa91ce3e96a4bc2be4bd9ce752c3425",
              "translated": {
                "metaDescription": null,
                "name": "Canikur Pro Paste",
                "keywords": null,
                "description": null,
                "metaTitle": null,
                "packUnit": null,
                "packUnitPlural": null,
                "customFields": {
                  "product_prescription": false,
                  "product_pharmacy": false,
                  "product_feeding": true,
                  "product_ticket_type": "med_take",
                  "product_med_category": "Ergänzungsfuttermittel",
                  "product_medication_key": "CAN"
                },
                "customSearchKeywords": null
              },
              "createdAt": "2021-08-16T20:27:09.012+00:00",
              "updatedAt": "2021-08-17T11:58:00.429+00:00",
              "extensions": {
                "foreignKeys": {
                  "apiAlias": "array_struct"
                }
              },
              "id": "af65e063431a4784b9a9798c96052c78",
              "parentVersionId": "0fa91ce3e96a4bc2be4bd9ce752c3425",
              "productManufacturerVersionId": "0fa91ce3e96a4bc2be4bd9ce752c3425",
              "productMediaVersionId": null,
              "apiAlias": "product"
            }
          },
          {
            "diagnosis": [
              "Verstopfung, Darmirritation"
            ],
            "med_delivery": "confidu GmbH",
            "med_image_link": "https://firebasestorage.googleapis.com/v0/b/confidu-app.appspot.com/o/carecard%2Fmedication%2Fpowder.svg?alt=media&token=5cf15070-eaae-4306-a37a-6265fa7fef2f",
            "indication": {
              "header": "Anwendungsgebiet",
              "body": {
                "indicationProduct": "Ergänzungsfuttermittel zur Unterstützung des Darms",
                "indicactionCaution": "Zusammensetzung: 100% Flohsamenschalen (blond)",
                "indicationDeclaration": "Flohsamenschalen gelten als eine der besten Ballaststoffe. Sie sind sicherer als andere Abführmittel, die dazu führen können, dass Nährstoffe verloren gehen. Bei zu hartem Kot sorgen sie dafür, dass der Darminhalt weicher und voluminöser wird. So wird die Darmperistalktik verbessert und der Kot kann schneller abgesetzt werden. ",
                "indicationSecond": {
                  "header": "Das Ergänzungsfuttermittel wird angewendet bei Hunden und Katzen zur Förderung einer gesunden Darmtätigkeit.",
                  "body": null
                },
                "indicationOther": "Wissenschaftliche Untersuchungen haben nachgewiesen, dass Haarbälle im Magen der Katze (eventuell auch beim Hund) durch die Verwendung von Psyllium auf natürliche Weise ausgeschieden werden können.",
                "indicationTeaser": "Puur Psyllium",
                "indicationFirst": {
                  "header": "Das Ergänzungsfuttermittel wird angewendet bei Hunden und Katzen zur Unterstützung bei ",
                  "body": [
                    "zu dünnem oder zu hartem Stuhlgang",
                    "anderen Darmirritationen"
                  ]
                },
                "indicationThird": null
              }
            },
            "med_name": "Puur Psyllium Hund/Katze",
            "med_header": null,
            "minWeight": 25,
            "med_package_ges": "150 g Dose",
            "prescription": false,
            "med_unit": "g",
            "medication": "Puur Psyllium",
            "maxWeight": 100,
            "product_pdf_dokument": "https://firebasestorage.googleapis.com/v0/b/confidu-app.appspot.com/o/shop%2Fpackage_insert%2Fp_%2Fpuur_psyllum_dog_cat_product_information_de.pdf?alt=media&token=05bf6f62-86f6-4d0f-b3a4-3fa9a185c730",
            "med_amountdose": 1.5,
            "id": "PUUDC1510000089",
            "feeding": true,
            "med_duration_pd": 1,
            "med_duration_length": 3,
            "Wiederholung_Freq": null,
            "ticket_type": [
              "med_take"
            ],
            "med_doses": "Messlöffel",
            "med_category": "Ergänzungsfuttermittel",
            "med_frequency": null,
            "pharmacy": false,
            "med_type": "Pulver",
            "med_amount": 1,
            "key": "FSS",
            "data": {
              "calculatedListingPrice": {
                "from": {
                  "unitPrice": 12.73,
                  "quantity": 1,
                  "totalPrice": 12.73,
                  "calculatedTaxes": [
                    {
                      "tax": 0.83,
                      "taxRate": 7,
                      "price": 12.73,
                      "apiAlias": "cart_tax_calculated"
                    }
                  ],
                  "taxRules": [
                    {
                      "taxRate": 7,
                      "percentage": 100,
                      "apiAlias": "cart_tax_rule"
                    }
                  ],
                  "referencePrice": null,
                  "listPrice": null,
                  "apiAlias": "calculated_price"
                },
                "to": {
                  "unitPrice": 12.73,
                  "quantity": 1,
                  "totalPrice": 12.73,
                  "calculatedTaxes": [
                    {
                      "tax": 0.83,
                      "taxRate": 7,
                      "price": 12.73,
                      "apiAlias": "cart_tax_calculated"
                    }
                  ],
                  "taxRules": [
                    {
                      "taxRate": 7,
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
                "unitPrice": 12.73,
                "quantity": 1,
                "totalPrice": 12.73,
                "calculatedTaxes": [
                  {
                    "tax": 0.83,
                    "taxRate": 7,
                    "price": 12.73,
                    "apiAlias": "cart_tax_calculated"
                  }
                ],
                "taxRules": [
                  {
                    "taxRate": 7,
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
              "taxId": "3cea8a974b474689a879e6f1a37ee83a",
              "manufacturerId": "274629470ad64062a04a84a2e5cd17b0",
              "unitId": null,
              "active": true,
              "displayGroup": "f941dc166fba43ee63d8c56ac32f1daf",
              "manufacturerNumber": null,
              "ean": null,
              "sales": 0,
              "productNumber": "PUUDC1510000089",
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
                "b25b377b2568469c863baa8479c16314"
              ],
              "optionIds": null,
              "propertyIds": null,
              "name": "Puur Psyllium Hund/Katze",
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
                "taxRate": 7,
                "name": "7%",
                "customFields": null,
                "_uniqueIdentifier": "3cea8a974b474689a879e6f1a37ee83a",
                "versionId": null,
                "translated": [],
                "createdAt": "2021-05-25T10:59:18.739+00:00",
                "updatedAt": "2021-08-17T10:04:17.736+00:00",
                "extensions": {
                  "internal_mapping_storage": {
                    "apiAlias": "array_struct"
                  },
                  "foreignKeys": {
                    "apiAlias": "array_struct"
                  }
                },
                "id": "3cea8a974b474689a879e6f1a37ee83a",
                "apiAlias": "tax"
              },
              "manufacturer": null,
              "unit": null,
              "cover": {
                "productId": "d412d7b4a4fd491584e6dfd01d6c9ba2",
                "mediaId": "265c6d25fc674809bbeb8ab7af0a6a40",
                "position": 1,
                "media": {
                  "mimeType": "image/jpeg",
                  "fileExtension": "jpg",
                  "fileSize": 32623,
                  "title": null,
                  "metaData": {
                    "width": 576,
                    "height": 576,
                    "type": 2
                  },
                  "uploadedAt": "2021-08-16T20:14:10.155+00:00",
                  "alt": null,
                  "url": "https://demo-shop.tierversicherung.click/staging/media/d9/a6/32/1629144850/powder.jpg",
                  "fileName": "powder",
                  "translations": null,
                  "thumbnails": [],
                  "hasFile": true,
                  "private": false,
                  "customFields": null,
                  "_uniqueIdentifier": "265c6d25fc674809bbeb8ab7af0a6a40",
                  "versionId": null,
                  "translated": {
                    "alt": null,
                    "title": null,
                    "customFields": []
                  },
                  "createdAt": "2021-08-16T20:14:10.146+00:00",
                  "updatedAt": "2021-08-16T20:30:24.561+00:00",
                  "extensions": {
                    "internal_mapping_storage": {
                      "apiAlias": "array_struct"
                    },
                    "foreignKeys": {
                      "apiAlias": "array_struct"
                    }
                  },
                  "id": "265c6d25fc674809bbeb8ab7af0a6a40",
                  "apiAlias": "media"
                },
                "customFields": null,
                "_uniqueIdentifier": "ed5632138db24ef589fe924310e653c1",
                "versionId": "0fa91ce3e96a4bc2be4bd9ce752c3425",
                "translated": [],
                "createdAt": "2021-08-16T20:27:12.212+00:00",
                "updatedAt": null,
                "extensions": {
                  "foreignKeys": {
                    "apiAlias": "array_struct"
                  }
                },
                "id": "ed5632138db24ef589fe924310e653c1",
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
              "coverId": "ed5632138db24ef589fe924310e653c1",
              "customFields": {
                "product_prescription": false,
                "product_pharmacy": false,
                "product_feeding": true,
                "product_ticket_type": "med_take",
                "product_med_category": "Ergänzungsfuttermittel",
                "product_medication_key": "FSS"
              },
              "productReviews": null,
              "ratingAverage": null,
              "mainCategories": null,
              "seoUrls": null,
              "crossSellings": null,
              "canonicalProductId": null,
              "canonicalProduct": null,
              "_uniqueIdentifier": "d412d7b4a4fd491584e6dfd01d6c9ba2",
              "versionId": "0fa91ce3e96a4bc2be4bd9ce752c3425",
              "translated": {
                "metaDescription": null,
                "name": "Puur Psyllium Hund/Katze",
                "keywords": null,
                "description": null,
                "metaTitle": null,
                "packUnit": null,
                "packUnitPlural": null,
                "customFields": {
                  "product_prescription": false,
                  "product_pharmacy": false,
                  "product_feeding": true,
                  "product_ticket_type": "med_take",
                  "product_med_category": "Ergänzungsfuttermittel",
                  "product_medication_key": "FSS"
                },
                "customSearchKeywords": null
              },
              "createdAt": "2021-08-16T20:27:12.214+00:00",
              "updatedAt": null,
              "extensions": {
                "foreignKeys": {
                  "apiAlias": "array_struct"
                }
              },
              "id": "d412d7b4a4fd491584e6dfd01d6c9ba2",
              "parentVersionId": "0fa91ce3e96a4bc2be4bd9ce752c3425",
              "productManufacturerVersionId": "0fa91ce3e96a4bc2be4bd9ce752c3425",
              "productMediaVersionId": null,
              "apiAlias": "product"
            }
          },
          {
            "Wiederholung_Freq": null,
            "prescription": false,
            "med_name": "Forscher Box - Darmflora für Hunde",
            "med_amountdose": null,
            "ticket_type": [],
            "med_frequency": null,
            "maxWeight": 100,
            "minWeight": 0,
            "med_duration_pd": null,
            "med_image_link": null,
            "med_doses": null,
            "key": "DFL",
            "pharmacy": false,
            "medication": "Forscher Box - Darmflora",
            "indication": {
              "header": "Anwendungsgebiet",
              "body": {
                "indicationThird": null,
                "indicationOther": null,
                "indicationProduct": "Darmfloraanalyse",
                "indicationDeclaration": "Mit dieser Forscher Box wird die Zusammensetzung der Darmflora untersucht. Schicke eine Kotprobe mit dem Testgefäß ins Labor. Ganz ohne stressigen Tierarztbesuch. Das Ergebnis wird dir in der confidu App angezeigt.",
                "indicationSecond": null,
                "indicationFirst": {
                  "header": "Der Test wird angewendet bei Hunden, um die Darmflora zu analysieren. Vor allem sinnvoll bei behandlungsresistentem Durchfall.",
                  "body": null
                },
                "indicationTeaser": "Forscher Box - Darmflora",
                "indicactionCaution": null
              }
            },
            "med_package_ges": "1 Forscherbox",
            "product_pdf_dokument": "",
            "med_unit": null,
            "med_category": "Medizintest",
            "med_amount": 1,
            "feeding": false,
            "med_type": null,
            "med_delivery": "confidu GmbH",
            "id": "DFDDO0010000042",
            "diagnosis": [
              "verschobene Darmflora"
            ],
            "med_duration_length": null,
            "med_header": null,
            "data": {
              "calculatedListingPrice": {
                "from": {
                  "unitPrice": 14.16,
                  "quantity": 1,
                  "totalPrice": 14.16,
                  "calculatedTaxes": [
                    {
                      "tax": 2.26,
                      "taxRate": 19,
                      "price": 14.16,
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
                  "unitPrice": 14.16,
                  "quantity": 1,
                  "totalPrice": 14.16,
                  "calculatedTaxes": [
                    {
                      "tax": 2.26,
                      "taxRate": 19,
                      "price": 14.16,
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
                "unitPrice": 14.16,
                "quantity": 1,
                "totalPrice": 14.16,
                "calculatedTaxes": [
                  {
                    "tax": 2.26,
                    "taxRate": 19,
                    "price": 14.16,
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
              "manufacturerId": "274629470ad64062a04a84a2e5cd17b0",
              "unitId": null,
              "active": true,
              "displayGroup": "5a5678de19a5d3cb84b537ac59ed11d3",
              "manufacturerNumber": null,
              "ean": null,
              "sales": 0,
              "productNumber": "DFDDO0010000042",
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
                "b25b377b2568469c863baa8479c16314"
              ],
              "optionIds": null,
              "propertyIds": null,
              "name": "Forscher Box - Darmflora für Hunde",
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
                "updatedAt": "2021-08-17T10:04:29.782+00:00",
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
                "productId": "af68bc6efac944d896ee28def5726627",
                "mediaId": "28ddb1be9a2147a69e2e8254eb174ad9",
                "position": 1,
                "media": {
                  "mimeType": "image/jpeg",
                  "fileExtension": "jpg",
                  "fileSize": 91102,
                  "title": null,
                  "metaData": {
                    "width": 567,
                    "height": 567,
                    "type": 2
                  },
                  "uploadedAt": "2021-08-18T07:18:46.268+00:00",
                  "alt": null,
                  "url": "https://demo-shop.tierversicherung.click/staging/media/bb/16/45/1629271126/Forscherbox_Produktvorschau_Quadrat-01.jpg",
                  "fileName": "Forscherbox_Produktvorschau_Quadrat-01",
                  "translations": null,
                  "thumbnails": [
                    {
                      "width": 1920,
                      "height": 1920,
                      "url": "https://demo-shop.tierversicherung.click/staging/thumbnail/bb/16/45/1629271126/Forscherbox_Produktvorschau_Quadrat-01_1920x1920.jpg",
                      "mediaId": "28ddb1be9a2147a69e2e8254eb174ad9",
                      "customFields": null,
                      "_uniqueIdentifier": "4848e3dc254840cea03cf116fbc44551",
                      "versionId": null,
                      "translated": [],
                      "createdAt": "2021-08-18T07:19:06.361+00:00",
                      "updatedAt": null,
                      "extensions": {
                        "foreignKeys": {
                          "apiAlias": "array_struct"
                        }
                      },
                      "id": "4848e3dc254840cea03cf116fbc44551",
                      "apiAlias": "media_thumbnail"
                    },
                    {
                      "width": 800,
                      "height": 800,
                      "url": "https://demo-shop.tierversicherung.click/staging/thumbnail/bb/16/45/1629271126/Forscherbox_Produktvorschau_Quadrat-01_800x800.jpg",
                      "mediaId": "28ddb1be9a2147a69e2e8254eb174ad9",
                      "customFields": null,
                      "_uniqueIdentifier": "4d3df0433e8a44eaaea73e056b16f71a",
                      "versionId": null,
                      "translated": [],
                      "createdAt": "2021-08-18T07:19:06.362+00:00",
                      "updatedAt": null,
                      "extensions": {
                        "foreignKeys": {
                          "apiAlias": "array_struct"
                        }
                      },
                      "id": "4d3df0433e8a44eaaea73e056b16f71a",
                      "apiAlias": "media_thumbnail"
                    },
                    {
                      "width": 400,
                      "height": 400,
                      "url": "https://demo-shop.tierversicherung.click/staging/thumbnail/bb/16/45/1629271126/Forscherbox_Produktvorschau_Quadrat-01_400x400.jpg",
                      "mediaId": "28ddb1be9a2147a69e2e8254eb174ad9",
                      "customFields": null,
                      "_uniqueIdentifier": "8f47fb644d274cfc87a535ad822089ed",
                      "versionId": null,
                      "translated": [],
                      "createdAt": "2021-08-18T07:19:06.361+00:00",
                      "updatedAt": null,
                      "extensions": {
                        "foreignKeys": {
                          "apiAlias": "array_struct"
                        }
                      },
                      "id": "8f47fb644d274cfc87a535ad822089ed",
                      "apiAlias": "media_thumbnail"
                    }
                  ],
                  "hasFile": true,
                  "private": false,
                  "customFields": null,
                  "_uniqueIdentifier": "28ddb1be9a2147a69e2e8254eb174ad9",
                  "versionId": null,
                  "translated": {
                    "alt": null,
                    "title": null,
                    "customFields": []
                  },
                  "createdAt": "2021-08-18T07:18:45.768+00:00",
                  "updatedAt": "2021-08-18T07:19:06.362+00:00",
                  "extensions": {
                    "internal_mapping_storage": {
                      "apiAlias": "array_struct"
                    },
                    "foreignKeys": {
                      "apiAlias": "array_struct"
                    }
                  },
                  "id": "28ddb1be9a2147a69e2e8254eb174ad9",
                  "apiAlias": "media"
                },
                "customFields": null,
                "_uniqueIdentifier": "c0130a3ce5a84acba63b62948c263544",
                "versionId": "0fa91ce3e96a4bc2be4bd9ce752c3425",
                "translated": [],
                "createdAt": "2021-08-18T07:21:10.981+00:00",
                "updatedAt": null,
                "extensions": {
                  "foreignKeys": {
                    "apiAlias": "array_struct"
                  }
                },
                "id": "c0130a3ce5a84acba63b62948c263544",
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
              "coverId": "c0130a3ce5a84acba63b62948c263544",
              "customFields": {
                "product_prescription": false,
                "product_pharmacy": false,
                "product_feeding": false,
                "product_med_category": "Medizintest",
                "product_medication_key": "DFL"
              },
              "productReviews": null,
              "ratingAverage": null,
              "mainCategories": null,
              "seoUrls": null,
              "crossSellings": null,
              "canonicalProductId": null,
              "canonicalProduct": null,
              "_uniqueIdentifier": "af68bc6efac944d896ee28def5726627",
              "versionId": "0fa91ce3e96a4bc2be4bd9ce752c3425",
              "translated": {
                "metaDescription": null,
                "name": "Forscher Box - Darmflora für Hunde",
                "keywords": null,
                "description": null,
                "metaTitle": null,
                "packUnit": null,
                "packUnitPlural": null,
                "customFields": {
                  "product_prescription": false,
                  "product_pharmacy": false,
                  "product_feeding": false,
                  "product_med_category": "Medizintest",
                  "product_medication_key": "DFL"
                },
                "customSearchKeywords": null
              },
              "createdAt": "2021-08-16T20:27:00.004+00:00",
              "updatedAt": "2021-08-18T07:21:10.981+00:00",
              "extensions": {
                "foreignKeys": {
                  "apiAlias": "array_struct"
                }
              },
              "id": "af68bc6efac944d896ee28def5726627",
              "parentVersionId": "0fa91ce3e96a4bc2be4bd9ce752c3425",
              "productManufacturerVersionId": "0fa91ce3e96a4bc2be4bd9ce752c3425",
              "productMediaVersionId": null,
              "apiAlias": "product"
            }
          }
        ],
        "headline": "Was du brauchst",
        "info": null,
        "body": [
          "Wir haben dir Präparate zusammengestellt, die Wuffel beim Gesundungsprozess unterstützen können. Lege deine Auswahl in den Warenkorb."
        ]
      }
    ],
    "eventDate": null,
    "urgency": "hoch",
    "magazinKeys": [
      "MMED0084_DC"
    ],
    "headerHeadlineH1": "Symptom:",
    "textA2": null,
    "backgroundImageLink": "https://firebasestorage.googleapis.com/v0/b/confidu-app.appspot.com/o/evaluations%2Fpattern%2Ftelevet_seamless.svg?alt=media&token=d18e9d04-076c-46b9-b68a-8a647b05a5ed",
    "recipeKeys": [],
    "carecard": [
      {
        "level3Id": "5f0a754d-5d12-4ff1-a344-ced6a36d8744",
        "resultKey": "TEL_NO_DIA_FL_1",
        "level1_valA": "33",
        "level1_valB": null,
        "valA": "33",
        "valB": null,
        "venomKey": "w+weightac_variable_normal",
        "level0_cc_key": "prevention_cc",
        "level1_cc_key": "w+weightac",
        "cc_status": "variable_normal",
        "priority": 9,
        "param": null,
        "downloadPath": null,
        "eventDate": "2021-08-18T12:36:51.923746+02:00",
        "nextDate": null,
        "isTerminated": false,
        "currentDate": "2021-08-18T12:36:52.067758+02:00",
        "eventId": "bf3bab64-7db6-4967-956b-993094230416",
        "findings": [
          {
            "currentDate": "2021-08-18T12:36:52.067758+02:00",
            "docs": [
              "findings/1.pdf"
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
        "level3Id": "d991e88d-1d5b-4581-bed3-dfeafa595569",
        "resultKey": "TEL_NO_DIA_FL_1",
        "level1_valA": null,
        "level1_valB": null,
        "valA": null,
        "valB": null,
        "venomKey": "19812_CC_NO",
        "level0_cc_key": "diseases_cc",
        "level1_cc_key": "healthstatus_cc",
        "cc_status": "sick",
        "priority": 3,
        "param": null,
        "downloadPath": null,
        "eventDate": "2021-08-18T12:36:51.923746+02:00",
        "nextDate": "2021-08-18T10:36:51.941949+00:00",
        "isTerminated": false,
        "currentDate": "2021-08-18T12:36:52.067758+02:00",
        "eventId": "bf3bab64-7db6-4967-956b-993094230416",
        "findings": [
          {
            "currentDate": "2021-08-18T12:36:52.067758+02:00",
            "docs": [
              "findings/1.pdf"
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
        "level3Id": "78155fda-f268-41d4-8887-7d1b347b30e1",
        "resultKey": "TEL_NO_DIA_FL_1",
        "level1_valA": null,
        "level1_valB": null,
        "valA": null,
        "valB": null,
        "venomKey": "19812_CC_NO_NDF",
        "level0_cc_key": "diseases_cc",
        "level1_cc_key": "consultation_cc",
        "cc_status": "available",
        "priority": 3,
        "param": null,
        "downloadPath": null,
        "eventDate": "2021-08-18T12:36:51.923746+02:00",
        "nextDate": "2021-08-18T10:36:51.941949+00:00",
        "isTerminated": false,
        "currentDate": "2021-08-18T12:36:52.067758+02:00",
        "eventId": "bf3bab64-7db6-4967-956b-993094230416",
        "findings": [
          {
            "currentDate": "2021-08-18T12:36:52.067758+02:00",
            "docs": [
              "findings/1.pdf"
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
      }
    ],
    "internal": {
      "diseaseKey": "TEL_NO_DIA_FL_1",
      "eventDate": "2021-08-18T12:36:51.923746+02:00"
    },
    "currentDate": "2021-08-18T12:36:52.067758+02:00",
    "eventId": "bf3bab64-7db6-4967-956b-993094230416",
    "ticketId": null
  }

}
