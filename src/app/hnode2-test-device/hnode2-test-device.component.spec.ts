import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Hnode2TestDeviceComponent } from './hnode2-test-device.component';

describe('Hnode2TestDeviceComponent', () => {
  let component: Hnode2TestDeviceComponent;
  let fixture: ComponentFixture<Hnode2TestDeviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Hnode2TestDeviceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Hnode2TestDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
