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
  ngOnInit(): void {
    this.route.paramMap.subscribe(async (params) => {
      let anketId = params.get('id');
      this.anketId = anketId;
      let anketDetay = await this.anket.getAnket(anketId);
      anketDetay.subscribe((data) => {
        this.anketDetayi = data;
      });
    });
  }
  cevapla(ans, ansId) {
    this.anket.updateAnketVote(this.anketId, ans, ansId);
  }
}
