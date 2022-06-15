import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HnidZoneEditDialogComponent } from './hnid-zone-edit-dailog.component';

describe('HnidZoneEditDialogComponent', () => {
  let component: HnidZoneEditDialogComponent;
  let fixture: ComponentFixture<HnidZoneEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HnidZoneEditDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HnidZoneEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
