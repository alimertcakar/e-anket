import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss'],
})
export class LoginRegisterComponent implements OnInit {
  loggedInUser: string | any;
  constructor(public auth: AngularFireAuth, private authService: AuthService) {}
  ngOnInit(): void {}

  login() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    this.authService.getUser().then((x) => (this.loggedInUser = x));
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
  loginGmail() {
    // this.authService.getUser().then((x) => (this.loggedInUser = x));
  }
}
