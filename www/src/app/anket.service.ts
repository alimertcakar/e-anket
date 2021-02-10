import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import { first } from 'rxjs/operators';
interface IGorsel {
  contents: object;
}

const blobToImage = (blob) => {
  return new Promise((resolve) => {
    const url = URL.createObjectURL(blob);
    let img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.src = url;
  });
};
const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
const fetchAsBlob = (url) => fetch(url).then((response) => response.blob());

const blobToData = (blob: Blob) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
};

const convertBlobToBase64 = (blob) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });

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
    return new Promise(async function (resolve, reject) {
      var storageRef = firebase.storage().ref();
      var dosyaRef = storageRef.child(id);
      console.log(dosya.files[0]);
      let dosya64: string | unknown =
        (await (<unknown>toBase64(dosya.files[0]))) || ('' as string);
      console.log(dosya64);
      dosyaRef
        .putString((dosya64 as string).split(',')[1])
        .then((snapshot) => {
          resolve('Dosya başarıyla yüklendi.');
        })
        .catch((e) => {
          reject(e);
        });
    });
  }

  // var metadata = {
  //   contentType: 'image/jpeg',
  // };

  async getAnket(id) {
    const response = await this.db.collection('survey').doc(id).valueChanges();
    let gorsel64 = 'bulunmadi'; //anket ilk oluşturulduğunda resim yoksa.
    try {
      var storageRef = firebase.storage().ref();
      var gorselUrl = await storageRef.child(id).getDownloadURL();
      var gorsel = await fetch(`
        https://api.allorigins.win/get?url=${encodeURIComponent(gorselUrl)}`); //local'de cors'a takıldım. allorigins cors header'ı ekliyor her isteğe. gerçek sitede normal url'de hata olmaz ama.
      let gorselbase64: IGorsel | string = await gorsel.text();
      gorselbase64 = <IGorsel>JSON.parse(gorselbase64);
      console.log(gorselbase64);
      // const blob = await gorsel.blob();
      // gorsel64 = await blob.text();

      // var base64data = await blobToData(blob);
      // console.log(base64data.split(',')[1]);
      return [response, gorselbase64?.contents];

      // console.log(base64data.split(',')[1]);
      //  const images = ((images) => {
      //     reader.onloadend = function () {
      //       gorsel64 = base64data;
      //       console.log(gorsel64);
      //     };
      //     // blobToImage(images).then((img) => console.log(img));
      //     // let outside = URL.createObjectURL(images);
      //     // console.log(outside);
      //   });
      console.log(gorsel64);
    } catch (e) {
      console.log(e);
    }
    return [response, gorsel64];
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
