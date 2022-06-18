import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HnidModifiersComponent } from './hnid-modifiers.component';

describe('HnidModifiersComponent', () => {
  let component: HnidModifiersComponent;
  let fixture: ComponentFixture<HnidModifiersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HnidModifiersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HnidModifiersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
