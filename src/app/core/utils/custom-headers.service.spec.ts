import { TestBed } from '@angular/core/testing';

import { CustomHeadersService } from './custom-headers.service';

describe('CustomHeadersService', () => {
  let service: CustomHeadersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomHeadersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
