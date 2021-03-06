import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ContentComponent } from './content/content.component';
import { ContentTwoComponent } from './content-two/content-two.component';
import { FooterComponent } from './footer/footer.component';
import { ContentAciklamaComponent } from './content-aciklama/content-aciklama.component';
import { AnketOlusturComponent } from './anket-olustur/anket-olustur.component';
import { HeroComponent } from './hero/hero.component';

//angular
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';

// firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { OlusturulanAnketComponent } from './olusturulan-anket/olusturulan-anket.component';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { AnketSayfasiComponent } from './anket-sayfasi/anket-sayfasi.component';
import { HomeComponent } from './home/home.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

//material
import { MaterialImports } from './material-module';

const config = {
  apiKey: 'AIzaSyARfIEM0Q3y179bMVdFiaTMBUO2vp4YXkA',
  authDomain: 'angular-eanket.firebaseapp.com',
  projectId: 'angular-eanket',
  storageBucket: 'angular-eanket.appspot.com',
  messagingSenderId: '1039005887104',
  appId: '1:1039005887104:web:74096ee389bf70a7efd465',
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContentComponent,
    ContentTwoComponent,
    FooterComponent,
    ContentAciklamaComponent,
    AnketOlusturComponent,
    HeroComponent,
    OlusturulanAnketComponent,
    AnketSayfasiComponent,
    LoginRegisterComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    FormsModule,
    NoopAnimationsModule,
    MaterialImports,
  ],
  exports: [MaterialImports],
  providers: [{ provide: Window, useValue: window }],
  bootstrap: [AppComponent],
})
export class AppModule {}
