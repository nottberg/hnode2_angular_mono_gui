import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HnidConfirmDialogComponent } from './hnid-confirm-dialog.component';

describe('HnidConfirmDialogComponent', () => {
  let component: HnidConfirmDialogComponent;
  let fixture: ComponentFixture<HnidConfirmDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HnidConfirmDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HnidConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
