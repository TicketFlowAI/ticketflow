import { TestBed } from '@angular/core/testing';

import { ServiceContractManagerService } from './service-contract-manager.service';

describe('ServiceContractManagerService', () => {
  let service: ServiceContractManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceContractManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
