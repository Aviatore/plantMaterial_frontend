import { TestBed } from '@angular/core/testing';

import { DuplicationsService } from './duplications.service';

describe('DuplicationsService', () => {
  let service: DuplicationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DuplicationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
