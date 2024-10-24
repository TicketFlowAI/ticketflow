import { TestBed } from '@angular/core/testing';

import { CompanyManagementService } from './company-management.service';

describe('CompanyManagementService', () => {
  let service: CompanyManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
