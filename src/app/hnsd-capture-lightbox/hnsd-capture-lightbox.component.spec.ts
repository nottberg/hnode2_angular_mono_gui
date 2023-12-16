import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HnsdCaptureLightboxComponent } from './hnsd-capture-lightbox.component';

describe('HnsdCaptureLightboxComponent', () => {
  let component: HnsdCaptureLightboxComponent;
  let fixture: ComponentFixture<HnsdCaptureLightboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HnsdCaptureLightboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HnsdCaptureLightboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
