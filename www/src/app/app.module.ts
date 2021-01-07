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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContentComponent,
    ContentTwoComponent,
    FooterComponent,
    ContentAciklamaComponent,
    AnketOlusturComponent,
    HeroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
