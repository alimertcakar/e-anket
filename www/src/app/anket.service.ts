import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class AnketService {
  constructor(private db: AngularFirestore) {
    this.db = db;
  }
  async anketOlustur() {
    const response = await this.db.collection('survey').add({
      question: 'Benim babam böyle pasta yapmayı nereden öğrendi?',
      answers: ['ne bilem', 'babana sor', 'doktor otkere sor'],
    });
    return response;
  }

  async getAnket(id) {
    console.log(id);
    const response = await this.db.collection('survey').doc(id).valueChanges();
    return response;
  }
}
