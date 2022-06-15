import { TestBed } from '@angular/core/testing';

import { IrrigationDataService } from './irrigation-data.service';

describe('IrrigationDataService', () => {
  let service: IrrigationDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IrrigationDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
