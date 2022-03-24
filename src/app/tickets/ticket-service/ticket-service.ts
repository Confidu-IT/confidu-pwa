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
    "textA4": null,
    "initial": {
      "type": "par",
      "visibility": true,
      "body": [
        "Bei einem Flohbefall saugen die springenden Parasiten das Blut unserer Haustiere. Flöhe können starken Juckreiz und Blutarmut verursachen und Bandwürmer übertragen. Sie können auch auf den Menschen übergehen."
      ],
      "color": "#DEF6FF",
      "image": "https://firebasestorage.googleapis.com/v0/b/confidu-app.appspot.com/o/resultpage%2Finfo.svg?alt=media&token=0574b61d-0363-42d1-8ec2-0266ab4c972c",
      "header": "Was ist das?"
    },
    "headerHeadlineH1": "Diagnose:",
    "magazinKeys": [
      "MPRE0002_DC"
    ],
    "textA3": {
      "header": "Wie du helfen kannst",
      "color": "#FFF0C9",
      "visibility": true,
      "type": "keys",
      "body": [
        {
          "textblockList": [],
          "textblockHeadline": "Medikation",
          "textblockText": null
        },
        {
          "textblockHeadline": null,
          "textblockList": [],
          "textblockText": "Woofle benötigt ein verschreibungspflichtiges Medikament gegen Flohbefall. Da Flöhe häufig Bandwürmer übertragen, entwurme Woofle zusätzlich."
        },
        {
          "textblockHeadline": null,
          "textblockText": "Behandle auch alle Partnertiere von Woofle mit einem Antiparasitikum, da eine (Wieder-) Ansteckung sehr wahrscheinlich ist. Nutze hierzu gesondert den Diagnose Finder von confidu für jedes Tier. Sind keine Symptome vorhanden, kannst du das benötigte Präparat über Medikamente nachbestellen --> Parasitenprophylaxe erhalten. Und bitte bedenke: Medikamente müssen immer ausdrücklich für die jeweilige Tierart zugelassen sein. Nicht alles, was für Hunde verträglich ist, vertragen auch Katzen.",
          "textblockList": []
        },
        {
          "textblockHeadline": "Diagnostik und Monitoring",
          "textblockList": [],
          "textblockText": null
        },
        {
          "textblockList": [],
          "textblockHeadline": null,
          "textblockText": "Wenn sich die Symptome trotz Maßnahmen verschlimmern oder nach einer Woche keine Besserung eintritt, suche mit Woofle eine Tierarztpraxis oder -klinik auf."
        },
        {
          "textblockList": [],
          "textblockText": null,
          "textblockHeadline": "Management"
        },
        {
          "textblockHeadline": null,
          "textblockList": [],
          "textblockText": "Kämme Woofle regelmäßig (anfänglich am besten täglich) mit einem Flohkamm durch, um tote und neu geschlüpfte Flöhe sofort zu entfernen."
        },
        {
          "textblockList": [],
          "textblockText": "Die meisten Flöhe leben nicht auf dem Tier, sondern in dessen Umfeld. Deshalb ist bei einem Befall auch die Umgebungsbehandlung besonders wichtig.",
          "textblockHeadline": null
        },
        {
          "textblockHeadline": null,
          "textblockList": [],
          "textblockText": "Sauge die Wohnung gründlich und entsorge den Staubsaugerbeutel. Wasche alle Decken von Liegeplätzen und Spielzeuge bei mindestens 60°C. Wende ein Umgebungsspray an, um alle verbleibenden Flohstadien abzutöten. Sauge danach erneut gründlich und entsorge den Beutel."
        },
        {
          "textblockHeadline": null,
          "textblockText": "Um einen Flohbefall zu verhindern, hilft eine regelmäßige Flohprophylaxe. Wie und wie häufig du diese durchführen solltest, findest du in der CareCard unter Ektoparasitenrisiko.",
          "textblockList": []
        }
      ],
      "image": null
    },
    "recipeKeys": [],
    "eventDate": null,
    "urgencyImage": "https://firebasestorage.googleapis.com/v0/b/confidu-app.appspot.com/o/resultpage%2F3_cross.svg?alt=media&token=64c119c4-573e-42bf-886d-915df47f5b3e",
    "slider": null,
    "headerHeadlineH2": "Flohbefall",
    "textA1": {
      "type": "list",
      "header": "Häufige Ursachen",
      "body": [
        "Kontakt mit befallenen Tieren",
        "Einbringen von Floheiern oder -larven mit den Schuhen oder der Kleidung"
      ],
      "image": null,
      "visibility": null,
      "color": null
    },
    "isPdf": true,
    "prescibed": [
      "BVD",
      "DRN"
    ],
    "nextDate": null,
    "image": null,
    "venomList": [
      "1620_D",
      "1620_CC_D_NDF",
      "w+weightac_variable_nores"
    ],
    "therapy": "Self-Care möglich",
    "products": [
      {
        "body": [
          "Wir haben dir die Präparate zusammengestellt, die Woofle benötigt. Für verschreibungspflichtige Medikamente stellen wir dir gegen eine Gebühr ein Rezept aus. Lege deine Auswahl in den Warenkorb."
        ],
        "headline": "Was du brauchst",
        "info": null,
        "list": [
          {
            "ticket_type": [],
            "maxWeight": 100,
            "product_pdf_dokument": "",
            "id": "MEDDC000000020",
            "carecard": [
              {
                "key": "MEDDC000000020",
                "l0_cc_key": "diseases_cc",
                "Level2_cc_status": "filled",
                "level1_cc_key": "medication_cc"
              }
            ],
            "med_package_ges": "1 Stück",
            "med_duration_pd": null,
            "med_header": null,
            "med_image_link": null,
            "indication": {
              "body": {
                "indicationTeaser": null,
                "indicationThird": null,
                "indicationDeclaration": null,
                "indicationOther": null,
                "indicactionCaution": null,
                "indicationFirst": {
                  "body": null,
                  "header": [
                    "Um verschreibungspflichtige Medikamente für die Therapie deines Haustieres erhalten zu können, benötigst du ein Rezept. Deine Angaben und die benötigte Dosierung werden von unseren Tierärzt:innen vor der Rezepterstellung genau geprüft, sodass eine Gebühr hierfür entsteht.",
                    "Das Rezept bekommst du anschließend auf dem Postweg in zwei Ausfertigungen. Lege diese einer niedergelassenen Apotheke vor. Sie ist verpflichtet, dir die benötigten Präparate zur Verfügung zu stellen. Um längere Lieferzeiten zu vermeiden, empfehlen wir dir eine Apotheke zu wählen, die Tierarzneimittel wie Floh- und Zeckenpräparate anbietet. Nach dem Kauf bekommst du ein Rezept abgestempelt zurück, das andere behält die Apotheke.",
                    "Wenn du die Medikamente erhalten hast, kannst du sie manuell in der CareCard bei den Tierarztbesuchen erfassen. Wenn du möchtest, wird auch eine Erinnerung im Planer eintragen."
                  ]
                },
                "indicationSecond": null,
                "indicationProduct": null
              },
              "header": "Hinweis"
            },
            "key": "PRESCR",
            "med_unit": null,
            "med_category": "Service",
            "med_duration_length": null,
            "swKey": "MEDDC000000020",
            "minWeight": 0,
            "med_delivery": "confidu Vets ApS",
            "med_frequency": null,
            "pharmacy": false,
            "durationEffect": 0,
            "med_name": "Rezept inkl. Rezeptgebühr",
            "categoryKeys": [
              "equip"
            ],
            "med_type": null,
            "diagnosis": null,
            "Wiederholung_Freq": null,
            "prescription": true,
            "feeding": false,
            "med_amount": 1,
            "med_amountdose": null,
            "med_doses": null,
            "medication": "Rezept inkl. Rezeptgebühr",
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
              "sales": 33,
              "productNumber": "MEDDC000000020",
              "stock": 999965,
              "availableStock": 999964,
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
              "productReviews": [],
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
              "apiAlias": "product",
              "ratingLength": null
            }
          }
        ]
      },
      {
        "headline": "Was zusätzlich hilft",
        "body": [
          "Hier findest du weitere Produkte, die helfen, die Flöhe loszuwerden."
        ],
        "list": [
          {
            "product_pdf_dokument": "https://firebasestorage.googleapis.com/v0/b/confidu-app.appspot.com/o/shop%2Fpackage_insert%2Ff_g%2Fflohkamm_dog_cat_product_information_de.pdf?alt=media&token=4752d4c4-a2e6-49cc-9530-96a9ba298292",
            "maxWeight": 100,
            "pharmacy": false,
            "swKey": "TXKDC0010000140",
            "indication": {
              "header": "Anwendungsgebiet",
              "body": {
                "indicationDeclaration": "Der Kamm dient zur Diagnose von Flöhen und Läusen.",
                "indicactionCaution": null,
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
                "indicationProduct": "Engzahniger Kamm zum Entfernen von Parasiten",
                "indicationThird": null,
                "indicationSecond": null,
                "indicationTeaser": "Flohkamm",
                "indicationOther": null
              }
            },
            "diagnosis": [
              "Fellpflege",
              "Flohbefall"
            ],
            "minWeight": 0,
            "med_name": "Trixie Kleintier Floh- und Staubkamm",
            "key": "FLO",
            "med_unit": null,
            "categoryKeys": [
              "furprod"
            ],
            "med_image_link": null,
            "feeding": false,
            "med_frequency": null,
            "med_amountdose": null,
            "med_duration_length": null,
            "med_duration_pd": null,
            "durationEffect": 0,
            "med_category": "Haut- und Fellpflegeprodukt",
            "med_doses": null,
            "med_delivery": "confidu GmbH",
            "med_package_ges": "1 Flohkamm",
            "ticket_type": [
              "furcare"
            ],
            "prescription": false,
            "carecard": [
              {
                "l0_cc_key": "diseases_cc",
                "key": "TXKDC0010000140",
                "Level2_cc_status": "filled",
                "level1_cc_key": "medication_cc"
              }
            ],
            "med_header": null,
            "med_type": null,
            "Wiederholung_Freq": null,
            "id": "TXKDC0010000140",
            "med_amount": 1,
            "medication": "Flohkamm",
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
              "sales": 4,
              "productNumber": "TXKDC0010000140",
              "stock": 96,
              "availableStock": 96,
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
              "productReviews": [],
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
              "apiAlias": "product",
              "ratingLength": null
            }
          },
          {
            "prescription": false,
            "med_type": "Gas",
            "med_duration_length": null,
            "categoryKeys": [
              "antipar"
            ],
            "product_pdf_dokument": "https://firebasestorage.googleapis.com/v0/b/confidu-app.appspot.com/o/shop%2Fpackage_insert%2Ff_g%2Ffogger_dog_cat_product_information_de%20(1).pdf?alt=media&token=f91a5929-c941-4028-8b38-04efd0049fb9",
            "med_amountdose": null,
            "med_image_link": null,
            "indication": {
              "header": "Anwendungsgebiet",
              "body": {
                "indicationOther": "Mit 6 Monaten Langzeitwirkung.",
                "indicactionCaution": null,
                "indicationDeclaration": "Der INDOREX® DEFENCE FOGGER enthält die Wirkstoffe Permethrin und Pyrethrum sowie den Insektenwachstumshemmer Pyriproxifen. Permethrin und Pyrethrum töten schnell und zuverlässig alle Flöhe ab, während Pyriproxifen die Entwicklung von Floheiern und -larven biologisch unterbricht. Somit werden alle Stadien der Flohentwicklung erfasst und bis zu 6 Monate wirksam bekämpft. Die Wirkstoffe sind außerdem wirksam gegen Zecken, Milben, Schaben und anderes Ungeziefer.",
                "indicationFirst": {
                  "body": null,
                  "header": [
                    "Der Vernebler wird angewendet zur Parasitenbekämpfung in Wohnung und Haus."
                  ]
                },
                "indicationThird": null,
                "indicationTeaser": "INDOREX Defence Mini-Fogger Aerosol-Vernebler",
                "indicationProduct": "Vernebler zur Parasitenbekämpfung",
                "indicationSecond": null
              }
            },
            "diagnosis": [
              "Flohbefall - Umgebungsbehandlung"
            ],
            "med_doses": "Vernebler",
            "pharmacy": false,
            "minWeight": 0,
            "med_header": null,
            "med_delivery": "confidu GmbH",
            "carecard": [
              {
                "key": "PRFDC2010000084",
                "l0_cc_key": "diseases_cc",
                "level1_cc_key": "medication_cc",
                "Level2_cc_status": "filled"
              }
            ],
            "med_package_ges": "75 ml Vernebler",
            "feeding": false,
            "maxWeight": 100,
            "medication": "Fogger Flohbekämpfung",
            "Wiederholung_Freq": null,
            "med_amount": 1,
            "med_duration_pd": null,
            "id": "PRFDC2010000084",
            "med_unit": "ml",
            "swKey": "PRFDC2010000084",
            "key": "FOG",
            "ticket_type": [
              "med_take"
            ],
            "med_category": "Antiparasitikum",
            "med_name": "INDOREX Mini-Fogger Aerosol-Vernebler",
            "med_frequency": null,
            "durationEffect": 0,
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
              "sales": 3,
              "productNumber": "PRFDC2010000084",
              "stock": 97,
              "availableStock": 97,
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
              "productReviews": [],
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
              "apiAlias": "product",
              "ratingLength": null
            }
          },
          {
            "med_frequency": null,
            "indication": {
              "body": {
                "indicationProduct": "Vernebler zur Parasitenbekämpfung",
                "indicactionCaution": null,
                "indicationTeaser": "INDOREX Defence Mini-Fogger Aerosol-Vernebler",
                "indicationSecond": null,
                "indicationFirst": {
                  "body": null,
                  "header": [
                    "Der Vernebler wird angewendet zur Parasitenbekämpfung in Wohnung und Haus."
                  ]
                },
                "indicationDeclaration": "Der INDOREX® DEFENCE FOGGER enthält die Wirkstoffe Permethrin und Pyrethrum sowie den Insektenwachstumshemmer Pyriproxifen. Permethrin und Pyrethrum töten schnell und zuverlässig alle Flöhe ab, während Pyriproxifen die Entwicklung von Floheiern und -larven biologisch unterbricht. Somit werden alle Stadien der Flohentwicklung erfasst und bis zu 6 Monate wirksam bekämpft. Die Wirkstoffe sind außerdem wirksam gegen Zecken, Milben, Schaben und anderes Ungeziefer.",
                "indicationThird": null,
                "indicationOther": "Mit 6 Monaten Langzeitwirkung."
              },
              "header": "Anwendungsgebiet"
            },
            "med_duration_pd": null,
            "med_image_link": null,
            "durationEffect": 0,
            "med_amount": 1,
            "med_header": null,
            "med_category": "Antiparasitikum",
            "med_name": "INDOREX Fogger Aerosol-Vernebler",
            "categoryKeys": [
              "antipar"
            ],
            "med_unit": "ml",
            "prescription": false,
            "diagnosis": [
              "Flohbefall - Umgebungsbehandlung"
            ],
            "med_delivery": "confidu GmbH",
            "carecard": [
              {
                "Level2_cc_status": "filled",
                "l0_cc_key": "diseases_cc",
                "level1_cc_key": "medication_cc",
                "key": "PRFDC2020000084"
              }
            ],
            "medication": "Fogger Flohbekämpfung",
            "feeding": false,
            "Wiederholung_Freq": null,
            "maxWeight": 100,
            "minWeight": 0,
            "med_package_ges": "150 ml Vernebler",
            "id": "PRFDC2020000084",
            "swKey": "PRFDC2020000084",
            "med_doses": "Vernebler",
            "product_pdf_dokument": "https://firebasestorage.googleapis.com/v0/b/confidu-app.appspot.com/o/shop%2Fpackage_insert%2Ff_g%2Ffogger_dog_cat_product_information_de%20(1).pdf?alt=media&token=f91a5929-c941-4028-8b38-04efd0049fb9",
            "pharmacy": false,
            "med_type": "Gas",
            "ticket_type": [
              "med_take"
            ],
            "med_duration_length": null,
            "key": "FOG2",
            "med_amountdose": null,
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
              "productReviews": [],
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
              "apiAlias": "product",
              "ratingLength": null
            }
          }
        ],
        "info": null
      }
    ],
    "popup": {
      "buttonConfirm": {
        "type": "confirm",
        "label": "SPEICHERN"
      },
      "buttonCancel": {
        "type": "cancel",
        "label": "VERWERFEN"
      },
      "popupOptionText": "Klicke auf „Speichern“ und aktiviere deinen Tiergesundheitsassistenten."
    },
    "textA5": {
      "body": [
        {
          "textblockHeadline": null,
          "textblockList": [],
          "textblockText": "Speichere die tierärztliche Beratung mit Diagnose beim Verlassen der Seite ab und die CareCard von Woofle wird an den entsprechenden Stellen aktualisiert."
        },
        {
          "textblockText": "So können wir dich mit zusätzlichen Informationen und Hilfestellungen unterstützen. Schau auf der Startseite nach, dort findest du hilfreiche Aufgaben im Planer sowie Magazinartikel oder Rezepte passend zum Thema.",
          "textblockList": [],
          "textblockHeadline": null
        }
      ],
      "color": "#DEF6FF",
      "header": "Deinen Tiergesundheitsassistent aktivieren",
      "type": "keys",
      "visibility": true,
      "image": "https://firebasestorage.googleapis.com/v0/b/confidu-app.appspot.com/o/resultpage%2Fwhats_next.svg?alt=media&token=28093cd8-895c-41b4-81c4-1e079255bd64"
    },
    "iconImageLink": "https://firebasestorage.googleapis.com/v0/b/confidu-app.appspot.com/o/evaluations%2Fevaluation_plus_neg%2Fevaluation_diseases_negative.svg?alt=media&token=8e62362d-af80-4296-9ed6-89f1e88198f1",
    "textA2": null,
    "findings": {
      "visibility": null,
      "body": {
        "text": null,
        "legend": null,
        "answers": [
          {
            "name": "FLO_Q1",
            "values": {
              "answer": {
                "minSpecifics": 0,
                "ccEntry": null,
                "venomKey": null,
                "answerLongtext": [
                  "ja"
                ],
                "value": "FLO_Q1_Y",
                "imageLinkAnswer": null,
                "subject": null,
                "answerUnit": null,
                "imageLinkDetailAnswer": null,
                "answerValue": null
              }
            },
            "questionText": "Sind Flöhe oder Flohkot im Fell von Woofle zu sehen? ",
            "questionType": "R"
          },
          {
            "name": "FLO_Q2",
            "values": {
              "answer": {
                "subject": null,
                "minSpecifics": 0,
                "answerValue": null,
                "imageLinkAnswer": null,
                "value": "FLO_Q2_Y",
                "answerUnit": null,
                "ccEntry": null,
                "imageLinkDetailAnswer": null,
                "answerLongtext": [
                  "ja"
                ],
                "venomKey": null
              }
            },
            "questionText": "Zeigt Woofle starken Juckreiz und punktförmige Einstichstellen sowie eventuell Hautrötungen?",
            "questionType": "R"
          },
          {
            "name": "SHA_Q19",
            "values": {
              "answer": {
                "minSpecifics": 0,
                "imageLinkDetailAnswer": null,
                "answerValue": 33,
                "answerUnit": "kg",
                "ccEntry": "W",
                "answerLongtext": null,
                "venomKey": null,
                "subject": null,
                "imageLinkAnswer": null,
                "value": "*pet_weight*"
              }
            },
            "questionText": "Gib das aktuelle Gewicht von Woofle an.",
            "questionType": "Z"
          },
          {
            "name": "FLO_Q4",
            "values": {
              "answer": {
                "answerUnit": null,
                "imageLinkAnswer": null,
                "answerLongtext": [
                  "nein"
                ],
                "value": "FLO_Q4_N",
                "venomKey": null,
                "answerValue": null,
                "imageLinkDetailAnswer": null,
                "subject": null,
                "ccEntry": null,
                "minSpecifics": 0
              }
            },
            "questionText": "Leidet Woofle unter Epilepsie?",
            "questionType": "R"
          },
          {
            "name": "AJ_Q7",
            "values": {
              "answer": {
                "minSpecifics": 0,
                "venomKey": null,
                "ccEntry": null,
                "answerValue": null,
                "answerUnit": null,
                "imageLinkAnswer": null,
                "imageLinkDetailAnswer": null,
                "answerLongtext": [
                  "nein"
                ],
                "subject": null,
                "value": "AJ_Q7_N"
              }
            },
            "questionText": "Wurde Woofle vor kurzem medikamentös gegen Endoparasiten behandelt?",
            "questionType": "R"
          },
          {
            "name": "AJ_Q8",
            "values": {
              "answer": {
                "answerLongtext": [
                  "nein"
                ],
                "answerUnit": null,
                "answerValue": null,
                "imageLinkDetailAnswer": null,
                "value": "AJ_Q8_N",
                "ccEntry": null,
                "subject": null,
                "venomKey": null,
                "minSpecifics": 0,
                "imageLinkAnswer": null
              }
            },
            "questionText": "Liegt bei Woofle eine Unverträglichkeit oder Allergie gegen bestimmte Medikamente gegen Endoparasiten vor?",
            "questionType": "R"
          },
          {
            "name": "AJ_Q9",
            "values": {
              "answer": {
                "answerValue": null,
                "subject": null,
                "answerUnit": null,
                "ccEntry": null,
                "venomKey": null,
                "minSpecifics": 0,
                "imageLinkDetailAnswer": null,
                "imageLinkAnswer": null,
                "value": "AJ_Q9_N",
                "answerLongtext": [
                  "nein"
                ]
              }
            },
            "questionText": "Hat Woofle kürzlich Medikamente gegen Ektoparasiten verabreicht oder aufgetropft bekommen?",
            "questionType": "R"
          },
          {
            "name": "AJ_Q10",
            "values": {
              "answer": {
                "answerValue": null,
                "imageLinkAnswer": null,
                "answerLongtext": [
                  "nein"
                ],
                "value": "AJ_Q10_N",
                "subject": null,
                "venomKey": null,
                "ccEntry": null,
                "imageLinkDetailAnswer": null,
                "answerUnit": null,
                "minSpecifics": 0
              }
            },
            "questionText": "Verträgt Woofle manche Ektoparasitenmittel nicht?",
            "questionType": "R"
          },
          {
            "name": "DIS_Q1",
            "values": {
              "answer": {
                "imageLinkDetailAnswer": null,
                "subject": null,
                "venomKey": null,
                "ccEntry": null,
                "answerUnit": null,
                "minSpecifics": 0,
                "value": "DIS_Q1_N",
                "answerValue": null,
                "imageLinkAnswer": null,
                "answerLongtext": [
                  "nein"
                ]
              }
            },
            "questionText": "Hat Woofle weitere gesundheitliche Probleme oder Symptome, die nicht abgefragt wurden?",
            "questionType": "R"
          }
        ],
        "param": null
      },
      "header": "Deine Angaben"
    },
    "urgency": "hoch",
    "ticketKeys": [
      "televetcheck"
    ],
    "actions": [
      {
        "label": "VIDEOANRUF VEREINBAREN",
        "key": null,
        "header": "Du möchtest persönlich mit einem/einer Tierärzt:in sprechen?",
        "event": null,
        "visibility": true,
        "link": "consultation",
        "body": null
      }
    ],
    "fupKeys": [],
    "backgroundImageLink": "https://firebasestorage.googleapis.com/v0/b/confidu-app.appspot.com/o/evaluations%2Fpattern%2Ftelevet_seamless.svg?alt=media&token=d18e9d04-076c-46b9-b68a-8a647b05a5ed",
    "carecard": [
      {
        "level3Id": "3ecb5005-ff83-4409-9c5d-17e441f4eab2",
        "resultKey": "TEL_HAI_FLEAI_HIG_SEL_1",
        "level1_valA": "33",
        "level1_valB": null,
        "valA": "33",
        "valB": null,
        "venomKey": "w+weightac_variable_nores",
        "level0_cc_key": "prevention_cc",
        "level1_cc_key": "w+weightac",
        "cc_status": "variable_nores",
        "priority": 3,
        "param": {
          "weightId": null
        },
        "downloadPath": null,
        "eventDate": "2022-03-23T10:22:11.050139+01:00",
        "nextDate": null,
        "isTerminated": false,
        "currentDate": "2022-03-23T10:22:11.606868+01:00",
        "eventId": "81bd4078-8f1a-4df2-a863-97aad5509d6e",
        "findings": [
          {
            "currentDate": "2022-03-23T10:22:11.606868+01:00",
            "docs": [
              "findings/81bd4078-8f1a-4df2-a863-97aad5509d6e.pdf"
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
        "level3Id": "dcf9b4b5-2856-4836-8b06-6387c2ef72a3_0_ticket",
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
        "eventDate": "2022-03-23T10:22:11.050139+01:00",
        "nextDate": "2022-03-23T10:22:11.050227+01:00",
        "isTerminated": false,
        "currentDate": "2022-03-23T10:22:11.606868+01:00",
        "eventId": "81bd4078-8f1a-4df2-a863-97aad5509d6e",
        "findings": [
          {
            "currentDate": "2022-03-23T10:22:11.606868+01:00",
            "docs": [
              "findings/81bd4078-8f1a-4df2-a863-97aad5509d6e.pdf"
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
        "level3Id": "9da8c307-aaa6-4239-8409-eef40a20f8b0_1_ticket",
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
        "eventDate": "2022-03-23T10:22:11.050139+01:00",
        "nextDate": "2022-03-23T10:22:11.050227+01:00",
        "isTerminated": false,
        "currentDate": "2022-03-23T10:22:11.606868+01:00",
        "eventId": "81bd4078-8f1a-4df2-a863-97aad5509d6e",
        "findings": [
          {
            "currentDate": "2022-03-23T10:22:11.606868+01:00",
            "docs": [
              "findings/81bd4078-8f1a-4df2-a863-97aad5509d6e.pdf"
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
      "eventDate": "2022-03-23T10:22:11.050139+01:00"
    },
    "currentDate": "2022-03-23T10:22:11.606868+01:00",
    "eventId": "81bd4078-8f1a-4df2-a863-97aad5509d6e",
    "ticketId": null,
    "ticketCoins": null
  }


}
