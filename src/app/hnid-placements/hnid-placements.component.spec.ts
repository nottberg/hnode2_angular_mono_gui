import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HnidPlacementsComponent } from './hnid-placements.component';

describe('HnidPlacementsComponent', () => {
  let component: HnidPlacementsComponent;
  let fixture: ComponentFixture<HnidPlacementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HnidPlacementsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HnidPlacementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
