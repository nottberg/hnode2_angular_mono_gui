import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HnmdDevicesComponent } from './hnmd-devices.component';

describe('HnmdDevicesComponent', () => {
  let component: HnmdDevicesComponent;
  let fixture: ComponentFixture<HnmdDevicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HnmdDevicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HnmdDevicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
