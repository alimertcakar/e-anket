import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnketSayfasiComponent } from './anket-sayfasi/anket-sayfasi.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component:HomeComponent , pathMatch: 'full' },
  { path: 'anket/:id', component: AnketSayfasiComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
