import { TestBed } from '@angular/core/testing';

import { TicketService } from './ticket.service';
import { CustomHeadersService } from '../../utils/custom-headers.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('TicketService', () => {
  let service: TicketService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CustomHeadersService,
        provideHttpClient(),
        provideHttpClientTesting()
      ],
    });
    service = TestBed.inject(TicketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
