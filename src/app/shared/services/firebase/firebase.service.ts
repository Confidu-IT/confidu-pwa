import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  public petsCollection: AngularFirestoreCollection;
  public careCardCollection: AngularFirestoreCollection;
  public defaultTicketsCollection: AngularFirestoreCollection;
  public ticketsCollection: AngularFirestoreCollection;
  public racesCollection: AngularFirestoreCollection;
  public diseasesCollection: AngularFirestoreCollection;
  public medToDiseaseCollection: AngularFirestoreCollection;
  public medsCollection: AngularFirestoreCollection;
  public diagnosisCollection: AngularFirestoreCollection;
  public findingsCollection: AngularFirestoreCollection;
  public therapyCollection: AngularFirestoreCollection;
  public scanDBCollection: AngularFirestoreCollection;
  public medicationCollection: AngularFirestoreCollection;
  public vetsCollection: AngularFirestoreCollection;
  public petPics: AngularFirestoreCollection;
  public emergencySymptoms: AngularFirestoreCollection;
  public vacccinesCollection: AngularFirestoreCollection;
  public foodCollection: AngularFirestoreCollection;
  public urineTestCollection: AngularFirestoreCollection = this.afs.collection('urine-stick');
  public userCollection: AngularFirestoreCollection = this.afs.collection('users');
  public activePetsCollection: any;
  public notificationsReadCollection: AngularFirestoreCollection;
  public notificationsListCollection: AngularFirestoreCollection;
  public faqCollection: AngularFirestoreCollection;

  constructor(private afs: AngularFirestore) {
  }

  public getNotifications(userId: string): Observable<any[]> {
    this.notificationsListCollection = this.afs.collection(`notifications/${userId}/data`, (ref) => ref.orderBy('date', 'desc'));
    return this.notificationsListCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        data.id = a.payload.doc.id;
        return { ...data };
      }))
    );
  }

  public getFaq(language: string): Observable<any> {
    return this.afs.doc(`faq/${language}`).valueChanges();
  }

  public checkForUpdate(): Observable<any> {
    return this.afs.doc(`check-for-update/appVersion`).valueChanges();
  }

  public getCoins(userId: string): Observable<any> {
    return this.afs.doc(`users/${userId}/data/confi-coins`).valueChanges();
  }

  public markNotificationsAsRead(userId: string) {
    return this.afs.doc(`notifications/${userId}`).set({read: true});
  }

  public checkForNewNotifications(userId: string): Observable<any> {
    return this.afs.doc(`notifications/${userId}`).valueChanges();
  }

  public creatNotificationPermissions(userId: string, obj: any): Promise<any> {
    const data = { notification_permissions: obj };
    return this.userCollection.doc(userId).update(data);
  }

  public setUserLanguage(userId: string, lang: any): Promise<any> {
    const data = { country: lang };
    return this.userCollection.doc(userId).set(data, { merge: true });
  }

  public setVersion(userId: string, v: number): Promise<any> {
    const data = { version: v };
    return this.userCollection.doc(userId).set(data, { merge: true });
  }

  public createActivePetId(userId: string, petId: string): Promise<any> {
    const data = { activePet: petId };
    return this.userCollection.doc(userId).set(data, { merge: true });
  }

  public deleteActivePetId(userId: string): Promise<any> {
    const data = { activePet: null };
    return this.userCollection.doc(userId).update(data);
  }

  public getUser(userId: string) {
    return this.userCollection.doc(userId).valueChanges();
  }

  public getVetsByZipCode(language: string, zip: string): Observable<any[]> {
    this.vetsCollection = this.afs.collection(`vet-list/${language}/${zip}`);
    return this.vetsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        data.id = a.payload.doc.id;
        return { ...data };
      }))
    );
  }

  public getTicketsByPet(userId: string, petId: string): Observable<any[]> {
    this.ticketsCollection = this.afs.collection(`users/${userId}/pets/${petId}/tickets`);
    return this.ticketsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        data.id = a.payload.doc.id;
        return { ...data };
      }))
    );
  }

  public getPetPics(species: string): Observable<any[]> {
    this.ticketsCollection = this.afs.collection(`hp-${species}`);
    return this.ticketsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        data.id = a.payload.doc.id;
        return { ...data };
      }))
    );
  }

  public getDefaultTicket(language: string, species: string, ticket: string): Observable<any> {
    return this.afs.doc(`default-tickets/${language}/${species}/${ticket}`).valueChanges();
  }

  public getTicketById(userId: string, petId: string, ticketId: string): Observable<any> {
    return this.afs.doc(`users/${userId}/pets/${petId}/tickets/${ticketId}`).valueChanges();
  }

  public createTicket(userId: string, petId: string, data: any): Promise<DocumentReference> {
    return this.afs.doc(`users/${userId}/pets/${petId}`).collection('tickets').add(data);
  }

  public shelveTicket(userId: string, petId: string, data: any): Promise<DocumentReference> {
    return this.afs.doc(`shelved-tickets/${userId}/pets/${petId}`).collection('tickets').add(data);
  }

  public deleteTicket(userId: string, petId: string, ticketId: string): Promise<any> {
    return this.afs.collection(`users/${userId}/pets/${petId}/tickets`).doc(ticketId).delete();
  }

  public updateTicket(userId: string, petId: string, ticketId: string, ticketData: any): Promise<any> {
    return this.afs.doc(`users/${userId}/pets/${petId}/tickets/${ticketId}`).update(ticketData);
  }

  public createPet(userId: string, pet: any): Promise<DocumentReference> {
    const data = {
      pet,
      time: new Date()
    };
    return this.userCollection.doc(userId).collection('pets').add(data);
  }

  public updatePet(userId: string, petId, pet: any): Promise<any> {
    return this.afs.doc(`users/${userId}/pets/${petId}`).update(pet);
  }

  public deletePet(userId: string, petId: string) {
    return this.afs.collection(`users/${userId}/pets`).doc(petId).delete();
  }

  public getAllPets(userId: string): Observable<any[]> {
    this.petsCollection = this.afs.collection(`users/${userId}/pets`, (ref) => ref.orderBy('time', 'desc'));
    return this.petsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        data.id = a.payload.doc.id;
        return { ...data };
      }))
    );
  }

  public getPetById(userId: string, petId: string): Observable<any> {
    return this.afs.doc(`users/${userId}/pets/${petId}`).valueChanges();
  }

  public getAllBreeds(breed: string): Observable<any[]> {
    this.racesCollection = this.afs.collection(`race-list-${breed}`, (ref) => ref.orderBy('name_de', 'asc'));
    return this.racesCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const race = {
          id: a.payload.doc.id,
          data: a.payload.doc.data()
        };
        return { ...race };
      }))
    );
  }

  public getDiseases(language: string, species: string): Observable<any[]> {
    this.diseasesCollection =
      this.afs.collection(
        `default-diseases-to-medication/${language}/${species}`, ref => ref.orderBy('name', 'asc')
      );
    return this.diseasesCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        return a.payload.doc.data();
      }))
    );
  }

  public getMedToDisease(language: string, species: string, venomKey: string): Observable<any[]> {
    this.medToDiseaseCollection = this.afs.collection(
      `default-diseases-to-medication/${language}/${species}/${venomKey}/medicationVariations`
    );
    return this.medToDiseaseCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        return a.payload.doc.data();
      }))
    );
  }

  public getFoodByType(language: string, species: string, type: string): Observable<any[]> {
    this.foodCollection = this.afs.collection(
      `food-db/${language}/${species}/${type}/data`, ref => ref.orderBy('name', 'asc')
    );
    return this.foodCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        return a.payload.doc.data();
      }))
    );
  }

  // public getMeds(language: string): Observable<any[]> {
  //   this.medToDiseaseCollection = this.afs.collection(
  //     `medication-db/medication-list/${language}`
  //   );
  //   return this.medToDiseaseCollection.snapshotChanges().pipe(
  //     map(actions => actions.map(a => {
  //       return a.payload.doc.data();
  //     }))
  //   );
  // }

  public getScanDB(language: string, collection: string, species?: string): Observable<any[]> {
    if (collection === 'medication') {
      this.medicationCollection = this.afs.collection(
        `scan-db/${collection}/${language}/data/${species}`, ref => ref.orderBy('name', 'asc')
      );
      return this.medicationCollection.snapshotChanges().pipe(
        map(actions => actions.map(a => {
          return a.payload.doc.data();
        }))
      );
    }
    if (collection === 'diagnosis') {
      this.diagnosisCollection = this.afs.collection(
        `scan-db/${collection}/${language}/data/${species}`, ref => ref.orderBy('name', 'asc')
      );
      return this.diagnosisCollection.snapshotChanges().pipe(
        map(actions => actions.map(a => {
          return a.payload.doc.data();
        }))
      );
    }
    if (collection === 'therapy') {
      this.therapyCollection = this.afs.collection(
        `scan-db/${collection}/${language}`, ref => ref.orderBy('name', 'asc')
      );
      return this.therapyCollection.snapshotChanges().pipe(
        map(actions => actions.map(a => {
          return a.payload.doc.data();
        }))
      );
    }
    if (collection === 'findings') {
      this.findingsCollection = this.afs.collection(
        `scan-db/${collection}/${language}`, ref => ref.orderBy('name', 'asc')
      );
      return this.findingsCollection.snapshotChanges().pipe(
        map(actions => actions.map(a => {
          return a.payload.doc.data();
        }))
      );
    }

  }

  public getMedication(language: string): Observable<any[]> {
    this.medicationCollection = this.afs.collection(`default-diseases-to-medication/${language}/1111`);
    return this.medicationCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        return a.payload.doc.data();
      }))
    );
  }

  public getAllMeds(language: string): Observable<any[]> {
    this.medicationCollection =
      this.afs.collection(`scan-db/medication/${language}`, ref => ref.orderBy('name', 'asc'));
    return this.medicationCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        return a.payload.doc.data();
      }))
    );
  }

  public getVaccines(language: string, species: string): Observable<any[]> {
    this.vacccinesCollection = this.afs.collection(
      `vaccines/${language}/${species}`
    );
    return this.vacccinesCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        return a.payload.doc.data();
      }))
    );
  }

  public getEmergencySymptoms(language: string, species: string): Observable<any[]> {
    this.emergencySymptoms = this.afs.collection(
      `default-question-info/${language}/${species}`
    );
    return this.emergencySymptoms.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        return a.payload.doc.data();
      }))
    );
  }

  public getRaceById(raceId: string | number): Observable<any> {
    const document = this.afs.doc(`race-list/${raceId}`);
    return document.valueChanges();
  }

  public getUrineStickTestsByPet(userId: string, petId: string): Observable<any> {
    return this.afs.doc(`users/${userId}/pets/${petId}`).collection('urineStickTests').valueChanges();
  }

  public createUrineStickTest(result: any): Promise<DocumentReference> {
    return this.urineTestCollection.add(result);
  }

  public addUrineStickTestToPet(userId: string, petId: string, data: any) {
    return this.afs.doc(`users/${userId}/pets/${petId}`).collection('urineStickTests').add(data);
    // return this.afs.doc(`users/${userId}/pets/${petId}`).update({urineStickTests: data});
  }


  public foobar = '';
  public bazbaz = '';
}
