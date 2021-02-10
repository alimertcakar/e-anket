import { Injectable } from '@angular/core';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  async getUser() {
    var user = firebase.auth().currentUser;
    console.log(user);
    if (user) {
      return user;
    } else {
      return 'giriş yapılmadı';
    }
  }
}
