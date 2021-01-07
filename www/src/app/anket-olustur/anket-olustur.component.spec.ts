import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnketOlusturComponent } from './anket-olustur.component';

describe('AnketOlusturComponent', () => {
  let component: AnketOlusturComponent;
  let fixture: ComponentFixture<AnketOlusturComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnketOlusturComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnketOlusturComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
