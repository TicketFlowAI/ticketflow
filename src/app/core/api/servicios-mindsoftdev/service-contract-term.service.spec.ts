import { TestBed } from '@angular/core/testing';
import { ServiceContractTermService } from './service-contract-term.service';


describe('ServiceContractTermService', () => {
  let service: ServiceContractTermService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceContractTermService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
