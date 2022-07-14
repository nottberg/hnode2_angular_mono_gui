import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HnidNavListComponent } from './hnid-nav-list.component';

describe('HnidNavListComponent', () => {
  let component: HnidNavListComponent;
  let fixture: ComponentFixture<HnidNavListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HnidNavListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HnidNavListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
