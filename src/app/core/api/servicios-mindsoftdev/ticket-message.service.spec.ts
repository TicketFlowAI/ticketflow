import { TestBed } from '@angular/core/testing';

import { TicketMessageService } from './ticket-message.service';

describe('TicketMessageService', () => {
  let service: TicketMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TicketMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
