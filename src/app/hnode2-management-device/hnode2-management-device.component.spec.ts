import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Hnode2ManagementDeviceComponent } from './hnode2-management-device.component';

describe('Hnode2ManagementDeviceComponent', () => {
  let component: Hnode2ManagementDeviceComponent;
  let fixture: ComponentFixture<Hnode2ManagementDeviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Hnode2ManagementDeviceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Hnode2ManagementDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
