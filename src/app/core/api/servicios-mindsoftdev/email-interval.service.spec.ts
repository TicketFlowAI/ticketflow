import { TestBed } from '@angular/core/testing';

import { EmailIntervalService } from './email-interval.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('EmailIntervalService', () => {
  let service: EmailIntervalService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(EmailIntervalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
