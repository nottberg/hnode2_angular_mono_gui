import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HnidSequenceEditDialogComponent } from './hnid-sequence-edit-dialog.component';

describe('HnidSequenceEditDialogComponent', () => {
  let component: HnidSequenceEditDialogComponent;
  let fixture: ComponentFixture<HnidSequenceEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HnidSequenceEditDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HnidSequenceEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
