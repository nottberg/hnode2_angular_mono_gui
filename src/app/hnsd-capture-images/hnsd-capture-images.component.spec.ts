import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HnsdCaptureImagesComponent } from './hnsd-capture-images.component';

describe('HnsdCaptureImagesComponent', () => {
  let component: HnsdCaptureImagesComponent;
  let fixture: ComponentFixture<HnsdCaptureImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HnsdCaptureImagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HnsdCaptureImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
