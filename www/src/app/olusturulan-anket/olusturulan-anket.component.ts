import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-olusturulan-anket',
  templateUrl: './olusturulan-anket.component.html',
  styleUrls: ['./olusturulan-anket.component.scss'],
})
export class OlusturulanAnketComponent implements OnInit {
  onShowMe: boolean;
  constructor() {
    this.onShowMe = true;
  }
  @Input() curAnketData: any;
  @Input() onShow: boolean;
  @Input() anketId: string;
  gizle() {
    this.onShowMe = false;
  }
  ngOnInit(): void {}
}
