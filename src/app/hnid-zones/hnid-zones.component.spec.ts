import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HnidZonesComponent } from './hnid-zones.component';

describe('HnidZonesComponent', () => {
  let component: HnidZonesComponent;
  let fixture: ComponentFixture<HnidZonesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HnidZonesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HnidZonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
