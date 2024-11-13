import { TestBed } from '@angular/core/testing';

import { ServiceContractService } from './service-contract.service';
import { CustomHeadersService } from '../../utils/custom-headers.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('ServiceContractService', () => {
  let service: ServiceContractService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CustomHeadersService,
        provideHttpClient(),
        provideHttpClientTesting()
      ],
    });
    service = TestBed.inject(ServiceContractService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
