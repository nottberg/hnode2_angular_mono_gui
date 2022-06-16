import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HnidPlacementEditDialogComponent } from './hnid-placement-edit-dialog.component';

describe('HnidPlacementEditDialogComponent', () => {
  let component: HnidPlacementEditDialogComponent;
  let fixture: ComponentFixture<HnidPlacementEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HnidPlacementEditDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HnidPlacementEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
