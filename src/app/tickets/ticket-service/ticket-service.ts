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

  public fooSave(
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

  public blah =  {
    "urgency": "hoch",
    "therapy": "Self-Care möglich",
    "popup": {
      "buttonCancel": null,
      "popupOptionText": "Klicke auf verstanden. Die Diagnose wird automatisch in der CareCard abgelegt. Dort kannst du sie jederzeit wieder einsehen.",
      "buttonConfirm": {
        "type": "confirm",
        "label": "VERSTANDEN"
      }
    },
    "nextDate": null,
    "textA2": null,
    "venomList": [
      "A0027_CC_D",
      "4556_CC_D",
      "566_CC",
      "899_CC_D",
      "A0027_CC_D_NDF",
      "4556_CC_D_NDF",
      "566_CC_NDF",
      "899_CC_D_NDF",
      "gut_par_D"
    ],
    "magazinKeys": [
      "MPRE0001_DC"
    ],
    "recipeKeys": [
      "REZ14",
      "REZ15",
      "REZ16",
      "REZ31"
    ],
    "fupKeys": [],
    "headerHeadlineH2": "Kotanalyse auffällig",
    "ticketKeys": [],
    "actions": [
      {
        "visibility": true,
        "header": "Du möchtest persönlich mit einem/einer Tierärzt:in sprechen?",
        "body": "Wähle bequem einen Termin aus.",
        "event": null,
        "link": "consultation",
        "label": "VIDEOANRUF VEREINBAREN",
        "key": null
      }
    ],
    "textA4": null,
    "eventDate": null,
    "initial": {
      "body": [
        "Parzival leidet an einem Rundwurm-, Bandwurm-, Kokzidien und Giardienbefall. Es handelt sich um eine Besiedlung des Darms mit Würmern und einzelligen Parasiten. Alle Erreger können Verdauungsstörungen hervorrufen.",
        "Die ausgeschiedenen Giardien sind in der Umwelt sehr stabil, bleiben lange ansteckungsfähig und können auch auf den Menschen übergehen."
      ],
      "header": "Was heißt das?",
      "visibility": true,
      "type": "par"
    },
    "textA1": {
      "header": "Häufige Ursachen",
      "body": [
        "Ansteckung bei infizierten Tieren",
        "ungenügende Reinigung und Desinfektion",
        "Flohbefall",
        "Aufnahme von Beutetieren wie Nager",
        "Fressen von rohen innereien oder rohem Frischfleisch"
      ],
      "visibility": null,
      "type": "list"
    },
    "slider": null,
    "textA5": null,
    "textA3": {
      "header": "Wie du helfen kannst",
      "body": [
        {
          "textblockText": null,
          "textblockHeadline": "Medikation",
          "textblockList": []
        },
        {
          "textblockText": "Ein Teil des Befundes ist medizinisch eindeutig, sodass die Behandlung von Parzival beginnen kann.",
          "textblockList": [],
          "textblockHeadline": null
        },
        {
          "textblockText": "Zur Behandlung des Wurmbefalls benötigt Parzival ein Antiparasitikum, das du einmalig verabreichst.",
          "textblockHeadline": null,
          "textblockList": []
        },
        {
          "textblockText": "Zur Behandlung des Giardienbefalls benötigt Parzival ein Antiparasitikum, das du 1x täglich über 5 Tage verabreichst. Zur besseren Akzeptanz kannst du das Medikament ggf. mit einer kleinen Menge Futter vermischen.",
          "textblockHeadline": null,
          "textblockList": []
        },
        {
          "textblockList": [],
          "textblockHeadline": "Fütterung",
          "textblockText": null
        },
        {
          "textblockText": "Bei akutem Durchfall helfen Parzival zusätzlich elektrolythaltige Flüssigkeit und ein durchfallstillendes Mittel. Verfüttere zudem 5 Tage lang mehrmals am Tag Schonkost in kleinen Portionen. Was diese beinhalten muss, findest du in der CareCard unter Spezielle Diät.",
          "textblockHeadline": null,
          "textblockList": []
        },
        {
          "textblockText": null,
          "textblockList": [],
          "textblockHeadline": "Management"
        },
        {
          "textblockText": "Giardien sind sehr hartnäckig und schwer loszuwerden, da sie lange in der Umwelt überleben können. Deswegen musst du weitere Maßnahmen durchführen, um eine Wiederansteckung zu vermeiden.",
          "textblockList": [],
          "textblockHeadline": null
        },
        {
          "textblockList": [
            "säubere täglich Futter- und Wassernäpfe sowie die Katzentoilette mit kochendem Wasser",
            "reinige mit Kot in Kontakt gekommene feste Böden, Spielzeuge usw. gründlich, zum Beispiel mit Dampfstrahler, Staubsauger, kochendem Wasser oder starken Desinfektionsmitteln",
            "anschließendes Trocknenlassen ist wichtig",
            "wasche Parzival mit einem speziellen Shampoo: mach hierzu das Fell nass, massiere das Shampoo richtig ein, lass es 10 Minuten einwirken und spüle es wieder gründlich aus",
            "alternativ kannst du einen Schaum benutzen, den man nicht ausspülen muss",
            "kürze langes Fell am Po"
          ],
          "textblockText": null,
          "textblockHeadline": null
        },
        {
          "textblockHeadline": "Diagnostik und Monitoring",
          "textblockText": null,
          "textblockList": []
        },
        {
          "textblockHeadline": null,
          "textblockList": [],
          "textblockText": "Führe eine Therapiekontrolle 5 - 7 Tage nach Behandlungsende durch. Sind weiterhin Giardien nachweisbar und Durchfall vorhanden, sollte erneut mit Medikamenten behandelt werden"
        },
        {
          "textblockList": [],
          "textblockText": "Zur Abklärung des Kokzidienbefalls solltest du in den nächsten 48 Stunden eine Tierarztpraxis oder -klinik aufsuchen.",
          "textblockHeadline": null
        }
      ],
      "type": "keys",
      "visibility": true
    },
    "headerHeadlineH1": "Achtung!",
    "backgroundImageLink": "https://firebasestorage.googleapis.com/v0/b/confidu-app.appspot.com/o/evaluations%2Fpattern%2Ftelevet_seamless.svg?alt=media&token=d18e9d04-076c-46b9-b68a-8a647b05a5ed",
    "isPdf": true,
    "products": [
      {
        "list": [
          {
            "med_delivery": "XY Apo",
            "med_unit": "Tabletten",
            "med_package_ges": "2 Tabletten",
            "med_amount": 1,
            "med_type": "Tablette",
            "feeding": false,
            "med_duration_pd": 1,
            "product_pdf_dokument": "https://firebasestorage.googleapis.com/v0/b/confidu-app.appspot.com/o/shop%2Fpackage_insert%2Fm_%2Fmilprazon_dog_pil_de.pdf?alt=media&token=e927b816-c517-4695-afd3-c33d868b3cd0",
            "ticket_type": [
              "med_feed",
              "med_take"
            ],
            "med_category": "Antiparasitikum",
            "diagnosis": [
              "Entwurmung nach Risikoprofil, Band- und Spulwurmbefall"
            ],
            "med_amountdose": 2,
            "key": "MLP",
            "pharmacy": true,
            "maxWeight": 50,
            "med_image_link": "https://firebasestorage.googleapis.com/v0/b/confidu-app.appspot.com/o/carecard%2Fmedication%2Fpill.svg?alt=media&token=696d9c11-de10-4ab8-a649-a22d49dfdd9c",
            "indication": {
              "header": "Anwendungsgebiet",
              "body": {
                "indicationDeclaration": null,
                "indicationFirst": {
                  "body": [
                    "Mischinfektionen mit adulten Cestoden (Dipylidium caninum, Taenia spp., Echinococcus spp., Mesocestoides spp.) und Nematoden (Ancylostoma caninum,Toxocara canis, Toxascaris leonina, Trichuris vulpis, Thelazia callipaeda (siehe spezifische Anleitung zur Behandlung unter Abschnitt \"Dosierung und Art der Anwendung\"))"
                  ],
                  "header": "Das Tierarzneimittel wird angewendet bei Hunden zur Behandlung von"
                },
                "indicationTeaser": null,
                "indicationOther": "Das Tierarzneimittel kann außerdem zur Prävention der Herzwurmkrankheit (Dirofilaria immitis) angewendet werden, wenn eine gleichzeitige Behandlung gegen Cestoden angezeigt ist.",
                "indicationThird": null,
                "indicactionCaution": null,
                "indicationSecond": {
                  "header": "Das Tierarzneimittel wird angewendet bei Hunden zur Verminderung der Befallsintensität mit",
                  "body": [
                    "Crenosoma vulpis und Angiostrongylus vasorum (unreife adulte (L5) und adulten Parasitenstadien",
                    "siehe spezifische Anleitung zur Behandlung und Prävention der Erkrankung unter Abschnitt \"Dosierung und Art der Anwendung\")"
                  ]
                },
                "indicationProduct": null
              }
            },
            "med_duration_length": 1,
            "Wiederholung_Freq": null,
            "med_frequency": null,
            "minWeight": 25.1,
            "med_name": "Milprazon 12,5 mg / 125 mg",
            "prescription": true,
            "med_doses": "Tabletten",
            "med_header": "rezeptpflichtig",
            "id": "MPRDO1210000122",
            "medication": "Milprazon",
            "data": {
              "calculatedListingPrice": {
                "from": {
                  "unitPrice": 13.7,
                  "quantity": 1,
                  "totalPrice": 13.7,
                  "calculatedTaxes": [
                    {
                      "tax": 2.19,
                      "taxRate": 19,
                      "price": 13.7,
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
                  "unitPrice": 13.7,
                  "quantity": 1,
                  "totalPrice": 13.7,
                  "calculatedTaxes": [
                    {
                      "tax": 2.19,
                      "taxRate": 19,
                      "price": 13.7,
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
                "unitPrice": 13.7,
                "quantity": 1,
                "totalPrice": 13.7,
                "calculatedTaxes": [
                  {
                    "tax": 2.19,
                    "taxRate": 19,
                    "price": 13.7,
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
              "displayGroup": "7d7e341eb7f04a94a38e245e48e37cdc",
              "manufacturerNumber": null,
              "ean": null,
              "sales": 0,
              "productNumber": "MPRDO1210000122",
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
                "b4662c9d034a468ba4f77bd81751d761"
              ],
              "optionIds": null,
              "propertyIds": null,
              "name": "Milprazon 12,5 mg / 125 mg",
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
                "productId": "604be76e9876472da2467f4e075a2a7d",
                "mediaId": "e04210be4e9d4f54bf6b7eb0b64a2fb2",
                "position": 1,
                "media": {
                  "mimeType": "image/jpeg",
                  "fileExtension": "jpg",
                  "fileSize": 121472,
                  "title": null,
                  "metaData": {
                    "width": 1400,
                    "height": 1400,
                    "type": 2
                  },
                  "uploadedAt": "2021-08-17T11:50:06.268+00:00",
                  "alt": null,
                  "url": "https://demo-shop.tierversicherung.click/staging/media/01/e9/c0/1629201006/milprazon.jpg",
                  "fileName": "milprazon",
                  "translations": null,
                  "thumbnails": [
                    {
                      "width": 400,
                      "height": 400,
                      "url": "https://demo-shop.tierversicherung.click/staging/thumbnail/01/e9/c0/1629201006/milprazon_400x400.jpg",
                      "mediaId": "e04210be4e9d4f54bf6b7eb0b64a2fb2",
                      "customFields": null,
                      "_uniqueIdentifier": "0b323ae7e77047e5a1092986d979dc08",
                      "versionId": null,
                      "translated": [],
                      "createdAt": "2021-08-17T11:50:07.296+00:00",
                      "updatedAt": null,
                      "extensions": {
                        "foreignKeys": {
                          "apiAlias": "array_struct"
                        }
                      },
                      "id": "0b323ae7e77047e5a1092986d979dc08",
                      "apiAlias": "media_thumbnail"
                    },
                    {
                      "width": 800,
                      "height": 800,
                      "url": "https://demo-shop.tierversicherung.click/staging/thumbnail/01/e9/c0/1629201006/milprazon_800x800.jpg",
                      "mediaId": "e04210be4e9d4f54bf6b7eb0b64a2fb2",
                      "customFields": null,
                      "_uniqueIdentifier": "7f45dc7980ab4f92b2778f81de3ba43c",
                      "versionId": null,
                      "translated": [],
                      "createdAt": "2021-08-17T11:50:07.296+00:00",
                      "updatedAt": null,
                      "extensions": {
                        "foreignKeys": {
                          "apiAlias": "array_struct"
                        }
                      },
                      "id": "7f45dc7980ab4f92b2778f81de3ba43c",
                      "apiAlias": "media_thumbnail"
                    },
                    {
                      "width": 1920,
                      "height": 1920,
                      "url": "https://demo-shop.tierversicherung.click/staging/thumbnail/01/e9/c0/1629201006/milprazon_1920x1920.jpg",
                      "mediaId": "e04210be4e9d4f54bf6b7eb0b64a2fb2",
                      "customFields": null,
                      "_uniqueIdentifier": "dce0ca1a1d134dfb8e4e8d261a4286c4",
                      "versionId": null,
                      "translated": [],
                      "createdAt": "2021-08-17T11:50:07.295+00:00",
                      "updatedAt": null,
                      "extensions": {
                        "foreignKeys": {
                          "apiAlias": "array_struct"
                        }
                      },
                      "id": "dce0ca1a1d134dfb8e4e8d261a4286c4",
                      "apiAlias": "media_thumbnail"
                    }
                  ],
                  "hasFile": true,
                  "private": false,
                  "customFields": null,
                  "_uniqueIdentifier": "e04210be4e9d4f54bf6b7eb0b64a2fb2",
                  "versionId": null,
                  "translated": {
                    "alt": null,
                    "title": null,
                    "customFields": []
                  },
                  "createdAt": "2021-08-17T11:49:49.401+00:00",
                  "updatedAt": "2021-08-17T11:50:07.296+00:00",
                  "extensions": {
                    "internal_mapping_storage": {
                      "apiAlias": "array_struct"
                    },
                    "foreignKeys": {
                      "apiAlias": "array_struct"
                    }
                  },
                  "id": "e04210be4e9d4f54bf6b7eb0b64a2fb2",
                  "apiAlias": "media"
                },
                "customFields": null,
                "_uniqueIdentifier": "b524efda03114f6b919768979fc19432",
                "versionId": "0fa91ce3e96a4bc2be4bd9ce752c3425",
                "translated": [],
                "createdAt": "2021-08-17T13:21:33.872+00:00",
                "updatedAt": null,
                "extensions": {
                  "foreignKeys": {
                    "apiAlias": "array_struct"
                  }
                },
                "id": "b524efda03114f6b919768979fc19432",
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
              "coverId": "b524efda03114f6b919768979fc19432",
              "customFields": {
                "product_prescription": true,
                "product_pharmacy": true,
                "product_feeding": false,
                "product_ticket_type": "med_feed;med_take",
                "product_med_category": "Antiparasitikum",
                "product_medication_key": "MLP"
              },
              "productReviews": null,
              "ratingAverage": null,
              "mainCategories": null,
              "seoUrls": null,
              "crossSellings": null,
              "canonicalProductId": null,
              "canonicalProduct": null,
              "_uniqueIdentifier": "604be76e9876472da2467f4e075a2a7d",
              "versionId": "0fa91ce3e96a4bc2be4bd9ce752c3425",
              "translated": {
                "metaDescription": null,
                "name": "Milprazon 12,5 mg / 125 mg",
                "keywords": null,
                "description": null,
                "metaTitle": null,
                "packUnit": null,
                "packUnitPlural": null,
                "customFields": {
                  "product_prescription": true,
                  "product_pharmacy": true,
                  "product_feeding": false,
                  "product_ticket_type": "med_feed;med_take",
                  "product_med_category": "Antiparasitikum",
                  "product_medication_key": "MLP"
                },
                "customSearchKeywords": null
              },
              "createdAt": "2021-08-16T20:27:58.636+00:00",
              "updatedAt": "2021-08-17T13:21:33.872+00:00",
              "extensions": {
                "foreignKeys": {
                  "apiAlias": "array_struct"
                }
              },
              "id": "604be76e9876472da2467f4e075a2a7d",
              "parentVersionId": "0fa91ce3e96a4bc2be4bd9ce752c3425",
              "productManufacturerVersionId": "0fa91ce3e96a4bc2be4bd9ce752c3425",
              "productMediaVersionId": null,
              "apiAlias": "product"
            }
          },
          {
            "med_doses": "Tabletten",
            "med_duration_pd": 1,
            "key": "PPP",
            "maxWeight": 35,
            "med_delivery": "XY Apo",
            "med_header": "rezeptpflichtig",
            "feeding": false,
            "minWeight": 30.1,
            "med_unit": "Tabletten",
            "med_image_link": "https://firebasestorage.googleapis.com/v0/b/confidu-app.appspot.com/o/carecard%2Fmedication%2Fpill.svg?alt=media&token=696d9c11-de10-4ab8-a649-a22d49dfdd9c",
            "med_type": "Tablette",
            "prescription": true,
            "id": "PNTDC5010000098_D",
            "pharmacy": true,
            "medication": "Panacur Capillaria plica (1x tgl. für 5 Tage)",
            "Wiederholung_Freq": null,
            "indication": {
              "header": "Anwendungsgebiet",
              "body": {
                "indicationProduct": null,
                "indicationDeclaration": null,
                "indicactionCaution": null,
                "indicationSecond": {
                  "body": null,
                  "header": "Das Tierarzneimittel wird angewendet bei Hunden zur Behandlung eines Befalls mit Giardia spp.."
                },
                "indicationTeaser": null,
                "indicationFirst": {
                  "body": [
                    "Spulwürmer (Toxocara canis, Toxascaris leonina)",
                    "Hakenwürmer (Ancylostoma caninum, Uncinaria stenocephala)",
                    "Peitschenwürmer (Trichuris vulpis)",
                    "Bandwürmer (Taenia pisiformis)"
                  ],
                  "header": "Das Tierarzneimittel wird angewendet bei Hunden zur Behandlung eines Befalls mit reifen Stadien folgender Magen-Darm-Nematoden und Bandwürmer:"
                },
                "indicationThird": {
                  "body": [
                    "Spulwürmer (reife Stadien von Toxocara mystax)",
                    "Hakenwürmer (unreife und reife Stadien von Ancylostoma tubaeforme) Bandwürmer (reife Stadien von Taenia taeniaeformis)"
                  ],
                  "header": "Das Tierarzneimittel wird angewendet bei Katzen zur Behandlung eines Befalls mit unreifen und reifen Stadien folgender Magen-Darm- Nematoden und Bandwürmer:"
                },
                "indicationOther": null
              }
            },
            "product_pdf_dokument": "https://firebasestorage.googleapis.com/v0/b/confidu-app.appspot.com/o/shop%2Fpackage_insert%2Fsuppl%2Fpanacur_tabletten_500mg_dog_cat_pil.pdf?alt=media&token=51a7fd63-22d7-4319-b3a5-997a0ce2074c",
            "med_duration_length": 5,
            "ticket_type": [
              "med_feed",
              "med_take"
            ],
            "med_name": "Panacur Tabletten 500 mg",
            "med_frequency": null,
            "med_package_ges": "20 Tabletten",
            "med_amountdose": 3.5,
            "diagnosis": [
              "Capillaria plica"
            ],
            "med_amount": 1,
            "med_category": "Antiparasitikum",
            "data": {
              "calculatedListingPrice": {
                "from": {
                  "unitPrice": 35.43,
                  "quantity": 1,
                  "totalPrice": 35.43,
                  "calculatedTaxes": [
                    {
                      "tax": 5.66,
                      "taxRate": 19,
                      "price": 35.43,
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
                  "unitPrice": 35.43,
                  "quantity": 1,
                  "totalPrice": 35.43,
                  "calculatedTaxes": [
                    {
                      "tax": 5.66,
                      "taxRate": 19,
                      "price": 35.43,
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
                "unitPrice": 35.43,
                "quantity": 1,
                "totalPrice": 35.43,
                "calculatedTaxes": [
                  {
                    "tax": 5.66,
                    "taxRate": 19,
                    "price": 35.43,
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
              "displayGroup": "367b06cd6968b25ba7e8d9ca0ed5d2a2",
              "manufacturerNumber": null,
              "ean": null,
              "sales": 0,
              "productNumber": "PNTDC5010000098_D",
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
                "b4662c9d034a468ba4f77bd81751d761"
              ],
              "optionIds": null,
              "propertyIds": null,
              "name": "Panacur Tabletten 500 mg",
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
                "productId": "b6dbb45429274e528173970c306eb4ae",
                "mediaId": "214bf82e2c3d4184b414ceac202283af",
                "position": 1,
                "media": {
                  "mimeType": "image/jpeg",
                  "fileExtension": "jpg",
                  "fileSize": 45246,
                  "title": null,
                  "metaData": {
                    "width": 576,
                    "height": 576,
                    "type": 2
                  },
                  "uploadedAt": "2021-08-16T20:14:10.218+00:00",
                  "alt": null,
                  "url": "https://demo-shop.tierversicherung.click/staging/media/1c/7e/7d/1629144850/pill.jpg",
                  "fileName": "pill",
                  "translations": null,
                  "thumbnails": [],
                  "hasFile": true,
                  "private": false,
                  "customFields": null,
                  "_uniqueIdentifier": "214bf82e2c3d4184b414ceac202283af",
                  "versionId": null,
                  "translated": {
                    "alt": null,
                    "title": null,
                    "customFields": []
                  },
                  "createdAt": "2021-08-16T20:14:10.209+00:00",
                  "updatedAt": "2021-08-16T20:29:34.331+00:00",
                  "extensions": {
                    "internal_mapping_storage": {
                      "apiAlias": "array_struct"
                    },
                    "foreignKeys": {
                      "apiAlias": "array_struct"
                    }
                  },
                  "id": "214bf82e2c3d4184b414ceac202283af",
                  "apiAlias": "media"
                },
                "customFields": null,
                "_uniqueIdentifier": "4b917d8236904fd89147df9a533a2af1",
                "versionId": "0fa91ce3e96a4bc2be4bd9ce752c3425",
                "translated": [],
                "createdAt": "2021-08-16T20:26:41.589+00:00",
                "updatedAt": null,
                "extensions": {
                  "foreignKeys": {
                    "apiAlias": "array_struct"
                  }
                },
                "id": "4b917d8236904fd89147df9a533a2af1",
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
              "coverId": "4b917d8236904fd89147df9a533a2af1",
              "customFields": {
                "product_prescription": true,
                "product_pharmacy": true,
                "product_feeding": false,
                "product_ticket_type": "med_feed;med_take",
                "product_med_category": "Antiparasitikum",
                "product_medication_key": "PPP"
              },
              "productReviews": null,
              "ratingAverage": null,
              "mainCategories": null,
              "seoUrls": null,
              "crossSellings": null,
              "canonicalProductId": null,
              "canonicalProduct": null,
              "_uniqueIdentifier": "b6dbb45429274e528173970c306eb4ae",
              "versionId": "0fa91ce3e96a4bc2be4bd9ce752c3425",
              "translated": {
                "metaDescription": null,
                "name": "Panacur Tabletten 500 mg",
                "keywords": null,
                "description": null,
                "metaTitle": null,
                "packUnit": null,
                "packUnitPlural": null,
                "customFields": {
                  "product_prescription": true,
                  "product_pharmacy": true,
                  "product_feeding": false,
                  "product_ticket_type": "med_feed;med_take",
                  "product_med_category": "Antiparasitikum",
                  "product_medication_key": "PPP"
                },
                "customSearchKeywords": null
              },
              "createdAt": "2021-08-16T20:26:41.590+00:00",
              "updatedAt": null,
              "extensions": {
                "foreignKeys": {
                  "apiAlias": "array_struct"
                }
              },
              "id": "b6dbb45429274e528173970c306eb4ae",
              "parentVersionId": "0fa91ce3e96a4bc2be4bd9ce752c3425",
              "productManufacturerVersionId": "0fa91ce3e96a4bc2be4bd9ce752c3425",
              "productMediaVersionId": null,
              "apiAlias": "product"
            }
          },
          {
            "med_frequency": null,
            "indication": {
              "header": "Anwendungsgebiet",
              "body": {
                "indicationTeaser": "Chlorexyderm",
                "indicationOther": null,
                "indicationDeclaration": "Chlorexyderm Shampoo® beseitigt abgestorbene Zellen und anderes organisches Material und damit die Lebensgrundlage für Bakterien und Hefepilze sowie unangenehme Gerüche. ",
                "indicationProduct": "Shampoo zur Reinigung von Haut und Fell ",
                "indicactionCaution": "Zusammensetzung: Chlorhexidindiglukonat 4 %, Hydroxyethylzellulose, Ethoxyliertes Lanolin, Glyzerin, Propylenglykol, Dimethylalkyloxid, Ethoxylierter Isodecylalkohol, Deionisiertes WasserTürkis Kemazol, Duftstoffe",
                "indicationFirst": {
                  "body": null,
                  "header": "Das Shampoo wird angewendet bei Hunden und Katzen zur Reinigung von Haut und Fell, insbesondere wenn eine starke reinigende Wirkung erwünscht ist. "
                },
                "indicationThird": null,
                "indicationSecond": null
              }
            },
            "med_unit": "ml",
            "feeding": false,
            "med_doses": "Milliliter",
            "maxWeight": 100,
            "med_package_ges": "250 ml Flasche",
            "minWeight": 30.1,
            "key": "CLO",
            "med_category": "Wundpflegeprodukt",
            "med_header": null,
            "med_type": "Shampoo",
            "med_duration_pd": 1,
            "med_duration_length": 1,
            "Wiederholung_Freq": null,
            "med_amount": 1,
            "medication": "Clorexyderm Shampoo",
            "diagnosis": [
              "Giardieninfektion (Fellreinigung)"
            ],
            "med_image_link": "https://firebasestorage.googleapis.com/v0/b/confidu-app.appspot.com/o/carecard%2Fmedication%2Fshampoo.svg?alt=media&token=b28cd3e1-427f-4c3c-8911-3fb992f18f20",
            "med_name": "Clorexyderm Shampoo 4 %",
            "prescription": false,
            "ticket_type": [],
            "med_amountdose": 50,
            "product_pdf_dokument": "https://firebasestorage.googleapis.com/v0/b/confidu-app.appspot.com/o/shop%2Fpackage_insert%2Fclorexyderm_dog_cat_product_information_de.pdf?alt=media&token=0ad8a449-d452-42a0-8bcb-d8861926c04c",
            "id": "CLODC2510000030",
            "pharmacy": false,
            "med_delivery": "confidu GmbH",
            "data": {
              "calculatedListingPrice": {
                "from": {
                  "unitPrice": 13.8,
                  "quantity": 1,
                  "totalPrice": 13.8,
                  "calculatedTaxes": [
                    {
                      "tax": 2.2,
                      "taxRate": 19,
                      "price": 13.8,
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
                  "unitPrice": 13.8,
                  "quantity": 1,
                  "totalPrice": 13.8,
                  "calculatedTaxes": [
                    {
                      "tax": 2.2,
                      "taxRate": 19,
                      "price": 13.8,
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
                "unitPrice": 13.8,
                "quantity": 1,
                "totalPrice": 13.8,
                "calculatedTaxes": [
                  {
                    "tax": 2.2,
                    "taxRate": 19,
                    "price": 13.8,
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
              "displayGroup": "e9c8c45aab0c3a52f7410e9fc31d8e0b",
              "manufacturerNumber": null,
              "ean": null,
              "sales": 0,
              "productNumber": "CLODC2510000030",
              "stock": 100,
              "availableStock": 99,
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
              "name": "Clorexyderm Shampoo 4 %",
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
                "productId": "850db932ae7a4057a99106aab8a9bfaa",
                "mediaId": "c8d582b557bd433fa08b3be9548e1595",
                "position": 1,
                "media": {
                  "mimeType": "image/jpeg",
                  "fileExtension": "jpg",
                  "fileSize": 119968,
                  "title": null,
                  "metaData": {
                    "width": 1400,
                    "height": 1400,
                    "type": 2
                  },
                  "uploadedAt": "2021-08-17T11:50:06.876+00:00",
                  "alt": null,
                  "url": "https://demo-shop.tierversicherung.click/staging/media/18/b0/19/1629201006/clorexyderm.jpg",
                  "fileName": "clorexyderm",
                  "translations": null,
                  "thumbnails": [
                    {
                      "width": 1920,
                      "height": 1920,
                      "url": "https://demo-shop.tierversicherung.click/staging/thumbnail/18/b0/19/1629201006/clorexyderm_1920x1920.jpg",
                      "mediaId": "c8d582b557bd433fa08b3be9548e1595",
                      "customFields": null,
                      "_uniqueIdentifier": "67a91bde7a954d869e103762917b03e2",
                      "versionId": null,
                      "translated": [],
                      "createdAt": "2021-08-17T11:50:07.585+00:00",
                      "updatedAt": null,
                      "extensions": {
                        "foreignKeys": {
                          "apiAlias": "array_struct"
                        }
                      },
                      "id": "67a91bde7a954d869e103762917b03e2",
                      "apiAlias": "media_thumbnail"
                    },
                    {
                      "width": 800,
                      "height": 800,
                      "url": "https://demo-shop.tierversicherung.click/staging/thumbnail/18/b0/19/1629201006/clorexyderm_800x800.jpg",
                      "mediaId": "c8d582b557bd433fa08b3be9548e1595",
                      "customFields": null,
                      "_uniqueIdentifier": "b9929154fd364ca6b495bf13801ef1aa",
                      "versionId": null,
                      "translated": [],
                      "createdAt": "2021-08-17T11:50:07.586+00:00",
                      "updatedAt": null,
                      "extensions": {
                        "foreignKeys": {
                          "apiAlias": "array_struct"
                        }
                      },
                      "id": "b9929154fd364ca6b495bf13801ef1aa",
                      "apiAlias": "media_thumbnail"
                    },
                    {
                      "width": 400,
                      "height": 400,
                      "url": "https://demo-shop.tierversicherung.click/staging/thumbnail/18/b0/19/1629201006/clorexyderm_400x400.jpg",
                      "mediaId": "c8d582b557bd433fa08b3be9548e1595",
                      "customFields": null,
                      "_uniqueIdentifier": "ec9edba82ae3479cb9ae2bc74a236e7e",
                      "versionId": null,
                      "translated": [],
                      "createdAt": "2021-08-17T11:50:07.586+00:00",
                      "updatedAt": null,
                      "extensions": {
                        "foreignKeys": {
                          "apiAlias": "array_struct"
                        }
                      },
                      "id": "ec9edba82ae3479cb9ae2bc74a236e7e",
                      "apiAlias": "media_thumbnail"
                    }
                  ],
                  "hasFile": true,
                  "private": false,
                  "customFields": null,
                  "_uniqueIdentifier": "c8d582b557bd433fa08b3be9548e1595",
                  "versionId": null,
                  "translated": {
                    "alt": null,
                    "title": null,
                    "customFields": []
                  },
                  "createdAt": "2021-08-17T11:49:49.424+00:00",
                  "updatedAt": "2021-08-17T11:50:07.586+00:00",
                  "extensions": {
                    "internal_mapping_storage": {
                      "apiAlias": "array_struct"
                    },
                    "foreignKeys": {
                      "apiAlias": "array_struct"
                    }
                  },
                  "id": "c8d582b557bd433fa08b3be9548e1595",
                  "apiAlias": "media"
                },
                "customFields": null,
                "_uniqueIdentifier": "b345482f846246d2a69535061857683b",
                "versionId": "0fa91ce3e96a4bc2be4bd9ce752c3425",
                "translated": [],
                "createdAt": "2021-08-17T13:14:04.813+00:00",
                "updatedAt": null,
                "extensions": {
                  "foreignKeys": {
                    "apiAlias": "array_struct"
                  }
                },
                "id": "b345482f846246d2a69535061857683b",
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
              "coverId": "b345482f846246d2a69535061857683b",
              "customFields": {
                "product_prescription": false,
                "product_pharmacy": false,
                "product_feeding": false,
                "product_med_category": "Wundpflegeprodukt",
                "product_medication_key": "CLO"
              },
              "productReviews": null,
              "ratingAverage": null,
              "mainCategories": null,
              "seoUrls": null,
              "crossSellings": null,
              "canonicalProductId": null,
              "canonicalProduct": null,
              "_uniqueIdentifier": "850db932ae7a4057a99106aab8a9bfaa",
              "versionId": "0fa91ce3e96a4bc2be4bd9ce752c3425",
              "translated": {
                "metaDescription": null,
                "name": "Clorexyderm Shampoo 4 %",
                "keywords": null,
                "description": null,
                "metaTitle": null,
                "packUnit": null,
                "packUnitPlural": null,
                "customFields": {
                  "product_prescription": false,
                  "product_pharmacy": false,
                  "product_feeding": false,
                  "product_med_category": "Wundpflegeprodukt",
                  "product_medication_key": "CLO"
                },
                "customSearchKeywords": null
              },
              "createdAt": "2021-08-16T20:27:18.899+00:00",
              "updatedAt": "2021-08-17T13:14:04.813+00:00",
              "extensions": {
                "foreignKeys": {
                  "apiAlias": "array_struct"
                }
              },
              "id": "850db932ae7a4057a99106aab8a9bfaa",
              "parentVersionId": "0fa91ce3e96a4bc2be4bd9ce752c3425",
              "productManufacturerVersionId": "0fa91ce3e96a4bc2be4bd9ce752c3425",
              "productMediaVersionId": null,
              "apiAlias": "product"
            }
          },
          {
            "med_name": "DISIFIN LabroSept Desinfektionsreiniger",
            "med_unit": "ml",
            "Wiederholung_Freq": null,
            "id": "DISDC5010000043",
            "med_header": null,
            "diagnosis": [
              "Giardien-/Kokzidieninfektion"
            ],
            "med_amountdose": null,
            "med_frequency": null,
            "med_doses": null,
            "feeding": false,
            "prescription": false,
            "medication": "Desinfektionsreiniger Disfin LabroSept",
            "maxWeight": 100,
            "med_duration_pd": null,
            "product_pdf_dokument": "https://firebasestorage.googleapis.com/v0/b/confidu-app.appspot.com/o/shop%2Fpackage_insert%2Fsuppl%2Fdisfin_dog_cat_product_information_de.pdf?alt=media&token=2898b263-06e3-4fb5-acb7-0e5dbc04d4e8",
            "med_category": "Zubehör",
            "med_duration_length": null,
            "key": "NEO",
            "med_type": "Lösung",
            "pharmacy": false,
            "med_delivery": "confidu GmbH",
            "minWeight": 0,
            "indication": {
              "body": {
                "indicationFirst": {
                  "body": null,
                  "header": "Das Flächendesinfektionsmittel wird nach sorgfältiger Vorreinigung angewendet zur Desinfektion von Oberflächen und Böden und ist wirksam gegen Bakterien (E. coli. Legionellen, Salmonellen, Fäkalstreptokokken, Pseudonomas, coliforme Keime) Pilze, Viren und Milben."
                },
                "indicationProduct": "Desinfektionsmittel zur Oberflächendesinfektion",
                "indicationThird": null,
                "indicationOther": null,
                "indicationSecond": null,
                "indicationDeclaration": "DISIFIN LabroSept® ist ein Reinigungsmittel mit desinfizierender Wirkung auf Wasserbasis. DISIFIN® Sprühflaschen sind über 200-mal wiederverwendbar und zu 100% recycelbar.",
                "indicactionCaution": null,
                "indicationTeaser": "Disifin - Desinfektionsreiniger"
              },
              "header": "Anwendungsgebiet"
            },
            "med_image_link": "pump-bottle.jpg",
            "med_package_ges": "500 ml Flasche",
            "med_amount": 1,
            "ticket_type": [],
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
              "displayGroup": "83c9648e51add7eac80643cbd36c8db1",
              "manufacturerNumber": null,
              "ean": null,
              "sales": 0,
              "productNumber": "DISDC5010000043",
              "stock": 100,
              "availableStock": 99,
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
              "name": "DISIFIN LabroSept Desinfektionsreiniger",
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
                "productId": "cac45854029d4d149c37ff660d445e6a",
                "mediaId": "fa6111b2a4e04101bb1e5bd971a07917",
                "position": 1,
                "media": {
                  "mimeType": "image/jpeg",
                  "fileExtension": "jpg",
                  "fileSize": 136660,
                  "title": null,
                  "metaData": {
                    "width": 1400,
                    "height": 1400,
                    "type": 2
                  },
                  "uploadedAt": "2021-08-17T11:50:08.813+00:00",
                  "alt": null,
                  "url": "https://demo-shop.tierversicherung.click/staging/media/15/3d/28/1629201008/disifin.jpg",
                  "fileName": "disifin",
                  "translations": null,
                  "thumbnails": [
                    {
                      "width": 800,
                      "height": 800,
                      "url": "https://demo-shop.tierversicherung.click/staging/thumbnail/15/3d/28/1629201008/disifin_800x800.jpg",
                      "mediaId": "fa6111b2a4e04101bb1e5bd971a07917",
                      "customFields": null,
                      "_uniqueIdentifier": "44781c998eef4ea2b59d5783c65182bc",
                      "versionId": null,
                      "translated": [],
                      "createdAt": "2021-08-17T11:50:09.884+00:00",
                      "updatedAt": null,
                      "extensions": {
                        "foreignKeys": {
                          "apiAlias": "array_struct"
                        }
                      },
                      "id": "44781c998eef4ea2b59d5783c65182bc",
                      "apiAlias": "media_thumbnail"
                    },
                    {
                      "width": 1920,
                      "height": 1920,
                      "url": "https://demo-shop.tierversicherung.click/staging/thumbnail/15/3d/28/1629201008/disifin_1920x1920.jpg",
                      "mediaId": "fa6111b2a4e04101bb1e5bd971a07917",
                      "customFields": null,
                      "_uniqueIdentifier": "529bfe6ebab94dc0ae0bce75712d94c2",
                      "versionId": null,
                      "translated": [],
                      "createdAt": "2021-08-17T11:50:09.883+00:00",
                      "updatedAt": null,
                      "extensions": {
                        "foreignKeys": {
                          "apiAlias": "array_struct"
                        }
                      },
                      "id": "529bfe6ebab94dc0ae0bce75712d94c2",
                      "apiAlias": "media_thumbnail"
                    },
                    {
                      "width": 400,
                      "height": 400,
                      "url": "https://demo-shop.tierversicherung.click/staging/thumbnail/15/3d/28/1629201008/disifin_400x400.jpg",
                      "mediaId": "fa6111b2a4e04101bb1e5bd971a07917",
                      "customFields": null,
                      "_uniqueIdentifier": "6ec99ca3c51842d280f6b5066344b78d",
                      "versionId": null,
                      "translated": [],
                      "createdAt": "2021-08-17T11:50:09.884+00:00",
                      "updatedAt": null,
                      "extensions": {
                        "foreignKeys": {
                          "apiAlias": "array_struct"
                        }
                      },
                      "id": "6ec99ca3c51842d280f6b5066344b78d",
                      "apiAlias": "media_thumbnail"
                    }
                  ],
                  "hasFile": true,
                  "private": false,
                  "customFields": null,
                  "_uniqueIdentifier": "fa6111b2a4e04101bb1e5bd971a07917",
                  "versionId": null,
                  "translated": {
                    "alt": null,
                    "title": null,
                    "customFields": []
                  },
                  "createdAt": "2021-08-17T11:49:49.375+00:00",
                  "updatedAt": "2021-08-17T11:50:09.884+00:00",
                  "extensions": {
                    "internal_mapping_storage": {
                      "apiAlias": "array_struct"
                    },
                    "foreignKeys": {
                      "apiAlias": "array_struct"
                    }
                  },
                  "id": "fa6111b2a4e04101bb1e5bd971a07917",
                  "apiAlias": "media"
                },
                "customFields": null,
                "_uniqueIdentifier": "a81127860fd3410c9f54349648c6ecdb",
                "versionId": "0fa91ce3e96a4bc2be4bd9ce752c3425",
                "translated": [],
                "createdAt": "2021-08-17T13:16:52.143+00:00",
                "updatedAt": null,
                "extensions": {
                  "foreignKeys": {
                    "apiAlias": "array_struct"
                  }
                },
                "id": "a81127860fd3410c9f54349648c6ecdb",
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
              "coverId": "a81127860fd3410c9f54349648c6ecdb",
              "customFields": {
                "product_prescription": false,
                "product_pharmacy": false,
                "product_feeding": false,
                "product_med_category": "Zubehör",
                "product_medication_key": "NEO"
              },
              "productReviews": null,
              "ratingAverage": null,
              "mainCategories": null,
              "seoUrls": null,
              "crossSellings": null,
              "canonicalProductId": null,
              "canonicalProduct": null,
              "_uniqueIdentifier": "cac45854029d4d149c37ff660d445e6a",
              "versionId": "0fa91ce3e96a4bc2be4bd9ce752c3425",
              "translated": {
                "metaDescription": null,
                "name": "DISIFIN LabroSept Desinfektionsreiniger",
                "keywords": null,
                "description": null,
                "metaTitle": null,
                "packUnit": null,
                "packUnitPlural": null,
                "customFields": {
                  "product_prescription": false,
                  "product_pharmacy": false,
                  "product_feeding": false,
                  "product_med_category": "Zubehör",
                  "product_medication_key": "NEO"
                },
                "customSearchKeywords": null
              },
              "createdAt": "2021-08-16T20:27:18.449+00:00",
              "updatedAt": "2021-08-17T13:16:52.143+00:00",
              "extensions": {
                "foreignKeys": {
                  "apiAlias": "array_struct"
                }
              },
              "id": "cac45854029d4d149c37ff660d445e6a",
              "parentVersionId": "0fa91ce3e96a4bc2be4bd9ce752c3425",
              "productManufacturerVersionId": "0fa91ce3e96a4bc2be4bd9ce752c3425",
              "productMediaVersionId": null,
              "apiAlias": "product"
            }
          }
        ],
        "body": [
          "Wir haben dir die Präparate zusammengestellt, die Parzival benötigt. Die Bestellmenge ist auf das Gewicht von Parzival abgestimmt. Lege deine Auswahl in den Warenkorb."
        ],
        "info": "Info",
        "headline": "Was du brauchst"
      },
      {
        "info": null,
        "headline": "Was zusätzlich hilft",
        "list": [
          {
            "med_type": "Kautablette",
            "Wiederholung_Freq": null,
            "maxWeight": 100,
            "minWeight": 20.1,
            "product_pdf_dokument": "https://firebasestorage.googleapis.com/v0/b/confidu-app.appspot.com/o/shop%2Fpackage_insert%2Fd_e%2Fdia_tab_dog_cat_product_information_de.pdf?alt=media&token=1dc2eb81-4e4a-47d5-9f1d-782214c85783",
            "med_unit": "Tabletten",
            "indication": {
              "header": "Anwendungsgebiet",
              "body": {
                "indicationSecond": null,
                "indicationFirst": {
                  "header": "Das Ergänzungsfuttermittel wird angewendet bei Hunden und Katzen bei und nach akutem Durchfall.",
                  "body": null
                },
                "indicationDeclaration": "Dia Tab® ist ein gebrauchsfertiges Diät-Ergänzungsfuttermittel in Form einer Kautablette auf Basis ausgewogener natürlicher Bestandteile. Es hat eine hohe Wasserbindungsfähigkeit, wodurch der Kot schnell angedickt wird.",
                "indicationTeaser": "Dia Tab",
                "indicationOther": "Dia Tab® enthält eine ausgewogene Zusammensetzung natürlicher Bestandteile zur Regulierung gestörter Verdauungsvorgänge.",
                "indicactionCaution": "Zusammensetzung: Geflügelleber, Obsttrester (Apfel, Zitrone), getrocknet 11,9 %, Traubenzucker, Maisstärke, Reismehl, Eiererzeugnisse, getrocknet, Natriumchlorid, Karottentrester 3 %, Bruchreis, Leinextraktionsschrot, Bierhefe, Süßholz 0,3 %, Heidelbeeren 0,3 %, Fenchelsaat 0,3 %, Brombeerblätter 0,3 %, Bockshornkleesaat 0,3 %, Kaliumchlorid;Analytische Bestandteile: Rohprotein 19,9 % Rohfaser 7,2 % Rohöle u. -fette 6 % Rohasche 11 % Natrium 1,33 % Kalium 0,66 %;Zusatzstoffe pro kg:;Ernährungsphysiologische Zusatzstoffe: Eisen als Eisen-(II)-sulfat, Monohydrat 507 mg;Technologische Zusatzstoffe: Bentonit 6.100 mg Kieselgur 25.000 mg Kieselsäure, gefällt und getrocknet 30.000 mg Calciumpropionat 1.049 mg Polyethylenglykol 6000 300 mg",
                "indicationProduct": "Ergänzungsfuttermittel bei akutem Durchfall",
                "indicationThird": null
              }
            },
            "medication": "Dia Tab 6 Tabl.",
            "med_category": "Ergänzungsfuttermittel",
            "diagnosis": [
              "Durchfall"
            ],
            "med_delivery": "confidu GmbH",
            "med_name": "Dia Tab",
            "med_image_link": "https://firebasestorage.googleapis.com/v0/b/confidu-app.appspot.com/o/carecard%2Fmedication%2Fpill.svg?alt=media&token=696d9c11-de10-4ab8-a649-a22d49dfdd9c",
            "key": "DIA",
            "pharmacy": false,
            "med_frequency": null,
            "med_duration_pd": 3,
            "feeding": true,
            "id": "DITDC0010000045",
            "med_package_ges": "6 Tabletten",
            "med_doses": "Tabletten",
            "med_duration_length": 3,
            "med_amountdose": 1,
            "ticket_type": [
              "med_take"
            ],
            "med_header": null,
            "prescription": false,
            "med_amount": 2,
            "data": {
              "calculatedListingPrice": {
                "from": {
                  "unitPrice": 7.76,
                  "quantity": 1,
                  "totalPrice": 7.76,
                  "calculatedTaxes": [
                    {
                      "tax": 0.51,
                      "taxRate": 7,
                      "price": 7.76,
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
                  "unitPrice": 7.76,
                  "quantity": 1,
                  "totalPrice": 7.76,
                  "calculatedTaxes": [
                    {
                      "tax": 0.51,
                      "taxRate": 7,
                      "price": 7.76,
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
                "unitPrice": 7.76,
                "quantity": 1,
                "totalPrice": 7.76,
                "calculatedTaxes": [
                  {
                    "tax": 0.51,
                    "taxRate": 7,
                    "price": 7.76,
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
              "displayGroup": "6b2a13c83ffc31cbe7a5d239028cccb8",
              "manufacturerNumber": null,
              "ean": null,
              "sales": 0,
              "productNumber": "DITDC0010000045",
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
              "name": "Dia Tab",
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
                "productId": "0977ea75106b479594499bc17ed27e69",
                "mediaId": "980410b66ba74158bdc607ebc58d5d04",
                "position": 1,
                "media": {
                  "mimeType": "image/jpeg",
                  "fileExtension": "jpg",
                  "fileSize": 113280,
                  "title": null,
                  "metaData": {
                    "width": 1400,
                    "height": 1400,
                    "type": 2
                  },
                  "uploadedAt": "2021-08-17T14:50:36.919+00:00",
                  "alt": null,
                  "url": "https://demo-shop.tierversicherung.click/staging/media/f5/a3/14/1629211836/diatab.jpg",
                  "fileName": "diatab",
                  "translations": null,
                  "thumbnails": [
                    {
                      "width": 800,
                      "height": 800,
                      "url": "https://demo-shop.tierversicherung.click/staging/thumbnail/f5/a3/14/1629211836/diatab_800x800.jpg",
                      "mediaId": "980410b66ba74158bdc607ebc58d5d04",
                      "customFields": null,
                      "_uniqueIdentifier": "0f7b48eb6a204d3c8fe1a4d4ad40bb91",
                      "versionId": null,
                      "translated": [],
                      "createdAt": "2021-08-17T14:50:38.194+00:00",
                      "updatedAt": null,
                      "extensions": {
                        "foreignKeys": {
                          "apiAlias": "array_struct"
                        }
                      },
                      "id": "0f7b48eb6a204d3c8fe1a4d4ad40bb91",
                      "apiAlias": "media_thumbnail"
                    },
                    {
                      "width": 400,
                      "height": 400,
                      "url": "https://demo-shop.tierversicherung.click/staging/thumbnail/f5/a3/14/1629211836/diatab_400x400.jpg",
                      "mediaId": "980410b66ba74158bdc607ebc58d5d04",
                      "customFields": null,
                      "_uniqueIdentifier": "2d3e1abaff4b42d18d9fbb80bdff2a95",
                      "versionId": null,
                      "translated": [],
                      "createdAt": "2021-08-17T14:50:38.194+00:00",
                      "updatedAt": null,
                      "extensions": {
                        "foreignKeys": {
                          "apiAlias": "array_struct"
                        }
                      },
                      "id": "2d3e1abaff4b42d18d9fbb80bdff2a95",
                      "apiAlias": "media_thumbnail"
                    },
                    {
                      "width": 1920,
                      "height": 1920,
                      "url": "https://demo-shop.tierversicherung.click/staging/thumbnail/f5/a3/14/1629211836/diatab_1920x1920.jpg",
                      "mediaId": "980410b66ba74158bdc607ebc58d5d04",
                      "customFields": null,
                      "_uniqueIdentifier": "4ffb818c1aed41de95148f462e61e993",
                      "versionId": null,
                      "translated": [],
                      "createdAt": "2021-08-17T14:50:38.193+00:00",
                      "updatedAt": null,
                      "extensions": {
                        "foreignKeys": {
                          "apiAlias": "array_struct"
                        }
                      },
                      "id": "4ffb818c1aed41de95148f462e61e993",
                      "apiAlias": "media_thumbnail"
                    }
                  ],
                  "hasFile": true,
                  "private": false,
                  "customFields": null,
                  "_uniqueIdentifier": "980410b66ba74158bdc607ebc58d5d04",
                  "versionId": null,
                  "translated": {
                    "alt": null,
                    "title": null,
                    "customFields": []
                  },
                  "createdAt": "2021-08-17T14:50:36.269+00:00",
                  "updatedAt": "2021-08-17T14:50:38.194+00:00",
                  "extensions": {
                    "internal_mapping_storage": {
                      "apiAlias": "array_struct"
                    },
                    "foreignKeys": {
                      "apiAlias": "array_struct"
                    }
                  },
                  "id": "980410b66ba74158bdc607ebc58d5d04",
                  "apiAlias": "media"
                },
                "customFields": null,
                "_uniqueIdentifier": "f4772663a4f94538905b67476ff50147",
                "versionId": "0fa91ce3e96a4bc2be4bd9ce752c3425",
                "translated": [],
                "createdAt": "2021-08-17T14:50:47.000+00:00",
                "updatedAt": null,
                "extensions": {
                  "foreignKeys": {
                    "apiAlias": "array_struct"
                  }
                },
                "id": "f4772663a4f94538905b67476ff50147",
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
              "coverId": "f4772663a4f94538905b67476ff50147",
              "customFields": {
                "product_prescription": false,
                "product_pharmacy": false,
                "product_feeding": true,
                "product_ticket_type": "med_take",
                "product_med_category": "Ergänzungsfuttermittel",
                "product_medication_key": "DIA"
              },
              "productReviews": null,
              "ratingAverage": null,
              "mainCategories": null,
              "seoUrls": null,
              "crossSellings": null,
              "canonicalProductId": null,
              "canonicalProduct": null,
              "_uniqueIdentifier": "0977ea75106b479594499bc17ed27e69",
              "versionId": "0fa91ce3e96a4bc2be4bd9ce752c3425",
              "translated": {
                "metaDescription": null,
                "name": "Dia Tab",
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
                  "product_medication_key": "DIA"
                },
                "customSearchKeywords": null
              },
              "createdAt": "2021-08-16T20:27:09.910+00:00",
              "updatedAt": "2021-08-17T14:50:47.000+00:00",
              "extensions": {
                "foreignKeys": {
                  "apiAlias": "array_struct"
                }
              },
              "id": "0977ea75106b479594499bc17ed27e69",
              "parentVersionId": "0fa91ce3e96a4bc2be4bd9ce752c3425",
              "productManufacturerVersionId": "0fa91ce3e96a4bc2be4bd9ce752c3425",
              "productMediaVersionId": null,
              "apiAlias": "product"
            }
          },
          {
            "id": "ORADC5010000077",
            "med_image_link": "bottle.jpg",
            "Wiederholung_Freq": null,
            "feeding": true,
            "med_frequency": null,
            "minWeight": 10.1,
            "med_unit": "ml",
            "prescription": false,
            "med_package_ges": "500 ml Flasche",
            "key": "ELE",
            "med_duration_pd": 4,
            "medication": "Oralade Elektrolytlösung",
            "med_amountdose": 165,
            "pharmacy": false,
            "indication": {
              "body": {
                "indicactionCaution": "Zusammensetzung: Demineralisiertes Wasser, Dextrosemonohydrat 2,2%, Natriumchlorid, Kaliumchlorid, Monoatriumphosphat, Hühnerleberhydrolysat;Analytische Bestandteile: Rohprotein min. 0,6 %, Rohfett min. 0,1 %, Rohfaser 0,1 %, Rohasche 0,5 %, Calcium 0,006%, Natrium 0,13 %, Chlorid min. 0,22 %, Kalium 0,1%, Feuchtegehalt max. 97,0 %;Zusatzstoffe pro kg: Verdickungsmittel: Xanthangummi 0,1 %, Aminosäuren: L-Glutamat 0,19 %;Aromastoffe: Glycin 0,4 %",
                "indicationTeaser": "Oralade",
                "indicationDeclaration": "Oralade® ist eine isotonische Lösung, die Flüssigkeitsverluste bei deinem Vierbeiner ausgleicht. ",
                "indicationSecond": {
                  "body": [
                    "zur Unterstützung der Behandlung von Austrocknung (Dehydratation) und Elektrolytverlust, z.B. nach Durchfall und Erbrechen",
                    "bei Gastroenteritis (Magen-Darm-Entzündung)",
                    "bei Parvovirose",
                    "bei Pankreatitis (Bauchspeicheldrüsenentzündung)",
                    "bei Kolitis (Dickdarmentzündung)",
                    "bei Cholangiohepatitis (Leber- und Gallenwegsentzündung)",
                    "bei hepatischer Lipidose (Fettlebersyndrom bei Katzen)",
                    "Verletzungen der Speiseröhre",
                    "bei erhöhtem Energiebedarf, wie z.B. Trächtigkeit, Geburtsphase und Laktation",
                    "sowie auchpost-OP zur Rekonvaleszenz z.B. nach Zahnbehandlungen",
                    "bei chronisch kranken Tieren z.B. bei Diabetes oder chronische Nierenkrankheiten",
                    "bei Ernährungsumstellungen",
                    "bei Hitze",
                    "bei Reisen"
                  ],
                  "header": "Das Ergänzungsfuttermittel wird angewendet bei Katzen nach tierärztlicher Anweisung"
                },
                "indicationThird": null,
                "indicationFirst": {
                  "body": [
                    "zur Unterstützung der Behandlung von Austrocknung (Dehydratation) und Elektrolytverlust, z.B. nach Durchfall und Erbrechen",
                    "bei Gastroenteritis (Magen-Darm-Entzündung)",
                    "bei Parvovirose",
                    "bei Pankreatitis (Bauchspeicheldrüsenentzündung)",
                    "bei Kolitis (Dickdarmentzündung)",
                    "bei Cholangiohepatitis (Leber- und Gallenwegsentzündung)",
                    "Verletzungen der Speiseröhre",
                    "bei erhöhtem Energiebedarf, wie z.B. Trächtigkeit, Geburtsphase und Laktation",
                    "post-OP zur Rekonvaleszenz z.B. nach Zahnbehandlungen",
                    "bei chronisch kranken Tieren z.B. bei Diabetes oder chronische Nierenkrankheiten",
                    "bei Ernährungsumstellungen",
                    "bei Hitze",
                    "bei Reisen",
                    "für Arbeitshunde",
                    "für Hundetraining & Hundeschulen"
                  ],
                  "header": "Das Ergänzungsfuttermittel wird angewendet bei Hunden nach tierärztlicher Anweisung"
                },
                "indicationProduct": "Ergänzungsfuttermittel bei Austrocknung",
                "indicationOther": null
              },
              "header": "Anwendungsgebiet"
            },
            "med_doses": "Milliliter",
            "maxWeight": 40,
            "med_name": "Oralade GI Support - Elektrolytlösung",
            "product_pdf_dokument": "https://firebasestorage.googleapis.com/v0/b/confidu-app.appspot.com/o/shop%2Fpackage_insert%2Fn_o_%2Foralade_dog_cat_product_information_de.pdf?alt=media&token=34226fb1-c1dc-4b86-ac1d-e7d11a89c74d",
            "med_category": "Ergänzungsfuttermittel",
            "diagnosis": [
              "Austrocknung"
            ],
            "med_type": "Lösung",
            "med_duration_length": 1,
            "med_delivery": "confidu GmbH",
            "med_amount": 1,
            "med_header": null,
            "ticket_type": [
              "-"
            ],
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
              "displayGroup": "c3595f91ed0b387a45f1b877ef58233d",
              "manufacturerNumber": null,
              "ean": null,
              "sales": 0,
              "productNumber": "ORADC5010000077",
              "stock": 100,
              "availableStock": 94,
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
              "name": "Oralade GI Support - Elektrolytlösung",
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
                "productId": "4efb7266a42d4ba7aac280d1c60525be",
                "mediaId": "520ed403c159460896e358205c56b0d5",
                "position": 1,
                "media": {
                  "mimeType": "image/jpeg",
                  "fileExtension": "jpg",
                  "fileSize": 188407,
                  "title": null,
                  "metaData": {
                    "width": 1400,
                    "height": 1400,
                    "type": 2
                  },
                  "uploadedAt": "2021-08-17T14:52:46.091+00:00",
                  "alt": null,
                  "url": "https://demo-shop.tierversicherung.click/staging/media/27/08/e3/1629211966/oralade.jpg",
                  "fileName": "oralade",
                  "translations": null,
                  "thumbnails": [
                    {
                      "width": 800,
                      "height": 800,
                      "url": "https://demo-shop.tierversicherung.click/staging/thumbnail/27/08/e3/1629211966/oralade_800x800.jpg",
                      "mediaId": "520ed403c159460896e358205c56b0d5",
                      "customFields": null,
                      "_uniqueIdentifier": "010f3211afbb48758f4cc80dd681c8f3",
                      "versionId": null,
                      "translated": [],
                      "createdAt": "2021-08-17T14:52:47.395+00:00",
                      "updatedAt": null,
                      "extensions": {
                        "foreignKeys": {
                          "apiAlias": "array_struct"
                        }
                      },
                      "id": "010f3211afbb48758f4cc80dd681c8f3",
                      "apiAlias": "media_thumbnail"
                    },
                    {
                      "width": 400,
                      "height": 400,
                      "url": "https://demo-shop.tierversicherung.click/staging/thumbnail/27/08/e3/1629211966/oralade_400x400.jpg",
                      "mediaId": "520ed403c159460896e358205c56b0d5",
                      "customFields": null,
                      "_uniqueIdentifier": "012def89cccc4afd91c2069350a00093",
                      "versionId": null,
                      "translated": [],
                      "createdAt": "2021-08-17T14:52:47.394+00:00",
                      "updatedAt": null,
                      "extensions": {
                        "foreignKeys": {
                          "apiAlias": "array_struct"
                        }
                      },
                      "id": "012def89cccc4afd91c2069350a00093",
                      "apiAlias": "media_thumbnail"
                    },
                    {
                      "width": 1920,
                      "height": 1920,
                      "url": "https://demo-shop.tierversicherung.click/staging/thumbnail/27/08/e3/1629211966/oralade_1920x1920.jpg",
                      "mediaId": "520ed403c159460896e358205c56b0d5",
                      "customFields": null,
                      "_uniqueIdentifier": "c8b855a116114fbab584d03e7e6d1416",
                      "versionId": null,
                      "translated": [],
                      "createdAt": "2021-08-17T14:52:47.394+00:00",
                      "updatedAt": null,
                      "extensions": {
                        "foreignKeys": {
                          "apiAlias": "array_struct"
                        }
                      },
                      "id": "c8b855a116114fbab584d03e7e6d1416",
                      "apiAlias": "media_thumbnail"
                    }
                  ],
                  "hasFile": true,
                  "private": false,
                  "customFields": null,
                  "_uniqueIdentifier": "520ed403c159460896e358205c56b0d5",
                  "versionId": null,
                  "translated": {
                    "alt": null,
                    "title": null,
                    "customFields": []
                  },
                  "createdAt": "2021-08-17T14:52:45.118+00:00",
                  "updatedAt": "2021-08-17T14:52:47.395+00:00",
                  "extensions": {
                    "internal_mapping_storage": {
                      "apiAlias": "array_struct"
                    },
                    "foreignKeys": {
                      "apiAlias": "array_struct"
                    }
                  },
                  "id": "520ed403c159460896e358205c56b0d5",
                  "apiAlias": "media"
                },
                "customFields": null,
                "_uniqueIdentifier": "a07d928f45f14137a8d616ed9cefc713",
                "versionId": "0fa91ce3e96a4bc2be4bd9ce752c3425",
                "translated": [],
                "createdAt": "2021-08-17T14:52:57.178+00:00",
                "updatedAt": null,
                "extensions": {
                  "foreignKeys": {
                    "apiAlias": "array_struct"
                  }
                },
                "id": "a07d928f45f14137a8d616ed9cefc713",
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
              "coverId": "a07d928f45f14137a8d616ed9cefc713",
              "customFields": {
                "product_prescription": false,
                "product_pharmacy": false,
                "product_feeding": true,
                "product_ticket_type": "-",
                "product_med_category": "Ergänzungsfuttermittel",
                "product_medication_key": "ELE"
              },
              "productReviews": null,
              "ratingAverage": null,
              "mainCategories": null,
              "seoUrls": null,
              "crossSellings": null,
              "canonicalProductId": null,
              "canonicalProduct": null,
              "_uniqueIdentifier": "4efb7266a42d4ba7aac280d1c60525be",
              "versionId": "0fa91ce3e96a4bc2be4bd9ce752c3425",
              "translated": {
                "metaDescription": null,
                "name": "Oralade GI Support - Elektrolytlösung",
                "keywords": null,
                "description": null,
                "metaTitle": null,
                "packUnit": null,
                "packUnitPlural": null,
                "customFields": {
                  "product_prescription": false,
                  "product_pharmacy": false,
                  "product_feeding": true,
                  "product_ticket_type": "-",
                  "product_med_category": "Ergänzungsfuttermittel",
                  "product_medication_key": "ELE"
                },
                "customSearchKeywords": null
              },
              "createdAt": "2021-08-16T20:27:13.097+00:00",
              "updatedAt": "2021-08-17T14:52:57.178+00:00",
              "extensions": {
                "foreignKeys": {
                  "apiAlias": "array_struct"
                }
              },
              "id": "4efb7266a42d4ba7aac280d1c60525be",
              "parentVersionId": "0fa91ce3e96a4bc2be4bd9ce752c3425",
              "productManufacturerVersionId": "0fa91ce3e96a4bc2be4bd9ce752c3425",
              "productMediaVersionId": null,
              "apiAlias": "product"
            }
          },
          {
            "med_unit": "ml",
            "med_doses": "Milliliter",
            "med_amountdose": 25,
            "indication": {
              "header": "Anwendungsgebiet",
              "body": {
                "indicationDeclaration": "Cutamed Shampoo® ist ein mild reinigendes Shampoo, welches antimikrobiell wirkt und auch bei sensibler Haut sehr gut verträglich ist.",
                "indicactionCaution": "Zusammensetzung: 100g enthalten als wirksame biozide Bestandteile 0,3g Polyhexanid (Polyhexamethylenbiguanid, polymeres) und 0,15g Milchsäure. Das Shampoo enthält <5% amphotere Tenside, < 5% nichtionische Tenside.",
                "indicationOther": "Die milden Tenside reinigen schonend und zuverlässig. Aloe Vera und Panthenol beruhigen gereizte Haut und unterstützen ihre Regeneration. Nicht bei tragenden Katzen in Verbindung mit Griseofulvin anwenden. Nicht einsetzen bei Überempfindlichkeit gegenüber einem der Wirkstoffe oder der sonstigen Bestandteile. Hunde- und Katzenwelpen sollten solange nicht mit säugenden Muttertieren in Kontakt kommen, bis deren Fell nach Behandlung wieder vollständig abgetrocknet ist.",
                "indicationTeaser": "Cutamed",
                "indicationProduct": "Shampoo für bakterielle und fungale Hautprobleme",
                "indicationFirst": {
                  "header": "Das Shampoo wird angewendet bei Hunden und Katzen zur Keimreduktion bei einer übermäßigen Besiedlung der Haut mit Bakterien, Hefen (inkl. Malassezien) und Hautpilzen ",
                  "body": null
                },
                "indicationThird": null,
                "indicationSecond": null
              }
            },
            "med_frequency": null,
            "med_header": null,
            "product_pdf_dokument": "https://firebasestorage.googleapis.com/v0/b/confidu-app.appspot.com/o/shop%2Fpackage_insert%2Fcutamed_shampoo_dog_cat_product_information_de.pdf?alt=media&token=8da12ed2-2cc8-4d13-bc02-25b11c735e01",
            "diagnosis": [
              "Antibakterielles Shampoo"
            ],
            "ticket_type": [],
            "med_package_ges": "200 ml Flasche",
            "med_duration_pd": 2,
            "Wiederholung_Freq": null,
            "prescription": false,
            "id": "CUTDC2010000037",
            "minWeight": 0,
            "med_duration_length": 1,
            "med_type": "Shampoo",
            "pharmacy": false,
            "key": "CUT",
            "med_delivery": "confidu GmbH",
            "feeding": false,
            "medication": "Cutamed Shampoo",
            "maxWeight": 100,
            "med_amount": 1,
            "med_image_link": "https://firebasestorage.googleapis.com/v0/b/confidu-app.appspot.com/o/carecard%2Fmedication%2Fshampoo.svg?alt=media&token=b28cd3e1-427f-4c3c-8911-3fb992f18f20",
            "med_name": "Cutamed Shampoo",
            "med_category": "Haut- und Fellpflegeprodukt",
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
              "displayGroup": "afaaec15139a043b3d85f19628ab78c8",
              "manufacturerNumber": null,
              "ean": null,
              "sales": 0,
              "productNumber": "CUTDC2010000037",
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
              "name": "Cutamed Shampoo",
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
                "productId": "32afae1d44eb4e7e966d4eca998be309",
                "mediaId": "e2bd8c3c9b224644b076ad13b3065f9e",
                "position": 1,
                "media": {
                  "mimeType": "image/jpeg",
                  "fileExtension": "jpg",
                  "fileSize": 33259,
                  "title": null,
                  "metaData": {
                    "width": 576,
                    "height": 576,
                    "type": 2
                  },
                  "uploadedAt": "2021-08-16T20:14:10.094+00:00",
                  "alt": null,
                  "url": "https://demo-shop.tierversicherung.click/staging/media/e7/be/a3/1629144850/shampoo.jpg",
                  "fileName": "shampoo",
                  "translations": null,
                  "thumbnails": [],
                  "hasFile": true,
                  "private": false,
                  "customFields": null,
                  "_uniqueIdentifier": "e2bd8c3c9b224644b076ad13b3065f9e",
                  "versionId": null,
                  "translated": {
                    "alt": null,
                    "title": null,
                    "customFields": []
                  },
                  "createdAt": "2021-08-16T20:14:10.085+00:00",
                  "updatedAt": "2021-08-16T20:27:47.139+00:00",
                  "extensions": {
                    "internal_mapping_storage": {
                      "apiAlias": "array_struct"
                    },
                    "foreignKeys": {
                      "apiAlias": "array_struct"
                    }
                  },
                  "id": "e2bd8c3c9b224644b076ad13b3065f9e",
                  "apiAlias": "media"
                },
                "customFields": null,
                "_uniqueIdentifier": "6f0103a5e2294d5bb78ba5eab992bd2e",
                "versionId": "0fa91ce3e96a4bc2be4bd9ce752c3425",
                "translated": [],
                "createdAt": "2021-08-16T20:27:07.617+00:00",
                "updatedAt": null,
                "extensions": {
                  "foreignKeys": {
                    "apiAlias": "array_struct"
                  }
                },
                "id": "6f0103a5e2294d5bb78ba5eab992bd2e",
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
              "coverId": "6f0103a5e2294d5bb78ba5eab992bd2e",
              "customFields": {
                "product_prescription": false,
                "product_pharmacy": false,
                "product_feeding": false,
                "product_med_category": "Haut- und Fellpflegeprodukt",
                "product_medication_key": "CUT"
              },
              "productReviews": null,
              "ratingAverage": null,
              "mainCategories": null,
              "seoUrls": null,
              "crossSellings": null,
              "canonicalProductId": null,
              "canonicalProduct": null,
              "_uniqueIdentifier": "32afae1d44eb4e7e966d4eca998be309",
              "versionId": "0fa91ce3e96a4bc2be4bd9ce752c3425",
              "translated": {
                "metaDescription": null,
                "name": "Cutamed Shampoo",
                "keywords": null,
                "description": null,
                "metaTitle": null,
                "packUnit": null,
                "packUnitPlural": null,
                "customFields": {
                  "product_prescription": false,
                  "product_pharmacy": false,
                  "product_feeding": false,
                  "product_med_category": "Haut- und Fellpflegeprodukt",
                  "product_medication_key": "CUT"
                },
                "customSearchKeywords": null
              },
              "createdAt": "2021-08-16T20:27:07.618+00:00",
              "updatedAt": null,
              "extensions": {
                "foreignKeys": {
                  "apiAlias": "array_struct"
                }
              },
              "id": "32afae1d44eb4e7e966d4eca998be309",
              "parentVersionId": "0fa91ce3e96a4bc2be4bd9ce752c3425",
              "productManufacturerVersionId": "0fa91ce3e96a4bc2be4bd9ce752c3425",
              "productMediaVersionId": null,
              "apiAlias": "product"
            }
          },
          {
            "id": "CLSDO0010000232",
            "med_duration_length": null,
            "minWeight": 0,
            "med_type": "Schaumlösung",
            "diagnosis": [
              "Hautreinigung bei Dermatitis"
            ],
            "maxWeight": 100,
            "med_header": null,
            "med_name": "Clorexyderm Schaumlösung",
            "prescription": false,
            "pharmacy": false,
            "feeding": false,
            "med_image_link": null,
            "product_pdf_dokument": "https://firebasestorage.googleapis.com/v0/b/confidu-app.appspot.com/o/shop%2Fpackage_insert%2Fclorexyderm_schaumloesung_dog_cat_product_information_de.pdf?alt=media&token=a18d8b62-f29e-4f38-9ce2-3d774273afe9",
            "med_unit": "ml",
            "med_package_ges": "100 ml Flasche",
            "med_doses": null,
            "key": "CLS",
            "med_amount": 1,
            "ticket_type": [],
            "Wiederholung_Freq": null,
            "med_amountdose": null,
            "med_frequency": null,
            "indication": {
              "body": {
                "indicationDeclaration": "Die Schaumlösung reinigt die Haut und das Fell besonders schonend und hygienisch. Sie spendet Feuchtigkeit und pflegt die Haut wie Balsam. Nach der Anwendung muss sie nicht ausgespült werden! ",
                "indicationSecond": null,
                "indicationTeaser": "Clorexyderm® Schaumlösung",
                "indicationFirst": {
                  "body": [
                    "bakteriellen Hautinfektionen",
                    "rezidivierenden Pyodermien durch Atopie/Futtermittelallergie",
                    "Fällen bei denen eine längere Kontaktzeit mit Chlorhexidin gewünscht ist"
                  ],
                  "header": "Die Schaumlösung wird therapiebegleitend angewendet bei Hunden und Katzen bei"
                },
                "indicationThird": null,
                "indicationProduct": "Schaumlösung zur Reinigung von Haut und Fell ohne Wasser",
                "indicationOther": null,
                "indicactionCaution": null
              },
              "header": "Anwendungsgebiet"
            },
            "medication": "Clorexyderm Schaum",
            "med_duration_pd": null,
            "med_delivery": "XY Apo",
            "med_category": "Wundpflegeprodukt",
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
              "displayGroup": "fe5309a48dbc2ab3469039aae9f87d44",
              "manufacturerNumber": null,
              "ean": null,
              "sales": 0,
              "productNumber": "CLSDO0010000232",
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
              "name": "Clorexyderm Schaumlösung",
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
                "productId": "e8379eb0f5bf48fd92546ba81217d605",
                "mediaId": "c8d582b557bd433fa08b3be9548e1595",
                "position": 1,
                "media": {
                  "mimeType": "image/jpeg",
                  "fileExtension": "jpg",
                  "fileSize": 119968,
                  "title": null,
                  "metaData": {
                    "width": 1400,
                    "height": 1400,
                    "type": 2
                  },
                  "uploadedAt": "2021-08-17T11:50:06.876+00:00",
                  "alt": null,
                  "url": "https://demo-shop.tierversicherung.click/staging/media/18/b0/19/1629201006/clorexyderm.jpg",
                  "fileName": "clorexyderm",
                  "translations": null,
                  "thumbnails": [
                    {
                      "width": 1920,
                      "height": 1920,
                      "url": "https://demo-shop.tierversicherung.click/staging/thumbnail/18/b0/19/1629201006/clorexyderm_1920x1920.jpg",
                      "mediaId": "c8d582b557bd433fa08b3be9548e1595",
                      "customFields": null,
                      "_uniqueIdentifier": "67a91bde7a954d869e103762917b03e2",
                      "versionId": null,
                      "translated": [],
                      "createdAt": "2021-08-17T11:50:07.585+00:00",
                      "updatedAt": null,
                      "extensions": {
                        "foreignKeys": {
                          "apiAlias": "array_struct"
                        }
                      },
                      "id": "67a91bde7a954d869e103762917b03e2",
                      "apiAlias": "media_thumbnail"
                    },
                    {
                      "width": 800,
                      "height": 800,
                      "url": "https://demo-shop.tierversicherung.click/staging/thumbnail/18/b0/19/1629201006/clorexyderm_800x800.jpg",
                      "mediaId": "c8d582b557bd433fa08b3be9548e1595",
                      "customFields": null,
                      "_uniqueIdentifier": "b9929154fd364ca6b495bf13801ef1aa",
                      "versionId": null,
                      "translated": [],
                      "createdAt": "2021-08-17T11:50:07.586+00:00",
                      "updatedAt": null,
                      "extensions": {
                        "foreignKeys": {
                          "apiAlias": "array_struct"
                        }
                      },
                      "id": "b9929154fd364ca6b495bf13801ef1aa",
                      "apiAlias": "media_thumbnail"
                    },
                    {
                      "width": 400,
                      "height": 400,
                      "url": "https://demo-shop.tierversicherung.click/staging/thumbnail/18/b0/19/1629201006/clorexyderm_400x400.jpg",
                      "mediaId": "c8d582b557bd433fa08b3be9548e1595",
                      "customFields": null,
                      "_uniqueIdentifier": "ec9edba82ae3479cb9ae2bc74a236e7e",
                      "versionId": null,
                      "translated": [],
                      "createdAt": "2021-08-17T11:50:07.586+00:00",
                      "updatedAt": null,
                      "extensions": {
                        "foreignKeys": {
                          "apiAlias": "array_struct"
                        }
                      },
                      "id": "ec9edba82ae3479cb9ae2bc74a236e7e",
                      "apiAlias": "media_thumbnail"
                    }
                  ],
                  "hasFile": true,
                  "private": false,
                  "customFields": null,
                  "_uniqueIdentifier": "c8d582b557bd433fa08b3be9548e1595",
                  "versionId": null,
                  "translated": {
                    "alt": null,
                    "title": null,
                    "customFields": []
                  },
                  "createdAt": "2021-08-17T11:49:49.424+00:00",
                  "updatedAt": "2021-08-17T11:50:07.586+00:00",
                  "extensions": {
                    "internal_mapping_storage": {
                      "apiAlias": "array_struct"
                    },
                    "foreignKeys": {
                      "apiAlias": "array_struct"
                    }
                  },
                  "id": "c8d582b557bd433fa08b3be9548e1595",
                  "apiAlias": "media"
                },
                "customFields": null,
                "_uniqueIdentifier": "0e394e19828b42d2b39f8d9f01decb44",
                "versionId": "0fa91ce3e96a4bc2be4bd9ce752c3425",
                "translated": [],
                "createdAt": "2021-08-17T13:13:43.470+00:00",
                "updatedAt": null,
                "extensions": {
                  "foreignKeys": {
                    "apiAlias": "array_struct"
                  }
                },
                "id": "0e394e19828b42d2b39f8d9f01decb44",
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
              "coverId": "0e394e19828b42d2b39f8d9f01decb44",
              "customFields": {
                "product_prescription": false,
                "product_pharmacy": false,
                "product_feeding": false,
                "product_med_category": "Wundpflegeprodukt",
                "product_medication_key": "CLS"
              },
              "productReviews": null,
              "ratingAverage": null,
              "mainCategories": null,
              "seoUrls": null,
              "crossSellings": null,
              "canonicalProductId": null,
              "canonicalProduct": null,
              "_uniqueIdentifier": "e8379eb0f5bf48fd92546ba81217d605",
              "versionId": "0fa91ce3e96a4bc2be4bd9ce752c3425",
              "translated": {
                "metaDescription": null,
                "name": "Clorexyderm Schaumlösung",
                "keywords": null,
                "description": null,
                "metaTitle": null,
                "packUnit": null,
                "packUnitPlural": null,
                "customFields": {
                  "product_prescription": false,
                  "product_pharmacy": false,
                  "product_feeding": false,
                  "product_med_category": "Wundpflegeprodukt",
                  "product_medication_key": "CLS"
                },
                "customSearchKeywords": null
              },
              "createdAt": "2021-08-16T20:28:31.862+00:00",
              "updatedAt": "2021-08-17T13:13:43.470+00:00",
              "extensions": {
                "foreignKeys": {
                  "apiAlias": "array_struct"
                }
              },
              "id": "e8379eb0f5bf48fd92546ba81217d605",
              "parentVersionId": "0fa91ce3e96a4bc2be4bd9ce752c3425",
              "productManufacturerVersionId": "0fa91ce3e96a4bc2be4bd9ce752c3425",
              "productMediaVersionId": null,
              "apiAlias": "product"
            }
          }
        ],
        "body": [
          "Hier findest du weitere Präparate, die Parzival unterstützen und helfen, die Parasiten loszuwerden."
        ]
      }
    ],
    "iconImageLink": "https://firebasestorage.googleapis.com/v0/b/confidu-app.appspot.com/o/evaluations%2Fevaluation_medical_negative.svg?alt=media&token=96756222-d842-4c82-a19a-e551e4d0d75e",
    "image": null,
    "findings": {
      "body": {
        "param": null,
        "text": null,
        "legend": null,
        "answers": [
          {
            "name": "EKTO_Q3",
            "values": {
              "answer": {
                "venomKey": null,
                "subject": null,
                "minSpecifics": 0,
                "value": "EKTO_Q3_N",
                "ccEntry": null,
                "answerValue": null,
                "answerLongtext": [
                  "nein"
                ],
                "imageLinkAnswer": null,
                "imageLinkDetailAnswer": null,
                "answerUnit": null
              }
            },
            "questionText": "Ist Parzival derzeit krank oder geschwächt?",
            "questionType": "R"
          },
          {
            "name": "EKTO_Q8",
            "values": {
              "answer": {
                "subject": null,
                "imageLinkAnswer": null,
                "answerLongtext": [
                  "nein"
                ],
                "answerUnit": null,
                "value": "EKTO_Q8_N",
                "answerValue": null,
                "imageLinkDetailAnswer": null,
                "minSpecifics": 0,
                "ccEntry": null,
                "venomKey": null
              }
            },
            "questionText": "Ist bei Parzival derzeit die Leber- oder Nierenfunktion stark eingeschränkt?",
            "questionType": "R"
          },
          {
            "name": "FUP_Q46",
            "values": {
              "answer": {
                "imageLinkDetailAnswer": null,
                "value": "FUP_Q46_N",
                "minSpecifics": 0,
                "answerValue": null,
                "answerUnit": null,
                "venomKey": null,
                "ccEntry": null,
                "answerLongtext": [
                  "nein"
                ],
                "subject": null,
                "imageLinkAnswer": null
              }
            },
            "questionText": "Wird Parzival zurzeit mit einem anderen Parasitenmittel behandelt?",
            "questionType": "R"
          },
          {
            "name": "AJ_Q8",
            "values": {
              "answer": {
                "imageLinkAnswer": null,
                "ccEntry": null,
                "answerValue": null,
                "imageLinkDetailAnswer": null,
                "minSpecifics": 0,
                "value": "AJ_Q8_N",
                "answerLongtext": [
                  "nein"
                ],
                "answerUnit": null,
                "venomKey": null,
                "subject": null
              }
            },
            "questionText": "Hat Parzival eine Unverträglichkeit oder Allergie gegen Medikamente gegen Endoparasiten?",
            "questionType": "R"
          },
          {
            "name": "SHA_Q19",
            "values": {
              "answer": {
                "imageLinkDetailAnswer": null,
                "answerLongtext": null,
                "imageLinkAnswer": null,
                "subject": null,
                "venomKey": null,
                "value": "*pet_weight*",
                "answerValue": 33,
                "ccEntry": "W",
                "minSpecifics": 0,
                "answerUnit": null
              }
            },
            "questionText": "Gib das aktuelle Gewicht von Parzival an.",
            "questionType": "Z"
          },
          {
            "name": "DIS_Q2",
            "values": {
              "answer": {
                "minSpecifics": 0,
                "imageLinkDetailAnswer": null,
                "imageLinkAnswer": null,
                "ccEntry": null,
                "answerUnit": null,
                "value": "DIS_Q2_true",
                "answerValue": null,
                "answerLongtext": [
                  "Ich bestätige, dass ich alle Fragen nach bestem Wissen, wahrheitsgemäß und vollständig beantwortet habe und dass ich das/die Medikament(e) nur zur Behandlung der oben genannten Erkrankung meines Tieres Parzival verwende."
                ],
                "subject": null,
                "venomKey": null
              }
            },
            "questionText": "Wichtige Informationen!",
            "questionType": "CH2"
          }
        ]
      },
      "visibility": null,
      "header": "Deine Angaben"
    },
    "carecard": [
      {
        "level3Id": "f8e3b7f5-64bb-4aec-b653-0817b8105189",
        "resultKey": "LAB_DIG_RTCGI_HIG_SVE_1",
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
        "eventDate": "2021-08-24T00:00:00+00:00",
        "nextDate": null,
        "isTerminated": false,
        "currentDate": "2021-08-24T13:50:05.620938+02:00",
        "eventId": "e8072fec-529e-4048-8af9-c1cb31ccc0af",
        "findings": [
          {
            "currentDate": "2021-08-24T13:50:05.620938+02:00",
            "docs": [
              "findings/e8072fec-529e-4048-8af9-c1cb31ccc0af.pdf"
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
        "event": "ticket"
      },
      {
        "level3Id": "5ce907dc-b293-4390-9468-14676ed389d8",
        "resultKey": "LAB_DIG_RTCGI_HIG_SVE_1",
        "level1_valA": null,
        "level1_valB": null,
        "valA": null,
        "valB": null,
        "venomKey": "4556_CC_D",
        "level0_cc_key": "diseases_cc",
        "level1_cc_key": "healthstatus_cc",
        "cc_status": "sick",
        "priority": 3,
        "param": null,
        "downloadPath": null,
        "eventDate": "2021-08-24T00:00:00+00:00",
        "nextDate": "2021-08-24T11:50:05.471261+00:00",
        "isTerminated": false,
        "currentDate": "2021-08-24T13:50:05.620938+02:00",
        "eventId": "e8072fec-529e-4048-8af9-c1cb31ccc0af",
        "findings": [
          {
            "currentDate": "2021-08-24T13:50:05.620938+02:00",
            "docs": [
              "findings/e8072fec-529e-4048-8af9-c1cb31ccc0af.pdf"
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
        "event": "ticket"
      },
      {
        "level3Id": "c3c059d0-0562-4dc5-94ab-21c759fecd59",
        "resultKey": "LAB_DIG_RTCGI_HIG_SVE_1",
        "level1_valA": null,
        "level1_valB": null,
        "valA": null,
        "valB": null,
        "venomKey": "4556_CC_D_NDF",
        "level0_cc_key": "diseases_cc",
        "level1_cc_key": "consultation_cc",
        "cc_status": "available",
        "priority": 3,
        "param": null,
        "downloadPath": null,
        "eventDate": "2021-08-24T00:00:00+00:00",
        "nextDate": "2021-08-24T11:50:05.471261+00:00",
        "isTerminated": false,
        "currentDate": "2021-08-24T13:50:05.620938+02:00",
        "eventId": "e8072fec-529e-4048-8af9-c1cb31ccc0af",
        "findings": [
          {
            "currentDate": "2021-08-24T13:50:05.620938+02:00",
            "docs": [
              "findings/e8072fec-529e-4048-8af9-c1cb31ccc0af.pdf"
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
        "event": "ticket"
      },
      {
        "level3Id": "77ee9f6a-f0a6-4812-9b1e-65538c18fb11",
        "resultKey": "LAB_DIG_RTCGI_HIG_SVE_1",
        "level1_valA": null,
        "level1_valB": null,
        "valA": null,
        "valB": null,
        "venomKey": "566_CC",
        "level0_cc_key": "diseases_cc",
        "level1_cc_key": "healthstatus_cc",
        "cc_status": "sick",
        "priority": 3,
        "param": null,
        "downloadPath": null,
        "eventDate": "2021-08-24T00:00:00+00:00",
        "nextDate": "2021-08-24T11:50:05.471261+00:00",
        "isTerminated": false,
        "currentDate": "2021-08-24T13:50:05.620938+02:00",
        "eventId": "e8072fec-529e-4048-8af9-c1cb31ccc0af",
        "findings": [
          {
            "currentDate": "2021-08-24T13:50:05.620938+02:00",
            "docs": [
              "findings/e8072fec-529e-4048-8af9-c1cb31ccc0af.pdf"
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
        "event": "ticket"
      },
      {
        "level3Id": "105e7b30-a185-444a-a6dd-0952992b680c",
        "resultKey": "LAB_DIG_RTCGI_HIG_SVE_1",
        "level1_valA": null,
        "level1_valB": null,
        "valA": null,
        "valB": null,
        "venomKey": "566_CC_NDF",
        "level0_cc_key": "diseases_cc",
        "level1_cc_key": "consultation_cc",
        "cc_status": "available",
        "priority": 3,
        "param": null,
        "downloadPath": null,
        "eventDate": "2021-08-24T00:00:00+00:00",
        "nextDate": "2021-08-24T11:50:05.471261+00:00",
        "isTerminated": false,
        "currentDate": "2021-08-24T13:50:05.620938+02:00",
        "eventId": "e8072fec-529e-4048-8af9-c1cb31ccc0af",
        "findings": [
          {
            "currentDate": "2021-08-24T13:50:05.620938+02:00",
            "docs": [
              "findings/e8072fec-529e-4048-8af9-c1cb31ccc0af.pdf"
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
        "event": "ticket"
      },
      {
        "level3Id": "72cf1a65-b203-48ee-9084-9c58ec6ccb36",
        "resultKey": "LAB_DIG_RTCGI_HIG_SVE_1",
        "level1_valA": null,
        "level1_valB": null,
        "valA": null,
        "valB": null,
        "venomKey": "899_CC_D",
        "level0_cc_key": "diseases_cc",
        "level1_cc_key": "healthstatus_cc",
        "cc_status": "sick",
        "priority": 3,
        "param": null,
        "downloadPath": null,
        "eventDate": "2021-08-24T00:00:00+00:00",
        "nextDate": "2021-08-24T11:50:05.471261+00:00",
        "isTerminated": false,
        "currentDate": "2021-08-24T13:50:05.620938+02:00",
        "eventId": "e8072fec-529e-4048-8af9-c1cb31ccc0af",
        "findings": [
          {
            "currentDate": "2021-08-24T13:50:05.620938+02:00",
            "docs": [
              "findings/e8072fec-529e-4048-8af9-c1cb31ccc0af.pdf"
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
        "event": "ticket"
      },
      {
        "level3Id": "3a7b0b8b-a3ce-42d4-bb74-247c5a40ed00",
        "resultKey": "LAB_DIG_RTCGI_HIG_SVE_1",
        "level1_valA": null,
        "level1_valB": null,
        "valA": null,
        "valB": null,
        "venomKey": "899_CC_D_NDF",
        "level0_cc_key": "diseases_cc",
        "level1_cc_key": "consultation_cc",
        "cc_status": "available",
        "priority": 3,
        "param": null,
        "downloadPath": null,
        "eventDate": "2021-08-24T00:00:00+00:00",
        "nextDate": "2021-08-24T11:50:05.471261+00:00",
        "isTerminated": false,
        "currentDate": "2021-08-24T13:50:05.620938+02:00",
        "eventId": "e8072fec-529e-4048-8af9-c1cb31ccc0af",
        "findings": [
          {
            "currentDate": "2021-08-24T13:50:05.620938+02:00",
            "docs": [
              "findings/e8072fec-529e-4048-8af9-c1cb31ccc0af.pdf"
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
        "event": "ticket"
      },
      {
        "level3Id": "c6d8bfc7-4d2c-400e-a359-6774ede6a3df",
        "resultKey": "LAB_DIG_RTCGI_HIG_SVE_1",
        "level1_valA": null,
        "level1_valB": null,
        "valA": null,
        "valB": null,
        "venomKey": "A0027_CC_D",
        "level0_cc_key": "diseases_cc",
        "level1_cc_key": "healthstatus_cc",
        "cc_status": "sick",
        "priority": 3,
        "param": null,
        "downloadPath": null,
        "eventDate": "2021-08-24T00:00:00+00:00",
        "nextDate": "2021-08-24T11:50:05.471261+00:00",
        "isTerminated": false,
        "currentDate": "2021-08-24T13:50:05.620938+02:00",
        "eventId": "e8072fec-529e-4048-8af9-c1cb31ccc0af",
        "findings": [
          {
            "currentDate": "2021-08-24T13:50:05.620938+02:00",
            "docs": [
              "findings/e8072fec-529e-4048-8af9-c1cb31ccc0af.pdf"
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
        "event": "ticket"
      },
      {
        "level3Id": "39bc396a-2ad3-411b-ba1c-7e84de848607",
        "resultKey": "LAB_DIG_RTCGI_HIG_SVE_1",
        "level1_valA": null,
        "level1_valB": null,
        "valA": null,
        "valB": null,
        "venomKey": "A0027_CC_D_NDF",
        "level0_cc_key": "diseases_cc",
        "level1_cc_key": "consultation_cc",
        "cc_status": "available",
        "priority": 3,
        "param": null,
        "downloadPath": null,
        "eventDate": "2021-08-24T00:00:00+00:00",
        "nextDate": "2021-08-24T11:50:05.471261+00:00",
        "isTerminated": false,
        "currentDate": "2021-08-24T13:50:05.620938+02:00",
        "eventId": "e8072fec-529e-4048-8af9-c1cb31ccc0af",
        "findings": [
          {
            "currentDate": "2021-08-24T13:50:05.620938+02:00",
            "docs": [
              "findings/e8072fec-529e-4048-8af9-c1cb31ccc0af.pdf"
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
        "event": "ticket"
      },
      {
        "level3Id": "6fda492c-f65e-469d-931b-05cbb08b6bd3",
        "resultKey": "LAB_DIG_RTCGI_HIG_SVE_1",
        "level1_valA": null,
        "level1_valB": null,
        "valA": null,
        "valB": null,
        "venomKey": "gut_par_D",
        "level0_cc_key": "food_cc",
        "level1_cc_key": "diet_cc",
        "cc_status": "yes",
        "priority": 3,
        "param": null,
        "downloadPath": null,
        "eventDate": "2021-08-24T00:00:00+00:00",
        "nextDate": "2021-08-24T11:50:05.471261+00:00",
        "isTerminated": false,
        "currentDate": "2021-08-24T13:50:05.620938+02:00",
        "eventId": "e8072fec-529e-4048-8af9-c1cb31ccc0af",
        "findings": [
          {
            "currentDate": "2021-08-24T13:50:05.620938+02:00",
            "docs": [
              "findings/e8072fec-529e-4048-8af9-c1cb31ccc0af.pdf"
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
        "event": "ticket"
      }
    ],
    "internal": {
      "diseaseKey": "LAB_DIG_RTCGI_HIG_SVE_1",
      "eventDate": "2021-08-24T00:00:00+00:00"
    },
    "currentDate": "2021-08-24T13:50:05.620938+02:00",
    "eventId": "e8072fec-529e-4048-8af9-c1cb31ccc0af",
    "ticketId": "SX0TIBTZZI"
  }

}
