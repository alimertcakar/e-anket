import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Action } from 'rxjs/internal/scheduler/Action';
import { AnketService } from '../anket.service';

@Component({
  selector: 'app-anket-sayfasi',
  templateUrl: './anket-sayfasi.component.html',
  styleUrls: ['./anket-sayfasi.component.scss'],
})
export class AnketSayfasiComponent implements OnInit {
  constructor(private route: ActivatedRoute, private anket: AnketService) {}
  anketDetayi: any;
  anketId: any;
  gorsel: any;
  ngOnInit(): void {
    this.route.paramMap.subscribe(async (params) => {
      let anketId = params.get('id');
      this.anketId = anketId;
      let anketDetay = await this.anket.getAnket(anketId);
      anketDetay[0].subscribe((data) => {
        this.anketDetayi = data;
        this.gorsel = 'data:image/png;base64,' + anketDetay[1];
        // var image = new Image();
        // image.src = 'data:image/png;base64,' + anketDetay[1];
        // document.body.appendChild(image);
      });
    });
  }
  cevapla(ans, ansId) {
    this.anket.updateAnketVote(this.anketId, ans, ansId);
  }

  gorselYukle() {
    let gorsel = document.querySelector('#gorselYukle');
    this.encodeImageFileAsURL(gorsel);
  }
  encodeImageFileAsURL(dosya) {
    let anketRef = this.anket;
    let thisRef = this;
    console.log(dosya);
    var file = dosya.files[0];
    var reader = new FileReader();
    reader.onloadend = function () {
      anketRef.gorselYukle(dosya, thisRef.anketId).then(() => {
        location.reload();
      });
    };
    reader.readAsDataURL(file);
  }
}
