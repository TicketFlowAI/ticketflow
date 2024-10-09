import { TestBed } from '@angular/core/testing';

import { SanctumService } from './sanctum.service';

describe('SanctumService', () => {
  let service: SanctumService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SanctumService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
