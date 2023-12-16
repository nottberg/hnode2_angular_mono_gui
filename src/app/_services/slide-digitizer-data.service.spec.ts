import { TestBed } from '@angular/core/testing';

import { SlideDigitizerDataService } from './slide-digitizer-data.service';

describe('SlideDigitizerDataService', () => {
  let service: SlideDigitizerDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SlideDigitizerDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
