import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import { first } from 'rxjs/operators';

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

  async updateAnketVote(id, ans, ansId) {
    let response;
    const prevAns = await this.db.collection('survey').doc(id).valueChanges();

    prevAns.pipe(first()).subscribe(async (d: any) => {
      //Güncel oy sayısını al
      let prevVote = d.answers.filter((ansObj) => ansObj.answer == ans)[0]
        .votes;

      //eski array'i sil
      this.db
        .collection('survey')
        .doc(id)
        .update({
          answers: firebase.firestore.FieldValue.arrayRemove({
            answer: ans,
            votes: prevVote,
          }),
        });

      // 1 arttır yeni array ekle
      response = await this.db
        .collection('survey')
        .doc(id)
        .update({
          answers: firebase.firestore.FieldValue.arrayUnion({
            answer: ans,
            votes: ++prevVote,
          }),
        });
    });

    return response;
  }
}
