import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HnidScheduleComponent } from './hnid-schedule.component';

describe('HnidScheduleComponent', () => {
  let component: HnidScheduleComponent;
  let fixture: ComponentFixture<HnidScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HnidScheduleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HnidScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
