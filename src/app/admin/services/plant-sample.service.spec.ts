import { TestBed } from '@angular/core/testing';

import { PlantSampleService } from './plant-sample.service';

describe('PlantSampleService', () => {
  let service: PlantSampleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlantSampleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
