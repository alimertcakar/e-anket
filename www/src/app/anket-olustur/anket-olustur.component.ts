import { Component, OnInit } from '@angular/core';
import { AnketService } from '../anket.service';

@Component({
  selector: 'app-anket-olustur',
  templateUrl: './anket-olustur.component.html',
  styleUrls: ['./anket-olustur.component.scss'],
})
export class AnketOlusturComponent implements OnInit {
  anket: any;
  constructor(anket: AnketService) {
    this.anket = anket;
  }

  async anketOlustur() {
    let response = await this.anket.anketOlustur();
    let createdAnket = await this.anket.getAnket(response.id);
    console.log(createdAnket); //buraya açıldı
  }

  ngOnInit(): void {}
}
