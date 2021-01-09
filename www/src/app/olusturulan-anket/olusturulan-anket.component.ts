import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-olusturulan-anket',
  templateUrl: './olusturulan-anket.component.html',
  styleUrls: ['./olusturulan-anket.component.scss'],
})
export class OlusturulanAnketComponent implements OnInit {
  constructor() {}
  @Input() curAnketData: any;
  ngOnInit(): void {}
}
