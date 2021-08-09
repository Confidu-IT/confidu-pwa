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

  public blah ={
    "findings": {
      "header": "Befunde",
      "body": {
        "answers": null,
        "legend": [
          "Welche Menge Theobromin ist giftig?",
          "\nAb 20 mg/kg Körpergewicht bei dunkler Schokolade",
          "Ab 40 mg/kg bei Milchschokolade",
          "Tödliche Dosis ab 250 mg/kg Körpergewicht"
        ],
        "param": [
          {
            "titel": "Aufgenommer Wirkstoff",
            "visibility": true,
            "expandable": false,
            "body": null,
            "image": null,
            "list": [
              {
                "label": "Theobromin",
                "key": "tox_eat",
                "image": "https://firebasestorage.googleapis.com/v0/b/confidu-app.appspot.com/o/evaluations%2Fparameter_signals%2Fwarning.svg?alt=media&token=e658932b-9cc0-4703-93ef-c2ca92622311",
                "value": {
                  "valB": null,
                  "valA": "21500.0"
                },
                "unit": "mg/kg"
              }
            ]
          }
        ],
        "text": null
      },
      "visibility": true
    },
    "fupKeys": [],
    "magazinKeys": [],
    "textA3": null,
    "urgency": "hoch",
    "textA5": null,
    "ticketKeys": [],
    "headerHeadlineH1": "Achtung!",
    "textA1": {
      "visibility": null,
      "header": "Wirkung",
      "type": "par",
      "body": [
        "Theobromin und Koffein wirken erregend auf Herz und Nervensystem."
      ]
    },
    "recipeKeys": [],
    "image": null,
    "eventDate": null,
    "headerHeadlineH2": "Vergiftung",
    "iconImageLink": "https://firebasestorage.googleapis.com/v0/b/confidu-app.appspot.com/o/evaluations%2Fevaluation_medical_negative.svg?alt=media&token=96756222-d842-4c82-a19a-e551e4d0d75e",
    "isPdf": true,
    "textA2": {
      "header": "Wie kann ich helfen?",
      "type": "par",
      "body": [
        "Atme tief durch und bewahre Ruhe.",
        "Schütze dich selbst (Tiere in starker Erregung oder in Panik beißen manchmal um sich).",
        "Notiere wichtige Informationen zur Schokoladenaufnahme: Welche Sorte (Hier kann dem/der Tierärzt:in auch ein Foto helfen)? Wann gefressen? Wieviel?",
        "Suche schnellstmöglich eine Tierarztpraxis oder -klinik auf."
      ],
      "visibility": true
    },
    "therapy": "Tierarztbesuch nötig",
    "actions": null,
    "initial": {
      "type": "par",
      "body": [
        "Theobromin und Koffein sind giftig für Hunde und rufen innerhalb von 6-12 Stunden Symptome wie Durchfall, Erbrechen, starke Erregung, Herzrasen und Krämpfe hervor."
      ],
      "header": "Was bedeutet das?",
      "visibility": true
    },
    "slider": null,
    "textA4": null,
    "nextDate": null,
    "popup": {
      "popupOptionText": "Möchtest du die Diagnose in der CareCard ablegen? Dort kannst du sie jederzeit wieder einsehen. Klicke hierzu auf speichern. Wenn nicht, wird die Auswertung automatisch verworfen.",
      "buttonConfirm": {
        "label": "SPEICHERN",
        "type": "confirm"
      },
      "buttonCancel": {
        "type": "cancel",
        "label": "VERWERFEN"
      }
    },
    "venomList": [
      "1097_tox_D",
      "1097_tox_D_CC"
    ],
    "products": null,
    "backgroundImageLink": "https://firebasestorage.googleapis.com/v0/b/confidu-app.appspot.com/o/evaluations%2Ftelevet.svg?alt=media&token=2ce7f7a2-83a9-44bc-b255-59bef8882ce5",
    "carecard": [
      {
        "level3Id": "492cd57c-39b1-48db-a7cf-58d382da6adb",
        "resultKey": "tox_dog_choc2",
        "level1_valA": "2",
        "level1_valB": null,
        "valA": "2",
        "valB": null,
        "venomKey": "w+weightac_variable_nores",
        "level0_cc_key": "prevention_cc",
        "level1_cc_key": "w+weightac",
        "cc_status": "variable_nores",
        "priority": 9,
        "param": null,
        "downloadPath": null,
        "eventDate": "2021-08-09T12:13:28.100493+02:00",
        "nextDate": null,
        "isTerminated": false,
        "currentDate": "2021-08-09T12:13:28.286420+02:00",
        "eventId": "cc8b6768-8cac-44fb-94f2-abb7263202a6",
        "findings": [
          {
            "currentDate": "2021-08-09T12:13:28.286420+02:00",
            "docs": [
              "findings/3c6e19e1-e1cb-4c31-8f86-38711d47a880.pdf"
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
        "currentWeight": 2,
        "event": "televet"
      },
      {
        "level3Id": "acc9021c-7cad-4a5d-9840-8dd5b2e3107c",
        "resultKey": "tox_dog_choc2",
        "level1_valA": "21500.0",
        "level1_valB": null,
        "valA": "21500.0",
        "valB": null,
        "venomKey": "1097_tox_D",
        "level0_cc_key": "diseases_cc",
        "level1_cc_key": "healthstatus_cc",
        "cc_status": "sick",
        "priority": 3,
        "param": null,
        "downloadPath": null,
        "eventDate": "2021-08-09T12:13:28.100493+02:00",
        "nextDate": "2021-08-09T10:13:28.141096+00:00",
        "isTerminated": false,
        "currentDate": "2021-08-09T12:13:28.286420+02:00",
        "eventId": "cc8b6768-8cac-44fb-94f2-abb7263202a6",
        "findings": [
          {
            "currentDate": "2021-08-09T12:13:28.286420+02:00",
            "docs": [
              "findings/3c6e19e1-e1cb-4c31-8f86-38711d47a880.pdf"
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
        "currentWeight": 2,
        "event": "televet"
      },
      {
        "level3Id": "1a74a1d0-3a66-4228-acb4-7c708623f79f",
        "resultKey": "tox_dog_choc2",
        "level1_valA": "21500.0",
        "level1_valB": null,
        "valA": "21500.0",
        "valB": null,
        "venomKey": "1097_tox_D_CC",
        "level0_cc_key": "diseases_cc",
        "level1_cc_key": "consultation_cc",
        "cc_status": "available",
        "priority": 3,
        "param": null,
        "downloadPath": null,
        "eventDate": "2021-08-09T12:13:28.100493+02:00",
        "nextDate": "2021-08-09T10:13:28.141096+00:00",
        "isTerminated": false,
        "currentDate": "2021-08-09T12:13:28.286420+02:00",
        "eventId": "cc8b6768-8cac-44fb-94f2-abb7263202a6",
        "findings": [
          {
            "currentDate": "2021-08-09T12:13:28.286420+02:00",
            "docs": [
              "findings/3c6e19e1-e1cb-4c31-8f86-38711d47a880.pdf"
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
        "currentWeight": 2,
        "event": "televet"
      }
    ],
    "internal": {
      "diseaseKey": "tox_dog_choc2",
      "eventDate": "2021-08-09T12:13:28.100493+02:00"
    },
    "currentDate": "2021-08-09T12:13:28.286420+02:00",
    "eventId": "cc8b6768-8cac-44fb-94f2-abb7263202a6",
    "ticketId": null
  }

}
