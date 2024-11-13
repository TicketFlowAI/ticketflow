import { TestBed } from '@angular/core/testing';
import { ServiceContractTermService } from './service-contract-term.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { CustomHeadersService } from '../../utils/custom-headers.service';
import { provideHttpClient } from '@angular/common/http';


describe('ServiceContractTermService', () => {
  let service: ServiceContractTermService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CustomHeadersService,
        provideHttpClient(),
        provideHttpClientTesting()
      ],
    });
    service = TestBed.inject(ServiceContractTermService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
