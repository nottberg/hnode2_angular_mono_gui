import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MgmtDashboardComponent } from './mgmt-dashboard.component';

describe('MgmtDashboardComponent', () => {
  let component: MgmtDashboardComponent;
  let fixture: ComponentFixture<MgmtDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MgmtDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MgmtDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
