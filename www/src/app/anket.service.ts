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
      answers: [
        { answer: 'ne bilem', votes: 0 },
        { answer: 'babana sor', votes: 0 },
        { answer: 'doktor otkere sor', votes: 0 },
      ],
    });
    return response;
  }

  async getAnket(id) {
    const response = await this.db.collection('survey').doc(id).valueChanges();
    return response;
  }

  async updateAnketVote(id, ansId) {
    const response = await this.db
      .collection('survey')
      .doc(id)
      .update({ 'answers[ansId].vote': 'FieldValue.increment(1)' });
    return response;
}
