import { TestBed } from '@angular/core/testing';

import { SurveyManagementService } from './survey-management.service';

describe('SurveyManagementService', () => {
  let service: SurveyManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SurveyManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
