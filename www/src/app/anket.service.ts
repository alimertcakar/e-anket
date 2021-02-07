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
      question: (<any>document.querySelector('#quest1')).value,
      answers: [
        {
          answer: (<HTMLInputElement>document.querySelector('#ans1')).value,
          votes: 0,
        },
        {
          answer: (<HTMLInputElement>document.querySelector('#ans2')).value,
          votes: 0,
        },
        {
          answer: (<HTMLInputElement>document.querySelector('#ans3')).value,
          votes: 0,
        },
        {
          answer: (<HTMLInputElement>document.querySelector('#ans4')).value,
          votes: 0,
        },
      ],
    });
    return response;
  }

  async gorselYukle(dosya, id) {
    var metadata = {
      contentType: 'image/jpeg',
    };
    var storageRef = firebase.storage().ref();
    var dosyaRef = storageRef.child(id);
    dosyaRef.put(dosya, metadata).then((snapshot) => {
      console.log('Uploaded a blob or file!');
    });
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
