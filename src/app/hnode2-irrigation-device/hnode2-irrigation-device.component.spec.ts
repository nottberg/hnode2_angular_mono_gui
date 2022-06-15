import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Hnode2IrrigationDeviceComponent } from './hnode2-irrigation-device.component';

describe('Hnode2IrrigationDeviceComponent', () => {
  let component: Hnode2IrrigationDeviceComponent;
  let fixture: ComponentFixture<Hnode2IrrigationDeviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Hnode2IrrigationDeviceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Hnode2IrrigationDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
