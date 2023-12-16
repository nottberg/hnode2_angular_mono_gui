import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HnsdCapturesComponent } from './hnsd-captures.component';

describe('HnsdCapturesComponent', () => {
  let component: HnsdCapturesComponent;
  let fixture: ComponentFixture<HnsdCapturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HnsdCapturesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HnsdCapturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
