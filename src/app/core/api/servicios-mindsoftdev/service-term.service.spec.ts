import { TestBed } from '@angular/core/testing';

import { ServiceTermService } from './service-term.service';

describe('ServiceTermService', () => {
  let service: ServiceTermService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceTermService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
