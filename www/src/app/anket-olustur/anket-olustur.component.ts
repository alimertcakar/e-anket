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
  curAnketData: any;
  constructor(anket: AnketService) {
    this.anket = anket;
    this.isAnketModalOn = false;
  }

  async anketOlustur() {
    let response = await this.anket.anketOlustur();
    let createdAnket = await this.anket.getAnket(response.id);
    createdAnket.subscribe((data) => {
      console.log(data);
      this.curAnketData = data;
      this.isAnketModalOn = true;
    });
  }

  ngOnInit(): void {}
}
