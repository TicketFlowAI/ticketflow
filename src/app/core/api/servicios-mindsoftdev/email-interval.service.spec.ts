import { TestBed } from '@angular/core/testing';

import { EmailIntervalService } from './email-interval.service';

describe('EmailIntervalService', () => {
  let service: EmailIntervalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmailIntervalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
