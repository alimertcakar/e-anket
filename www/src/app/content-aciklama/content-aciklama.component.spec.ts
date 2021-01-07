import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentAciklamaComponent } from './content-aciklama.component';

describe('ContentAciklamaComponent', () => {
  let component: ContentAciklamaComponent;
  let fixture: ComponentFixture<ContentAciklamaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentAciklamaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentAciklamaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
