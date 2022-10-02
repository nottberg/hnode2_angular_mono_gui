import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HnmdServicesComponent } from './hnmd-services.component';

describe('HnmdServicesComponent', () => {
  let component: HnmdServicesComponent;
  let fixture: ComponentFixture<HnmdServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HnmdServicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HnmdServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
