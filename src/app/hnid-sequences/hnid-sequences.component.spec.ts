import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HnidSequencesComponent } from './hnid-sequences.component';

describe('HnidSequencesComponent', () => {
  let component: HnidSequencesComponent;
  let fixture: ComponentFixture<HnidSequencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HnidSequencesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HnidSequencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
