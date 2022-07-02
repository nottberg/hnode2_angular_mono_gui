import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HnidControlsComponent } from './hnid-controls.component';

describe('HnidControlsComponent', () => {
  let component: HnidControlsComponent;
  let fixture: ComponentFixture<HnidControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HnidControlsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HnidControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
