import { TestBed } from '@angular/core/testing';

import { SanctumService } from './sanctum.service';
import {provideHttpClient} from "@angular/common/http";
import {provideHttpClientTesting} from "@angular/common/http/testing";

describe('SanctumService', () => {
  let service: SanctumService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(SanctumService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
