import { TestBed } from '@angular/core/testing';

import { MindsoftServicesService } from './mindsoft-services.service';

describe('MindsoftServicesService', () => {
  let service: MindsoftServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MindsoftServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
