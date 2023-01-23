import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HnmdHealthComponent } from './hnmd-health.component';

describe('HnmdHealthComponent', () => {
  let component: HnmdHealthComponent;
  let fixture: ComponentFixture<HnmdHealthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HnmdHealthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HnmdHealthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
