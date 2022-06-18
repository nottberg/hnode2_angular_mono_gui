import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HnidModifiersEditDialogComponent } from './hnid-modifiers-edit-dialog.component';

describe('HnidModifiersEditDialogComponent', () => {
  let component: HnidModifiersEditDialogComponent;
  let fixture: ComponentFixture<HnidModifiersEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HnidModifiersEditDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HnidModifiersEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
