import { TestBed } from '@angular/core/testing';

import { AiManagementService } from './ai-management.service';

describe('AiManagementService', () => {
  let service: AiManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AiManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
