import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OlusturulanAnketComponent } from './olusturulan-anket.component';

describe('OlusturulanAnketComponent', () => {
  let component: OlusturulanAnketComponent;
  let fixture: ComponentFixture<OlusturulanAnketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OlusturulanAnketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OlusturulanAnketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
