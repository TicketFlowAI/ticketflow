import { TestBed } from '@angular/core/testing';

import { TicketManagerService } from './ticket-manager.service';

describe('TicketManagerService', () => {
  let service: TicketManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TicketManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
