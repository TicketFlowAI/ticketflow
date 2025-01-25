import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TicketService } from './ticket.service';
import { environment } from '../../../../environments/environment';
import { ITicketsApiResponse, ITicketApiResponse, TicketModel } from '../../models/entities/ticket.model';

describe('TicketService', () => {
  let service: TicketService;
  let httpTestingController: HttpTestingController;

  const mockTicketsResponse: ITicketsApiResponse = {
    success: true,
    data: [
      new TicketModel(
        1,
        'Ticket A',
        1,
        1, // true -> 1
        3,
        1,
        1,
        1,
        1, // true -> 1
        0, // false -> 0
        'John',
        'Doe',
        1,
        'Company A',
        1,
        'Service A'
      ),
      new TicketModel(
        2,
        'Ticket B',
        2,
        0, // false -> 0
        2,
        2,
        2,
        2,
        0, // false -> 0
        1, // true -> 1
        'Jane',
        'Smith',
        2,
        'Company B',
        2,
        'Service B'
      ),
    ],
  };

  const mockTicketResponse: ITicketApiResponse = {
    success: true,
    data: new TicketModel(
      1,
      'Ticket A',
      1,
      1, // true -> 1
      3,
      1,
      1,
      1,
      1, // true -> 1
      0, // false -> 0
      'John',
      'Doe',
      1,
      'Company A',
      1,
      'Service A'
    ),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TicketService],
    });
    service = TestBed.inject(TicketService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get tickets', () => {
    service.getTickets().subscribe((response) => {
      expect(response).toEqual(mockTicketsResponse);
    });

    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/tickets`);
    expect(req.request.method).toBe('GET');
    req.flush(mockTicketsResponse);
  });

  it('should get a single ticket by ID', () => {
    const ticketId = 1;

    service.getTicket(ticketId).subscribe((response) => {
      expect(response).toEqual(mockTicketResponse);
    });

    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/tickets/${ticketId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockTicketResponse);
  });

  it('should create a ticket', () => {
    const newTicket = new TicketModel(
      0,
      'New Ticket',
      3,
      1, // true -> 1
      2,
      1,
      1,
      1,
      0, // false -> 0
      0, // false -> 0
      'Alice',
      'Johnson',
      1,
      'Company C',
      1,
      'Service C'
    );

    service.createTicket(newTicket).subscribe((response) => {
      expect(response.success).toBe(true);
    });

    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/tickets`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newTicket);

    req.flush({ success: true });
  });

  it('should update a ticket', () => {
    const updatedTicket = new TicketModel(
      1,
      'Updated Ticket',
      2,
      0, // false -> 0
      4,
      1,
      1,
      1,
      0, // false -> 0
      1, // true -> 1
      'John',
      'Doe',
      1,
      'Company A',
      1,
      'Service A'
    );

    service.updateTicket(updatedTicket).subscribe((response) => {
      expect(response.status).toBe(200);
    });

    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/tickets/${updatedTicket.id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedTicket);

    req.flush({}, { status: 200, statusText: 'OK' });
  });

  it('should delete a ticket by ID', () => {
    const ticketId = 1;

    service.deleteTicket(ticketId).subscribe((response) => {
      expect(response.status).toBe(200);
    });

    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/tickets/${ticketId}`);
    expect(req.request.method).toBe('DELETE');

    req.flush({}, { status: 200, statusText: 'OK' });
  });

  it('should get deleted tickets successfully', (done) => {
    service.getDeletedTickets().subscribe({
      next: (response) => {
        expect(response).toEqual(mockTicketsResponse);
        done();
      },
      error: () => {
        fail('Expected success, but got error');
        done();
      },
    });
  
    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/tickets/deleted`);
    expect(req.request.method).toBe('GET');
    req.flush(mockTicketsResponse);
  });
  
  it('should handle error when getting deleted tickets', (done) => {
    service.getDeletedTickets().subscribe({
      next: () => {
        fail('Expected error, but got success');
        done();
      },
      error: (error) => {
        expect(error.status).toBe(404);
        done();
      },
    });
  
    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/tickets/deleted`);
    expect(req.request.method).toBe('GET');
    req.flush({ message: 'Not Found' }, { status: 404, statusText: 'Not Found' });
  });

  it('should get ticket history successfully', (done) => {
    const ticketId = 1;
    const mockHistoryResponse = { success: true, data: [] };
  
    service.getTicketHistory(ticketId).subscribe({
      next: (response) => {
        expect(response).toEqual(mockHistoryResponse);
        done();
      },
      error: () => {
        fail('Expected success, but got error');
        done();
      },
    });
  
    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/tickets/history/${ticketId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockHistoryResponse);
  });
  
  it('should handle error when getting ticket history', (done) => {
    const ticketId = 1;
  
    service.getTicketHistory(ticketId).subscribe({
      next: () => {
        fail('Expected error, but got success');
        done();
      },
      error: (error) => {
        expect(error.status).toBe(500);
        done();
      },
    });
  
    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/tickets/history/${ticketId}`);
    expect(req.request.method).toBe('GET');
    req.flush({ message: 'Internal Server Error' }, { status: 500, statusText: 'Internal Server Error' });
  });

  
  it('should close a ticket successfully', (done) => {
    const ticketId = 1;
  
    service.closeTicket(ticketId).subscribe({
      next: (response) => {
        expect(response.status).toBe(200);
        done();
      },
      error: () => {
        fail('Expected success, but got error');
        done();
      },
    });
  
    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/tickets/close/${ticketId}`);
    expect(req.request.method).toBe('POST');
    req.flush({}, { status: 200, statusText: 'OK' });
  });
  
  it('should handle error when closing a ticket', (done) => {
    const ticketId = 1;
  
    service.closeTicket(ticketId).subscribe({
      next: () => {
        fail('Expected error, but got success');
        done();
      },
      error: (error) => {
        expect(error.status).toBe(400);
        done();
      },
    });
  
    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/tickets/close/${ticketId}`);
    expect(req.request.method).toBe('POST');
    req.flush({ message: 'Bad Request' }, { status: 400, statusText: 'Bad Request' });
  });

  
  it('should reopen a ticket successfully', (done) => {
    const ticketId = 1;
  
    service.reopenTicket(ticketId).subscribe({
      next: (response) => {
        expect(response.status).toBe(200);
        done();
      },
      error: () => {
        fail('Expected success, but got error');
        done();
      },
    });
  
    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/tickets/open/${ticketId}`);
    expect(req.request.method).toBe('POST');
    req.flush({}, { status: 200, statusText: 'OK' });
  });
  
  it('should handle error when reopening a ticket', (done) => {
    const ticketId = 1;
  
    service.reopenTicket(ticketId).subscribe({
      next: () => {
        fail('Expected error, but got success');
        done();
      },
      error: (error) => {
        expect(error.status).toBe(500);
        done();
      },
    });
  
    const req = httpTestingController.expectOne(`${environment.apiEndpoint}/api/tickets/open/${ticketId}`);
    expect(req.request.method).toBe('POST');
    req.flush({ message: 'Internal Server Error' }, { status: 500, statusText: 'Internal Server Error' });
  });
  
});
