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
    "magazinKeys": [
      "MMED0049_DC"
    ],
    "venomList": [
      "84_CC_DNO",
      "84_CC_DNO_NDF"
    ],
    "textA4": null,
    "urgency": "hoch",
    "fupKeys": [],
    "backgroundImageLink": "https://firebasestorage.googleapis.com/v0/b/confidu-app.appspot.com/o/evaluations%2Fpattern%2Ftelevet_seamless.svg?alt=media&token=d18e9d04-076c-46b9-b68a-8a647b05a5ed",
    "slider": null,
    "textA1": {
      "visibility": null,
      "type": "list",
      "header": "Häufige Ursachen",
      "body": [
        "Parasitenbefall durch Flöhe oder Milben",
        "Flohspeichelallergie",
        "Futtermittelallergie",
        "Umweltallergie",
        "Hautentzündung",
        "Hautpilz",
        "Tumor",
        "immunbedingte Erkrankungen"
      ]
    },
    "actions": [
      {
        "link": "consultation",
        "key": null,
        "visibility": true,
        "body": "Wähle bequem einen Termin aus.",
        "header": "Du möchtest persönlich mit einem/einer Tierärzt:in sprechen?",
        "event": null,
        "label": "VIDEOANRUF VEREINBAREN"
      }
    ],
    "headerHeadlineH1": "Symptom:",
    "recipeKeys": [],
    "products": [
      {
        "body": [
          "Wir haben dir Präparate zusammengestellt, die Wuffel 4 beim Gesundungsprozess unterstützen können. Lege deine Auswahl in den Warenkorb."
        ],
        "list": [
          {
            "med_image_link": "https://firebasestorage.googleapis.com/v0/b/confidu-app.appspot.com/o/carecard%2Fmedication%2Fpowder.svg?alt=media&token=5cf15070-eaae-4306-a37a-6265fa7fef2f",
            "med_category": "Ergänzungsfuttermittel",
            "maxWeight": 25,
            "key": "REU",
            "med_duration_pd": 1,
            "minWeight": 10.1,
            "med_doses": "Messlöffel",
            "Wiederholung_Freq": null,
            "indication": {
              "body": {
                "indicationTeaser": "Fell & Haut Vital Hund & Katze",
                "indicationFirst": {
                  "header": "Das Ergänzungsfuttermittel wird angewendet bei Hunden und Katzen bei",
                  "body": [
                    "übermäßigem Haarausfall",
                    "Haarbruch",
                    "glanzlosem Fell",
                    "trockener, schuppiger Haut"
                  ]
                },
                "indicationOther": null,
                "indicactionCaution": "Zusammensetzung: Algenkalk, Bierhefe, Malzkeime, Brennnessel, Wildes Stiefmütterchen, Mariendistel, Queckenwurzel, Seealgenmehl, Traubenkernmehl, Ginkgo, Schwarzkümmelsamen, Sanddornbeeren, Spirulina;Analytische Bestandteile: Rohprotein 13,6%, Rohfett 3,3%, Rohfaser 11,7%, Rohasche 29,3%, Calcium 7,01%, Phosphor 0,29%, Natrium 0,32%, salzsäureunlösliche Asche 8,5%;Zusatzstoffe: Technologische Zusatzstoffe: Bentonit 1m558i 40g",
                "indicationSecond": null,
                "indicationProduct": "Ergänzungsfuttermittel zur Unterstützung von Haut und Fell",
                "indicationDeclaration": "Fell & Haut Vital Hund & Katze unterstützt die Hautfunktion und wirkt einem übermäßigen Haarverlust entgegen.",
                "indicationThird": null
              },
              "header": "Anwendungsgebiet"
            },
            "med_frequency": null,
            "med_amount": 1,
            "med_delivery": "confidu GmbH",
            "pharmacy": false,
            "product_pdf_dokument": "https://firebasestorage.googleapis.com/v0/b/confidu-app.appspot.com/o/shop%2Fpackage_insert%2Fcdvet_haut_und_fellvital_dog_cat_product_information_de.pdf?alt=media&token=244ebaac-65d5-4499-8bf6-97d9bc0ba9b2",
            "id": "REDDC5010000089",
            "diagnosis": [
              "Unterstützung der Hautfunktion bei Dermatose und übermäßigem Haarausfall"
            ],
            "med_header": null,
            "ticket_type": [
              "med_take"
            ],
            "med_amountdose": 10,
            "med_unit": "g",
            "medication": "Fell & Haut Vital Hund & Katze",
            "med_duration_length": -1,
            "prescription": false,
            "med_package_ges": "150 g Dose",
            "med_type": "Pulver",
            "med_name": "Fell & Haut Vital Hund & Katze",
            "feeding": true,
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
              "taxId": "49af4b5e9b624002bcc6de5ca0f693fe",
              "manufacturerId": "416e4d252e8d40ff901c8edbe83082a1",
              "unitId": null,
              "active": true,
              "displayGroup": "5ef01874999f8460593cff03d1e9339b",
              "manufacturerNumber": null,
              "ean": null,
              "sales": 0,
              "productNumber": "REDDC5010000089",
              "stock": 100,
              "availableStock": 100,
              "available": true,
              "deliveryTimeId": "14d1a0675d044d30965c2e4171c86bc0",
              "deliveryTime": {
                "name": "1-3 Tage",
                "min": 1,
                "max": 3,
                "unit": "day",
                "customFields": null,
                "_uniqueIdentifier": "14d1a0675d044d30965c2e4171c86bc0",
                "versionId": null,
                "translated": {
                  "name": "1-3 Tage",
                  "customFields": []
                },
                "createdAt": "2020-03-03T08:41:10.000+00:00",
                "updatedAt": null,
                "extensions": {
                  "internal_mapping_storage": {
                    "apiAlias": "array_struct"
                  },
                  "foreignKeys": {
                    "apiAlias": "array_struct"
                  }
                },
                "id": "14d1a0675d044d30965c2e4171c86bc0",
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
                "882e93043df54e368a506a54159ee476"
              ],
              "optionIds": null,
              "propertyIds": null,
              "name": "Fell & Haut Vital Hund & Katze",
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
                "_uniqueIdentifier": "49af4b5e9b624002bcc6de5ca0f693fe",
                "versionId": null,
                "translated": [],
                "createdAt": "2020-03-03T08:41:10.852+00:00",
                "updatedAt": "2020-05-22T12:35:16.655+00:00",
                "extensions": {
                  "internal_mapping_storage": {
                    "apiAlias": "array_struct"
                  },
                  "foreignKeys": {
                    "apiAlias": "array_struct"
                  }
                },
                "id": "49af4b5e9b624002bcc6de5ca0f693fe",
                "apiAlias": "tax"
              },
              "manufacturer": null,
              "unit": null,
              "cover": {
                "productId": "145f9a9fc1e646039d4c6111802ee45c",
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
                  "uploadedAt": "2020-11-26T13:14:05.609+00:00",
                  "alt": null,
                  "url": "https://demo-shop.tierversicherung.click/media/d9/a6/32/1606396445/powder.jpg",
                  "fileName": "powder",
                  "translations": null,
                  "thumbnails": [
                    {
                      "width": 400,
                      "height": 400,
                      "url": "https://demo-shop.tierversicherung.click/thumbnail/d9/a6/32/1606396445/powder_400x400.jpg",
                      "mediaId": "265c6d25fc674809bbeb8ab7af0a6a40",
                      "customFields": null,
                      "_uniqueIdentifier": "37611caa6de1453e95e3c947e5d55b61",
                      "versionId": null,
                      "translated": [],
                      "createdAt": "2020-11-26T13:14:06.359+00:00",
                      "updatedAt": null,
                      "extensions": {
                        "foreignKeys": {
                          "apiAlias": "array_struct"
                        }
                      },
                      "id": "37611caa6de1453e95e3c947e5d55b61",
                      "apiAlias": "media_thumbnail"
                    },
                    {
                      "width": 800,
                      "height": 800,
                      "url": "https://demo-shop.tierversicherung.click/thumbnail/d9/a6/32/1606396445/powder_800x800.jpg",
                      "mediaId": "265c6d25fc674809bbeb8ab7af0a6a40",
                      "customFields": null,
                      "_uniqueIdentifier": "7c72eec60f014433b59fcd08f5ee3ab4",
                      "versionId": null,
                      "translated": [],
                      "createdAt": "2020-11-26T13:14:06.359+00:00",
                      "updatedAt": null,
                      "extensions": {
                        "foreignKeys": {
                          "apiAlias": "array_struct"
                        }
                      },
                      "id": "7c72eec60f014433b59fcd08f5ee3ab4",
                      "apiAlias": "media_thumbnail"
                    },
                    {
                      "width": 1920,
                      "height": 1920,
                      "url": "https://demo-shop.tierversicherung.click/thumbnail/d9/a6/32/1606396445/powder_1920x1920.jpg",
                      "mediaId": "265c6d25fc674809bbeb8ab7af0a6a40",
                      "customFields": null,
                      "_uniqueIdentifier": "e36d167c68f6474197c4442e1a3adf2b",
                      "versionId": null,
                      "translated": [],
                      "createdAt": "2020-11-26T13:14:06.358+00:00",
                      "updatedAt": null,
                      "extensions": {
                        "foreignKeys": {
                          "apiAlias": "array_struct"
                        }
                      },
                      "id": "e36d167c68f6474197c4442e1a3adf2b",
                      "apiAlias": "media_thumbnail"
                    }
                  ],
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
                  "createdAt": "2020-05-20T11:38:36.931+00:00",
                  "updatedAt": "2021-07-15T12:31:49.611+00:00",
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
                "_uniqueIdentifier": "c4bc14a9551149ddb3e6879d0155c97f",
                "versionId": "0fa91ce3e96a4bc2be4bd9ce752c3425",
                "translated": [],
                "createdAt": "2021-07-15T12:25:31.587+00:00",
                "updatedAt": null,
                "extensions": {
                  "foreignKeys": {
                    "apiAlias": "array_struct"
                  }
                },
                "id": "c4bc14a9551149ddb3e6879d0155c97f",
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
              "coverId": "c4bc14a9551149ddb3e6879d0155c97f",
              "customFields": {
                "product_prescription": false,
                "product_pharmacy": false,
                "product_feeding": true,
                "product_ticket_type": "med_take",
                "product_med_category": "Ergänzungsfuttermittel",
                "product_medication_key": "REU"
              },
              "productReviews": null,
              "ratingAverage": null,
              "mainCategories": null,
              "seoUrls": null,
              "crossSellings": null,
              "canonicalProductId": null,
              "canonicalProduct": null,
              "_uniqueIdentifier": "145f9a9fc1e646039d4c6111802ee45c",
              "versionId": "0fa91ce3e96a4bc2be4bd9ce752c3425",
              "translated": {
                "metaDescription": null,
                "name": "Fell & Haut Vital Hund & Katze",
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
                  "product_medication_key": "REU"
                },
                "customSearchKeywords": null
              },
              "createdAt": "2021-07-15T12:25:31.589+00:00",
              "updatedAt": null,
              "extensions": {
                "foreignKeys": {
                  "apiAlias": "array_struct"
                }
              },
              "id": "145f9a9fc1e646039d4c6111802ee45c",
              "parentVersionId": "0fa91ce3e96a4bc2be4bd9ce752c3425",
              "productManufacturerVersionId": "0fa91ce3e96a4bc2be4bd9ce752c3425",
              "productMediaVersionId": null,
              "apiAlias": "product"
            }
          },
          {
            "med_header": null,
            "med_delivery": "confidu GmbH",
            "Wiederholung_Freq": null,
            "minWeight": 0,
            "med_image_link": "https://firebasestorage.googleapis.com/v0/b/confidu-app.appspot.com/o/carecard%2Fmedication%2Fshampoo.svg?alt=media&token=b28cd3e1-427f-4c3c-8911-3fb992f18f20",
            "med_duration_pd": 2,
            "med_unit": "ml",
            "med_amount": 1,
            "prescription": false,
            "med_category": "Haut- und Fellpflegeprodukt",
            "indication": {
              "header": "Anwendungsgebiet",
              "body": {
                "indicationOther": "Die milden Tenside reinigen schonend und zuverlässig. Aloe Vera und Panthenol beruhigen gereizte Haut und unterstützen ihre Regeneration. Nicht bei tragenden Katzen in Verbindung mit Griseofulvin anwenden. Nicht einsetzen bei Überempfindlichkeit gegenüber einem der Wirkstoffe oder der sonstigen Bestandteile. Hunde- und Katzenwelpen sollten solange nicht mit säugenden Muttertieren in Kontakt kommen, bis deren Fell nach Behandlung wieder vollständig abgetrocknet ist.",
                "indicationTeaser": "Cutamed",
                "indicationDeclaration": "Cutamed Shampoo® ist ein mild reinigendes Shampoo, welches antimikrobiell wirkt und auch bei sensibler Haut sehr gut verträglich ist.",
                "indicactionCaution": "Zusammensetzung: 100g enthalten als wirksame biozide Bestandteile 0,3g Polyhexanid (Polyhexamethylenbiguanid, polymeres) und 0,15g Milchsäure. Das Shampoo enthält <5% amphotere Tenside, < 5% nichtionische Tenside.",
                "indicationProduct": "Shampoo für bakterielle und fungale Hautprobleme",
                "indicationSecond": null,
                "indicationFirst": {
                  "header": "Das Shampoo wird angewendet bei Hunden und Katzen zur Keimreduktion bei einer übermäßigen Besiedlung der Haut mit Bakterien, Hefen (inkl. Malassezien) und Hautpilzen ",
                  "body": null
                },
                "indicationThird": null
              }
            },
            "feeding": false,
            "med_type": "Shampoo",
            "key": "CUT",
            "medication": "Cutamed Shampoo",
            "pharmacy": false,
            "id": "CUTDC2010000037",
            "med_name": "Cutamed Shampoo",
            "diagnosis": [
              "Antibakterielles Shampoo"
            ],
            "med_package_ges": "200 ml Flasche",
            "med_frequency": null,
            "product_pdf_dokument": "https://firebasestorage.googleapis.com/v0/b/confidu-app.appspot.com/o/shop%2Fpackage_insert%2Fcutamed_shampoo_dog_cat_product_information_de.pdf?alt=media&token=8da12ed2-2cc8-4d13-bc02-25b11c735e01",
            "med_duration_length": 1,
            "med_amountdose": 25,
            "ticket_type": [],
            "maxWeight": 100,
            "med_doses": "Milliliter",
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
              "taxId": "966304b96598413ebb9bce3e57fe8f73",
              "manufacturerId": "416e4d252e8d40ff901c8edbe83082a1",
              "unitId": null,
              "active": true,
              "displayGroup": "bc83309b61c661401861927cdc12fc42",
              "manufacturerNumber": null,
              "ean": null,
              "sales": 0,
              "productNumber": "CUTDC2010000037",
              "stock": 100,
              "availableStock": 100,
              "available": true,
              "deliveryTimeId": "14d1a0675d044d30965c2e4171c86bc0",
              "deliveryTime": {
                "name": "1-3 Tage",
                "min": 1,
                "max": 3,
                "unit": "day",
                "customFields": null,
                "_uniqueIdentifier": "14d1a0675d044d30965c2e4171c86bc0",
                "versionId": null,
                "translated": {
                  "name": "1-3 Tage",
                  "customFields": []
                },
                "createdAt": "2020-03-03T08:41:10.000+00:00",
                "updatedAt": null,
                "extensions": {
                  "internal_mapping_storage": {
                    "apiAlias": "array_struct"
                  },
                  "foreignKeys": {
                    "apiAlias": "array_struct"
                  }
                },
                "id": "14d1a0675d044d30965c2e4171c86bc0",
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
                "882e93043df54e368a506a54159ee476"
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
                "_uniqueIdentifier": "966304b96598413ebb9bce3e57fe8f73",
                "versionId": null,
                "translated": [],
                "createdAt": "2020-03-03T08:41:10.846+00:00",
                "updatedAt": "2020-05-22T12:35:51.693+00:00",
                "extensions": {
                  "internal_mapping_storage": {
                    "apiAlias": "array_struct"
                  },
                  "foreignKeys": {
                    "apiAlias": "array_struct"
                  }
                },
                "id": "966304b96598413ebb9bce3e57fe8f73",
                "apiAlias": "tax"
              },
              "manufacturer": null,
              "unit": null,
              "cover": {
                "productId": "f60e5e8e93bb4aefb49d3e6e7866a5c3",
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
                  "uploadedAt": "2020-11-26T13:14:05.481+00:00",
                  "alt": null,
                  "url": "https://demo-shop.tierversicherung.click/media/e7/be/a3/1606396445/shampoo.jpg",
                  "fileName": "shampoo",
                  "translations": null,
                  "thumbnails": [
                    {
                      "width": 400,
                      "height": 400,
                      "url": "https://demo-shop.tierversicherung.click/thumbnail/e7/be/a3/1606396445/shampoo_400x400.jpg",
                      "mediaId": "e2bd8c3c9b224644b076ad13b3065f9e",
                      "customFields": null,
                      "_uniqueIdentifier": "8ce96843f4cf4f2fa85ab2e05c95ac5f",
                      "versionId": null,
                      "translated": [],
                      "createdAt": "2020-11-26T13:14:06.197+00:00",
                      "updatedAt": null,
                      "extensions": {
                        "foreignKeys": {
                          "apiAlias": "array_struct"
                        }
                      },
                      "id": "8ce96843f4cf4f2fa85ab2e05c95ac5f",
                      "apiAlias": "media_thumbnail"
                    },
                    {
                      "width": 1920,
                      "height": 1920,
                      "url": "https://demo-shop.tierversicherung.click/thumbnail/e7/be/a3/1606396445/shampoo_1920x1920.jpg",
                      "mediaId": "e2bd8c3c9b224644b076ad13b3065f9e",
                      "customFields": null,
                      "_uniqueIdentifier": "bc1f82e6b7cd400bbdd3a9fe0eb89520",
                      "versionId": null,
                      "translated": [],
                      "createdAt": "2020-11-26T13:14:06.197+00:00",
                      "updatedAt": null,
                      "extensions": {
                        "foreignKeys": {
                          "apiAlias": "array_struct"
                        }
                      },
                      "id": "bc1f82e6b7cd400bbdd3a9fe0eb89520",
                      "apiAlias": "media_thumbnail"
                    },
                    {
                      "width": 800,
                      "height": 800,
                      "url": "https://demo-shop.tierversicherung.click/thumbnail/e7/be/a3/1606396445/shampoo_800x800.jpg",
                      "mediaId": "e2bd8c3c9b224644b076ad13b3065f9e",
                      "customFields": null,
                      "_uniqueIdentifier": "cb8d60fe4f5f437b939701a91c39ee08",
                      "versionId": null,
                      "translated": [],
                      "createdAt": "2020-11-26T13:14:06.198+00:00",
                      "updatedAt": null,
                      "extensions": {
                        "foreignKeys": {
                          "apiAlias": "array_struct"
                        }
                      },
                      "id": "cb8d60fe4f5f437b939701a91c39ee08",
                      "apiAlias": "media_thumbnail"
                    }
                  ],
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
                  "createdAt": "2020-05-20T11:38:36.858+00:00",
                  "updatedAt": "2021-07-15T12:26:33.834+00:00",
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
                "_uniqueIdentifier": "5297d0a40c6d4b5ab89dae0235528015",
                "versionId": "0fa91ce3e96a4bc2be4bd9ce752c3425",
                "translated": [],
                "createdAt": "2021-07-15T12:25:12.463+00:00",
                "updatedAt": null,
                "extensions": {
                  "foreignKeys": {
                    "apiAlias": "array_struct"
                  }
                },
                "id": "5297d0a40c6d4b5ab89dae0235528015",
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
              "coverId": "5297d0a40c6d4b5ab89dae0235528015",
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
              "_uniqueIdentifier": "f60e5e8e93bb4aefb49d3e6e7866a5c3",
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
              "createdAt": "2021-07-15T12:25:12.464+00:00",
              "updatedAt": null,
              "extensions": {
                "foreignKeys": {
                  "apiAlias": "array_struct"
                }
              },
              "id": "f60e5e8e93bb4aefb49d3e6e7866a5c3",
              "parentVersionId": "0fa91ce3e96a4bc2be4bd9ce752c3425",
              "productManufacturerVersionId": "0fa91ce3e96a4bc2be4bd9ce752c3425",
              "productMediaVersionId": null,
              "apiAlias": "product"
            }
          },
          {
            "prescription": false,
            "med_unit": null,
            "medication": "Halskragen, Plastik",
            "med_duration_length": null,
            "med_name": "Trixie Schutzkragen (Plastik) L",
            "product_pdf_dokument": "https://firebasestorage.googleapis.com/v0/b/confidu-app.appspot.com/o/shop%2Fpackage_insert%2Ft_u_%2Ftrixie_halskragen_dog_cat_product_information_de.pdf?alt=media&token=5476dda9-c253-465a-926e-d2354e1b962f",
            "med_category": "Zubehör",
            "med_type": "Halskragen",
            "indication": {
              "header": "Anwendungsgebiet",
              "body": {
                "indicationThird": null,
                "indicationFirst": {
                  "body": null,
                  "header": "Der Plastikkragen wird angewendet bei Hunden und Katzen zur Verhinderung des Beleckens von Wunden/Ekzemen und des Zerknabberns von Verbänden."
                },
                "indicationTeaser": "Halskragen",
                "indicationProduct": "Kragen zum Schutz vor Belecken",
                "indicationDeclaration": "Aus Kunststoff. Cm-Angaben entsprechen dem Halsumfang/der Kragenlänge.",
                "indicationOther": "So unterstützt er die Wundheilung.",
                "indicationSecond": null,
                "indicactionCaution": null
              }
            },
            "maxWeight": 30,
            "ticket_type": [],
            "minWeight": 15.1,
            "med_image_link": null,
            "med_duration_pd": null,
            "med_delivery": "confidu GmbH",
            "med_frequency": null,
            "diagnosis": [
              "Schutz vor Selbstverletzung"
            ],
            "med_header": null,
            "med_doses": null,
            "pharmacy": false,
            "id": "TRXDC0L10000130",
            "Wiederholung_Freq": null,
            "med_amountdose": null,
            "med_amount": 1,
            "key": "HAL",
            "med_package_ges": "1 Halskragen",
            "feeding": false,
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
              "taxId": "966304b96598413ebb9bce3e57fe8f73",
              "manufacturerId": "416e4d252e8d40ff901c8edbe83082a1",
              "unitId": null,
              "active": true,
              "displayGroup": "813fb86a7b368ad5754190038d9046cf",
              "manufacturerNumber": null,
              "ean": null,
              "sales": 0,
              "productNumber": "TRXDC0L10000130",
              "stock": 100,
              "availableStock": 100,
              "available": true,
              "deliveryTimeId": "14d1a0675d044d30965c2e4171c86bc0",
              "deliveryTime": {
                "name": "1-3 Tage",
                "min": 1,
                "max": 3,
                "unit": "day",
                "customFields": null,
                "_uniqueIdentifier": "14d1a0675d044d30965c2e4171c86bc0",
                "versionId": null,
                "translated": {
                  "name": "1-3 Tage",
                  "customFields": []
                },
                "createdAt": "2020-03-03T08:41:10.000+00:00",
                "updatedAt": null,
                "extensions": {
                  "internal_mapping_storage": {
                    "apiAlias": "array_struct"
                  },
                  "foreignKeys": {
                    "apiAlias": "array_struct"
                  }
                },
                "id": "14d1a0675d044d30965c2e4171c86bc0",
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
                "882e93043df54e368a506a54159ee476"
              ],
              "optionIds": null,
              "propertyIds": null,
              "name": "Trixie Schutzkragen (Plastik) L",
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
                "_uniqueIdentifier": "966304b96598413ebb9bce3e57fe8f73",
                "versionId": null,
                "translated": [],
                "createdAt": "2020-03-03T08:41:10.846+00:00",
                "updatedAt": "2020-05-22T12:35:51.693+00:00",
                "extensions": {
                  "internal_mapping_storage": {
                    "apiAlias": "array_struct"
                  },
                  "foreignKeys": {
                    "apiAlias": "array_struct"
                  }
                },
                "id": "966304b96598413ebb9bce3e57fe8f73",
                "apiAlias": "tax"
              },
              "manufacturer": null,
              "unit": null,
              "cover": {
                "productId": "0cd2b76c96e24b2697124b706c3ae3df",
                "mediaId": "1578c397ee204b8386c7ac5eb929e083",
                "position": 1,
                "media": {
                  "mimeType": "image/png",
                  "fileExtension": "png",
                  "fileSize": 836901,
                  "title": null,
                  "metaData": {
                    "width": 1280,
                    "height": 853,
                    "type": 3
                  },
                  "uploadedAt": "2020-11-26T13:14:06.476+00:00",
                  "alt": null,
                  "url": "https://demo-shop.tierversicherung.click/media/e1/86/f4/1606396446/greenpills-1280x0-c-default.png",
                  "fileName": "greenpills-1280x0-c-default",
                  "translations": null,
                  "thumbnails": [
                    {
                      "width": 400,
                      "height": 400,
                      "url": "https://demo-shop.tierversicherung.click/thumbnail/e1/86/f4/1606396446/greenpills-1280x0-c-default_400x400.png",
                      "mediaId": "1578c397ee204b8386c7ac5eb929e083",
                      "customFields": null,
                      "_uniqueIdentifier": "286a8970745041388f22e7077a2c5b6c",
                      "versionId": null,
                      "translated": [],
                      "createdAt": "2020-11-26T13:14:08.588+00:00",
                      "updatedAt": null,
                      "extensions": {
                        "foreignKeys": {
                          "apiAlias": "array_struct"
                        }
                      },
                      "id": "286a8970745041388f22e7077a2c5b6c",
                      "apiAlias": "media_thumbnail"
                    },
                    {
                      "width": 800,
                      "height": 800,
                      "url": "https://demo-shop.tierversicherung.click/thumbnail/e1/86/f4/1606396446/greenpills-1280x0-c-default_800x800.png",
                      "mediaId": "1578c397ee204b8386c7ac5eb929e083",
                      "customFields": null,
                      "_uniqueIdentifier": "45aefe5ecd3e463589903d569e4358a3",
                      "versionId": null,
                      "translated": [],
                      "createdAt": "2020-11-26T13:14:08.589+00:00",
                      "updatedAt": null,
                      "extensions": {
                        "foreignKeys": {
                          "apiAlias": "array_struct"
                        }
                      },
                      "id": "45aefe5ecd3e463589903d569e4358a3",
                      "apiAlias": "media_thumbnail"
                    },
                    {
                      "width": 1920,
                      "height": 1920,
                      "url": "https://demo-shop.tierversicherung.click/thumbnail/e1/86/f4/1606396446/greenpills-1280x0-c-default_1920x1920.png",
                      "mediaId": "1578c397ee204b8386c7ac5eb929e083",
                      "customFields": null,
                      "_uniqueIdentifier": "677818d3016c4853be95659ff71267a6",
                      "versionId": null,
                      "translated": [],
                      "createdAt": "2020-11-26T13:14:08.588+00:00",
                      "updatedAt": null,
                      "extensions": {
                        "foreignKeys": {
                          "apiAlias": "array_struct"
                        }
                      },
                      "id": "677818d3016c4853be95659ff71267a6",
                      "apiAlias": "media_thumbnail"
                    }
                  ],
                  "hasFile": true,
                  "private": false,
                  "customFields": null,
                  "_uniqueIdentifier": "1578c397ee204b8386c7ac5eb929e083",
                  "versionId": null,
                  "translated": {
                    "alt": null,
                    "title": null,
                    "customFields": []
                  },
                  "createdAt": "2020-11-26T12:25:45.270+00:00",
                  "updatedAt": "2021-07-15T12:31:58.188+00:00",
                  "extensions": {
                    "internal_mapping_storage": {
                      "apiAlias": "array_struct"
                    },
                    "foreignKeys": {
                      "apiAlias": "array_struct"
                    }
                  },
                  "id": "1578c397ee204b8386c7ac5eb929e083",
                  "apiAlias": "media"
                },
                "customFields": null,
                "_uniqueIdentifier": "502b921948264de8a17854da406c2c52",
                "versionId": "0fa91ce3e96a4bc2be4bd9ce752c3425",
                "translated": [],
                "createdAt": "2021-07-15T12:25:43.125+00:00",
                "updatedAt": null,
                "extensions": {
                  "foreignKeys": {
                    "apiAlias": "array_struct"
                  }
                },
                "id": "502b921948264de8a17854da406c2c52",
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
              "coverId": "502b921948264de8a17854da406c2c52",
              "customFields": {
                "product_prescription": false,
                "product_pharmacy": false,
                "product_feeding": false,
                "product_med_category": "Zubehör",
                "product_medication_key": "HAL"
              },
              "productReviews": null,
              "ratingAverage": null,
              "mainCategories": null,
              "seoUrls": null,
              "crossSellings": null,
              "canonicalProductId": null,
              "canonicalProduct": null,
              "_uniqueIdentifier": "0cd2b76c96e24b2697124b706c3ae3df",
              "versionId": "0fa91ce3e96a4bc2be4bd9ce752c3425",
              "translated": {
                "metaDescription": null,
                "name": "Trixie Schutzkragen (Plastik) L",
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
                  "product_medication_key": "HAL"
                },
                "customSearchKeywords": null
              },
              "createdAt": "2021-07-15T12:25:43.127+00:00",
              "updatedAt": null,
              "extensions": {
                "foreignKeys": {
                  "apiAlias": "array_struct"
                }
              },
              "id": "0cd2b76c96e24b2697124b706c3ae3df",
              "parentVersionId": "0fa91ce3e96a4bc2be4bd9ce752c3425",
              "productManufacturerVersionId": "0fa91ce3e96a4bc2be4bd9ce752c3425",
              "productMediaVersionId": null,
              "apiAlias": "product"
            }
          }
        ],
        "headline": "Was du brauchst",
        "info": null
      }
    ],
    "image": null,
    "initial": {
      "visibility": true,
      "type": "par",
      "body": [
        "Deine Angaben führen leider nicht zu einer eindeutigen Diagnose, der der Fall von Wuffel 4 scheint etwas komplexer zu sein und muss weiter aufgearbeitet werden.",
        "Die Ursachen für Juckreiz sind vielschichtig. Sehr häufig sind Parasiten wie Flöhe und Milben oder Hautpilze beteiligt. Auch eine Futtermittelunverträglichkeit oder allergische Reaktionen auf Flohspeichel und Umweltallergene können ursächlich sein."
      ],
      "header": "Was heißt das?"
    },
    "iconImageLink": "https://firebasestorage.googleapis.com/v0/b/confidu-app.appspot.com/o/evaluations%2Fevaluation_medical_negative.svg?alt=media&token=96756222-d842-4c82-a19a-e551e4d0d75e",
    "therapy": "tierärztliche Konsultation nötig",
    "textA3": {
      "header": "Wie du helfen kannst",
      "visibility": true,
      "body": [
        {
          "textblockText": null,
          "textblockHeadline": "Diagnostik und Monitoring",
          "textblockList": []
        },
        {
          "textblockList": [],
          "textblockHeadline": null,
          "textblockText": "Nimm innerhalb der nächsten 24 Std. tierärztliche Hilfe in Anspruch, um dem Problem auf den Grund zu gehen und Wuffel 4 zu helfen: Vereinbare entweder zeitnah einen Videoanruf mit den confidu Tierärzt:innen oder suche mit Wuffel 4 eine Tierarztpraxis oder -klinik auf."
        },
        {
          "textblockText": "Nach der Diagnosestellung und Behandlung kann confidu dich weiter unterstützen: Wir helfen dir unter anderem bei Fütterung, Medikamentengabe und mit medizinischen Tests. Lege einfach nach dem Tierarztbesuch die Diagnose in der CareCard von Wuffel 4 über den Rechnungsscan an. Nach einem Videoanruf mit confidu übernehmen wir dies für dich.",
          "textblockList": [],
          "textblockHeadline": null
        },
        {
          "textblockHeadline": "Fütterung",
          "textblockText": null,
          "textblockList": []
        },
        {
          "textblockList": [],
          "textblockText": "Bei Hauterkrankungen kannst du die Hautbarriere stärken und weitere Entzündungen vermeiden, zum Beispiel mit einem omega-3-fettsäurehaltigen Ergänzungsfuttermittel.",
          "textblockHeadline": null
        },
        {
          "textblockText": null,
          "textblockHeadline": "Management",
          "textblockList": []
        },
        {
          "textblockText": "Setze, wenn nötig, deinem Vierbeiner einen Halskragen auf, damit das Problem nicht durch Kratzen und Lecken verschlimmert wird. ",
          "textblockList": [],
          "textblockHeadline": null
        }
      ],
      "type": "keys"
    },
    "eventDate": null,
    "headerHeadlineH2": "Juckreiz",
    "ticketKeys": [],
    "textA5": null,
    "textA2": null,
    "nextDate": null,
    "popup": {
      "buttonConfirm": {
        "label": "SPEICHERN",
        "type": "confirm"
      },
      "buttonCancel": {
        "type": "cancel",
        "label": "VERWERFEN"
      },
      "popupOptionText": "Möchtest du das Symptom in der CareCard ablegen? Dort kannst du sie jederzeit wieder einsehen."
    },
    "findings": {
      "visibility": null,
      "header": "Deine Angaben",
      "body": {
        "answers": [
          {
            "name": "ALJ_Q1",
            "values": {
              "answer": {
                "answerUnit": null,
                "value": "ALJ_Q1_Y",
                "answerLongtext": [
                  "ja"
                ],
                "minSpecifics": 0,
                "answerValue": null,
                "imageLinkAnswer": null,
                "subject": null,
                "ccEntry": null,
                "venomKey": null,
                "imageLinkDetailAnswer": null
              }
            },
            "questionText": "Kommt Wuffel 4 aus dem (vor allem südlichen) Ausland oder war vor kurzem mit im Urlaub im Süden?",
            "questionType": "R"
          },
          {
            "name": "ALJ_Q2",
            "values": {
              "answer": {
                "imageLinkDetailAnswer": null,
                "answerValue": null,
                "subject": null,
                "answerLongtext": [
                  "besteht erst seit ein paar Tagen"
                ],
                "venomKey": null,
                "minSpecifics": 0,
                "value": "ALJ_Q2_R1",
                "imageLinkAnswer": null,
                "ccEntry": null,
                "answerUnit": null
              }
            },
            "questionText": "Wann tritt der Juckreiz auf?",
            "questionType": "R"
          },
          {
            "name": "JUC_Q2",
            "values": {
              "answer": {
                "subject": null,
                "imageLinkAnswer": "https://firebasestorage.googleapis.com/v0/b/confidu-app.appspot.com/o/televet_icons_new%2FSkin%20Dog%2FALJ_Q4_R1_JUC_Q2_R1.svg?alt=media&token=1d1f9bc6-0876-4796-8cd2-718f79464b6d",
                "imageLinkDetailAnswer": null,
                "venomKey": null,
                "value": "JUC_Q2_R1",
                "answerLongtext": [
                  "vor allem im Schwanzwurzel-/Rückenbereich"
                ],
                "answerValue": null,
                "answerUnit": null,
                "minSpecifics": 0,
                "ccEntry": null
              }
            },
            "questionText": "Gibt es ein bestimmtes Verteilungsmuster der juckenden Hautstelle(n)?",
            "questionType": "C"
          },
          {
            "name": "JUC_Q3",
            "values": {
              "answer": {
                "answerValue": null,
                "subject": null,
                "ccEntry": null,
                "value": "JUC_Q3_R1",
                "answerLongtext": [
                  "kreisrund und haarlos"
                ],
                "imageLinkAnswer": "https://firebasestorage.googleapis.com/v0/b/confidu-app.appspot.com/o/televet_icons_new%2FSkin%20Symptoms%2Fanj_q4_r1.svg?alt=media&token=066b39a4-c7ec-4145-8cbf-337be4242411",
                "minSpecifics": 0,
                "venomKey": null,
                "imageLinkDetailAnswer": null,
                "answerUnit": null
              }
            },
            "questionText": "Sind kahle Stellen bei Wuffel 4 vorhanden? Beschreibe die Form und Größe.",
            "questionType": "C"
          },
          {
            "name": "JUC_Q5",
            "values": {
              "answer": {
                "subject": null,
                "answerLongtext": [
                  "gerötet mit kleinen Pusteln oder Krusten"
                ],
                "imageLinkDetailAnswer": "https://firebasestorage.googleapis.com/v0/b/confidu-app.appspot.com/o/televet_icons_new%2FSkin%20Symptoms%2Falj_q7_r1juc_q5_r1.jpg?alt=media&token=7d05b486-e24d-4380-a4b5-4a4a6b464301",
                "imageLinkAnswer": "https://firebasestorage.googleapis.com/v0/b/confidu-app.appspot.com/o/televet_icons_new%2FSkin%20Symptoms%2Fimage%2Falj_q7_r1juc_q5_r1.jpg?alt=media&token=f8323304-6399-4874-a180-65335a2c541d",
                "venomKey": null,
                "value": "JUC_Q5_R1",
                "answerUnit": null,
                "ccEntry": null,
                "minSpecifics": 0,
                "answerValue": null
              }
            },
            "questionText": "Sieh dir die juckende(n) Hautstelle(n) von Wuffel 4 genauer an. Wie würdest du sie beschreiben? Die Haut ist…",
            "questionType": "C"
          },
          {
            "name": "JUC_Q6",
            "values": {
              "answer": {
                "imageLinkDetailAnswer": null,
                "answerValue": null,
                "imageLinkAnswer": null,
                "minSpecifics": 0,
                "subject": null,
                "ccEntry": null,
                "answerUnit": null,
                "value": "JUC_Q6_Y",
                "answerLongtext": [
                  "ja"
                ],
                "venomKey": null
              }
            },
            "questionText": "Ist das Fell der betroffenen Hautstelle(n) ausgefallen und die Haut erscheint dort in der Mitte dunkler?",
            "questionType": "R"
          },
          {
            "name": "ANJ_Q10",
            "values": {
              "answer": {
                "ccEntry": null,
                "minSpecifics": 0,
                "answerLongtext": [
                  "nein"
                ],
                "answerValue": null,
                "venomKey": null,
                "subject": null,
                "imageLinkAnswer": null,
                "answerUnit": null,
                "value": "ANJ_Q10_N",
                "imageLinkDetailAnswer": null
              }
            },
            "questionText": "Zeigen andere Familienmitglieder (zwei- oder vierbeinig), die im engen Kontakt zu Wuffel 4 stehen, ebenfalls Hautveränderungen? ",
            "questionType": "R"
          },
          {
            "name": "ALJ_Q8",
            "values": {
              "answer": {
                "imageLinkAnswer": null,
                "value": "ALJ_Q8_R3",
                "subject": null,
                "answerUnit": null,
                "answerLongtext": [
                  "nein"
                ],
                "minSpecifics": 0,
                "ccEntry": null,
                "imageLinkDetailAnswer": null,
                "venomKey": null,
                "answerValue": null
              }
            },
            "questionText": "Gab es einen Wechsel bestimmter Dinge im Umfeld von Wuffel 4 und traten die Hautprobleme danach auf?",
            "questionType": "R"
          },
          {
            "name": "FLO_Q1",
            "values": {
              "answer": {
                "subject": null,
                "venomKey": null,
                "ccEntry": null,
                "answerLongtext": [
                  "nein"
                ],
                "answerUnit": null,
                "imageLinkAnswer": null,
                "value": "FLO_Q1_N",
                "minSpecifics": 0,
                "answerValue": null,
                "imageLinkDetailAnswer": null
              }
            },
            "questionText": "Sind Flöhe oder Flohkot im Fell von Wuffel 4 zu sehen? ",
            "questionType": "R"
          },
          {
            "name": "ALJ_Q9",
            "values": {
              "answer": {
                "answerValue": null,
                "minSpecifics": 0,
                "value": "ALJ_Q9_N",
                "ccEntry": null,
                "imageLinkAnswer": null,
                "answerLongtext": [
                  "nein"
                ],
                "answerUnit": null,
                "imageLinkDetailAnswer": null,
                "venomKey": null,
                "subject": null
              }
            },
            "questionText": "Sind im Fell kleine weiße Punkte sichtbar, die aussehen wie Schuppen, sich aber bei längerer Betrachtung bewegen?",
            "questionType": "R"
          },
          {
            "name": "ALJ_Q11",
            "values": {
              "answer": {
                "answerLongtext": [
                  "nein"
                ],
                "venomKey": null,
                "answerUnit": null,
                "answerValue": null,
                "imageLinkDetailAnswer": null,
                "imageLinkAnswer": null,
                "subject": null,
                "minSpecifics": 0,
                "ccEntry": null,
                "value": "ALJ_Q11_R3"
              }
            },
            "questionText": "Tritt der Juckreiz vor allem nach Spaziergängen durch hohe Wiesen und Gräser auf? ",
            "questionType": "R"
          },
          {
            "name": "ALJ_Q12",
            "values": {
              "answer": {
                "imageLinkDetailAnswer": null,
                "subject": null,
                "answerValue": null,
                "value": "ALJ_Q12_N",
                "answerLongtext": [
                  "nein"
                ],
                "minSpecifics": 0,
                "answerUnit": null,
                "imageLinkAnswer": null,
                "ccEntry": null,
                "venomKey": null
              }
            },
            "questionText": "Ist der Pinnal-Pedal-Reflex bei Wuffel 4 auslösbar?",
            "questionType": "R"
          },
          {
            "name": "ALJ_Q13",
            "values": {
              "answer": {
                "minSpecifics": 0,
                "ccEntry": null,
                "answerValue": null,
                "answerUnit": null,
                "imageLinkAnswer": null,
                "imageLinkDetailAnswer": null,
                "answerLongtext": [
                  "nein"
                ],
                "venomKey": null,
                "subject": null,
                "value": "ALJ_Q13_N"
              }
            },
            "questionText": "Leidet Wuffel 4 aktuell unter einem Herzwurmbefall?",
            "questionType": "R"
          },
          {
            "name": "SHA_Q6",
            "values": {
              "answer": {
                "answerLongtext": [
                  "nein"
                ],
                "minSpecifics": 0,
                "venomKey": null,
                "answerUnit": null,
                "imageLinkDetailAnswer": null,
                "imageLinkAnswer": null,
                "ccEntry": null,
                "subject": null,
                "value": "SHA_Q6_N",
                "answerValue": null
              }
            },
            "questionText": "Besteht bei Wuffel 4 aktuell eine Nierenerkrankung?",
            "questionType": "R"
          },
          {
            "name": "SHA_Q9",
            "values": {
              "answer": {
                "answerValue": null,
                "subject": null,
                "answerUnit": null,
                "imageLinkDetailAnswer": null,
                "ccEntry": null,
                "imageLinkAnswer": null,
                "venomKey": null,
                "value": "SHA_Q9_N",
                "minSpecifics": 0,
                "answerLongtext": [
                  "nein"
                ]
              }
            },
            "questionText": "Liegt bei Wuffel 4 aktuell eine Lebererkrankung vor?",
            "questionType": "R"
          },
          {
            "name": "SHA_Q12",
            "values": {
              "answer": {
                "answerLongtext": [
                  "nein"
                ],
                "value": "SHA_Q12_N",
                "ccEntry": null,
                "answerValue": null,
                "minSpecifics": 0,
                "imageLinkDetailAnswer": null,
                "imageLinkAnswer": null,
                "venomKey": null,
                "answerUnit": null,
                "subject": null
              }
            },
            "questionText": "Werden Wuffel 4 aktuell Schmerzmittel der Gruppe NSAIDs verabreicht?",
            "questionType": "R"
          },
          {
            "name": "SHA_Q14",
            "values": {
              "answer": {
                "minSpecifics": 0,
                "answerLongtext": [
                  "nein"
                ],
                "imageLinkAnswer": null,
                "subject": null,
                "venomKey": null,
                "value": "SHA_Q14_N",
                "answerUnit": null,
                "answerValue": null,
                "ccEntry": null,
                "imageLinkDetailAnswer": null
              }
            },
            "questionText": "Nimmt Wuffel 4 aktuell Entzündungshemmer der Gruppe Glukokortikoide?",
            "questionType": "R"
          },
          {
            "name": "FLO_Q3",
            "values": {
              "answer": {
                "answerLongtext": [
                  "nein"
                ],
                "subject": null,
                "venomKey": null,
                "ccEntry": null,
                "value": "FLO_Q3_N",
                "answerUnit": null,
                "minSpecifics": 0,
                "imageLinkDetailAnswer": null,
                "imageLinkAnswer": null,
                "answerValue": null
              }
            },
            "questionText": "Werden Wuffel 4 aktuell warfarinhaltige Gerinnungshemmer verabreicht?",
            "questionType": "R"
          },
          {
            "name": "AJ_Q9",
            "values": {
              "answer": {
                "value": "AJ_Q9_N",
                "venomKey": null,
                "answerValue": null,
                "minSpecifics": 0,
                "subject": null,
                "imageLinkDetailAnswer": null,
                "answerLongtext": [
                  "nein"
                ],
                "imageLinkAnswer": null,
                "answerUnit": null,
                "ccEntry": null
              }
            },
            "questionText": "Hat Wuffel 4 kürzlich Medikamente gegen Ektoparasiten verabreicht oder aufgetropft bekommen?",
            "questionType": "R"
          },
          {
            "name": "ANJ_Q16",
            "values": {
              "answer": {
                "ccEntry": null,
                "minSpecifics": 0,
                "answerValue": null,
                "imageLinkDetailAnswer": null,
                "value": "ANJ_Q16_N",
                "venomKey": null,
                "subject": null,
                "answerLongtext": [
                  "nein"
                ],
                "imageLinkAnswer": null,
                "answerUnit": null
              }
            },
            "questionText": "Werden Wuffel 4 aktuell Medikamente gegen Pilzbefall verabreicht?",
            "questionType": "R"
          },
          {
            "name": "ANJ_Q18",
            "values": {
              "answer": {
                "imageLinkAnswer": null,
                "value": "ANJ_Q18_N",
                "answerLongtext": [
                  "nein"
                ],
                "imageLinkDetailAnswer": null,
                "answerValue": null,
                "answerUnit": null,
                "ccEntry": null,
                "venomKey": null,
                "subject": null,
                "minSpecifics": 0
              }
            },
            "questionText": "Nimmt Wuffel 4 aktuell Immunsuppressiva ein?",
            "questionType": "R"
          },
          {
            "name": "ANJ_Q19",
            "values": {
              "answer": {
                "value": "ANJ_Q19_N",
                "venomKey": null,
                "imageLinkAnswer": null,
                "answerLongtext": [
                  "nein"
                ],
                "subject": null,
                "imageLinkDetailAnswer": null,
                "ccEntry": null,
                "answerValue": null,
                "minSpecifics": 0,
                "answerUnit": null
              }
            },
            "questionText": "Bekommt Wuffel 4 aktuell Mittel gegen Magenübersäuerung?",
            "questionType": "R"
          },
          {
            "name": "AJ_Q10",
            "values": {
              "answer": {
                "ccEntry": null,
                "imageLinkDetailAnswer": null,
                "answerLongtext": [
                  "nein"
                ],
                "answerValue": null,
                "minSpecifics": 0,
                "value": "AJ_Q10_N",
                "answerUnit": null,
                "subject": null,
                "imageLinkAnswer": null,
                "venomKey": null
              }
            },
            "questionText": "Liegt bei Wuffel 4 eine Unverträglichkeit oder Allergie gegen Ektoparasitenmittel vor?",
            "questionType": "R"
          },
          {
            "name": "ANJ_Q17",
            "values": {
              "answer": {
                "imageLinkAnswer": null,
                "answerUnit": null,
                "imageLinkDetailAnswer": null,
                "venomKey": null,
                "minSpecifics": 0,
                "answerValue": null,
                "answerLongtext": [
                  "nein"
                ],
                "subject": null,
                "ccEntry": null,
                "value": "ANJ_Q17_N"
              }
            },
            "questionText": "Liegt bei Wuffel 4 eine Unverträglichkeit oder Allergie gegen Medikamente gegen Pilzbefall?",
            "questionType": "R"
          },
          {
            "name": "ALJ_Q14",
            "values": {
              "answer": {
                "ccEntry": null,
                "imageLinkDetailAnswer": null,
                "value": "ALJ_Q14_N",
                "answerLongtext": [
                  "nein"
                ],
                "venomKey": null,
                "minSpecifics": 0,
                "imageLinkAnswer": null,
                "subject": null,
                "answerValue": null,
                "answerUnit": null
              }
            },
            "questionText": "Hat Wuffel 4 eine Unverträglichkeit oder Allergie gegen den Juckreizhemmer Apoquel® (Oclacitinib)?",
            "questionType": "R"
          },
          {
            "name": "SHA_Q19",
            "values": {
              "answer": {
                "imageLinkDetailAnswer": null,
                "answerValue": 23,
                "answerLongtext": null,
                "minSpecifics": 0,
                "answerUnit": null,
                "ccEntry": "W",
                "imageLinkAnswer": null,
                "subject": null,
                "value": "*pet_weight*",
                "venomKey": null
              }
            },
            "questionText": "Gib das aktuelle Gewicht von Wuffel 4 an.",
            "questionType": "Z"
          },
          {
            "name": "SHA_Q20",
            "values": {
              "answer": {
                "answerLongtext": null,
                "answerUnit": null,
                "subject": null,
                "answerValue": [],
                "minSpecifics": 0,
                "value": "*pet_image*",
                "ccEntry": null,
                "imageLinkDetailAnswer": null,
                "imageLinkAnswer": null,
                "venomKey": null
              }
            },
            "questionText": "Du hast das Symptom fotografiert? Hier kannst du die Bilder hochladen. (optional)",
            "questionType": "F"
          },
          {
            "name": "DIS_Q1",
            "values": {
              "answer": {
                "value": "DIS_Q1_N",
                "subject": null,
                "answerUnit": null,
                "imageLinkDetailAnswer": null,
                "minSpecifics": 0,
                "venomKey": null,
                "ccEntry": null,
                "answerValue": null,
                "imageLinkAnswer": null,
                "answerLongtext": [
                  "nein"
                ]
              }
            },
            "questionText": "Hat Wuffel 4 weitere gesundheitliche Probleme oder Symptome, die nicht abgefragt wurden?",
            "questionType": "R"
          },
          {
            "name": "DIS_Q2",
            "values": {
              "answer": {
                "minSpecifics": 0,
                "subject": null,
                "answerValue": null,
                "ccEntry": null,
                "imageLinkDetailAnswer": null,
                "imageLinkAnswer": null,
                "value": "DIS_Q2_true",
                "venomKey": null,
                "answerUnit": null,
                "answerLongtext": [
                  "Ich bestätige, dass ich alle Fragen nach bestem Wissen, wahrheitsgemäß und vollständig beantwortet habe und dass ich dieses Medikament zur Behandlung der oben genannten Erkrankung meines Tieres Wuffel 4 verwende.",
                  "Mit Klicken dieser Box bestätige ich, dass ich die AGB & Widerrufsbelehrung und Datenschutzerklärung gelesen habe und diese akzeptiere."
                ]
              }
            },
            "questionText": "Wichtige Informationen!",
            "questionType": "CH2"
          }
        ],
        "param": null,
        "text": null,
        "legend": null
      }
    },
    "carecard": [
      {
        "level3Id": "c021af2b-74c6-4f46-ba17-b350c0df7f8b",
        "resultKey": "TEL_NO_DIA_JUC_1",
        "level1_valA": "23",
        "level1_valB": null,
        "valA": "23",
        "valB": null,
        "venomKey": "w+weightac_variable_uwght",
        "level0_cc_key": "prevention_cc",
        "level1_cc_key": "w+weightac",
        "cc_status": "variable_uwght",
        "priority": 9,
        "param": null,
        "downloadPath": null,
        "eventDate": "2021-07-16T12:31:49.420309+02:00",
        "nextDate": null,
        "currentDate": "2021-07-16T12:31:49.644766+02:00",
        "eventId": "f62bb9f4-c959-4ed5-8d2d-f6103b835d94",
        "findings": [
          {
            "currentDate": "2021-07-16T12:31:49.644766+02:00",
            "docs": [
              "findings/94e87d0d-2ca1-420a-9c80-48b6300f0c41.pdf"
            ],
            "id": null,
            "name": "name",
            "image": null,
            "region": {
              "name": "name",
              "value": null
            },
            "type": "pdf"
          }
        ],
        "currentWeight": 23
      },
      {
        "level3Id": "c20588f0-5bc0-4aea-9e82-a1de5491978c",
        "resultKey": "TEL_NO_DIA_JUC_1",
        "level1_valA": null,
        "level1_valB": null,
        "valA": null,
        "valB": null,
        "venomKey": "84_CC_DNO",
        "level0_cc_key": "diseases_cc",
        "level1_cc_key": "healthstatus_cc",
        "cc_status": "sick",
        "priority": 3,
        "param": null,
        "downloadPath": null,
        "eventDate": "2021-07-16T12:31:49.420309+02:00",
        "nextDate": "2021-07-16T10:31:49.451005+00:00",
        "currentDate": "2021-07-16T12:31:49.644766+02:00",
        "eventId": "f62bb9f4-c959-4ed5-8d2d-f6103b835d94",
        "findings": [
          {
            "currentDate": "2021-07-16T12:31:49.644766+02:00",
            "docs": [
              "findings/94e87d0d-2ca1-420a-9c80-48b6300f0c41.pdf"
            ],
            "id": null,
            "name": "name",
            "image": null,
            "region": {
              "name": "name",
              "value": null
            },
            "type": "pdf"
          }
        ],
        "currentWeight": 23
      },
      {
        "level3Id": "1ec4d82e-fb2e-4406-8f1b-59e8b5876428",
        "resultKey": "TEL_NO_DIA_JUC_1",
        "level1_valA": null,
        "level1_valB": null,
        "valA": null,
        "valB": null,
        "venomKey": "84_CC_DNO_NDF",
        "level0_cc_key": "diseases_cc",
        "level1_cc_key": "consultation_cc",
        "cc_status": "available",
        "priority": 3,
        "param": null,
        "downloadPath": null,
        "eventDate": "2021-07-16T12:31:49.420309+02:00",
        "nextDate": "2021-07-16T10:31:49.451005+00:00",
        "currentDate": "2021-07-16T12:31:49.644766+02:00",
        "eventId": "f62bb9f4-c959-4ed5-8d2d-f6103b835d94",
        "findings": [
          {
            "currentDate": "2021-07-16T12:31:49.644766+02:00",
            "docs": [
              "findings/94e87d0d-2ca1-420a-9c80-48b6300f0c41.pdf"
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
        "currentWeight": 23
      }
    ],
    "currentDate": "2021-07-16T12:31:49.644766+02:00",
    "eventId": "f62bb9f4-c959-4ed5-8d2d-f6103b835d94",
    "ticketId": null
  }

}
