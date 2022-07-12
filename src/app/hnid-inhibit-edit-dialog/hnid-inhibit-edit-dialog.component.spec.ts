import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HnidInhibitEditDialogComponent } from './hnid-inhibit-edit-dialog.component';

describe('HnidInhibitEditDialogComponent', () => {
  let component: HnidInhibitEditDialogComponent;
  let fixture: ComponentFixture<HnidInhibitEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HnidInhibitEditDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HnidInhibitEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
