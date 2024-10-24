import { TestBed } from '@angular/core/testing';

import { ServiceManagement } from './service-management.service';

describe('ServiceManagement', () => {
  let service: ServiceManagement;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceManagement);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
