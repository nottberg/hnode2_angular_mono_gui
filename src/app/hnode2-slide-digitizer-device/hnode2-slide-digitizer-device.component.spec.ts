import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Hnode2SlideDigitizerDeviceComponent } from './hnode2-slide-digitizer-device.component';

describe('Hnode2SlideDigitizerDeviceComponent', () => {
  let component: Hnode2SlideDigitizerDeviceComponent;
  let fixture: ComponentFixture<Hnode2SlideDigitizerDeviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Hnode2SlideDigitizerDeviceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Hnode2SlideDigitizerDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
