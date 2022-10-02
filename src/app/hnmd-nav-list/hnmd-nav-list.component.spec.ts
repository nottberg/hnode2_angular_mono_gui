import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HnmdNavListComponent } from './hnmd-nav-list.component';

describe('HnmdNavListComponent', () => {
  let component: HnmdNavListComponent;
  let fixture: ComponentFixture<HnmdNavListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HnmdNavListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HnmdNavListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
