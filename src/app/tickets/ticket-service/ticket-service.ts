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
    "iconImageLink": "https://firebasestorage.googleapis.com/v0/b/confidu-app.appspot.com/o/evaluations%2Fevaluation_parasites.svg?alt=media&token=602ddef7-949f-4bb8-93d5-f784aad05eda",
    "headerHeadlineH2": "Advocate 100 mg + 25 mg",
    "popup": {
      "buttonCancel": {
        "type": "cancel",
        "label": "VERWERFEN"
      },
      "popupOptionText": "Möchtest du das Ergebnis in der CareCard von Wuffel 5 abspeichern?",
      "buttonConfirm": {
        "type": "confirm",
        "label": "SPEICHERN"
      }
    },
    "isPdf": false,
    "magazinKeys": [],
    "findings": {
      "visibility": true,
      "body": {
        "answers": null,
        "text": null,
        "param": [
          {
            "titel": "Spulwürmer",
            "visibility": true,
            "expandable": true,
            "body": [
              "Dein Haustier kann sich über kontaminierten Kot oder Spulwurmeier in der Umgebung (beispielsweise Wiesenflächen) anstecken. Symptome eines Spulwurmbefalls sind unter anderem Durchfall, Erbrechen, stumpfes Fell, Blutarmut und Wachstumsstörungen bei jungen Tieren. Auch Menschen können sich mit einigen Spulwurmarten anstecken."
            ],
            "image": "https://firebasestorage.googleapis.com/v0/b/confidu-app.appspot.com/o/evaluations%2Fparameter_signals%2Fokay.svg?alt=media&token=1db64170-46a7-499a-bf0f-a3df3afe8315",
            "list": null
          },
          {
            "titel": "andere Endoparasiten",
            "visibility": true,
            "expandable": true,
            "body": [
              "Das verwendete Präparat wirkt gegen weitere Endoparasiten. Da diese jedoch eher selten auftreten, haben wir sie nicht aufgeführt. Lies im Beipackzettel des Medikaments für weitere Details nach."
            ],
            "image": "https://firebasestorage.googleapis.com/v0/b/confidu-app.appspot.com/o/evaluations%2Fparameter_signals%2Fokay.svg?alt=media&token=1db64170-46a7-499a-bf0f-a3df3afe8315",
            "list": null
          },
          {
            "titel": "Ektoparasiten",
            "visibility": true,
            "expandable": true,
            "body": [
              "Das Medikament ist ein sogenanntes Endektozid. Das bedeutet, dass es auch eine Wirkung auf Ektoparasiten hat. Welche dies genau betrifft, findest du in der CareCard unter Ektoparasitenrisiko."
            ],
            "image": "https://firebasestorage.googleapis.com/v0/b/confidu-app.appspot.com/o/evaluations%2Fparameter_signals%2Fokay.svg?alt=media&token=1db64170-46a7-499a-bf0f-a3df3afe8315",
            "list": null
          }
        ],
        "legend": null
      },
      "header": "Wirkumfang des Präparats"
    },
    "ticketKeys": [],
    "initial": null,
    "fupKeys": [],
    "nextDate": "Nächster Termin: 01.09.2021",
    "textA5": null,
    "textA1": null,
    "therapy": null,
    "urgency": null,
    "products": null,
    "textA4": null,
    "headerHeadlineH1": null,
    "textA3": null,
    "venomList": [
      "ADVDO1010000003_endopar"
    ],
    "image": null,
    "slider": null,
    "recipeKeys": [],
    "textA2": null,
    "actions": [
      {
        "header": "Du möchtest Medikamente gegen Parasiten geben?",
        "label": "Antiparasitikum bestellen",
        "body": "Klicke auf „Antiparasitikum bestellen“, wenn du Wuffel 5 mit einem verschreibungspflichtigen Präparat gegen Parasiten schützen möchtest. Dann gelangst du zur Abfrage bezüglich Gegenanzeigen und Wechselwirkungen.",
        "link": null,
        "event": null,
        "visibility": true,
        "key": null
      }
    ],
    "backgroundImageLink": "https://firebasestorage.googleapis.com/v0/b/confidu-app.appspot.com/o/evaluations%2Ftelevet.svg?alt=media&token=2ce7f7a2-83a9-44bc-b255-59bef8882ce5",
    "eventDate": "Angewendet am: 04.08.2021",
    "carecard": [
      {
        "level3Id": "36c399f0-d9b0-4ba2-a386-3df1a2d77001",
        "resultKey": "ADVDO1010000003_endopar",
        "level1_valA": null,
        "level1_valB": null,
        "valA": null,
        "valB": null,
        "venomKey": "ADVDO1010000003_endopar",
        "level0_cc_key": "prevention_cc",
        "level1_cc_key": "endopar_cc",
        "cc_status": "available",
        "priority": 3,
        "param": null,
        "downloadPath": null,
        "eventDate": "2021-08-04T15:29:33.428000+02:00",
        "nextDate": "2021-09-01T15:29:41.159535+02:00",
        "isTerminated": false,
        "currentDate": "2021-08-04T15:29:41.377081+02:00",
        "eventId": "e7cf3c94-cce7-4aca-afe6-2bef02e02e55",
        "findings": [],
        "currentWeight": 0,
        "event": "ticket"
      }
    ],
    "internal": {
      "diseaseKey": "ADVDO1010000003_endopar",
      "eventDate": "2021-08-04T15:29:33.428000+02:00"
    },
    "currentDate": "2021-08-04T15:29:41.377081+02:00",
    "eventId": "e7cf3c94-cce7-4aca-afe6-2bef02e02e55",
    "ticketId": "KKEr0jRJn19qHxTLpjln"
  }

}
