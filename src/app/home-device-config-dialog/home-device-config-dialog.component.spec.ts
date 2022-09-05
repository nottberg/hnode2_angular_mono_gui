import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDeviceConfigDialogComponent } from './home-device-config-dialog.component';

describe('HomeDeviceConfigDialogComponent', () => {
  let component: HomeDeviceConfigDialogComponent;
  let fixture: ComponentFixture<HomeDeviceConfigDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeDeviceConfigDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeDeviceConfigDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
