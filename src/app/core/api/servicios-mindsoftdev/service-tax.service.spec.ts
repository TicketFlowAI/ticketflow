import { TestBed } from '@angular/core/testing';

import { ServiceTaxService } from './service-tax.service';
import { CustomHeadersService } from '../../utils/custom-headers.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('ServiceTaxService', () => {
  let service: ServiceTaxService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CustomHeadersService,
        provideHttpClient(),
        provideHttpClientTesting()
      ],
    });
    service = TestBed.inject(ServiceTaxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
