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


  public instructionPages = {
    harnstick: {
      guide: [
        {
          image: `${this.iconPath}/urinestick-instructions-1.svg`,
          title: 'Schritt 1',
          text: `Zum Auffangen der Urinprobe verwende ein sauberes und trockenes Gefäß.`
        },
        {
          image: `${this.iconPath}/urinestick-instructions-2.svg`,
          title: 'Schritt 2',
          text: `Kleiner Tipp: Um Hermann dabei möglichst wenig zu stören, kannst du unsere Kelle nutzen. Diese ist flach und bringt
           einen größeren Abstand zwischen Dich und Hermann, während Du die Probe auffängst.`
        },
        {
          image: `${this.iconPath}/urinestick-instructions-3.svg`,
          title: 'Schritt 3',
          text: `Die Probe bitte nicht schütteln und innerhalb einer Stunde den Harnsticktest durchführen.`
        },
        {
          image: `${this.iconPath}/urinestick-instructions-4.svg`,
          title: 'Schritt 4',
          text: `Tauche nun den Stick senkrecht für ca. 1 Stunde in die Urinprobe ein. Achte dabei darauf, die Testfelder mit nicht
           deinen Händen zu berühren und alle Testfelder mit der Probe zu benetzen.`
        },
        {
          image: `${this.iconPath}/urinestick-instructions-5.svg`,
          title: 'Schritt 5',
          text: `Lege nun den Harnstick auf die dafür markierte Fläche der Farbskala.`
        },
        {
          image: `${this.iconPath}/urinestick-instructions-6.svg`,
          title: 'Schritt 6',
          text: `Starte den Test auf deinem Telefon. Während der 60 sekündige Timer läuft, richte die Kamera deines Telefons an
          dem eingeblendeten Raster aus. Der Scan erfolgt automatisch.`
        }
      ],
      info: {
        title: 'Warum ist ein Harnsticktest sinnvoll?',
        paragraphs: [
          `
          Erkenne Erkrankungen der Nieren, Harnwege, Leber, sowie Stoffwechselstörungen frühzeitig bequem von zu Hause
          aus und erhalte direkt Therapieempfehlungen durch unsere Tierärzte.
         `,
          `
          Deine Vorteile: Testergebnis nach 60 Sekunden, Kontrolle bei bestehenden Erkrankungen. Direkte Auswertung.
        `,
          `
          Der Test umfasst 14 Parameter: Spezifisches Gewicht, Proteine, pH-Wert, Glucose, Ketonkörper, Blut, Leukozyten,
          Nitrite, Bilirubin, Urobilinogen, Kreatinin, Vitamin C, Mikroalbinum, Calcium
        `
        ]
      }
    }
  };


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
      'sw-context-token': localStorage.getItem('sw-token') || null
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


  public blah ={
    "iconImageLink": "https://firebasestorage.googleapis.com/v0/b/confidu-app.appspot.com/o/evaluations%2Fevaluation_bodycondition_dog_negative.svg?alt=media&token=8ea08cd3-1fc0-4a90-823e-93fe2262c238",
    "nextDate": null,
    "slider": null,
    "headerHeadlineH1": "Körperkondition:",
    "eventDate": null,
    "textA4": null,
    "findings": {
      "header": "Beschreibung",
      "visibility": null,
      "body": {
        "legend": null,
        "param": null,
        "answers": null,
        "text": null
      }
    },
    "textA3": {
      "type": "par",
      "visibility": true,
      "body": [
        "Bringe Parzival in einem gesunden Tempo auf Idealgewicht - mit unserem Abnehmfeature.Nutze dann unsere Forscher Boxen für eine frühzeitige Diagnose von möglichen Erkrankungen. "
      ],
      "header": "Wie kann ich helfen?"
    },
    "headerHeadlineH2": "Übergewichtig",
    "urgency": "Hoch",
    "actions": [
      {
        "header": null,
        "link": null,
        "body": null,
        "label": "Wiederholen",
        "visibility": null
      }
    ],
    "therapy": "Self-care möglich",
    "textA2": {
      "body": [
        "Verkürzte Lebenserwartung (bis zu 20%)",
        "Knochen- und Gelenkserkrankungen",
        "Erkrankungen des Herz-Kreislauf-Systems",
        "Leistungsschwäche",
        "Atembeschwerden",
        "Diabetes mellitus",
        "Geringere Abwehrkraft ",
        "Erhöhte Tumorneigung ",
        "Erhöhtes Narkoserisiko"
      ],
      "type": "list",
      "visibility": null,
      "header": "Risiken"
    },
    "initial": {
      "type": "par",
      "body": [
        "Übergewicht entsteht, wenn die tägliche Energiezufuhr den Energiebedarf des Körpers übersteigt. Idealgewichtige Hunde haben einen Körperfettanteil von 20 %. Zurzeit liegt Parzivals Körperfettanteil zwischen 30 % und 40 %. "
      ],
      "header": "Was heißt das?",
      "visibility": true
    },
    "image": {
      "text": null,
      "link": "https://firebasestorage.googleapis.com/v0/b/confidu-app.appspot.com/o/ticket_images%2Fbodycondition%2Fresult%2Fdog%20normal%20chest%2Fobese.svg?alt=media&token=0e1c269c-4d89-45b2-a2d8-296f94cf3bfe",
      "header": "Körperkondition"
    },
    "textA1": {
      "header": "Häufige Ursachen",
      "type": "list",
      "visibility": null,
      "body": [
        "Kastration AlterBewegungsmangelHormonelle Erkrankungen (i)Übermäßige Fütterung"
      ]
    },
    "products": null,
    "popup": {
      "buttonCancel": {
        "type": "cancel",
        "label": "VERWERFEN"
      },
      "buttonConfirm": {
        "label": "SPEICHERN",
        "type": "confirm"
      },
      "popupOptionText": "Die Körperkondition deines Tieres wird für den Rations-Check und die Berechnung neuer Rezepte gebraucht. Möchtest du das Ergebnis in der CareCard von Parzival abspeichern?"
    },
    "backgroundImageLink": "https://firebasestorage.googleapis.com/v0/b/confidu-app.appspot.com/o/evaluations%2Ftelevet.svg?alt=media&token=2ce7f7a2-83a9-44bc-b255-59bef8882ce5",
    "venomList": [
      "bodycon_overweight"
    ],
    "textA5": null,
    "carecard": [
      {
        "level3Id": "6d1a9470-a0f5-4d46-b471-9c213036aaa3",
        "resultKey": "BCSnormal4",
        "level1_valA": null,
        "level1_valB": null,
        "valA": null,
        "valB": null,
        "venomKey": "bodycon_overweight",
        "level0_cc_key": "prevention_cc",
        "level1_cc_key": "b+bodycon",
        "cc_status": "overweight",
        "priority": 3,
        "param": null,
        "downloadPath": null,
        "eventDate": "2021-04-15T15:29:55.256149+02:00",
        "nextDate": "2021-04-15T13:29:55.272837+00:00",
        "currentDate": "2021-04-15T15:29:55.385298+02:00",
        "eventId": "1b99acec-0258-4955-bdf6-b286e48f01db",
        "findings": [
          {
            "currentDate": "2021-04-15T15:29:55.385298+02:00",
            "docs": [
              "findings/dc428361-a374-417c-abee-e6ce216f3e1f.pdf"
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
        "currentWeight": 0
      }
    ],
    "currentDate": "2021-04-15T15:29:55.385298+02:00",
    "eventId": "1b99acec-0258-4955-bdf6-b286e48f01db",
    "ticketId": null
  }



}
