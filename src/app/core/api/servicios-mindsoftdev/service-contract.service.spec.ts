import { TestBed } from '@angular/core/testing';

import { ServiceContractService } from './service-contract.service';

describe('ServiceContractService', () => {
  let service: ServiceContractService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceContractService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
