import { TestBed } from '@angular/core/testing';

import { ServiceTaxService } from './service-tax.service';

describe('ServiceTaxService', () => {
  let service: ServiceTaxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceTaxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
