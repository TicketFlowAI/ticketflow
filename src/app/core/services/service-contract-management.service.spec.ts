import { TestBed } from '@angular/core/testing';

import { ServiceContractManagementService } from './service-contract-management.service';

describe('ServiceContractManagerService', () => {
  let service: ServiceContractManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceContractManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
