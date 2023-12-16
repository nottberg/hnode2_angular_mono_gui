import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HnsdNavListComponent } from './hnsd-nav-list.component';

describe('HnsdNavListComponent', () => {
  let component: HnsdNavListComponent;
  let fixture: ComponentFixture<HnsdNavListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HnsdNavListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HnsdNavListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
