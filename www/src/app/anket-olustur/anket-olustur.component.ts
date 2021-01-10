import { Component, OnInit } from '@angular/core';
import { AnketService } from '../anket.service';

@Component({
  selector: 'app-anket-olustur',
  templateUrl: './anket-olustur.component.html',
  styleUrls: ['./anket-olustur.component.scss'],
})
export class AnketOlusturComponent implements OnInit {
  anket: any;
  isAnketModalOn: boolean;
  anketId: string;
  curAnketData: any;
  constructor(anket: AnketService) {
    this.anket = anket;
    this.isAnketModalOn = false;
  }

  async anketOlustur() {
    let response = await this.anket.anketOlustur();
    this.anketId = response.id;
    let createdAnket = await this.anket.getAnket(response.id);
    createdAnket.subscribe((data) => {
      this.curAnketData = data;
      this.isAnketModalOn = true;
      console.log(this.isAnketModalOn);
    });
  }

  ngOnInit(): void {}
}
