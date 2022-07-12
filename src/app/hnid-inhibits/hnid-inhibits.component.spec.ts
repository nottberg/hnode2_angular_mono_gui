import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HnidInhibitsComponent } from './hnid-inhibits.component';

describe('HnidInhibitsComponent', () => {
  let component: HnidInhibitsComponent;
  let fixture: ComponentFixture<HnidInhibitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HnidInhibitsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HnidInhibitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
