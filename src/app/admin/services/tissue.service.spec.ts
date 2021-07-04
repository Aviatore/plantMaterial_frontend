import { TestBed } from '@angular/core/testing';

import { TissueService } from './tissue.service';

describe('TissueService', () => {
  let service: TissueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TissueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
