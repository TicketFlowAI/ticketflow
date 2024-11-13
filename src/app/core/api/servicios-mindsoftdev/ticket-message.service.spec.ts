import { TestBed } from '@angular/core/testing';

import { TicketMessageService } from './ticket-message.service';
import { CustomHeadersService } from '../../utils/custom-headers.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('TicketMessageService', () => {
  let service: TicketMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CustomHeadersService,
        provideHttpClient(),
        provideHttpClientTesting()
      ],
    });
    service = TestBed.inject(TicketMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
