import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss'],
})
export class LoginRegisterComponent implements OnInit {
  constructor(public auth: AngularFireAuth) {}
  ngOnInit(): void {}

  login() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  loginEmail(login) {
    const { email, password } = login.form.value;
    this.auth.signInWithEmailAndPassword(email, password);
  }
  signupEmail(signup) {
    const { email, password } = signup.form.value;
    this.auth.createUserWithEmailAndPassword(email, password);
  }
  logout(email, password) {
    this.auth.signOut();
  }
}
