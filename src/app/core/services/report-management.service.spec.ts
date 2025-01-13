import { TestBed } from '@angular/core/testing';

import { ReportManagementService } from './report-management.service';

describe('ReportManagementService', () => {
  let service: ReportManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
